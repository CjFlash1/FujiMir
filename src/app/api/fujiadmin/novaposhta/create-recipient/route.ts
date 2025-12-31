
import { NextResponse } from "next/server";
import { npRequest } from "@/lib/novaposhta";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, phone } = body;

        if (!firstName || !lastName || !phone) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 1. Get/Create Parent Counterparty
        let phoneClean = phone.replace(/\D/g, '');
        if (phoneClean.startsWith('0')) phoneClean = '38' + phoneClean;
        if (phoneClean.startsWith('80')) phoneClean = '3' + phoneClean;

        // We use save() to find/create the parent counterparty bucket
        const saveParentRes = await npRequest("Counterparty", "save", {
            FirstName: firstName,
            LastName: lastName,
            Phone: phoneClean,
            Email: "",
            CounterpartyType: "PrivatePerson",
            CounterpartyProperty: "Recipient"
        });

        if (!saveParentRes.success || !saveParentRes.data?.length) {
            return NextResponse.json({ error: "Failed to resolve counterparty", details: saveParentRes.errors }, { status: 400 });
        }

        const parentRef = saveParentRes.data[0].Ref;

        // 2. Create NEW ContactPerson explicitly
        const createContactRes = await npRequest("ContactPerson", "save", {
            CounterpartyRef: parentRef,
            FirstName: firstName,
            LastName: lastName,
            Phone: phoneClean,
            Email: ""
        });

        if (createContactRes.success && createContactRes.data?.length > 0) {
            const newContact = createContactRes.data[0];
            return NextResponse.json({
                success: true,
                ref: newContact.Ref,
                counterpartyRef: parentRef,
                fullName: `${lastName} ${firstName}`,
                phone: phone
            });
        }

        // 3. Fallback: If creation failed (e.g. "ContactPerson already exists"), 
        // we must find it and return it.
        const contactsRes = await npRequest("Counterparty", "getCounterpartyContactPersons", {
            Ref: parentRef
        });

        if (contactsRes.success && contactsRes.data) {
            const targetName = (lastName + firstName).toLowerCase().replace(/\s/g, '');

            // Try exact match
            const exact = contactsRes.data.find((c: any) => {
                const cPhone = (c.Phones || c.Phone || "").replace(/\D/g, '');
                const cName = ((c.LastName || "") + (c.FirstName || "")).toLowerCase().replace(/\s/g, '');
                return cPhone.endsWith(phoneClean.slice(-10)) && cName === targetName;
            });

            if (exact) {
                return NextResponse.json({
                    success: true,
                    ref: exact.Ref,
                    counterpartyRef: parentRef,
                    fullName: `${exact.LastName} ${exact.FirstName}`,
                    phone: exact.Phones || exact.Phone
                });
            }
        }

        return NextResponse.json({ error: "Failed to create contact", details: createContactRes.errors }, { status: 400 });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

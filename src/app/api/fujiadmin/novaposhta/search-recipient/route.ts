import { NextResponse } from "next/server";
import { npRequest } from "@/lib/novaposhta";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = body.phone;

        // Ensure string and clean
        let searchString = String(phone || "").replace(/\D/g, '');

        // Use last 10 digits
        if (searchString.length > 10) {
            searchString = searchString.substring(searchString.length - 10);
        }
        if (searchString.length === 9) searchString = '0' + searchString;

        if (!searchString || searchString.length < 10) {
            return NextResponse.json({ results: [], debug: "Phone too short" });
        }

        // 1. Identify "Mega-Counterparty" via save() dummy
        // This ensures we find the record even if it's "hidden" inside a shared counterparty
        const saveRes = await npRequest("Counterparty", "save", {
            FirstName: "Пошук",
            LastName: "Пошук",
            Phone: searchString,
            Email: "",
            CounterpartyType: "PrivatePerson",
            CounterpartyProperty: "Recipient"
        });

        if (!saveRes.success || !saveRes.data?.length) {
            return NextResponse.json({
                results: [],
                debug: { msg: "Identity resolution failed", search: searchString, errors: saveRes.errors }
            });
        }

        const parentRef = saveRes.data[0].Ref;
        const results: any[] = [];

        // 2. Get All Contacts of this Parent
        const contactsRes = await npRequest("Counterparty", "getCounterpartyContactPersons", {
            Ref: parentRef
        });

        if (contactsRes.success && Array.isArray(contactsRes.data)) {
            const suffix = searchString.slice(-10);

            for (const contact of contactsRes.data) {
                const fName = contact.FirstName || "";
                const lName = contact.LastName || "";
                const fullName = lName + " " + fName;

                const rawPhone = contact.Phones || contact.Phone || "";
                const cleanContactPhone = String(rawPhone).replace(/\D/g, '');

                const isMatch = cleanContactPhone.includes(suffix);

                // STRICT FILTER: Only show contacts with matching phone, as requested
                if (isMatch) {
                    results.push({
                        ref: contact.Ref,
                        counterpartyRef: parentRef,
                        firstName: fName,
                        lastName: lName,
                        phone: rawPhone,
                        fullName: fullName,
                        isMatch: isMatch
                    });
                }
            }

            // No need to sort by match since all are matches now, 
            // but maybe sort by similarity to name? Not strictly needed for now.
        }

        return NextResponse.json({ results: results });

    } catch (e) {
        console.error("Recipient search error:", e);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}

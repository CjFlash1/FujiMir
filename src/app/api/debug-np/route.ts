
import { NextResponse } from "next/server";
import { npRequest } from "@/lib/novaposhta";

export async function POST(request: Request) {
    try {
        const { phone } = await request.json();

        let phoneClean = phone.replace(/\D/g, '');
        if (phoneClean.startsWith('0')) phoneClean = '38' + phoneClean; // Ensure full format for save

        console.log("Debug NP: Saving/Checking", phoneClean);

        // Try to SAVE/UPDATE to see what NP returns
        const res = await npRequest("Counterparty", "save", {
            FirstName: "Тест",
            LastName: "Тестувальник",
            MiddleName: "",
            Phone: phoneClean,
            Email: "",
            CounterpartyType: "PrivatePerson",
            CounterpartyProperty: "Recipient"
        });

        const result = {
            inputPhone: phoneClean,
            saveResponse: res
        };

        if (res.success && res.data && res.data.length > 0) {
            const ref = res.data[0].Ref;
            // Get contacts to see the REAL name
            const contacts = await npRequest("Counterparty", "getCounterpartyContactPersons", {
                Ref: ref
            });
            result.contactsResponse = contacts;
        }

        return NextResponse.json(result);

    } catch (e: any) {
        return NextResponse.json({ error: e.message });
    }
}

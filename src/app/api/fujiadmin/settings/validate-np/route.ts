
import { NextResponse } from "next/server";
import { npRequest } from "@/lib/novaposhta";

export async function POST(request: Request) {
    try {
        const { apiKey } = await request.json();

        if (!apiKey) {
            return NextResponse.json({ valid: false, error: "No API Key provided" }, { status: 400 });
        }

        // We fetch the 'Sender' counterparties. The first one is typically the account owner or main profile.
        const res = await npRequest("Counterparty", "getCounterparties", {
            CounterpartyProperty: "Sender",
            Page: 1
        }, apiKey);

        if (res.success && res.data && res.data.length > 0) {
            // Found counterparts
            const owner = res.data[0];
            return NextResponse.json({
                valid: true,
                ownerName: owner.Description, // Name of Person or Company
                city: owner.CityDescription // Main city
            });
        } else {
            return NextResponse.json({
                valid: false,
                error: "Invalid Key or No Sender Profile found"
            });
        }

    } catch (e: any) {
        return NextResponse.json({ valid: false, error: e.message || "Server Error" }, { status: 500 });
    }
}

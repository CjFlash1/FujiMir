import { NextRequest, NextResponse } from "next/server";

const NP_API_URL = "https://api.novaposhta.ua/v2.0/json/";
const NP_API_KEY = "1f3dd12c344c40df149f57c68f13ddf7";

interface NPRequest {
    apiKey: string;
    modelName: string;
    calledMethod: string;
    methodProperties: Record<string, any>;
}

async function npRequest(modelName: string, calledMethod: string, methodProperties: Record<string, any>) {
    const body: NPRequest = {
        apiKey: NP_API_KEY,
        modelName,
        calledMethod,
        methodProperties,
    };

    const response = await fetch(NP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const query = searchParams.get("query") || "";
    const cityRef = searchParams.get("cityRef") || "";

    try {
        if (action === "cities") {
            // Search cities
            const result = await npRequest("Address", "searchSettlements", {
                CityName: query,
                Limit: "20",
                Page: "1",
            });

            // Nova Poshta can return success=false with errors or empty data
            if (!result.success && result.errors?.length > 0) {
                console.error("Nova Poshta cities error:", result.errors);
                return NextResponse.json({ cities: [], error: result.errors }, { status: 200 });
            }

            // Format response - handle case when data is empty array
            const addresses = result.data?.[0]?.Addresses || [];
            const cities = addresses.map((city: any) => ({
                ref: city.Ref,
                deliveryCity: city.DeliveryCity,
                name: city.Present, // Full display name
                mainDescription: city.MainDescription,
                area: city.Area,
            }));

            return NextResponse.json({ cities });
        }

        if (action === "warehouses") {
            // Search warehouses/branches in a city
            if (!cityRef) {
                return NextResponse.json({ error: "cityRef is required" }, { status: 400 });
            }

            const result = await npRequest("Address", "getWarehouses", {
                CityRef: cityRef,
                FindByString: query,
                Limit: "50",
                Page: "1",
            });

            if (!result.success) {
                return NextResponse.json({ error: result.errors }, { status: 400 });
            }

            // Format response, include all types (branches, postamats, etc)
            const warehouses = result.data?.map((wh: any) => ({
                ref: wh.Ref,
                number: wh.Number,
                description: wh.Description,
                shortAddress: wh.ShortAddress,
                phone: wh.Phone,
                typeOfWarehouse: wh.TypeOfWarehouse,
                categoryOfWarehouse: wh.CategoryOfWarehouse,
                // Icon type indicator
                type: wh.CategoryOfWarehouse === "Postomat" ? "postomat"
                    : wh.CategoryOfWarehouse === "Branch" ? "branch"
                        : "other",
            })) || [];

            return NextResponse.json({ warehouses });
        }

        return NextResponse.json({ error: "Invalid action. Use 'cities' or 'warehouses'" }, { status: 400 });

    } catch (error: any) {
        console.error("Nova Poshta API error:", error);
        return NextResponse.json({ error: "API request failed" }, { status: 500 });
    }
}

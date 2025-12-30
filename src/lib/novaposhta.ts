const NP_API_URL = "https://api.novaposhta.ua/v2.0/json/";
export const NP_API_KEY = "1f3dd12c344c40df149f57c68f13ddf7";

interface NPRequest {
    apiKey: string;
    modelName: string;
    calledMethod: string;
    methodProperties: Record<string, any>;
}

export async function npRequest(modelName: string, calledMethod: string, methodProperties: Record<string, any>) {
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

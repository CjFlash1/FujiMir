import { prisma } from "@/lib/prisma";

const NP_API_URL = "https://api.novaposhta.ua/v2.0/json/";
export const DEFAULT_NP_KEY = "1f3dd12c344c40df149f57c68f13ddf7";

interface NPRequest {
    apiKey: string;
    modelName: string;
    calledMethod: string;
    methodProperties: Record<string, any>;
}

export async function npRequest(modelName: string, calledMethod: string, methodProperties: Record<string, any>, explicitApiKey?: string) {
    let apiKey = explicitApiKey || DEFAULT_NP_KEY;

    // Only fetch from DB if no explicit key is provided and we are using default
    if (!explicitApiKey) {
        try {
            const setting = await prisma.setting.findUnique({ where: { key: "novaposhta_api_key" } });
            if (setting?.value) apiKey = setting.value;
        } catch (e) {
            console.warn("Failed to fetch NP API Key from DB, using default.");
        }
    }

    const body: NPRequest = {
        apiKey: apiKey,
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

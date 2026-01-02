import { prisma } from "@/lib/prisma";

const NP_API_URL = "https://api.novaposhta.ua/v2.0/json/";
// DEFAULT_NP_KEY removed to enforce user configuration

interface NPRequest {
    apiKey: string;
    modelName: string;
    calledMethod: string;
    methodProperties: Record<string, any>;
}

export async function npRequest(modelName: string, calledMethod: string, methodProperties: Record<string, any>, explicitApiKey?: string) {
    let apiKey = explicitApiKey;

    // Only fetch from DB if no explicit key is provided
    if (!explicitApiKey) {
        try {
            const setting = await prisma.setting.findUnique({ where: { key: "novaposhta_api_key" } });
            if (setting?.value) apiKey = setting.value;
        } catch (e) {
            console.warn("Failed to fetch NP API Key from DB.");
        }
    }

    if (!apiKey) {
        return { success: false, errors: ["Nova Poshta API Key is missing. Please configure it in Settings."] };
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

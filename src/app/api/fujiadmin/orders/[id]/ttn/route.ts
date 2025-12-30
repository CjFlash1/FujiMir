import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { npRequest } from "@/lib/novaposhta";

// Debug logging - only in development
const DEBUG_TTN = process.env.NODE_ENV === 'development';
const log = (...args: any[]) => DEBUG_TTN && console.log('[TTN DEBUG]', ...args);

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        console.log("[TTN DEBUG] Incoming body:", JSON.stringify(body, null, 2));

        const {
            weight, width, height, length,
            senderFirstName, senderLastName, senderPhone, senderCityRef, senderWarehouseRef,
            recipientFirstName, recipientLastName, recipientPhone, recipientCityRef, recipientWarehouseRef,
            cost, // Declared value
            payerType = "Recipient", // Default to Recipient
            paymentMethod = "Cash"
        } = body;

        const orderId = parseInt(id);
        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        const finalRecipientFirstName = recipientFirstName || order.customerFirstName || "";
        const finalRecipientLastName = recipientLastName || order.customerLastName || "";
        const finalRecipientPhone = recipientPhone || order.customerPhone || "";
        const finalRecipientCityRef = recipientCityRef || order.recipientCityRef;
        const finalRecipientWarehouseRef = recipientWarehouseRef || order.recipientWarehouseRef;

        if (!finalRecipientCityRef || !finalRecipientWarehouseRef) {
            return NextResponse.json({ error: "Recipient Nova Poshta refs missing" }, { status: 400 });
        }

        // Helper to split full name into components for legacy fallbacks if needed
        const parseName = (fullName: string) => {
            const parts = fullName.trim().split(/\s+/);
            const lastName = parts[0] || "";
            const firstName = parts[1] || (lastName ? lastName : "");
            const middleName = parts.slice(2).join(" ");
            return { lastName, firstName, middleName };
        };

        // If we don't have explicit split names for sender, try to parse from senderName (legacy)
        let sFN = senderFirstName;
        let sLN = senderLastName;
        if (!sFN && body.senderName) {
            const parsed = parseName(body.senderName);
            sFN = parsed.firstName;
            sLN = parsed.lastName;
        }

        // Helper to format phone to 380XXXXXXXXX
        const cleanPhone = (phone: string) => {
            let p = phone.replace(/\D/g, '');
            if (p.startsWith('0')) p = '38' + p;
            if (p.startsWith('80')) p = '3' + p;
            return p.substring(0, 12);
        };

        const sPhoneClean = cleanPhone(senderPhone);
        const rPhoneClean = cleanPhone(finalRecipientPhone);
        console.log(`[TTN DEBUG] Cleaned Phones - Sender: ${sPhoneClean}, Recipient: ${rPhoneClean}`);

        // 1. Get Counterparty for Sender (Do NOT try to create/save Sender as it is restricted)
        let counterparties = await npRequest("Counterparty", "getCounterparties", {
            CounterpartyProperty: "Sender",
            FindByString: sPhoneClean
        });

        let senderRef = "";
        if (counterparties.success && counterparties.data?.length > 0) {
            senderRef = counterparties.data[0].Ref;
        } else {
            // Check all senders
            const allSenders = await npRequest("Counterparty", "getCounterparties", {
                CounterpartyProperty: "Sender"
            });

            if (allSenders.success && allSenders.data?.length > 0) {
                // Try manual phone match
                const match = allSenders.data.find((s: any) => {
                    const sp = cleanPhone(s.Phone || "");
                    return sp && (sp.includes(sPhoneClean) || sPhoneClean.includes(sp));
                });

                if (match) {
                    senderRef = match.Ref;
                } else if (allSenders.data.length === 1) {
                    senderRef = allSenders.data[0].Ref;
                } else {
                    return NextResponse.json({
                        error: "Sender not found",
                        details: "Check sender phone."
                    }, { status: 400 });
                }
            } else {
                return NextResponse.json({ error: "No Senders found." }, { status: 400 });
            }
        }

        // 2. Get or Create Contact Person for Sender
        console.log(`[TTN DEBUG] Fetching contacts for SenderRef: ${senderRef}`);
        const senderContacts = await npRequest("Counterparty", "getCounterpartyContactPersons", {
            Ref: senderRef
        });

        let contactSenderRef = "";

        // Try to find a specific contact match by Phone or Name
        let contactMatch = null;
        if (senderContacts.success && senderContacts.data) {
            contactMatch = senderContacts.data.find((c: any) => {
                const cPhone = cleanPhone(String(c.Phones || c.Phone || ""));
                const nameMatch = c.LastName === sLN && c.FirstName === sFN;
                const phoneMatch = cPhone === sPhoneClean;
                return nameMatch || phoneMatch;
            });
        }

        if (contactMatch) {
            console.log(`[TTN DEBUG] Found Sender Contact Match: ${contactMatch.Ref} (Name: ${contactMatch.LastName})`);
            contactSenderRef = contactMatch.Ref;
            // Force update
            const updateRes = await npRequest("ContactPerson", "save", {
                Ref: contactSenderRef,
                CounterpartyRef: senderRef,
                FirstName: sFN,
                LastName: sLN,
                MiddleName: "",
                Phone: sPhoneClean,
                Email: ""
            });
            if (!updateRes.success) {
                console.error("[TTN ERROR] Failed to update Sender Contact:", updateRes.errors);
                // Actually, fail hard so user knows why name is wrong
                return NextResponse.json({ error: "Failed to update Sender Name", details: updateRes.errors }, { status: 400 });
            }
        } else {
            console.log(`[TTN DEBUG] Creating NEW Sender Contact for ${sFN} ${sLN}`);
            // If not found, try to CREATE a new contact person for this sender
            const newContact = await npRequest("ContactPerson", "save", {
                CounterpartyRef: senderRef,
                FirstName: sFN,
                LastName: sLN,
                MiddleName: "",
                Phone: sPhoneClean,
                Email: ""
            });

            if (newContact.success && newContact.data?.length > 0) {
                contactSenderRef = newContact.data[0].Ref;
            } else {
                console.warn("[TTN WARN] Failed to create Sender Contact:", JSON.stringify(newContact.errors));

                // Fallback: Force Update the Main Contact (e.g. Account Owner)
                // This handles the case where "ContactPerson already exists" (duplicate phone) but we couldn't find it in the list.
                if (senderContacts.success && senderContacts.data?.length > 0) {
                    console.log("[TTN DEBUG] Falling back to UPDATING Default Sender Contact...");
                    const defaultContactRef = senderContacts.data[0].Ref;

                    const fallbackUpdate = await npRequest("ContactPerson", "save", {
                        Ref: defaultContactRef,
                        CounterpartyRef: senderRef,
                        FirstName: sFN,
                        LastName: sLN,
                        MiddleName: "",
                        Phone: sPhoneClean,
                        Email: ""
                    });

                    if (fallbackUpdate.success) {
                        contactSenderRef = defaultContactRef;
                        console.log("[TTN DEBUG] Successfully updated Default Contact.");
                    } else {
                        console.error("[TTN ERROR] Failed to update Default Contact:", fallbackUpdate.errors);
                        // Last resort: Use default contact Ref WITHOUT update (better than failing)
                        contactSenderRef = defaultContactRef;
                    }
                } else {
                    return NextResponse.json({
                        error: "Failed to create Sender Contact and no default contact found",
                        details: newContact.errors
                    }, { status: 400 });
                }
            }
        }

        // 3. Create/Update Recipient
        // Strategy: Search first to get Ref (if exists), then Force Update with Ref.
        // This is more reliable than implicit update by phone for PrivatePerson.
        console.log(`[TTN DEBUG] Searching Recipient by Phone: ${rPhoneClean}`);

        // Search existing
        let recipientRef = "";
        const searchRecipient = await npRequest("Counterparty", "getCounterparties", {
            CounterpartyProperty: "Recipient",
            FindByString: rPhoneClean
        });

        if (searchRecipient.success && searchRecipient.data?.length > 0) {
            recipientRef = searchRecipient.data[0].Ref;
            console.log(`[TTN DEBUG] Found existing Recipient: ${recipientRef} (${searchRecipient.data[0].FirstName} ${searchRecipient.data[0].LastName})`);
        } else {
            console.log(`[TTN DEBUG] Recipient not found by phone, creating new.`);
        }

        // Force Save/Update
        const savedRecipient = await npRequest("Counterparty", "save", {
            Ref: recipientRef, // Pass Ref to force update existing record
            FirstName: finalRecipientFirstName,
            MiddleName: "",
            LastName: finalRecipientLastName,
            Phone: rPhoneClean,
            Email: "",
            CounterpartyType: "PrivatePerson",
            CounterpartyProperty: "Recipient"
        });

        if (savedRecipient.success) {
            recipientRef = savedRecipient.data[0].Ref;
            console.log(`[TTN DEBUG] Recipient Saved/Updated. Ref: ${recipientRef}`);
            // Check if name really updated?
            if (savedRecipient.data[0].FirstName !== finalRecipientFirstName) {
                console.warn(`[TTN WARN] Recipient Name mismatch after save! Sent: ${finalRecipientFirstName}, Got: ${savedRecipient.data[0].FirstName}`);
            }
        } else {
            console.error("[TTN ERROR] Recipient Save Failed:", savedRecipient.errors);
            return NextResponse.json({ error: "Failed to save recipient", details: savedRecipient.errors }, { status: 400 });
        }

        const recipientContacts = await npRequest("Counterparty", "getCounterpartyContactPersons", {
            Ref: recipientRef
        });

        let contactRecipientRef = "";
        if (recipientContacts.success && recipientContacts.data?.length > 0) {
            contactRecipientRef = recipientContacts.data[0].Ref;
            // Removed explicit ContactPerson.save as it causes "Ref must be empty" error for Recipient
        } else {
            return NextResponse.json({ error: "No contact person found for recipient" }, { status: 400 });
        }

        // 3. Create TTN
        const ttnParams = {
            PayerType: payerType,
            PaymentMethod: paymentMethod,
            DateTime: new Date().toLocaleDateString('uk-UA').replace(/\//g, '.'),
            CargoType: "Parcel",
            Weight: weight,
            ServiceType: "WarehouseWarehouse",
            SeatsAmount: "1",
            Description: "Фотопродукція",
            Cost: cost || order.totalAmount,
            CitySender: senderCityRef,
            Sender: senderRef,
            SenderAddress: senderWarehouseRef,
            ContactSender: contactSenderRef,
            SendersPhone: senderPhone,
            CityRecipient: finalRecipientCityRef,
            Recipient: recipientRef,
            RecipientAddress: finalRecipientWarehouseRef,
            ContactRecipient: contactRecipientRef,
            RecipientsPhone: finalRecipientPhone,
            OptionsSeat: [{
                volumetricVolume: (width * height * length) / 4000, // NP standard
                weight: weight,
                volumetricWidth: width,
                volumetricHeight: height,
                volumetricLength: length
            }]
        };

        const ttnResult = await npRequest("InternetDocument", "save", ttnParams);

        if (!ttnResult.success) {
            return NextResponse.json({ error: "Nova Poshta API error", details: ttnResult.errors }, { status: 400 });
        }

        const ttnNumber = ttnResult.data[0].IntDocNumber;
        const ttnRef = ttnResult.data[0].Ref;

        // 4. Update Order
        await prisma.order.update({
            where: { id: orderId },
            data: { ttnNumber, ttnRef }
        });

        return NextResponse.json({ success: true, ttnNumber });

    } catch (e: any) {
        console.error("TTN Generation error:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const orderId = parseInt(id);

        const order = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order || !order.ttnRef) {
            return NextResponse.json({ error: "Order or TTN Ref not found" }, { status: 404 });
        }

        // Call NP API to delete
        const result = await npRequest("InternetDocument", "delete", {
            DocumentRefs: [order.ttnRef]
        });

        if (!result.success) {
            return NextResponse.json({ error: "Nova Poshta API error", details: result.errors }, { status: 400 });
        }

        // Clear from order
        await prisma.order.update({
            where: { id: orderId },
            data: {
                ttnNumber: null,
                ttnRef: null
            }
        });

        return NextResponse.json({ success: true });

    } catch (e: any) {
        console.error("TTN Deletion error:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

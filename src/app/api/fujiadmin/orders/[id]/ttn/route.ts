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
            paymentMethod = "Cash",
            explicitRecipientRef, // NEW: Manual selection
            explicitContactRef    // NEW: Manual selection
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
            const updateRes = await npRequest("ContactPerson", "update", {
                Ref: contactSenderRef,
                CounterpartyRef: senderRef,
                FirstName: sFN,
                LastName: sLN,
                MiddleName: "",
                Phone: sPhoneClean,
                Email: ""
            });
            if (!updateRes.success) {
                console.warn("[TTN WARN] Failed to update Sender Contact (likely PrivatePerson restriction). Proceeding with existing data.", updateRes.errors);
                // We ignore this error because PrivatePerson contact updates are often blocked by NP API.
                // The TTN will be created with the name currently stored in NP database.
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

                    const fallbackUpdate = await npRequest("ContactPerson", "update", {
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
        let recipientRef = explicitRecipientRef || "";
        let contactRecipientRef = explicitContactRef || "";

        if (recipientRef && contactRecipientRef) {
            console.log(`[TTN DEBUG] Using Explicit Recipient: ${recipientRef}, Contact: ${contactRecipientRef}`);
            // If explicit refs provided, we still try to update the name just in case it's allowed
            // but we rely on these refs.
            try {
                await npRequest("ContactPerson", "save", {
                    Ref: contactRecipientRef,
                    CounterpartyRef: recipientRef,
                    FirstName: finalRecipientFirstName,
                    LastName: finalRecipientLastName,
                    MiddleName: "",
                    Phone: rPhoneClean,
                    Email: ""
                });
            } catch (e) { console.warn("[TTN WARN] Failed to update explicit contact:", e); }

        } else {
            console.log(`[TTN DEBUG] No explicit recipient selected, starting aggressive search/save...`);
            // 3. Create/Update Recipient - AGGRESSIVE STRATEGY (Fallback if no explicit refs)
            // Instead of searching first, we try to SAVE immediately.
            // If the phone exists, NP API should update it or return the existing Ref.
            console.log(`[TTN DEBUG] Saving Recipient (Aggressive): ${finalRecipientFirstName} ${finalRecipientLastName} ${rPhoneClean}`);

            const saveRecipientRes = await npRequest("Counterparty", "save", {
                FirstName: finalRecipientFirstName,
                LastName: finalRecipientLastName,
                MiddleName: "",
                Phone: rPhoneClean,
                Email: "",
                CounterpartyType: "PrivatePerson",
                CounterpartyProperty: "Recipient"
            });

            if (saveRecipientRes.success && saveRecipientRes.data?.length > 0) {
                recipientRef = saveRecipientRes.data[0].Ref;
                console.log(`[TTN DEBUG] Recipient Saved/Found. Ref: ${recipientRef}`);
            } else {
                console.warn("[TTN WARN] Direct save failed or returned no data, trying fallback search...", saveRecipientRes.errors);
                // Fallback: Search by phone if save didn't return data (rare but possible errors)
                const searchRes = await npRequest("Counterparty", "getCounterparties", {
                    CounterpartyProperty: "Recipient",
                    FindByString: rPhoneClean
                });

                if (searchRes.success && searchRes.data?.length > 0) {
                    recipientRef = searchRes.data[0].Ref;
                    console.log(`[TTN DEBUG] Found Recipient by search: ${recipientRef}`);
                } else {
                    return NextResponse.json({
                        error: "Не вдалося створити або знайти отримувача",
                        details: saveRecipientRes.errors || ["Phone search failed"]
                    }, { status: 400 });
                }
            }

            // 3.1 Handle Contact Person
            // Strategy: Look for specific contact by phone within the counterparty.
            // If found -> Update name. If not found -> Create new contact.
            const recipientContacts = await npRequest("Counterparty", "getCounterpartyContactPersons", {
                Ref: recipientRef
            });

            let createErrors: any = [];

            if (recipientContacts.success && recipientContacts.data) {
                // Improved Strategy for Automatic Selection:
                // 1. Find if there is an existing contact with matching Phone AND matching Name.
                // 2. If yes, use it.
                // 3. If no (even if phone matches but name differs), CREATE NEW contact with correct name.

                const targetName = (finalRecipientLastName + finalRecipientFirstName).toLowerCase().replace(/\s/g, '');

                const exactMatch = recipientContacts.data.find((c: any) => {
                    const cPhone = (c.Phones || c.Phone || "").replace(/\D/g, '');
                    const cName = ((c.LastName || "") + (c.FirstName || "")).toLowerCase().replace(/\s/g, '');

                    // Flexible phone match (last 10 digits)
                    const phoneMatches = cPhone.endsWith(rPhoneClean.slice(-10));
                    // Name match
                    const nameMatches = cName === targetName;

                    return phoneMatches && nameMatches;
                });

                if (exactMatch) {
                    contactRecipientRef = exactMatch.Ref;
                    console.log(`[TTN DEBUG] Found EXACT match (Name+Phone): ${contactRecipientRef}`);
                    // No need to update name, it matched
                } else {
                    console.log(`[TTN DEBUG] No exact name+phone match for ${finalRecipientLastName} ${finalRecipientFirstName}. Creating NEW contact...`);
                    // Fall through to creation logic
                }

                if (!contactRecipientRef) {
                    // Create new contact logic (moved here to run if exactMatch was false)
                    try {
                        console.log(`[TTN DEBUG] Attempting to create contact: ${finalRecipientLastName} ${finalRecipientFirstName}`);
                        const createRes = await npRequest("ContactPerson", "save", {
                            CounterpartyRef: recipientRef,
                            FirstName: finalRecipientFirstName,
                            LastName: finalRecipientLastName,
                            MiddleName: "",
                            Phone: rPhoneClean,
                            Email: ""
                        });

                        if (createRes.success && createRes.data?.length > 0) {
                            contactRecipientRef = createRes.data[0].Ref;
                            console.log(`[TTN DEBUG] Created new contact successfully: ${contactRecipientRef}`);
                        } else {
                            createErrors = createRes.errors; // CAPTURE ERRORS
                            console.warn("[TTN WARN] Creation might have failed:", createRes.errors);
                        }
                    } catch (e) {
                        console.error("[TTN ERROR] Exception creating contact:", e);
                    }

                    // CRITICAL FIX: If creation didn't give us a Ref (or silently succeeded/failed), 
                    // we MUST re-scan the contacts to find the one we likely just created/updated.
                    if (!contactRecipientRef) {
                        console.log("[TTN DEBUG] Re-scanning contacts to find the created person...");
                        const reloadContacts = await npRequest("Counterparty", "getCounterpartyContactPersons", {
                            Ref: recipientRef
                        });

                        if (reloadContacts.success && reloadContacts.data) {
                            const targetName = (finalRecipientLastName + finalRecipientFirstName).toLowerCase().replace(/\s/g, '');
                            const reMatch = reloadContacts.data.find((c: any) => {
                                const cPhone = (c.Phones || c.Phone || "").replace(/\D/g, '');
                                const cName = ((c.LastName || "") + (c.FirstName || "")).toLowerCase().replace(/\s/g, '');
                                return cPhone.endsWith(rPhoneClean.slice(-10)) && cName === targetName;
                            });

                            if (reMatch) {
                                contactRecipientRef = reMatch.Ref;
                                console.log(`[TTN DEBUG] Found contact after re-scan: ${contactRecipientRef}`);
                            } else {
                                // Last resort: Fallback to ANY matching phone
                                const phoneMatch = reloadContacts.data.find((c: any) => {
                                    const cPhone = (c.Phones || c.Phone || "").replace(/\D/g, '');
                                    return cPhone.endsWith(rPhoneClean.slice(-10));
                                });
                                if (phoneMatch) {
                                    contactRecipientRef = phoneMatch.Ref;
                                    console.log(`[TTN WARN] Fallback to phone-only match after re-scan: ${contactRecipientRef}`);
                                }
                            }

                            // ABSOLUTE FALLBACK 1: If we still don't have a contact, use the first one from re-scan
                            if (!contactRecipientRef && reloadContacts.data.length > 0) {
                                console.warn("[TTN WARN] ABSOLUTE FALLBACK: Using first available contact.");
                                contactRecipientRef = reloadContacts.data[0].Ref;
                            }
                        }
                    }
                    // ABSOLUTE FALLBACK 2: Use Counterparty Ref itself (Desperate measure)
                    if (!contactRecipientRef) {
                        console.warn("[TTN WARN] ULTIMATE FALLBACK: Using Counterparty Ref as Contact Ref");
                        contactRecipientRef = recipientRef;
                    }
                }
            } else {
                return NextResponse.json({ error: "Contact retrieval failed" }, { status: 400 });
            }

            if (!contactRecipientRef) {
                return NextResponse.json({
                    error: "Не вдалося визначити контактну особу (Auto-fail)",
                    details: {
                        recipientRef,
                        createErrors,
                        contactsFound: recipientContacts?.data?.length || 0,
                    }
                }, { status: 400 });
            }
        }


        // 3. Create TTN
        const ttnParams = {
            PayerType: payerType,
            PaymentMethod: paymentMethod,
            DateTime: (() => {
                const date = new Date();
                // If it's late (after 18:00), use tomorrow's date to avoid "less than now" error
                if (date.getHours() >= 18) {
                    date.setDate(date.getDate() + 1);
                }
                const d = date.getDate().toString().padStart(2, '0');
                const m = (date.getMonth() + 1).toString().padStart(2, '0');
                const y = date.getFullYear();
                return `${d}.${m}.${y}`;
            })(),
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

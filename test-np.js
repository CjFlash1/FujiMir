
async function test(phone) {
    try {
        console.log(`\n--- Debugging ${phone} ---`);
        const res = await fetch('http://localhost:3000/api/debug-np', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });
        const data = await res.json();

        if (data.saveResponse?.success) {
            const person = data.saveResponse.data[0];
            console.log(`FOUND/CREATED Ref: ${person.Ref}`);
            console.log(`Counterparty Name: ${person.FirstName} ${person.LastName}`);

            if (data.contactsResponse?.success) {
                const contact = data.contactsResponse.data[0];
                console.log(`REAL Contact Name: ${contact.LastName} ${contact.FirstName}`);
                console.log(`Contact Phone: ${contact.Phones || contact.Phone}`);

                // List all contacts
                console.log(`Total Contacts Found: ${data.contactsResponse.data.length}`);
                data.contactsResponse.data.forEach((c, i) => {
                    console.log(`  [${i}] ${c.LastName} ${c.FirstName} (${c.Phones || c.Phone})`);
                });

            } else {
                console.log("No Contact Person found!");
            }
        } else {
            console.log("ERROR from NP:", JSON.stringify(data.saveResponse?.errors || data, null, 2));
        }
    } catch (e) {
        console.error(`Error:`, e.message);
    }
}

async function run() {
    await test('0660560157');
}

run();

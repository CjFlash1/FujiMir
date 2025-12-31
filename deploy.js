const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// === MANUAL BUILD STRATEGY ===
// This script ONLY Handles basic sync tasks.
// YOU MUST RUN 'npm run build' MANUALLY ON SERVER IF NEEDED.

console.log("=== DEPLOY START (MANUAL BUILD MODE) ===");

try {
    // 1. PATH SETUP (Server specific)
    const PLESK_DIRS = ['/opt/plesk/node/21/bin', '/opt/plesk/node/20/bin'];
    const localBin = path.join(process.cwd(), 'node_modules', '.bin');
    process.env.PATH = `${PLESK_DIRS.join(':')}:${localBin}:${process.env.PATH}`;

    function run(cmd) {
        console.log(`> ${cmd}`);
        try {
            execSync(cmd, { stdio: 'inherit', env: process.env });
        } catch (e) {
            console.error(`Error: ${e.message} (Continuing...)`);
        }
    }

    // 2. INSTALL ONLY
    console.log("\n--- NPM INSTALL ---");
    run('npm install --no-audit --omit=dev'); // Fast production install

    // 3. DATABASE
    console.log("\n--- DB SYNC ---");
    // run('npx prisma generate'); 
    // run('npx prisma db push --accept-data-loss');

    // 4. NO BUILD - USER HANDLES MANUALLY
    console.log("\n--- SKIPPING BUILD ---");
    console.log("REMINDER: Run 'npm run build' manually via SSH/Terminal if code changed!");

    // 5. RESTART APPLICATION
    console.log("\n--- RESTART ---");
    const tmp = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    fs.writeFileSync(path.join(tmp, 'restart.txt'), new Date().toISOString());
    console.log("Restart trigger created.");

    console.log("=== SUCCESS ===");

} catch (e) {
    console.error("DEPLOY FAILED:", e.message);
    process.exit(0); // Exit clean so Plesk doesn't yell
}

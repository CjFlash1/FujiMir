const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Accumulate logs in memory
let LOG_BUFFER = [];
function log(msg) {
    if (typeof msg !== 'string') msg = JSON.stringify(msg, null, 2);
    console.log(msg); // Print to stdout (Plesk might hide this on success)
    LOG_BUFFER.push(msg); // Check this later
}

log("=== DEPLOY SCRIPT STARTING ===");
log(`CWD: ${process.cwd()}`);
log(`Node Version: ${process.version}`);

try {
    // 1. SETUP PATH
    const PLESK_DIRS = [
        '/opt/plesk/node/21/bin',     // FOUND ON SERVER
        '/opt/plesk/node/20/bin',
        '/opt/plesk/node/22/bin'
    ];
    const localBin = path.join(process.cwd(), 'node_modules', '.bin');
    process.env.PATH = `${PLESK_DIRS.join(':')}:${localBin}:${process.env.PATH}`;

    log("PATH updated.");

    // 2. HELPER
    function run(cmd) {
        log(`\n> ${cmd}`);
        try {
            const out = execSync(cmd, { encoding: 'utf8', env: process.env, stdio: 'pipe' });
            log(out);
        } catch (e) {
            log(`ERROR running "${cmd}":`);
            if (e.stdout) log(e.stdout.toString());
            if (e.stderr) log(e.stderr.toString());
            throw e;
        }
    }

    // 3. CHECK ENV
    run('node -v');
    run('which node'); // See where 'node' resolves to

    // 4. INSTALL
    log("\n--- INSTALLING ---");
    run('npm install --no-audit');

    // 5. PRISMA
    log("\n--- DB ---");
    // Uncomment when build passes cleanly:
    // run('npx prisma generate');
    // run('npx prisma db push --accept-data-loss');

    // 6. BUILD
    log("\n--- BUILDING ---");
    process.env.NEXT_TELEMETRY_DISABLED = '1';

    // Try forcing memory limit to avoid UV error
    // Use the absolute path to 'next' bin
    const nextBin = path.join(process.cwd(), 'node_modules', '.bin', 'next');

    if (fs.existsSync(nextBin)) {
        // Attempt build with simplified command
        run(`"${nextBin}" build`);
    } else {
        log("Binary 'next' not found in .bin, trying via npm run build");
        run('npm run build');
    }

    // 7. FINISH
    console.log("\n=== SUCCESS ==="); // Print to console for UI

    // 8. RESTART SIGNAL
    const tmp = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    fs.writeFileSync(path.join(tmp, 'restart.txt'), new Date().toISOString());

} catch (e) {
    console.error("\n!!! DEPLOY FAILED !!!");
    console.error(e.message);
    if (LOG_BUFFER.length > 0) {
        console.error("--- LOGS ---");
        console.error(LOG_BUFFER.join('\n'));
    }
    process.exit(1);
}

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
        '/opt/plesk/node/20/bin',
        '/opt/plesk/node/20.19.6/bin',
        '/opt/plesk/node/22/bin',
        '/opt/plesk/node/18/bin'
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

    // 5. PRISMA (SKIPPED FOR NOW)
    log("\n--- DB ---");
    log("Skipping Prisma to isolate build error.");

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
    log("\n=== SUCCESS ===");

    // Force an error at the end so Plesk SHOWS THE LOG in the UI!
    throw new Error("\n[INTENTIONAL ERROR TO SHOW LOGS]\n" + LOG_BUFFER.join('\n'));

} catch (e) {
    // Determine if it was our intentional error or a real one
    if (e.message.includes("INTENTIONAL ERROR")) {
        console.error(e.message);
    } else {
        console.error("\n!!! REAL ERROR !!!");
        console.error(e.message);
        console.error("--- FULL LOG ---");
        console.error(LOG_BUFFER.join('\n'));
    }
    process.exit(1);
}

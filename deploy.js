const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// === LOGGING SETUP ===
// Try to write to a 'tmp' folder inside the project, usually writable by the app user
const LOG_FILE = path.join(process.cwd(), 'tmp', 'deploy_log.txt');

// Initialize log file
try {
    const tmpDir = path.dirname(LOG_FILE);
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
    }
    fs.writeFileSync(LOG_FILE, `=== DEPLOYMENT STARTED AT ${new Date().toISOString()} ===\n`);
} catch (e) {
    console.error('Failed to create log file:', e);
}

// Helper to write to both Console and File
function log(msg) {
    if (typeof msg !== 'string') msg = JSON.stringify(msg, null, 2);
    // Console output for Plesk UI
    console.log(msg);
    // File output for persistent logs
    try {
        fs.appendFileSync(LOG_FILE, msg + '\n');
    } catch (e) { }
}

log("=== DEPLOY SCRIPT (PRE-BUILT STRATEGY) ===");
log(`CWD: ${process.cwd()}`);

try {
    // 1. SETUP PATH for Node 21
    const PLESK_DIRS = ['/opt/plesk/node/21/bin', '/opt/plesk/node/20/bin'];
    const localBin = path.join(process.cwd(), 'node_modules', '.bin');
    process.env.PATH = `${PLESK_DIRS.join(':')}:${localBin}:${process.env.PATH}`;

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

    // 2. CHECK ENVIRONMENT
    run('node -v');

    // 3. INSTALL
    // Fast install, only production deps if possible, but regular install is safer
    log("\n--- INSTALLING DEPS ---");
    run('npm install --no-audit');

    // 4. DATABASE
    log("\n--- DATABASE SETUP ---");
    // Only run if prisma schema changed, but safe to run always
    process.env.PRISMA_CLI_BINARY_TARGETS = 'native,debian-openssl-1.1.x,debian-openssl-3.0.x';
    run('npx prisma generate');
    // Uncomment for auto-migration. Be careful with production data!
    // run('npx prisma db push --accept-data-loss');

    // 5. BUILD (SKIPPED)
    log("\n--- BUILD ---");
    log("Skipping 'next build' because we rely on committed '.next' folder.");

    // Safety check
    const dotNextHash = path.join(process.cwd(), '.next', 'BUILD_ID');
    if (fs.existsSync(dotNextHash)) {
        log("✔ FOUND PRE-BUILT .next FOLDER");
    } else {
        log("⚠ WARNING: .next FOLDER NOT FOUND! SITE MIGHT NOT WORK.");
    }

    // 6. RESTART
    log("\n=== RESTARTING ===");
    const tmp = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    fs.writeFileSync(path.join(tmp, 'restart.txt'), new Date().toISOString());

    log("=== SUCCESS ===");

} catch (e) {
    log("\n!!! DEPLOY FAILED !!!");
    log(e.message);
    process.exit(1);
}

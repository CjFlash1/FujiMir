const { execSync } = require('child_process');

console.log('=== DEBUG: NODE PATH DISCOVERY ===');

try {
    console.log('\n> Listing /opt/plesk/node/ contents:');
    // Using simple ls to see what versions are installed
    execSync('ls -F /opt/plesk/node/', { stdio: 'inherit', encoding: 'utf-8' });
} catch (e) {
    console.error('Failed to list /opt/plesk/node/:', e.message);
}

try {
    console.log('\n> Current "node" path (which node):');
    const which = execSync('which node', { encoding: 'utf-8' });
    console.log(which.trim());
} catch (e) {
    console.error('which node failed:', e.message);
}

try {
    console.log('\n> Current Node Version:');
    console.log(process.version);
    console.log('\n> process.execPath:');
    console.log(process.execPath);
} catch (e) { }


console.log('\n=== END DEBUG ===');
// Exit with error so deployment stops here and doesn't try to build anything
process.exit(1); 

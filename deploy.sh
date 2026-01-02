#!/bin/bash
# Minimal Deploy Script

echo "=== DEPLOY START $(date) ==="

# Force Node 20 (LTS) to avoid uv_resident_set_memory crash in v21
export PATH=/opt/plesk/node/20/bin:/opt/plesk/node/18/bin:$PATH
echo "Using Node (Forced): $(node -v)"

# 1. Install dependencies
echo "--- INSTALLING ---"
npm install --no-audit

# 2. Database (Prisma)
echo "--- PRISMA ---"
# Use npm exec to reliably find the binary
npm exec prisma generate
npm exec prisma db push --accept-data-loss

# 3. Build (CRITICAL STEP)
echo "--- BUILDING ---"
export NODE_OPTIONS="--max-old-space-size=3072"
export NEXT_TELEMETRY_DISABLED=1

# Run build nicely
npm run build

# 4. Restart
echo "--- RESTARTING ---"
mkdir -p tmp
touch tmp/restart.txt

echo "=== SUCCESS ==="

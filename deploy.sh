#!/bin/bash
# deploy.sh v2 - Fix npx and memory issues

LOG_FILE="deploy.log"
DATE_NOW=$(date)
echo "" >> $LOG_FILE
echo "=== Deployment started at $DATE_NOW ===" >> $LOG_FILE

# 1. Force Node 20 (LTS) or 18. Avoid 21.x.
# Plesk paths usually: /opt/plesk/node/20/bin
export PATH=/opt/plesk/node/20/bin:/opt/plesk/node/18/bin:$PATH

echo "Using Node: $(node -v)" >> $LOG_FILE
echo "Using NPM: $(npm -v)" >> $LOG_FILE

# 2. Install dependencies
echo "Installing dependencies..." >> $LOG_FILE
# Install production + dev dependencies (needed for build) without audit to be faster
npm install --legacy-peer-deps --no-audit >> $LOG_FILE 2>&1

# 3. Database Setup (Prisma)
echo "Running Prisma Generate..." >> $LOG_FILE
# Use npm exec to avoid 'npx not found' issues
npm exec prisma generate >> $LOG_FILE 2>&1

echo "Pushing DB Schema..." >> $LOG_FILE
npm exec prisma db push --accept-data-loss >> $LOG_FILE 2>&1

echo "Seeding Database..." >> $LOG_FILE
npm exec prisma db seed >> $LOG_FILE 2>&1

# 4. Build Application
echo "Building application..." >> $LOG_FILE
# Set NODE_OPTIONS to increase memory limit for build
export NODE_OPTIONS="--max-old-space-size=2048"
export NEXT_TELEMETRY_DISABLED=1

# Build (linting disabled in next.config.ts)
npm run build >> $LOG_FILE 2>&1

# 5. Restart
echo "Triggering restart..." >> $LOG_FILE
mkdir -p tmp
touch tmp/restart.txt

echo "=== Deployment Finished ===" >> $LOG_FILE

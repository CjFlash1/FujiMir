#!/bin/bash
# deploy.sh for Plesk Automation

LOG_FILE="deploy.log"
echo "" >> $LOG_FILE
echo "=== Deployment started at $(date) ===" >> $LOG_FILE

# 1. Detect Node.js environment
# Plesk often keeps Node in specific paths. We try common versions.
export PATH=$PATH:/opt/plesk/node/22/bin:/opt/plesk/node/20/bin:/opt/plesk/node/18/bin
export NODE_ENV=production

echo "Checking environment..." >> $LOG_FILE
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm could not be found. PATH is: $PATH" >> $LOG_FILE
    # Try one last fallback explicit call
    NPM_PATH=$(find /opt/plesk/node -name npm | head -n 1)
    if [ -n "$NPM_PATH" ]; then
         echo "Found npm at $NPM_PATH, using alias." >> $LOG_FILE
         alias npm="$NPM_PATH"
         NODE_PATH=$(dirname "$NPM_PATH")/node
         alias node="$NODE_PATH"
    else
         echo "CRITICAL: No npm found." >> $LOG_FILE
         exit 1
    fi
fi

echo "Node version: $(node -v)" >> $LOG_FILE
echo "NPM version: $(npm -v)" >> $LOG_FILE

# 2. Clean install dependencies
# We need devDeps for building Next.js, so strict production flag might be bad for build stage
# But usually on prod we want separate stages. For simplicity here: plain install.
echo "Installing dependencies..." >> $LOG_FILE
npm install --legacy-peer-deps >> $LOG_FILE 2>&1

# 3. Database Setup (Prisma)
echo "Running Prisma Generate..." >> $LOG_FILE
npx prisma generate >> $LOG_FILE 2>&1

echo "Pushing DB Schema..." >> $LOG_FILE
npx prisma db push --accept-data-loss >> $LOG_FILE 2>&1

echo "Seeding Database (Settings/Translations)..." >> $LOG_FILE
# Using npx ts-node to run seed because 'npm run db:setup' might be complex
npx prisma db seed >> $LOG_FILE 2>&1

# 4. Build Application
echo "Building application..." >> $LOG_FILE
npm run build >> $LOG_FILE 2>&1

# 5. Restart Node Application (Passenger/Plesk method)
echo "Triggering restart..." >> $LOG_FILE
mkdir -p tmp
touch tmp/restart.txt

echo "=== Deployment Finished at $(date) ===" >> $LOG_FILE

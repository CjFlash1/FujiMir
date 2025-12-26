#!/bin/sh
set -e

echo "Starting FujiMir..."

# Check if database exists, if not initialize it
if [ ! -f "/app/data/production.db" ]; then
    echo "Database not found, initializing..."
    
    # Run prisma db push to create schema
    npx prisma db push --skip-generate
    
    echo "Database schema created."
    echo "NOTE: Run 'npx tsx prisma/seed.ts' manually to add initial data"
else
    echo "Database found at /app/data/production.db"
fi

# Execute the main command
exec "$@"

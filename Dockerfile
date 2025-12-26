# Base image - Using slim (Debian-based) for Prisma compatibility
FROM node:20-slim AS base

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (schema only for build)
ENV DATABASE_URL="file:./build.db"
RUN npx prisma generate
RUN npx prisma db push

# Build Next.js (needs empty db for static pages)
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Don't run as root
RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

# Create data directory for persistent database
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

# Copy public assets (including logo.png etc)
COPY --from=builder /app/public ./public
# Create uploads dir for persistent storage (will be mounted as volume)
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public

# Copy built app
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma schema, client and seed script for runtime initialization
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma

# Copy startup script
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Database URL - points to volume mount
ENV DATABASE_URL="file:/app/data/production.db"

# Set user
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use entrypoint script to initialize DB if needed
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]

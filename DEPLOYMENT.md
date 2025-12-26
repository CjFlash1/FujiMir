# FujiMir Deployment Guide

## System Requirements

### Minimum Server Requirements

| Parameter | Minimum | Recommended |
|-----------|---------|-------------|
| **RAM** | 512 MB | 1-2 GB |
| **CPU** | 1 core | 2 cores |
| **Disk** | 1 GB | 5-10 GB (for photos) |
| **OS** | Linux/Windows | Ubuntu 20.04+ |

### Software Requirements

| Component | Requirement |
|-----------|-------------|
| **Node.js** | **18.17+** (required) |
| **npm** | 9+ (comes with Node.js) |
| **Database** | SQLite (built-in, zero config) |

### Resource Usage (Production)

| Metric | Value |
|--------|-------|
| RAM on startup | ~150-250 MB |
| RAM under load | ~300-500 MB |
| CPU idle | ~1-3% |
| Build size | ~150 MB (with node_modules) |
| Standalone build | ~50 MB |

---

## Deployment Options

### 🚀 Option 1: Vercel (Recommended)

**Best for:** Quick deployment, zero configuration, automatic scaling

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import this repository

2. **Configure Build**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables** (if needed)
   ```
   DATABASE_URL=file:./dev.db
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel handles everything automatically

**Pros:** Free tier, automatic HTTPS, edge network, zero maintenance
**Cons:** Limited to serverless functions (API routes work fine)

---

### 🚂 Option 2: Railway

**Best for:** Simple deployment with persistent storage

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Create new project from GitHub repo

2. **Configure**
   ```
   Start Command: npm run start
   Build Command: npm run build && npx prisma generate && npx prisma db push
   ```

3. **Add Volume** (for persistent database and uploads)
   - Create a volume mounted at `/app/prisma`
   - Create a volume mounted at `/app/public/uploads`

4. **Deploy**
   - Railway auto-deploys on push

**Pros:** Free tier, persistent volumes, simple setup
**Cons:** Limited free hours per month

---

### 🖥️ Option 3: VPS (DigitalOcean, Hetzner, Vultr)

**Best for:** Full control, cost-effective for high traffic

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install nginx (reverse proxy)
sudo apt install nginx -y
```

#### Step 2: Clone and Build
```bash
# Clone repository
cd /var/www
git clone https://github.com/CjFlash1/FujiMir.git fujimir
cd fujimir

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database
npx tsx prisma/seed.ts

# Build production
npm run build
```

#### Step 3: Start with PM2
```bash
# Start application
pm2 start npm --name "fujimir" -- start

# Save PM2 config
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### Step 4: Nginx Configuration
```nginx
# /etc/nginx/sites-available/fujimir
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
        
        # Increase max upload size for photos
        client_max_body_size 100M;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/fujimir /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

**Pros:** Full control, cheapest long-term, any configuration
**Cons:** Manual maintenance, security updates needed

---

### 🎛️ Option 4: Plesk Hosting

**Best for:** Users with existing Plesk infrastructure

#### Prerequisites
- Plesk with **Node.js extension** installed
- Node.js **18.17+** available
- SSH access (recommended)

#### Step 1: Enable Node.js
1. Plesk → Extensions → Install "Node.js"
2. Verify Node.js version: `node -v` (must be 18.17+)

#### Step 2: Upload Project
**Option A: Git (recommended)**
```bash
# SSH into server
cd ~/httpdocs
git clone https://github.com/CjFlash1/FujiMir.git .
```

**Option B: FTP**
- Upload all project files to `httpdocs` folder

#### Step 3: Configure Node.js in Plesk
1. Go to: Domains → your domain → Node.js
2. Set:
   - **Document Root:** `/httpdocs`
   - **Application Root:** `/httpdocs`
   - **Application Startup File:** `node_modules/next/dist/bin/next` OR create `server.js`
   - **Node.js Version:** 18+ or 20+

#### Step 4: Install and Build (via SSH)
```bash
cd ~/httpdocs

# Install dependencies
npm install

# Generate Prisma
npx prisma generate
npx prisma db push

# Seed database
npx tsx prisma/seed.ts

# Build
npm run build
```

#### Step 5: Create Custom Server (Plesk-friendly)
Create `server.js` in project root:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

#### Step 6: Configure in Plesk
- Set **Application Startup File:** `server.js`
- Click "NPM Install" button
- Click "Restart App"

#### Folder Permissions
```bash
# Make uploads folder writable
chmod 755 public/uploads
chmod 644 prisma/dev.db
```

**Pros:** Uses existing infrastructure, familiar interface
**Cons:** More complex than dedicated Node.js platforms

---

### 🐳 Option 5: Docker

**Best for:** Consistent environments, container orchestration

#### Dockerfile
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  fujimir:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./prisma/dev.db:/app/prisma/dev.db
      - ./public/uploads:/app/public/uploads
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Build and Run
```bash
# Build image
docker build -t fujimir .

# Run container
docker run -d -p 3000:3000 \
  -v $(pwd)/prisma:/app/prisma \
  -v $(pwd)/public/uploads:/app/public/uploads \
  fujimir
```

**Pros:** Portable, consistent, easy scaling
**Cons:** Docker knowledge required, slightly more resources

---

## Post-Deployment Checklist

- [ ] Application starts without errors
- [ ] Database is seeded (`npx tsx prisma/seed.ts`)
- [ ] Uploads folder is writable
- [ ] HTTPS is configured
- [ ] Domain is pointing correctly
- [ ] File upload works (test with photo)
- [ ] Nova Poshta API works (test city search)
- [ ] Admin panel accessible (`/fujiadmin`)

## Backup Strategy

### Database
```bash
# SQLite backup (simple file copy)
cp prisma/dev.db prisma/backup-$(date +%Y%m%d).db
```

### Uploads
```bash
# Compress uploads folder
tar -czvf uploads-backup-$(date +%Y%m%d).tar.gz public/uploads/
```

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Database errors
```bash
npx prisma generate
npx prisma db push --force-reset
npx tsx prisma/seed.ts
```

### Permission errors
```bash
chmod -R 755 public/uploads
chmod 644 prisma/dev.db
```

### Port already in use
```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

---

## Support

For issues with deployment, please open an issue on GitHub.

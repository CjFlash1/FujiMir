# Railway Deployment Configuration

This file contains instructions for proper Railway deployment with persistent data.

## Required Configuration

### 1. Create Volumes (CRITICAL!)

In Railway Dashboard:
1. Go to your service
2. Click "Settings" → "Volumes"
3. Create TWO volumes:

| Mount Path | Name | Purpose |
|------------|------|---------|
| `/app/data` | `data-volume` | Database storage |
| `/app/public/uploads` | `uploads-volume` | User uploaded photos |

### 2. Environment Variables

Set these in Railway → Variables:

```
DATABASE_URL=file:/app/data/production.db
NODE_ENV=production
```

### 3. First-time Setup

After deploying with volumes, run in Railway Shell:
```bash
# Create database and seed initial data
npx prisma db push
npx tsx prisma/seed.ts
```

## Why This is Needed

- Railway containers are **ephemeral** - files inside are deleted on redeploy
- Volumes persist data between deployments
- Database and uploads MUST be stored in volumes

## Troubleshooting

### Orders Disappear After Deploy
- Ensure `/app/data` volume is mounted
- Check DATABASE_URL points to volume path

### Photos Not Showing
- Ensure `/app/public/uploads` volume is mounted
- Check file permissions

### Gift Threshold Not Working
- Run seed after volume setup: `npx tsx prisma/seed.ts`
- Or create in admin panel: `/fujiadmin/config/sizes`

# Deploying Fujimir Modern to Plesk

This document outlines the deployment process for the Fujimir Next.js application on Plesk.

## 1. Prerequisites

*   **Plesk Obsidian** with Node.js extension installed.
*   **Node.js 20 or 21** active on the domain.
*   **Git** repository connected via Plesk Git.
*   **MySQL/MariaDB** database created in Plesk.

## 2. Directory Structure

The critical paths on the server are:
*   Root: `/var/www/vhosts/fujimir.com.ua/test.fujimir.com.ua` (or similar)
*   Uploads: `public/uploads` (Must include `thumb` and `temp` subfolders with 777 permissions).
*   Env: `.env` file must exist in the root with `DATABASE_URL` and `NEXTAUTH_SECRET`.

## 3. The `deploy.js` Script

We use a custom `deploy.js` script instead of standard "Additional deployment actions" commands because it offers:
*   **Error Handling:** It catches errors (like corrupted `node_modules`) and attempts to fix them automatically.
*   **Path Management:** It explicitly sets the PATH to include the correct Node.js binaries (Plesk often confuses paths).
*   **Database Setup:** It runs `prisma generate` automatically.
*   **Storage Setup:** It creates missing upload folders and fixes permissions.
*   **Data Seeding:** It can run seed scripts (like translation fixes) if needed.

### How it is triggered
In Plesk -> Git -> **Repository Settings** -> **Additional deployment actions**:
```bash
/opt/plesk/node/21/bin/node deploy.js
```
*(Ensure the path to `node` matches your selected version).*

## 4. Manual Actions (When needed)

### Build
Currently, `deploy.js` installs dependencies but **does not build** the Next.js app to avoid memory crashes on small VPS instances. You must build manually after major code changes:

1.  Connect via SSH (or use "Run Script" in Plesk if supported and simple).
2.  Run:
    ```bash
    npm run build
    ```
    *Note: If build fails with memory error, try:* `NODE_OPTIONS='--max-old-space-size=4096' npm run build`

### Fixing Translations
If translations are missing in the Admin Panel:
1.  Ensure `src/scripts/seed-missing-translations.ts` exists.
2.  The `deploy.js` script tries to run this automatically.
3.  If it fails, run manually:
    ```bash
    npx ts-node --compiler-options '{"module":"CommonJS"}' src/scripts/seed-missing-translations.ts
    ```

## 5. Troubleshooting Common Issues

*   **Uploads not working:** Check permissions on `public/uploads`. They must be writable by the app. Check Nginx "Client Max Body Size" setting (set to 100M+).
*   **Prisma Errors:** Ensure `DATABASE_URL` is correct in `.env`. Run `npx prisma generate`.
*   **"crypto.randomUUID is not a function":** You are accessing the site via HTTP. Switch to **HTTPS**.


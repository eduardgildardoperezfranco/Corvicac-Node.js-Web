
# Production Deployment Guide for Hostinger

This guide provides a comprehensive set of instructions for deploying and managing the Corvicac web application in a production environment on Hostinger. It covers environment setup, security, performance, and maintenance best practices.

---

## 1. Initial Server Setup

These steps are required only for the first deployment.

### 1.1. Connect via SSH
Connect to your Hostinger account via SSH. All subsequent commands should be run on the server unless specified otherwise.

### 1.2. Clone the Repository
```bash
git clone <YOUR_GIT_REPOSITORY_URL> corvicac-web
cd corvicac-web
```

### 1.3. Install Node.js and PM2
Hostinger may not have the required Node.js version. Use `nvm` (Node Version Manager) to install and manage Node.js versions.

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node.js v18
nvm install 18
nvm use 18

# Install PM2 globally
npm install -g pm2
```

---

## 2. Environment Configuration

A crucial step for production is to configure your environment variables securely.

### 2.1. Create the `.env` file
On the server, create a file named `.env` in the root of your project. **Do not** name it `.env.production`, as our setup now uses a single `.env` file loaded by the application at runtime.

```bash
touch .env
```

### 2.2. Populate `.env` file
Paste the following content into the `.env` file. **You must replace the placeholder values** with your actual production secrets.

```ini
#----------------------------------------------------------------#
#           *** PRODUCTION ENVIRONMENT VARIABLES ***             #
#----------------------------------------------------------------#

# 1. Node.js Environment
# Sets the environment to production. This is critical for performance and security.
NODE_ENV=production

# 2. Server Configuration
# The port your application will run on. Hostinger provides this.
# Check your Hostinger panel for the assigned Node.js application port.
PORT=<HOSTINGER_PROVIDED_PORT>

# The host to bind the server to. 0.0.0.0 makes it accessible from outside the container/VM.
HOST=0.0.0.0

# 3. Security Configuration
# The allowed origin for Cross-Origin Resource Sharing (CORS).
# For production, this should be your public domain name.
CORS_ORIGIN=https://www.corvicac.org

# A strong, random string used for signing sessions and cookies.
# Generate one using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
SESSION_SECRET=<REPLACE_WITH_A_STRONG_RANDOM_SECRET>

# 4. Public Application URLs and APIs
# The base URL of your website.
NEXT_PUBLIC_BASE_URL=https://www.corvicac.org
NEXT_PUBLIC_API_URL=https://api.corvicac.org

# 5. Contact and Sponsorship
# Contact information for sponsorship and WhatsApp.
NEXT_PUBLIC_WHATSAPP_PHONE=<YOUR_WHATSAPP_NUMBER>
SPONSORSHIP_EMAIL=<YOUR_SPONSORSHIP_EMAIL>

# 6. Email Provider Configuration
# Fill in the details for your chosen email provider (e.g., SendGrid, Mailgun, or SMTP).
# ONLY ONE of these sections should be filled out.
#
# --- SendGrid ---
# SENDGRID_API_KEY=<YOUR_SENDGRID_API_KEY>
#
# --- Mailgun ---
# MAILGUN_API_KEY=<YOUR_MAILGUN_API_KEY>
# MAILGUN_DOMAIN=<YOUR_MAILGUN_DOMAIN>
#
# --- Generic SMTP ---
# SMTP_HOST=<YOUR_SMTP_HOST>
# SMTP_PORT=<YOUR_SMTP_PORT>
# SMTP_USER=<YOUR_SMTP_USER>
# SMTP_PASS=<YOUR_SMTP_PASSWORD>

# 7. Analytics and Site Verification (Optional)
# IDs for analytics services and search engine verification.
NEXT_PUBLIC_GA_ID=<YOUR_GOOGLE_ANALYTICS_ID>
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_HOTJAR_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_YANDEX_SITE_VERIFICATION=

# 8. Feature Flags
# Enable or disable specific features of the application.
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
NEXT_PUBLIC_NEWS_ENABLED=true
NEXT_PUBLIC_GALLERY_ENABLED=true
NEXT_PUBLIC_EVENTS_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true
```

---

## 3. Deployment Workflow

Follow these steps each time you deploy a new version.

### 3.1. Pull Latest Code
```bash
cd ~/corvicac-web
git pull origin main # Or your primary branch
```

### 3.2. Install/Update Dependencies
Use `npm ci` for faster, more reliable installs of exact versions from `package-lock.json`.

```bash
npm ci --only=production
```

### 3.3. Build the Application
This command compiles the Next.js application for production.

```bash
npm run build
```

### 3.4. Start or Reload the Application with PM2
We use the `ecosystem.config.js` file to manage the application, which provides more control over logging, restarts, and environment variables.

**If this is the first time deploying:**
```bash
pm2 start ecosystem.config.js
```

**To update an existing deployment:**
```bash
pm2 reload ecosystem.config.js
```

### 3.5. Save the PM2 Process List
This ensures that your application will automatically restart if the server reboots.
```bash
pm2 save
```

---

## 4. Production Best Practices

### Security
- **Helmet**: Automatically applies security-related HTTP headers to protect against common attacks like XSS and clickjacking.
- **CORS**: The `CORS_ORIGIN` environment variable ensures that only your frontend application can make requests to your API routes.
- **Environment Variables**: All secrets are stored in the `.env` file, which is included in `.gitignore` and should never be committed to source control.

### Performance
- **Compression**: Gzip compression is enabled to reduce the size of responses and speed up load times.
- **Caching**: `next.config.js` is configured with a long cache TTL for static assets.
- **PM2 Clustering**: For multi-core servers, you can run the application in cluster mode by editing `ecosystem.config.js` and changing `instances: 1` to `instances: 'max'`. This is an advanced feature and depends on your Hostinger plan.

### Logging and Monitoring
- **PM2 Logs**: Logs are now stored in the `logs/` directory within your project folder. You can view them with:
  ```bash
  pm2 logs corvicac-web
  ```
- **Health Check**: The application has a health check endpoint at `/api/health`. PM2 uses this to ensure your application is running correctly.
- **Hostinger Monitoring**: Use the tools provided in your Hostinger dashboard to monitor CPU and memory usage.

### Backups
- **File Backups**: Regularly back up your project files, including the `.env` file, using Hostinger's backup manager.
- **Database Backups**: If you add a database, ensure you have a separate, regular backup schedule for it.

### Asset Management
- **Accessibility Tools & Forms**: These are part of the Next.js application and are automatically bundled during the `npm run build` process.
- **Routing & Redirection**: The `middleware.ts` file handles language-based routing. Any changes to routing logic should be made there.

---

## 5. Rollback Plan

If a deployment fails, follow these steps to revert to the previous version:

1.  **Check out the previous commit:**
    ```bash
    cd ~/corvicac-web
    git log # Find the hash of the last working commit
    git checkout <COMMIT_HASH>
    ```
2.  **Re-install and re-build:**
    ```bash
    npm ci --only=production
    npm run build
    ```
3.  **Restart the application:**
    ```bash
    pm2 reload ecosystem.config.js
    ```

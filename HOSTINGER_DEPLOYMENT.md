
# Hostinger SSH Deployment Guide

This guide provides the exact steps to deploy the Corvicac web application on Hostinger using SSH.

---

## 1. Initial Server Setup

These commands only need to be run once.

### 1.1. Clone the Repository
```bash
git clone <YOUR_GIT_REPOSITORY_URL> corvicac-web
cd corvicac-web
```

### 1.2. Install Node.js Version Manager (nvm)
Hostinger might not have the required Node.js version. Use `nvm` to install and use Node.js 18.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install 18
nvm use 18
```

### 1.3. Create Production Environment File
Create a `.env.production` file in the root of the project.
```bash
touch .env.production
```
Now, paste the following content into the file, replacing the placeholder values with your actual production secrets.

```ini
# Basic Configuration
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.corvicac.org

# Secure Contact
NEXT_PUBLIC_WHATSAPP_PHONE=<YOUR_WHATSAPP_NUMBER>
SPONSORSHIP_EMAIL=<YOUR_SPONSORSHIP_EMAIL>

# Features
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
NEXT_PUBLIC_NEWS_ENABLED=true
NEXT_PUBLIC_GALLERY_ENABLED=true
NEXT_PUBLIC_EVENTS_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true

# Analytics (OPTIONAL - can be empty)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_HOTJAR_ID=

# Search engine verification (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
NEXT_PUBLIC_YANDEX_SITE_VERIFICATION=

# The port your application will run on. Hostinger will provide this.
PORT=<HOSTINGER_PROVIDED_PORT>
```

---

## 2. Deployment Workflow

Follow these steps every time you want to deploy a new version of the application.

### 2.1. Pull Latest Code
```bash
cd ~/corvicac-web
git pull origin main # Or your main branch
```

### 2.2. Install Dependencies
```bash
npm install
```

### 2.3. Build the Application
```bash
npm run build
```

### 2.4. Start the Application with PM2
PM2 is a process manager that will keep your application running.

**If this is the first time you are deploying, start the application with:**
```bash
npm install -g pm2
cd .next/standalone
PORT=$PORT pm2 start server.js --name "corvicac-web"
```

**To update the application if it's already running with PM2:**
```bash
pm2 restart corvicac-web
```

---

## 3. Deployment Validation Checklist

- [ ] **Check Application URL**: Open your website URL in a browser and ensure it loads without errors.
- [ ] **Check for Console Errors**: Open the browser's developer tools and check the console for any errors.
- [ ] **Test Key Features**:
    - [ ] Navigation links
    - [ ] Forms (e.g., contact, sponsorship)
    - [ ] Interactive elements
- [ ] **Check PM2 Status**: Run `pm2 status` on the server to ensure the `corvicac-web` process is `online`.

---

## 4. Rollback Plan

If the deployment fails, you can quickly revert to the previous working version using Git.

### 4.1. Revert to Previous Commit
```bash
cd ~/corvicac-web
git log # Find the commit hash of the previous working version
git checkout <COMMIT_HASH>
```

### 4.2. Re-install and Re-build
```bash
npm install
npm run build
```

### 4.3. Restart Application
```bash
pm2 restart corvicac-web
```

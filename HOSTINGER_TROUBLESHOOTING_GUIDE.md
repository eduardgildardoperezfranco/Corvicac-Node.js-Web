# CORVICAC Web - Complete Hostinger Deployment Troubleshooting Guide

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Hostinger Target Architecture Analysis](#hostinger-target-architecture-analysis)
3. [Failure Matrix: Common Deployment Errors](#failure-matrix-common-deployment-errors)
4. [Step-by-Step Troubleshooting Runbook](#step-by-step-troubleshooting-runbook)
5. [Hardened Reference Configuration](#hardened-reference-configuration)
6. [Environment Variables Reference](#environment-variables-reference)
7. [Verification Checklist](#verification-checklist)

---

## Executive Summary

This document provides a comprehensive, step-by-step troubleshooting guide for deploying the CORVICAC Next.js web application on Hostinger. Based on the repository analysis, the project is configured for **Next.js 14.2.35** with **standalone output mode**, requiring **Node.js 18.x** and **npm 8.x+**.

### Current Repository Configuration Status
- ✅ `output: 'standalone'` configured in `next.config.js`
- ✅ Node.js 18+ requirement specified in `package.json` engines
- ✅ Multiple build scripts available (`build-for-hostinger.sh`, `compress-for-hostinger.sh`)
- ✅ Dockerfile and nginx.conf provided for containerized/VPS deployments
- ✅ Environment variables centralized in `src/lib/constants.ts`
- ⚠️ Inconsistent documentation across multiple `.md` files
- ⚠️ `next.config.ts` reference in scripts but actual file is `next.config.js`

---

## Hostinger Target Architecture Analysis

### Deployment Target Options

| Target Type | Node.js Access | Build Process | Startup Command | Recommended |
|-------------|----------------|---------------|-----------------|-------------|
| **Shared Hosting** | Limited (Node.js Selector) | Local only | `npm start` | ⚠️ Partial support |
| **Cloud Hosting** | Full SSH | Server build | `npm start` | ✅ Recommended |
| **VPS (KVM)** | Full root | Full control | PM2/systemd | ✅ Full support |

### Recommended Architecture for CORVICAC

```
┌─────────────────────────────────────────────────────────────────┐
│                        Hostinger VPS                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Nginx Reverse Proxy                      │  │
│  │  (Ports 80/443) → localhost:3000 (Next.js standalone)     │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    PM2 Process Manager                      │  │
│  │  - Auto-restart on crash                                   │  │
│  │  - Zero-downtime reload                                    │  │
│  │  - Logs management                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │               Next.js Standalone Build                      │  │
│  │  - server.js (Node.js server)                              │  │
│  │  - .next/static/ (Static assets)                           │  │
│  │  - public/ (Public files)                                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Failure Matrix: Common Deployment Errors

### 1. Node.js Version Mismatch Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `npm warn EBADENGINE Unsupported engine { package: 'next@14.2.35', required: { node: '>=18.0.0' }, current: { node: 'v16.x.x' } }` | Server Node.js version < 18 | Upgrade to Node.js 18+ via Hostinger Node.js Selector or SSH |
| `Error: Cannot find module 'next'` | Missing dependencies or wrong Node version | Run `npm install` with correct Node version |
| `RangeError: Maximum call stack size exceeded` | Node version too old | Upgrade to Node.js 18.x minimum |

### 2. Build Artifact Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `sh: line 1: /home/.../node_modules/.bin/next: Permission denied` | Missing execute permission on Next.js binary | Run `chmod +x node_modules/.bin/next` |
| `Error: Could not find required file: /app/server.js` | Standalone build incomplete | Verify `output: 'standalone'` in next.config.js |
| `.next/standalone/server.js not found` | Build failed silently | Check build output for TypeScript/ESLint errors |
| `Module not found: Can't resolve 'sharp'` | Native dependency missing | Install `sharp` globally or use Dockerfile |

### 3. Port and Binding Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `EADDRINUSE: Address already in use :::3000` | Port 3000 already in use | Kill existing process: `lsof -ti:3000 \| xargs kill -9` |
| `Error: listen EACCES: permission denied to port 80` | Non-root cannot bind to privileged ports | Use Nginx reverse proxy or run with `sudo` (not recommended) |
| `process.env.PORT undefined` | PORT env var not set | Set `PORT=3000` in environment or use default |

### 4. Environment Variable Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `process.env.NEXT_PUBLIC_* is undefined` | Env var not loaded at build time | Add to Hostinger Node.js environment settings |
| `SPONSORSHIP_EMAIL not found` | Server-side env var missing | Create `.env.production` or set in panel |
| `ValidationError: Invalid email format` | Default fallback values missing in constants | Check `src/lib/constants.ts` validation functions |

### 5. File Permission Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `EACCES: permission denied, open '/app/data/sponsorships/...'` | Data directory not writable | Run `chmod -R 755 data/` or create with proper permissions |
| `ENOENT: no such file or directory 'public/'` | Missing public files in deployment | Ensure public/ folder is uploaded |

### 6. Native Module Compilation Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `gyp ERR! find Python Python is not installed` | Sharp native compilation requires Python | Use prebuilt binaries: `npm install --prefer-offline` |
| `Error: The module '/app/node_modules/sharp...' was compiled against a different Node.js version` | Node.js version mismatch | Rebuild with correct Node version: `npm rebuild sharp` |

### 7. Next.js Specific Errors

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Error: > Build failed because `typescript` compiled with 1 errors` | TypeScript type errors | Fix type errors before building |
| `Error: > Build failed because `eslint` found 1 error` | ESLint errors | Run `npm run lint:fix` locally |
| `Error: Cannot read properties of undefined (reading 'length')` | Invalid data in getStaticPaths | Check dynamic route parameters |

---

## Step-by-Step Troubleshooting Runbook

### Phase 1: Local Build Verification

#### Step 1.1: Verify Local Environment
```bash
# Check Node.js version
node --version  # Must be >= 18.0.0

# Check npm version
npm --version   # Must be >= 8.0.0

# Check available memory (minimum 2GB recommended)
free -h         # Linux
wmic OS Get TotalVisibleMemorySize /Format:table  # Windows
```

#### Step 1.2: Clean and Rebuild
```bash
# Remove old build artifacts
rm -rf .next
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm ci

# Run build
npm run build
```

#### Step 1.3: Verify Standalone Build Output
```bash
# Check standalone server exists
ls -la .next/standalone/

# Expected output:
# server.js
# package.json (if needed)

# Check static files copied
ls -la .next/static/

# Verify public files
ls -la public/
```

#### Step 1.4: Test Production Build Locally
```bash
# Set environment
export NODE_ENV=production
export PORT=3000

# Start server
node .next/standalone/server.js

# In another terminal, test
curl http://localhost:3000/api/health

# Expected response:
# {"status":"ok","timestamp":"...","uptime":...,"version":"...","environment":"production"}
```

### Phase 2: Server Setup

#### Step 2.1: Connect via SSH
```bash
# Connect to Hostinger VPS
ssh username@your-server-ip

# Navigate to application directory
cd /home/username/domains/corvicac.org/public_html/
```

#### Step 2.2: Verify Server Node.js Version
```bash
# Check current Node version
node --version

# If < 18, install nvm and Node.js 18
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Verify
node --version  # Should show 18.x.x
```

#### Step 2.3: Create Production Environment File
```bash
# Create .env.production
cat > .env.production << 'EOF'
NODE_ENV=production
PORT=3000

# API Configuration
NEXT_PUBLIC_API_URL=https://api.corvicac.org

# Feature Flags
NEXT_PUBLIC_DONATIONS_ENABLED=true
NEXT_PUBLIC_VOLUNTEERS_ENABLED=true
NEXT_PUBLIC_NEWS_ENABLED=true
NEXT_PUBLIC_GALLERY_ENABLED=true
NEXT_PUBLIC_EVENTS_ENABLED=true
NEXT_PUBLIC_BLOG_ENABLED=true

# Contact Configuration
NEXT_PUBLIC_WHATSAPP_PHONE=+573209610147
SPONSORSHIP_EMAIL=donaciones@corvicac.org

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_HOTJAR_ID=

# SEO Verification (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
EOF

# Set secure permissions
chmod 600 .env.production
```

#### Step 2.4: Install PM2 Process Manager
```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version

# Create PM2 ecosystem file
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'corvicac-web',
    script: 'server.js',
    cwd: '/home/username/domains/corvicac.org/public_html',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '500M',
  }]
};
EOF

# Create logs directory
mkdir -p logs

# Set permissions
chmod +x ecosystem.config.js
```

### Phase 3: Deployment

#### Step 3.1: Upload Files
```bash
# Method 1: Using build script on server
# Upload source code only (exclude .next, node_modules)
zip -r corvicac-source.zip \
  package.json package-lock.json \
  next.config.js \
  src/ public/ \
  --exclude "node_modules/*" --exclude ".git/*"

# Upload to server via SCP
scp corvicac-source.zip username@your-server-ip:/home/username/

# SSH into server and unzip
ssh username@your-server-ip
cd /home/username/domains/corvicac.org/public_html
unzip corvicac-source.zip
```

#### Step 3.2: Install Dependencies on Server
```bash
# Install production dependencies only
npm ci --only=production

# If sharp fails, try
npm install --prefer-offline --no-audit
```

#### Step 3.3: Build on Server (Alternative)
```bash
# If building on server
npm run build
```

#### Step 3.4: Start Application with PM2
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs corvicac-web --lines 100

# Save PM2 process list
pm2 save

# Setup PM2 startup script
pm2 startup
```

### Phase 4: Nginx Configuration

#### Step 4.1: Create Nginx Configuration
```bash
# Create nginx config file
sudo nano /etc/nginx/sites-available/corvicac
```

```nginx
server {
    listen 80;
    server_name corvicac.org www.corvicac.org;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name corvicac.org www.corvicac.org;

    # SSL Configuration (use Hostinger auto-SSL)
    ssl_certificate /etc/letsencrypt/live/corvicac.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/corvicac.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript 
               application/json application/javascript 
               application/xml+rss application/atom+xml image/svg+xml;

    # API Routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
        proxy_connect_timeout 90s;
    }

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
        proxy_connect_timeout 90s;
    }

    # Health check endpoint
    location /_health {
        proxy_pass http://localhost:3000/_health;
        access_log off;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
}
```

#### Step 4.2: Enable Nginx Configuration
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/corvicac /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Enable nginx on boot
sudo systemctl enable nginx
```

### Phase 5: Runtime Verification

#### Step 5.1: Check Application Health
```bash
# Check PM2 status
pm2 status

# Check logs for errors
pm2 logs corvicac-web --lines 50 --nostream

# Test health endpoint
curl http://localhost:3000/_health

# Expected output:
# {"status":"ok","timestamp":"...","uptime":...,"version":"1.0.0","environment":"production"}
```

#### Step 5.2: Test External Access
```bash
# Test from external network
curl -I https://corvicac.org

# Expected: HTTP 200 or 301 (redirect)
# Check headers
curl -I https://corvicac.org | grep -i "x-frame-options\|x-content-type\|strict-transport"

# Expected security headers:
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
# Strict-Transport-Security: max-age=31536000
```

#### Step 5.3: Monitor Performance
```bash
# Check PM2 monit
pm2 monit

# Check memory usage
pm2 describe corvicac-web

# Restart if needed
pm2 restart corvicac-web

# View detailed logs
pm2 logs corvicac-web --lines 200
```

---

## Hardened Reference Configuration

### package.json (Production Optimized)
```json
{
  "name": "corvicac-web",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "NODE_ENV=production next build",
    "start": "NODE_ENV=production node server.js",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "pm2:start": "pm2 start ecosystem.config.js",
    "pm2:stop": "pm2 stop corvicac-web",
    "pm2:restart": "pm2 restart corvicac-web",
    "pm2:logs": "pm2 logs corvicac-web"
  },
  "dependencies": {
    "next": "14.2.35",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-icons": "^5.2.1",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

### next.config.js (Hardened)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production output
  output: 'standalone',
  
  // Disable dev features for production
  reactStrictMode: true,
  
  // TypeScript (fail build on errors)
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint (ignore during build)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization (unoptimized for static hosting)
  images: {
    unoptimized: true,
    domains: ['corvicac.org', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'corvicac.org',
        port: '',
        pathname: '/images/**',
      },
    ],
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // Remove console in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features disabled for stability
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
```

### ecosystem.config.js (PM2 Production)
```javascript
module.exports = {
  apps: [{
    name: 'corvicac-web',
    script: './.next/standalone/server.js',
    cwd: '/home/username/domains/corvicac.org/public_html',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    restart_delay: 1000,
    max_restarts: 10,
    min_uptime: 5000,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      NODE_OPTIONS: '--max-old-space-size=512',
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    merge_logs: true,
    max_memory_restart: '400M',
  }]
};
```

### systemd Service (Alternative to PM2)
```ini
# /etc/systemd/system/corvicac-web.service
[Unit]
Description=CORVICAC Web Application
After=network.target
Wants=network.target

[Service]
Type=simple
User=username
WorkingDirectory=/home/username/domains/corvicac.org/public_html
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/home/username/domains/corvicac.org/public_html/.env.production

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/home/username/domains/corvicac.org/public_html/data
PrivateTmp=true

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=corvicac-web

[Install]
WantedBy=multi-user.target
```

---

## Environment Variables Reference

### Required Variables

| Variable | Type | Required | Description | Default |
|----------|------|----------|-------------|---------|
| `NODE_ENV` | string | Yes | Environment mode | `production` |
| `PORT` | number | No | Server port | `3000` |
| `NEXT_PUBLIC_API_URL` | URL | Yes | API endpoint | `https://api.corvicac.org` |
| `SPONSORSHIP_EMAIL` | email | Yes | Sponsorship form recipient | `corvicac@corvicac.org` |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | phone | Yes | WhatsApp contact number | `+573209610147` |

### Feature Flag Variables

| Variable | Type | Required | Description | Default |
|----------|------|----------|-------------|---------|
| `NEXT_PUBLIC_DONATIONS_ENABLED` | boolean | No | Enable donations feature | `true` |
| `NEXT_PUBLIC_VOLUNTEERS_ENABLED` | boolean | No | Enable volunteers feature | `true` |
| `NEXT_PUBLIC_NEWS_ENABLED` | boolean | No | Enable news feature | `true` |
| `NEXT_PUBLIC_GALLERY_ENABLED` | boolean | No | Enable gallery feature | `true` |
| `NEXT_PUBLIC_EVENTS_ENABLED` | boolean | No | Enable events feature | `true` |
| `NEXT_PUBLIC_BLOG_ENABLED` | boolean | No | Enable blog feature | `true` |

### Optional Variables

| Variable | Type | Required | Description | Default |
|----------|------|----------|-------------|---------|
| `NEXT_PUBLIC_GA_ID` | string | No | Google Analytics measurement ID | `` |
| `NEXT_PUBLIC_FB_PIXEL_ID` | string | No | Facebook Pixel ID | `` |
| `NEXT_PUBLIC_HOTJAR_ID` | string | No | Hotjar site ID | `` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | string | No | Google site verification code | `` |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | string | No | Bing site verification code | `` |

---

## Verification Checklist

### Pre-Deployment Checklist
- [ ] Node.js 18+ installed on local machine
- [ ] npm 8+ installed
- [ ] `npm run build` completes successfully locally
- [ ] Standalone build output exists (`.next/standalone/server.js`)
- [ ] No TypeScript or ESLint errors
- [ ] Environment variables documented
- [ ] Backup of current deployment (if exists)

### Server Setup Checklist
- [ ] SSH access configured
- [ ] Node.js 18+ installed on server
- [ ] npm 8+ installed
- [ ] PM2 installed globally
- [ ] Nginx installed and configured
- [ ] SSL certificate obtained (Let's Encrypt or Hostinger)
- [ ] `.env.production` file created with all required variables
- [ ] `ecosystem.config.js` created

### Deployment Checklist
- [ ] Source files uploaded to server
- [ ] `npm ci --only=production` completed successfully
- [ ] Build artifacts present
- [ ] PM2 process started
- [ ] Application responding on localhost:3000
- [ ] Nginx configuration tested and reloaded
- [ ] Domain DNS pointing to server

### Post-Deployment Verification
- [ ] `curl https://corvicac.org/_health` returns healthy status
- [ ] `curl -I https://corvicac.org` returns 200 OK
- [ ] Security headers present in response
- [ ] Main pages load correctly
- [ ] API endpoints functional
- [ ] PM2 process monitoring active
- [ ] Logs clean (no errors)
- [ ] SSL certificate valid

### Monitoring Setup
- [ ] PM2 logs rotating correctly
- [ ] Nginx access logs enabled
- [ ] Error monitoring configured
- [ ] Uptime monitoring active (external service)
- [ ] SSL certificate auto-renewal configured

---

## Quick Commands Reference

### Common Operations
```bash
# Deploy new version
git pull origin main
npm ci --only=production
npm run build
pm2 restart corvicac-web

# Check status
pm2 status
pm2 monit
pm2 logs corvicac-web --lines 50

# Rollback
pm2 resurrect  # Restore last saved state
pm2 show corvicac-web  # View details

# View logs
pm2 logs corvicac-web --nostream
tail -f logs/combined.log

# Restart
pm2 restart corvicac-web

# Stop
pm2 stop corvicac-web

# Delete
pm2 delete corvicac-web
```

### Troubleshooting Commands
```bash
# Check Node.js version
node --version && npm --version

# Check port usage
lsof -i :3000
netstat -tulpn | grep :3000

# Check process
ps aux | grep node
ps aux | grep "server.js"

# Check memory
free -m
pm2 describe corvicac-web

# Check disk space
df -h
du -sh .next/

# Check logs
tail -n 100 logs/err.log
journalctl -u corvicac-web -n 100

# Test health
curl http://localhost:3000/_health
curl http://localhost:3000/api/health

# Test from external
curl -I https://corvicac.org
curl https://corvicac.org/api/health
```

---

## Document Version
- **Version:** 1.0.0
- **Created:** 2026-01-06
- **Last Updated:** 2026-01-06
- **Repository:** CORVICAC Node.js Web
- **Next.js Version:** 14.2.35
- **Node.js Requirement:** 18.x+

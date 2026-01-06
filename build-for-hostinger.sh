#!/bin/bash
# build-for-hostinger.sh
# Build script optimized for Hostinger deployment

set -e  # Exit on error

echo "🚀 Starting optimized build for Hostinger..."
echo "📦 Project: CORVICAC Web"
echo "📅 Date: $(date)"
echo ""

# Colors for output
GREEN='[0;32m'
YELLOW='[1;33m'
RED='[0;31m'
NC='[0m' # No Color

# Function to show status messages
show_status() {
    echo -e "${GREEN}✓${NC} $1"
}

show_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

show_error() {
    echo -e "${RED}✗${NC} $1"
}

# 1. Clean previous build
echo "🧹 Cleaning previous build..."
if [ -d ".next" ]; then
    rm -rf .next
    show_status ".next/ directory removed"
fi

# 2. Install dependencies
echo ""
echo "📦 Installing dependencies..."
if npm ci; then
    show_status "Dependencies installed successfully"
else
    show_error "Failed to install dependencies"
    exit 1
fi

# 3. Fix permissions for Next.js binary
echo ""
echo "🔧 Fixing permissions for Next.js binary..."
chmod +x node_modules/.bin/next
show_status "Next.js binary permissions fixed"

# 4. Build the application
echo ""
echo "🔨 Building the application..."
if npm run build; then
    show_status "Application built successfully"
else
    show_error "Build failed"
    exit 1
fi

# 5. Create a standalone package for Hostinger
echo ""
echo "📦 Creating standalone package for Hostinger..."

# Create a temporary directory for the package
mkdir -p hostinger-package

# Copy necessary files
cp -r .next/standalone hostinger-package/
cp -r .next/static hostinger-package/.next/
cp -r public hostinger-package/
cp package.json hostinger-package/
cp next.config.js hostinger-package/

# Create a startup script
cat > hostinger-package/start.sh << 'EOF'
#!/bin/bash
# Start script for Hostinger

# Set environment variables
export NODE_ENV=production

# Start the application
node server.js
EOF

chmod +x hostinger-package/start.sh

# Create a package.json for the standalone build
cat > hostinger-package/package.json << 'EOF'
{
  "name": "corvicac-web-standalone",
  "version": "1.0.0",
  "description": "CORVICAC Web Standalone Build for Hostinger",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "start:prod": "NODE_ENV=production node server.js"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
EOF

show_status "Standalone package created"

# 6. Create a zip file for upload
echo ""
echo "📦 Creating zip file for upload..."
cd hostinger-package
zip -r ../corvicac-hostinger-$(date +%Y%m%d-%H%M%S).zip .
cd ..
show_status "Zip file created"

# 7. Clean up temporary files
echo ""
echo "🧹 Cleaning up temporary files..."
rm -rf hostinger-package
show_status "Temporary files cleaned up"

echo ""
echo "✅ Build completed successfully!"
echo "📁 Zip file ready for upload to Hostinger"
echo "📅 Completed: $(date)"
echo ""
echo "🚀 Ready for deployment on Hostinger!"

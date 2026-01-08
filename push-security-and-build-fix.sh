#!/bin/bash

echo "🚀 Starting the push, security, and build fix script..."

# Exit immediately if a command exits with a non-zero status.
set -e

# 1. Linting
echo "🔍 Running linter..."
npm run lint

# 2. Security Audit
echo "🛡️ Running security audit..."
npm audit

# 3. Build
echo "📦 Running production build..."
npm run build

# 4. Git Push
echo "📤 Pushing to git..."
git push

echo "✅ All done!"

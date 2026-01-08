@echo off

echo 🚀 Starting the push, security, and build fix script...

REM 1. Linting
echo 🔍 Running linter...
npm run lint
if %errorlevel% neq 0 exit /b %errorlevel%

REM 2. Security Audit
echo 🛡️ Running security audit...
npm audit
if %errorlevel% neq 0 exit /b %errorlevel%

REM 3. Build
echo 📦 Running production build...
npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

REM 4. Git Add
echo ➕ Adding all changes to git...
git add .

REM 5. Git Commit
echo 💬 Committing changes...
git commit -m "Automated push, security and build fix"

REM 6. Git Push
echo 📤 Pushing to git...
git push

echo ✅ All done!

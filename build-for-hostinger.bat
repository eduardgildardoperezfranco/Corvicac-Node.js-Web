@echo off
REM build-for-hostinger.bat
REM Build script optimized for Hostinger deployment on Windows

echo 🚀 Starting optimized build for Hostinger...
echo 📦 Project: CORVICAC Web
echo 📅 Date: %date% %time%
echo.

REM 1. Clean previous build
echo 🧹 Cleaning previous build...
if exist ".next" (
    rmdir /s /q .next
    echo ✓ .next/ directory removed
)

REM 2. Install dependencies
echo.
echo 📦 Installing dependencies...
call npm ci
if %errorlevel% equ 0 (
    echo ✓ Dependencies installed successfully
) else (
    echo ✗ Failed to install dependencies
    exit /b 1
)

REM 3. Build the application
echo.
echo 🔨 Building the application...
call npm run build
if %errorlevel% equ 0 (
    echo ✓ Application built successfully
) else (
    echo ✗ Build failed
    exit /b 1
)

REM 4. Create a standalone package for Hostinger
echo.
echo 📦 Creating standalone package for Hostinger...

REM Create a temporary directory for the package
if not exist "hostinger-package" mkdir hostinger-package

REM Copy necessary files
xcopy /E /I /Q ".next\standalone" "hostinger-package\standalone"
xcopy /E /I /Q ".next\static" "hostinger-package\.next\static"
xcopy /E /I /Q "public" "hostinger-package\public"
copy "package.json" "hostinger-package"
copy "next.config.ts" "hostinger-package"

REM Create a startup script
echo @echo off > hostinger-package\start.bat
echo REM Start script for Hostinger >> hostinger-package\start.bat
echo. >> hostinger-package\start.bat
echo REM Set environment variables >> hostinger-package\start.bat
echo set NODE_ENV=production >> hostinger-package\start.bat
echo. >> hostinger-package\start.bat
echo REM Start the application >> hostinger-package\start.bat
echo node server.js >> hostinger-package\start.bat

REM Create a package.json for the standalone build
echo { > hostinger-package\package.json
echo   "name": "corvicac-web-standalone", >> hostinger-package\package.json
echo   "version": "1.0.0", >> hostinger-package\package.json
echo   "description": "CORVICAC Web Standalone Build for Hostinger", >> hostinger-package\package.json
echo   "main": "server.js", >> hostinger-package\package.json
echo   "scripts": { >> hostinger-package\package.json
echo     "start": "node server.js", >> hostinger-package\package.json
echo     "start:prod": "set NODE_ENV=production ^&^& node server.js" >> hostinger-package\package.json
echo   }, >> hostinger-package\package.json
echo   "engines": { >> hostinger-package\package.json
echo     "node": ">=18.0.0", >> hostinger-package\package.json
echo     "npm": ">=8.0.0" >> hostinger-package\package.json
echo   } >> hostinger-package\package.json
echo } >> hostinger-package\package.json

echo ✓ Standalone package created

REM 5. Create a zip file for upload
echo.
echo 📦 Creating zip file for upload...
set TIMESTAMP=%date:~-4%%date:~4,2%%date:~7,2%-%time:~0,2%%time:~3,2%
set TIMESTAMP=%TIMESTAMP: =0%
cd hostinger-package
powershell -command "Compress-Archive -Path * -DestinationPath ..\corvicac-hostinger-%TIMESTAMP%.zip"
cd ..
echo ✓ Zip file created

REM 6. Clean up temporary files
echo.
echo 🧹 Cleaning up temporary files...
rmdir /s /q hostinger-package
echo ✓ Temporary files cleaned up

echo.
echo ✅ Build completed successfully!
echo 📁 Zip file ready for upload to Hostinger
echo 📅 Completed: %date% %time%
echo.
echo 🚀 Ready for deployment on Hostinger!

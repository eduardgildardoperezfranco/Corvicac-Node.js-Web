@echo off
chcp 65001 > nul
echo ========================================
echo CORVICAC - Servidor de Produccion (Hardened)
echo ========================================
echo.

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado
    pause
    exit /b 1
)

echo.
echo INICIANDO SERVIDOR DE PRODUCCION CON BINDING EXPLICITO...
echo ========================================
echo HOST: 0.0.0.0 (todas las interfaces)
echo PORT: 3000
echo MODO: Produccion (NODE_ENV=production)
echo.
echo El servidor escuchara en:
echo   - http://localhost:3000
echo   - http://127.0.0.1:3000
echo   - http://[IP-de-tu-red]:3000
echo.
echo IMPORTANTE: Manten esta ventana abierta
echo ========================================

cd /d "%~dp0"

REM Set explicit environment variables for production binding
set NODE_ENV=production
set HOST=0.0.0.0
set PORT=3000

REM Run production server
npm run start:server

if errorlevel 1 (
    echo.
    echo ERROR: El servidor se detuvo con un error
    pause
)
pause

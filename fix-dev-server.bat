@echo off
chcp 65001 > nul
echo ========================================
echo CORVICAC - Developer Server Troubleshooter
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado o no esta en el PATH
    echo Por favor instala Node.js desde https://nodejs.org
    pause
    exit /b 1
)
echo OK: Node.js encontrado
node --version
echo.

REM Check npm installation
echo [2/5] Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm no esta disponible
    pause
    exit /b 1
)
echo OK: npm encontrado
npm --version
echo.

REM Install dependencies if needed
echo [3/5] Verificando dependencias...
if not exist node_modules (
    echo ADVERTENCIA: node_modules no existe
    echo Instalando dependencias...
    npm install
    if errorlevel 1 (
        echo ERROR: Fallo la instalacion de dependencias
        pause
        exit /b 1
    )
) else (
    echo OK: node_modules existe
)
echo.

REM Check if port 3000 is in use
echo [4/5] Verificando puerto 3000...
netstat -ano | findstr :3000 >nul 2>&1
if not errorlevel 1 (
    echo ADVERTENCIA: El puerto 3000 esta en uso
    echo Posibles causas:
    echo   - Otro proceso de Next.js esta ejecutandose
    echo   - Otro servidor esta usando el puerto 3000
    echo.
    echo Para detener el proceso:
    echo   taskkill /PID [PID_NUMBER] /F
    echo.
    echo O puede cambiar el puerto ejecutando:
    echo   npm run dev -- -p 3001
    echo.
)
echo.

REM Start the development server
echo [5/5] Iniciando servidor de desarrollo...
echo.
echo IMPORTANTE: Manten esta ventana abierta
echo Una vez que veas "ready in..." abre http://localhost:3000 en tu navegador
echo.
echo ========================================
echo.

cd /d "%~dp0"
npm run dev

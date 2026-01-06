@echo off
chcp 65001 > nul
echo ========================================
echo CORVICAC - Servidor de Desarrollo
echo ========================================
echo.

REM Verificar Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no esta instalado
    pause
    exit /b 1
)

REM Instalar dependencias si es necesario
if not exist node_modules (
    echo Instalando dependencias...
    npm install
    if errorlevel 1 (
        echo ERROR: Fallo la instalacion
        pause
        exit /b 1
    )
)

echo.
echo Iniciando servidor de desarrollo...
echo Manten esta ventana abierta
echo Una vez que veas "ready in..." abre:
echo http://localhost:3000
echo.
echo ========================================

cd /d "%~dp0"
npm run dev

if errorlevel 1 (
    echo.
    echo ERROR: El servidor se detuvo con un error
    pause
)
pause
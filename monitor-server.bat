@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo ========================================
echo  MONITOR DE SERVIDOR DE DESARROLLO
echo ========================================
echo.

:CHECK_SERVER
echo Verificando estado del servidor...
curl -s http://localhost:3000 > nul
if !errorlevel! equ 0 (
    echo Servidor ACTIVO - !time! - !date!
) else (
    echo Servidor INACTIVO - !time! - !date!
    echo Iniciando servidor...
    start /B npm run dev
    echo Servidor iniciado, esperando 15 segundos...
    timeout /t 15 /nobreak > nul
)

echo Esperando 30 segundos antes de siguiente verificacion...
timeout /t 30 /nobreak > nul
goto CHECK_SERVER
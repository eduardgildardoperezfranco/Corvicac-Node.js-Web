@echo off
chcp 65001 > nul
echo Iniciando servidor de desarrollo...
cd /d "%~dp0"
echo Directorio actual: %CD%
npm run dev
pause
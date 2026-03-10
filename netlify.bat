@echo off
REM Netlify CLI via lokale Node (geen globale installatie nodig)
set "NODE_DIR=C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64"
set "PATH=%NODE_DIR%;%PATH%"

npx netlify %*
pause

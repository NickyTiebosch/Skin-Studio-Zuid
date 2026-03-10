@echo off
REM Gebruik Node uit je Downloads-map (geen installatie nodig)
set "NODE_DIR=C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64"
set "PATH=%NODE_DIR%;%PATH%"

"%NODE_DIR%\npm.cmd" run dev
pause

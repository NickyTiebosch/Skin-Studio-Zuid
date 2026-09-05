# Installeer de pakketten met pnpm (via npx, dus geen admin of execution policy nodig).
# Let op: gebruik hier GEEN npm install - dit project gebruikt pnpm-lock.yaml,
# en npm zou daar een tweede, conflicterende lockfile naast zetten.
$nodeDir = "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64"
$env:PATH = "$nodeDir;$env:PATH"
Set-Location $PSScriptRoot

& "$nodeDir\npx.cmd" pnpm@10.33.0 install
Write-Host "Klaar. Start daarna met: .\start-dev.bat of .\start-dev.ps1" -ForegroundColor Green

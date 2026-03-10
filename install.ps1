# Installeer npm-pakketten (gebruikt npm.cmd, geen admin of execution policy nodig)
$nodeDir = "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64"
$env:PATH = "$nodeDir;$env:PATH"
Set-Location $PSScriptRoot

& "$nodeDir\npm.cmd" install
Write-Host "Klaar. Start daarna met: .\start-dev.bat of .\start-dev.ps1" -ForegroundColor Green

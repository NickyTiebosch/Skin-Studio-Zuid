# Gebruik Node uit je Downloads-map (geen installatie nodig)
# Gebruikt npm.cmd zodat het ook werkt zonder PATH / execution policy
$nodeDir = "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64"
$env:PATH = "$nodeDir;$env:PATH"
Set-Location $PSScriptRoot

& "$nodeDir\npm.cmd" run dev

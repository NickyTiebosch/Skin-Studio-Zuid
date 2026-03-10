# Werklaptop – Node zonder installatie

Je gebruikt Node uit je **Downloads**-map. In **PowerShell** moet je andere commando’s gebruiken dan in CMD.

## In PowerShell (Cursor/VS Code terminal)

### Eerste keer: pakketten installeren
```powershell
.\install.ps1
```
Of handmatig:
```powershell
$env:PATH = "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64;" + $env:PATH
& "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64\npm.cmd" install
```

### Dev-server starten
```powershell
.\start-dev.bat
```
of
```powershell
.\start-dev.ps1
```
**Let op:** gebruik altijd `.\` vóór het bestand (bijv. `.\start-dev.bat`).

### Netlify
```powershell
.\netlify.bat login
.\netlify.bat deploy
```

---

**Niet doen in PowerShell:**  
- `set PATH=...` → dat is voor CMD. In PowerShell: `$env:PATH = "..." + $env:PATH`  
- `npm install` zonder PATH → gebruik `.\install.ps1` of het volledige pad naar `npm.cmd`

# Werklaptop – Node zonder installatie

Je gebruikt Node uit je **Downloads**-map. In **PowerShell** moet je andere commando's gebruiken dan in CMD.

> **Belangrijk:** dit project gebruikt **pnpm**, niet npm. De scripts hieronder regelen dat zelf via `npx`, dus je hoeft niets te installeren. Draai hier géén `npm install` — npm zet dan een tweede lockfile (`package-lock.json`) naast `pnpm-lock.yaml`, en daar loopt de build op Vercel op stuk.

## In PowerShell (Cursor/VS Code terminal)

### Eerste keer: pakketten installeren
```powershell
.\install.ps1
```
Of handmatig:
```powershell
$env:PATH = "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64;" + $env:PATH
& "C:\Users\ntiebosch\Downloads\node-v24.14.0-win-x64\node-v24.14.0-win-x64\npx.cmd" pnpm@10.33.0 install
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

### Publiceren
De site draait op **Vercel** en publiceert zichzelf: elke push naar `main` gaat automatisch live, en elke pull request krijgt een eigen preview-link om eerst te bekijken. Je hoeft dus niets handmatig te deployen.

---

**Niet doen in PowerShell:**
- `set PATH=...` → dat is voor CMD. In PowerShell: `$env:PATH = "..." + $env:PATH`
- `npm install` → dit project gebruikt pnpm. Gebruik `.\install.ps1`

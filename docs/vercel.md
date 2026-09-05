# Van Netlify naar Vercel

Draaiboek voor de overzetting. De volgorde van stap 5 tot en met 8 is het
enige dat er echt toe doet: verkeerd om betekent dat bezoekers tijdens de
omschakeling een HTTPS-waarschuwing krijgen.

## Vooraf: wat er al klaarstaat

Niets meer te ontkoppelen. Er is geen `netlify.toml`, geen `_redirects`, geen
`_headers` en geen `netlify.bat`. Er is één lockfile (`pnpm-lock.yaml`),
`packageManager` staat op `pnpm@10.33.0`, `engines.node` zet Node op 24, en
`images.unoptimized` is weg — die stond er als workaround voor Netlify
en zou op Vercel alleen schade doen.

De enige API-route (`app/api/contact/route.ts`) gebruikt alleen
web-standaarden en is één op één portabel.

## De stappen

### 1. Project aanmaken

Repo importeren op **vercel.com/new**. Next.js wordt herkend; laat het
build-commando en het installatiecommando ongewijzigd. Vercel kiest pnpm
vanzelf op basis van de lockfile.

### 2. Node-versie

De site draait op **Node 24**. Bij de eerste deploy stond het dashboard al op
24.x, terwijl `engines.node` nog `>=22` zei en `.nvmrc` 22: een range laat de
keuze aan het dashboard. Sinds de controle van 6 september 2026 staat
`engines.node` op `24.x`, zodat de code bepaalt wat Vercel gebruikt, en zegt
`.nvmrc` hetzelfde. De draagbare Node in `install.ps1` en `start-dev.ps1` was
altijd al 24. Vercel schakelt Node 20 uit per 1 oktober 2026; 22 en 24
blijven.

Let op: **Vercel leest `.nvmrc` niet** — dat doet Netlify. Op Vercel stuurt
`engines.node` in `package.json` de keuze, en anders de instelling in het
dashboard. Het `.nvmrc`-bestand staat er voor lokaal werk en voor andere
tooling; vertrouw er hier niet op.

### 3. Environment variables

| Variabele | Waarde | Wanneer |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | het echte webadres, zonder slash aan het eind | Zodra het domein bekend én werkend is |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Zodra GA4 bestaat |

**Is het domein nog niet bekend, laat `NEXT_PUBLIC_SITE_URL` dan leeg.** De
code kiest dan zelf de juiste URL — zie "Hoe het adres bepaald wordt"
hieronder. Een lege variabele is beter dan een adres dat niet werkt.

### 4. Valideren op de `.vercel.app`-URL

Netlify blijft gewoon live. Loop op de Vercel-URL langs:

- `/`, `/laserontharing`, `/gezichtsbehandelingen`, `/tarieven`, `/boeken`,
  `/privacybeleid`
- `/sitemap.xml` — moet zes URL's bevatten
- `/robots.txt` — moet de AI-crawlers expliciet toelaten

Klopt dit allemaal, dan kan Netlify al los — zie stap 9. Dat hoeft niet op
het domein te wachten.

### 5. TTL verlagen

Zet de TTL van de bestaande DNS-records op **60 seconden** en wacht tot de
oude TTL verlopen is. Doe dit ruim vóór de omschakeling, anders blijven
bezoekers nog uren op Netlify uitkomen.

### 6. Domein toevoegen en certificaat vooraf uitgeven

Voeg het domein toe in Vercel en gebruik **Pre-Generate Certificate**. Dit
moet vóór stap 7: draai je het om, dan zit er een venster waarin het domein al
naar Vercel wijst maar het certificaat er nog niet is, en krijgt iedereen een
waarschuwing.

### 7. DNS omzetten

Pas nu de A- en CNAME-records omzetten naar Vercel.

### 8. Adres vastzetten

Zet `NEXT_PUBLIC_SITE_URL` op het echte domein en deploy opnieuw. Werk
daarna **`public/llms.txt`** met de hand bij: daar staan absolute URL's in die
niet uit de code komen. Die staan sinds 6 september 2026 op de Vercel-URL
(daarvóór op het dode `skinstudiozuid.nl`); zoek op
`skin-studio-zuid.vercel.app`.

### 9. Opruimen

TTL terug omhoog, en Netlify loskoppelen van de repo zodat er niet twee
plekken tegelijk bouwen.

**Netlify hoeft niet op het domein te wachten.** Zolang het draait staat er
een tweede, indexeerbare kopie van de site online waarvan alle canonicals, de
`Host` in `robots.txt` en de sitemap naar `skinstudiozuid.nl` wijzen — een
adres dat niet resolvet. Zodra stap 4 in orde is kan het los.

## Hoe het adres bepaald wordt

`lib/site.ts` kiest `SITE_URL` in deze volgorde. Die waarde voedt de
canonicals, de sitemap, `robots.txt`, de OpenGraph-tags en de structured data —
staat hij verkeerd, dan wijst alles tegelijk naar het verkeerde adres.

| Volgorde | Voorwaarde | Resultaat |
|---|---|---|
| 1 | `NEXT_PUBLIC_SITE_URL` is gezet | die waarde |
| 2 | `VERCEL_ENV=production` én `VERCEL_PROJECT_PRODUCTION_URL` | het productiedomein van het project |
| 3 | `VERCEL_URL` bestaat (preview) | deze deploy zelf |
| 4 | geen van bovenstaande | `https://skinstudiozuid.nl` |

Een **preview-deploy krijgt bovendien `noindex, nofollow`** en een `robots.txt`
die alles weigert. Preview-URL's zijn publiek bereikbaar en bevatten dezelfde
teksten als productie; zonder die uitzondering kunnen ze naast het echte
domein in de index belanden en daarmee met zichzelf concurreren.

## Let op: het domein is geregistreerd, maar de delegatie is kapot

De terugval `https://skinstudiozuid.nl` is ooit afgeleid van het e-mailadres
in de oorspronkelijke code (`info@skinstudiozuid.nl`). Op 6 september 2026
uitgezocht via de .nl-servers en SIDN's RDAP: het domein is op 20 maart 2025
geregistreerd via TransIP (registrar team.blue nl B.V.; houder afgeschermd)
en laatst gewijzigd op 18 december 2025. De .nl-servers delegeren het aan
`ns0.mailhet.nu` en `ns1.mailhet.nu`. Die servers bestaan, maar antwoorden
voor dit domein met "Query refused": de zone staat er niet meer. Daardoor is
er geen A-record én geen MX-record — niet alleen de site, ook mail naar
`info@skinstudiozuid.nl` is onbereikbaar.

Zolang dat niet is hersteld: laat `NEXT_PUBLIC_SITE_URL` leeg op Vercel, dan
pakt de code de Vercel-URL en wijst alles in elk geval naar iets dat bestaat.

Voor de omschakeling betekent dit dat stap 5 en 6 vervallen: er is geen
werkende oude site die tijdens de omschakeling stuk kan gaan. Wie het
TransIP-account heeft, zet de nameservers om (naar TransIP's eigen DNS met de
records die Vercel toont bij het toevoegen van het domein, of naar Vercel DNS)
en voegt MX-records toe voor de mailbox die de kliniek gebruikt.

## Verificatie achteraf

- Certificaat geldig en de site laadt zonder waarschuwing.
- `/sitemap.xml` en `/robots.txt` noemen het juiste domein.
- Één `<h1>` per pagina, canonicals wijzen naar het eigen adres.
- Structured data door de Rich Results Test.
- Vercel Analytics telt (dat werkte op Netlify niet).
- Site aanmelden in Google Search Console.

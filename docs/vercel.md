# Van Netlify naar Vercel

Draaiboek voor de overzetting. De volgorde van stap 5 tot en met 8 is het
enige dat er echt toe doet: verkeerd om betekent dat bezoekers tijdens de
omschakeling een HTTPS-waarschuwing krijgen.

## Vooraf: wat er al klaarstaat

Niets meer te ontkoppelen. Er is geen `netlify.toml`, geen `_redirects`, geen
`_headers` en geen `netlify.bat`. Er is één lockfile (`pnpm-lock.yaml`),
`packageManager` staat op `pnpm@10.33.0`, `engines` en `.nvmrc` zetten Node op
22, en `images.unoptimized` is weg — die stond er als workaround voor Netlify
en zou op Vercel alleen schade doen.

De enige API-route (`app/api/contact/route.ts`) gebruikt alleen
web-standaarden en is één op één portabel.

## De stappen

### 1. Project aanmaken

Repo importeren op **vercel.com/new**. Next.js wordt herkend; laat het
build-commando en het installatiecommando ongewijzigd. Vercel kiest pnpm
vanzelf op basis van de lockfile.

### 2. Node-versie

Zet de Node-versie op **22**. `engines` en `.nvmrc` sturen dit al, maar
controleer het: Vercel schakelt Node 20 uit per 1 oktober 2026.

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
niet uit de code komen.

### 9. Opruimen

TTL terug omhoog, en Netlify loskoppelen van de repo zodat er niet twee
plekken tegelijk bouwen.

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

## Let op: het domein is nooit geverifieerd

De terugval `https://skinstudiozuid.nl` is ooit afgeleid van het e-mailadres
in de oorspronkelijke code (`info@skinstudiozuid.nl`) en is **niet
gecontroleerd**. Er is gemeld dat dat adres niet werkt.

Zolang dat niet is uitgezocht: laat `NEXT_PUBLIC_SITE_URL` leeg op Vercel, dan
pakt de code de Vercel-URL en wijst alles in elk geval naar iets dat bestaat.

## Verificatie achteraf

- Certificaat geldig en de site laadt zonder waarschuwing.
- `/sitemap.xml` en `/robots.txt` noemen het juiste domein.
- Één `<h1>` per pagina, canonicals wijzen naar het eigen adres.
- Structured data door de Rich Results Test.
- Vercel Analytics telt (dat werkte op Netlify niet).
- Site aanmelden in Google Search Console.

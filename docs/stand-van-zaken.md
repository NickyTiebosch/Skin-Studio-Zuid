# Stand van zaken

Bijgewerkt: 10 oktober 2026. Kort overzicht om een nieuwe sessie snel op gang
te helpen. Details staan in `docs/vercel.md` (migratie) en
`docs/te-controleren.md` (wat de kliniek moet aanleveren).

## Waar het draait

| Omgeving | Adres | Status |
|---|---|---|
| Vercel (nieuw) | `skin-studio-zuid.vercel.app` | Productie, bouwt van `main`. Op 6 september volledig nagelopen, in orde |
| Netlify (oud) | `skin-studio-zuid.netlify.app` | **Verwijderd op 6 september 2026.** Geeft 404; geen webhooks meer op de repo. Staat de URL nog ergens (Instagram-bio, Google Business Profile), vervang hem door de Vercel-URL |
| Eigen domein | `skinstudio-zuid.nl` (mét streepje) | **Gekoppeld aan Vercel op 10 oktober 2026.** DNS bij TransIP wijst naar Vercel (twee A-records, `www` als CNAME, AAAA verwijderd); Vercel meldt apex en `www` als correct geconfigureerd. De naam zónder streepje (`skinstudiozuid.nl`) is van iemand anders en niet op te kopen: zet het adres overal als aanklikbare link neer |

## De naam

Sinds 9 oktober 2026 heet de site **Skinstudio Zuid**, één woord. Dat is de
schrijfwijze van de kliniek zelf en van de Instagram-naam. Twee dingen wijken
daar bewust van af en dat is geen slordigheid:

- het **logo** is een PNG waarin "Skin Studio" in schrijfletters staat met
  "ZUID" eronder — niet aan te passen in code;
- het **domein** is `skinstudio-zuid.nl`, mét streepje.

De naam staat op één plek: `BEDRIJFSNAAM` in `lib/contact.ts`. Alles wat de
bezoeker ziet leest daar — paginatitels, de deelafbeelding, de footer, de
structured data. In het **Google Business Profile** (nog aan te maken, zie
`docs/google-business-profile.md`) hoort letterlijk dezelfde schrijfwijze te
staan, anders ziet Google twee bedrijven waar er één is.

**Let op bij het doorgeven van het webadres.** De naam is nu één woord, maar
het domein heeft een streepje, en `skinstudiozuid.nl` zonder streepje is van
iemand anders. Wie het adres uit zijn hoofd intypt komt dus niet bij de
kliniek uit. Zet `skinstudio-zuid.nl` daarom overal als aanklikbare link neer
— Instagram-bio, Business Profile, flyers, mailhandtekening — en laat niemand
het overtypen.

## Wat er staat

- Zeven pagina's: `/`, `/laserontharing`, `/gezichtsbehandelingen`, `/tarieven`,
  `/boeken`, `/contact`, `/privacybeleid`. Elke pagina heeft precies één `<h1>`. Op
  `/boeken` is dat sinds 6 september de kop van `ContactSection` (prop
  `kopNiveau`); op de homepage blijft diezelfde kop een `<h2>` onder de hero.
- Tarieven: laserontharing voor vrouwen (sinds 7 september) én mannen
  (sinds 4 september), plus de gezichtsbehandeling. Per doelgroep staan
  eerst de pakketten (de kuur van zes behandelingen en dezelfde combinaties
  per losse behandeling), dan de losse lichaamsdelen — die volgorde is een
  keuze van Nicky. Alles in `lib/tarieven.ts`, en ook in `public/llms.txt`.
- Aanvraagkalender op `/boeken`, sinds 7 september: de bezoeker kiest een
  behandeling (gezichtsbehandeling, of het gratis intakegesprek waarmee
  laserontharing altijd begint), een datum en een dagdeel, en de kliniek
  bevestigt per e-mail of telefoon. Het is een aanvraag, geen boeking: de
  site kent de agenda van de kliniek nog niet. Alles wat de kalender over de
  kliniek aanneemt staat in `lib/agenda.ts`; de kalender zelf is
  `components/afspraak-kiezer.tsx`. Op de homepage blijft het formulier
  kort, zonder kalender.
- Menu in de balk: Gezichtsbehandelingen · Laserontharing · Tarieven · De Studio ·
  Contact, sinds 6 september; daarvóór vier ankers naar homepage-secties. De
  balk verschijnt vanaf 1280px, daaronder het hamburgermenu — gemeten, zie de
  toelichting in `components/navbar.tsx`. "Producten" staat in de footer.
- SEO/GEO-fundament: sitemap, robots met AI-crawlers expliciet toegelaten,
  JSON-LD (`BeautySalon`, `Service`, `FAQPage`, `BreadcrumbList`), canonicals,
  OpenGraph, `llms.txt`. De absolute URL's in `public/llms.txt` staan sinds
  9 oktober 2026 op `skinstudio-zuid.nl`, net als de canonicals.
- Meten: Vercel Analytics en Speed Insights (allebei cookieloos, buiten de
  cookiebanner), plus een cookiebanner waarachter GA4 pas laadt ná toestemming.
- Node 24, overal hetzelfde: `engines.node` is `24.x`, `.nvmrc` zegt 24, het
  Vercel-dashboard staat op 24.x en de draagbare Node in `install.ps1` en
  `start-dev.ps1` was al 24.
- Bewegingslaag over het bestaande ontwerp, met een terugvaloptie voor
  browsers zonder `animation-timeline` (Firefox, Safari < 26).

## SEO-beoordeling en quick wins van 9 oktober 2026

De beoordeling staat in `docs/seo-geo-aeo-beoordeling.md`, de bijgewerkte
SEO/GEO/AEO-skills in `docs/skills/`. De code-quick-wins daaruit zijn
doorgevoerd:

- Eigen contactpagina op `/contact` (adres met postcode, telefoon, e-mail,
  werkgebied); het menu en de footer wijzen daar nu naartoe. Het formulier
  blijft op `/boeken`.
- Behandelpagina's beginnen met een samenvatting die de vraag beantwoordt
  (wat, waar, vanaf-prijs, hoe het begint), hebben koppen in vraagvorm, een
  stappenplan (laserontharing) en een Hydrafacial-alinea
  (gezichtsbehandelingen). H1's zeggen "Den Bosch".
- Tarieven: H1 met behandeling en plaats, kolomkoppen in de tabellen.
- Structured data: postcode, geo-coördinaten, `priceRange` uit de tarieven,
  werkgebied in `areaServed`, spaarapp in `sameAs`.
- Sitemap-`lastmod` en een zichtbare "Bijgewerkt op" komen uit
  `lib/bijgewerkt.ts`; werk die datum bij als de inhoud van een pagina
  verandert.
- Homepage: label boven de kop noemt behandeling en Den Bosch; "2026" uit de
  kop "Medische Innovatie"; ligging en werkgebied onder "Over ons".

Nog open uit de beoordeling, buiten de code: Google Business Profile,
reviews, Search Console, en de feiten van de kliniek (behandelaar,
openingstijden, duur, sessies, nazorg). Zie `docs/te-controleren.md`.

## Domein gekoppeld op 10 oktober 2026

Nicky heeft in het TransIP-paneel de DNS van `skinstudio-zuid.nl` omgezet,
met de waarden die Vercel's API als rang 1 opgeeft. Het draaiboek noemde nog
`76.76.21.21` en `cname.vercel-dns.com`; dat is rang 2 en werkt ook, maar het
dashboard toont tegenwoordig deze:

| Record | Waarde |
|---|---|
| `@` A | `216.150.1.1` én `216.150.16.1` (twee records) |
| `@` AAAA | **verwijderd** — wees naar TransIP's parkeerpagina; met alleen het A-record omgezet was de site via IPv6 nog steeds de parkeerpagina geweest |
| `www` CNAME | `0896e9641334cf22.vercel-dns-016.com` |
| MX, SPF, DKIM, DMARC | ongemoeid: TransIP's standaardregels, zie punt 2 |

Direct daarna meldde Vercel apex en `www` als correct geconfigureerd
(`misconfigured: false`, challenge `http-01`). `www` stuurt met 308 door naar
het hoofddomein (instelling op het project). DNS-beheer blijft bij TransIP;
de zone is niet aan Vercel gedelegeerd, zodat de mailrecords straks op
dezelfde plek staan.

Het certificaat kwam niet vanzelf: tien minuten na de omzetting stond er in
Vercel's certificaatlijst nog niets voor dit domein. Via de API aangevraagd
(`POST /v8/certs`, per hostnaam één, zoals Vercel zelf ook doet); beide
werden direct uitgegeven door Let's Encrypt, geldig tot 8 januari 2027, met
automatische verlenging. Daarna gecontroleerd: `https://skinstudio-zuid.nl`
geeft 200 met geldig certificaat, `www` stuurt met 308 door, sitemap en
`robots.txt` noemen het domein en de canonical van de homepage is
`https://skinstudio-zuid.nl`. Let op bij een eigen controle vlak na zo'n
wijziging: een resolver of pc-cache die het oude A- of AAAA-record nog
vasthoudt (TTL tot een uur) toont nog de parkeerpagina van TransIP, met een
`*.vdx.nl`-certificaat; `ipconfig /flushdns` helpt lokaal, de rest verloopt
vanzelf.

## Controle van 6 september 2026

Op de Vercel-URL nagelopen, zodat dit niet opnieuw hoeft:

- Alle zes pagina's plus `/sitemap.xml`, `/robots.txt`, `/llms.txt` en
  `/opengraph-image` geven 200 en renderen goed in de browser.
- Sitemap: precies zes URL's, alle op `skin-studio-zuid.vercel.app`. Robots:
  AI-crawlers toegelaten, `/api/` geweigerd, `Host` en `Sitemap` op de
  Vercel-URL. Productie krijgt dus níét de preview-variant met `noindex`.
- Canonicals wijzen per pagina naar de eigen Vercel-URL, robots-meta staat op
  `index, follow`, JSON-LD is compleet.
- `/_vercel/insights/script.js` en `/_vercel/speed-insights/script.js` geven
  200: er wordt gemeten.
- Productie is gebouwd van de laatste commit op `main`.

Gevonden en opgelost: `/boeken` had geen `<h1>` (de sectie rendert een `<h2>`,
wat op de homepage klopt en op `/boeken` niet), `llms.txt` wees naar het dode
domein, en Node stond in het dashboard op 24 terwijl repo en draaiboek 22
zeiden.

Gevonden, destijds nog open (het ging om de naam zónder streepje): dat domein is geregistreerd maar de delegatie is kapot (zie
`docs/vercel.md`), en daardoor kan `info@skinstudio-zuid.nl` geen mail ontvangen
— terwijl het contactformulier precies daar naartoe stuurt.

## Wat er nog moet

1. **Contactformulier activeren.** Sinds 10 oktober stuurt het formulier
   weer naar `info@skinstudio-zuid.nl` (`EMAIL` in `lib/contact.ts`, sinds
   die dag ook de bestemming in `app/api/contact/route.ts`). Formsubmit
   koppelt dat adres pas na activatie: bij de eerste aanvraag komt er één
   activatiemail in de TransIP-mailbox (webmail: `transip.email`); daar één
   keer op klikken, anders wordt niets doorgestuurd. Daarna één testaanvraag
   via de site doen en kijken of hij aankomt — dat is meteen het bewijs dat
   de mailbox bestaat en de MX klopt. Van 7 september tot 10 oktober ging
   het formulier tijdelijk naar het adres van Nicky.
2. **E-mail op het domein staat bij TransIP**, sinds 10 oktober 2026. Er is
   een TransIP-mailpakket met `info@skinstudio-zuid.nl` (aangemaakt door
   Nicky; de activatiemail hierboven is de eerste echte test), en in het
   TransIP-paneel staan de records die TransIP's kennisbank voorschrijft:
   MX `10 mx.transip.email.`, SPF `v=spf1 include:_spf.transip.email ~all`,
   de drie DKIM-CNAMEs naar `transip.email`, DMARC `p=none`, en
   `autoconfig`/`autodiscover` naar TransIP. Gecontroleerd op alle drie de
   nameservers en bij de publieke resolvers. Nog open: DMARC staat op
   `p=none` (alleen rapporteren); zodra blijkt dat alle mail netjes via
   TransIP gaat, kan dat naar `p=quarantine`. Verandert het adres ooit, dan
   is `EMAIL` in `lib/contact.ts` de enige regel die wijzigt.
3. **Google Business Profile aanmaken.** Bestaat nog niet. Voor een lokale
   kliniek is dit een grotere hefboom dan de hele SEO van de site: het bepaalt
   of je in de kaartresultaten en in "schoonheidssalon in de buurt" verschijnt.
   Nicky maakt hem aan; `docs/google-business-profile.md` bevat per veld de
   exacte waarde, zodat profiel en structured data letterlijk gelijk zijn.
4. **GA4 en Search Console** aanmaken, dan `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   zetten. Het domein is er sinds 10 oktober, dus dit kan nu: meld
   `skinstudio-zuid.nl` aan als domein-property. De Vercel-URL is nooit
   aangemeld, dus een Change of Address is niet nodig.
5. **Boekingssysteem.** Stap één staat: de aanvraagkalender op `/boeken`.
   Stap twee is echte beschikbaarheid: de Apple/iCloud-agenda via Cal.com,
   zodat alleen vrije momenten te kiezen zijn en de boeking meteen in haar
   agenda staat. Dat wacht op de **behandelduur per behandeling** en de
   **beschikbaarheid** (welke dagen en uren), plus een Cal.com-account en een
   app-specifiek wachtwoord van het Apple ID, aan te maken door de kliniek.
6. **Van de kliniek**: openingstijden, wie er behandelt met certificering,
   of de kuuractie ook bij mannen alleen voor nieuwe klanten geldt (op de
   vrouwenflyer staat dat wel, op de mannenflyer niet), en de twee
   tegenstrijdigheden tussen flyer en site (Diode Ice Laser versus Atres
   Triple Wave, Hydrafacial versus HydraSpa) — die laatste vóór er
   advertentiebudget op gaat. Zie `docs/te-controleren.md`.

## Twee dingen om te weten bij het verder bouwen

- **Meet de laadtijd voor en na.** Het gemeten LCP-element op de homepage is de
  `<h1>`, niet de foto. Een eerdere opzet splitste die kop in losse regels,
  waardoor de cookiebanner het grootste element werd en de LCP van 1,3 naar 3,0
  seconde sprong. Dat soort dingen zie je niet, je meet ze.
- **Verander het ontwerp niet als er om effecten gevraagd wordt.** Twee rondes
  zijn afgekeurd omdat er naast beweging ook typografie, kleuren en indeling
  waren aangepast. Het ontwerp van de bestaande site is het uitgangspunt.

# Stand van zaken

Bijgewerkt: 7 september 2026. Kort overzicht om een nieuwe sessie snel op gang
te helpen. Details staan in `docs/vercel.md` (migratie) en
`docs/te-controleren.md` (wat de kliniek moet aanleveren).

## Waar het draait

| Omgeving | Adres | Status |
|---|---|---|
| Vercel (nieuw) | `skin-studio-zuid.vercel.app` | Productie, bouwt van `main`. Op 6 september volledig nagelopen, in orde |
| Netlify (oud) | `skin-studio-zuid.netlify.app` | **Verwijderd op 6 september 2026.** Geeft 404; geen webhooks meer op de repo. Staat de URL nog ergens (Instagram-bio, Google Business Profile), vervang hem door de Vercel-URL |
| Eigen domein | `skinstudio-zuid.nl` (mét streepje; bevestigd 9 oktober 2026) | **Geregistreerd bij TransIP, toont nog de parkeerpagina.** Productie canonicaliseert er sinds 9 oktober al naartoe; de DNS moet nog naar Vercel. De naam zónder streepje (`skinstudiozuid.nl`) was een vergissing uit het e-mailadres en is dood: gedelegeerd aan `ns0/ns1.mailhet.nu`, die de zone weigeren, geen A- en geen MX-record. Bovendien **niet meer van de kliniek** en niet op te kopen (nagekeken 9 oktober 2026): doorverwijzen kan niet |

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

- Zes pagina's: `/`, `/laserontharing`, `/gezichtsbehandelingen`, `/tarieven`,
  `/boeken`, `/privacybeleid`. Elke pagina heeft precies één `<h1>`. Op
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
  OpenGraph, `llms.txt`. De absolute URL's in `public/llms.txt` staan op de
  Vercel-URL tot het echte domein er is.
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

Nog open uit de beoordeling, buiten de code: domein, Google Business Profile,
reviews, Search Console, en de feiten van de kliniek (behandelaar,
openingstijden, duur, sessies, nazorg). Zie `docs/te-controleren.md`.

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

Gevonden, nog open: het domein is geregistreerd maar de delegatie is kapot (zie
`docs/vercel.md`), en daardoor kan `info@skinstudio-zuid.nl` geen mail ontvangen
— terwijl het contactformulier precies daar naartoe stuurt.

## Wat er nog moet

1. **Contactformulier staat tijdelijk op Nicky's adres.** Sinds 7 september
   stuurt het formulier via formsubmit.co naar `info@22labs.nl`
   (`app/api/contact/route.ts`), omdat `info@skinstudio-zuid.nl` geen mail
   kan ontvangen zolang het domein geen MX-record heeft. **Nog te doen:** bij
   de eerste aanvraag stuurt formsubmit één activatiemail naar dat adres;
   daar één keer op klikken, anders wordt niets doorgestuurd. Zodra mail op
   het domein werkt: terug naar `info@skinstudio-zuid.nl` en daar opnieuw
   activeren. De kliniek heeft nog niet gekozen welk postvak dat wordt (punt
   3), dus dit blijft voorlopig zo.
2. **Het domein koppelen.** Het echte domein is `skinstudio-zuid.nl` (mét
   streepje). Op 9 oktober 2026 wezen canonical, sitemap en `robots.txt` van
   productie al naar dat domein, terwijl het zelf nog de parkeerpagina van
   TransIP toonde. Op 9 oktober 2026 via de Vercel-API gemeten: het domein
   hangt aan het project (apex én `www`, allebei geverifieerd), staat op de
   nameservers van TransIP en heeft één A-record, `37.97.254.27` — dat is
   TransIP, niet Vercel. Vandaar dat Vercel het als `misconfigured` meldt.
   Wie het TransIP-account heeft, zet het A-record van het hoofddomein om
   naar **`76.76.21.21`** en `www` naar **`cname.vercel-dns.com`** (Vercel
   toont ze ook onder Settings → Domains). Houd het DNS-beheer bij TransIP;
   delegeer de zone niet aan Vercel, anders vallen de MX-records weg zodra de
   mail geregeld is. Omdat er alleen een parkeerpagina staat, is er geen oude site
   die stuk kan gaan: stap 5 en 6 uit het draaiboek vervallen. Zodra het
   domein "Valid Configuration" heeft: `public/llms.txt` bijwerken (daar
   staan nog Vercel-URL's) en in Search Console een Change of Address van
   de Vercel-URL doen. De naam zónder streepje in de oudere notities
   hieronder was een vergissing; zie `docs/vercel.md`.
3. **E-mail op het domein.** Er is nog geen postvak en de kliniek denkt nog
   na over welke provider het wordt (TransIP-mailbox, Google Workspace,
   Microsoft 365). De vraag of er ooit een mailbox bestond is niet meer aan
   de orde: dit is een gloednieuw domein. Zodra de keuze er is komen de
   MX-records erbij, plus SPF, DKIM en DMARC. Pas daarna kan het formulier
   terug naar het eigen adres. De code gaat uit van
   `info@skinstudio-zuid.nl`; wordt het iets anders, dan is `EMAIL` in
   `lib/contact.ts` de enige regel die wijzigt.
4. **Google Business Profile aanmaken.** Bestaat nog niet. Voor een lokale
   kliniek is dit een grotere hefboom dan de hele SEO van de site: het bepaalt
   of je in de kaartresultaten en in "schoonheidssalon in de buurt" verschijnt.
   Nicky maakt hem aan; `docs/google-business-profile.md` bevat per veld de
   exacte waarde, zodat profiel en structured data letterlijk gelijk zijn.
5. **GA4 en Search Console** aanmaken, dan `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   zetten. Pas zinvol als het domein er is.
6. **Boekingssysteem.** Stap één staat: de aanvraagkalender op `/boeken`.
   Stap twee is echte beschikbaarheid: de Apple/iCloud-agenda via Cal.com,
   zodat alleen vrije momenten te kiezen zijn en de boeking meteen in haar
   agenda staat. Dat wacht op de **behandelduur per behandeling** en de
   **beschikbaarheid** (welke dagen en uren), plus een Cal.com-account en een
   app-specifiek wachtwoord van het Apple ID, aan te maken door de kliniek.
7. **Van de kliniek**: openingstijden, wie er behandelt met certificering,
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

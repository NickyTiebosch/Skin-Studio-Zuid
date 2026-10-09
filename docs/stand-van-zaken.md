# Stand van zaken

Bijgewerkt: 9 oktober 2026. Kort overzicht om een nieuwe sessie snel op gang
te helpen. Details staan in `docs/vercel.md` (migratie) en
`docs/te-controleren.md` (wat de kliniek moet aanleveren).

## Waar het draait

| Omgeving | Adres | Status |
|---|---|---|
| Vercel (nieuw) | `skin-studio-zuid.vercel.app` | Productie, bouwt van `main`. Op 6 september volledig nagelopen, in orde |
| Netlify (oud) | `skin-studio-zuid.netlify.app` | **Verwijderd op 6 september 2026.** Geeft 404; geen webhooks meer op de repo. Staat de URL nog ergens (Instagram-bio, Google Business Profile), vervang hem door de Vercel-URL |
| Eigen domein | `skinstudio-zuid.nl` | **Vastgelegd op 9 oktober 2026**, mét koppelteken. Nog niet aan het Vercel-project gekoppeld en nog geen postvak. De code wijst er sindsdien naar |
| Oud domein | `skinstudiozuid.nl` | Zonder koppelteken. **Niet meer van de kliniek** (bevestigd 9 oktober 2026) en ook niet op te kopen: de registratie staat nog op iemand anders. Gedelegeerd aan `ns0/ns1.mailhet.nu` die de zone weigeren, dus hij resolvet nergens naartoe. Doorverwijzen kan dus niet — zie de waarschuwing onder "De naam" |

## De naam

Sinds 9 oktober 2026 heet de site **Skinstudio Zuid**, één woord. Dat is de
schrijfwijze van de kliniek zelf en van de Instagram-naam. Twee dingen wijken
daar bewust van af en dat is geen slordigheid:

- het **logo** is een PNG waarin "Skin Studio" in schrijfletters staat met
  "ZUID" eronder — niet aan te passen in code;
- het **domein** is `skinstudio-zuid.nl`, mét koppelteken.

De naam staat op één plek: `BEDRIJFSNAAM` in `lib/contact.ts`. Alles wat de
bezoeker ziet leest daar — paginatitels, de deelafbeelding, de footer, de
structured data. In het **Google Business Profile** (nog aan te maken, zie
`docs/google-business-profile.md`) hoort letterlijk dezelfde schrijfwijze te
staan, anders ziet Google twee bedrijven waar er één is.

**Let op bij het doorgeven van het webadres.** De naam is nu één woord, maar
het domein heeft een koppelteken, en `skinstudiozuid.nl` zonder koppelteken is
van iemand anders. Wie het adres uit zijn hoofd intypt komt dus nergens uit.
Zet `skinstudio-zuid.nl` daarom overal als aanklikbare link neer — Instagram-bio,
Business Profile, flyers, mailhandtekening — en laat niemand het overtypen.

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

Gevonden: het domein waar de code toen naar wees (`skinstudiozuid.nl`) was wel
geregistreerd maar had een kapotte delegatie, dus `info@skinstudiozuid.nl` kon
geen mail ontvangen terwijl het formulier daar naartoe stuurde. Op 7 september
opgelost door tijdelijk naar `info@22labs.nl` te sturen; op 9 oktober bleek dat
domein bovendien niet eens meer van de kliniek te zijn.

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
2. **Het domein koppelen.** `skinstudio-zuid.nl` is vastgelegd maar nog niet
   gedelegeerd: op 9 oktober 2026 stond hij nog op `ns1/ns3/ns4.dns.nl`, de
   nameservers van de .nl-registry zelf. Er is dus geen DNS-zone, geen
   A-record en geen MX-record, en er valt nog niets te koppelen. Wie het
   domein heeft geregistreerd zet eerst de nameservers naar een DNS-beheerder
   en voegt daar de records toe die Vercel toont bij het toevoegen van het
   domein (nu al bekend: A `76.76.21.21` op het hoofddomein, CNAME
   `cname.vercel-dns.com` op `www`). Houd dat DNS-beheer bij de registrar —
   delegeer de zone niet aan Vercel, anders vallen de MX-records weg zodra de
   mail geregeld is. Omdat er nu niets resolvet is er geen oude site die
   tijdens de omschakeling stuk kan gaan: stap 5 en 6 uit het draaiboek
   vervallen. Daarna `NEXT_PUBLIC_SITE_URL` zetten en `public/llms.txt`
   bijwerken.
3. **E-mail op het domein.** Er is nog geen postvak en de kliniek denkt nog
   na over welke provider het wordt (mailbox bij de registrar, Google
   Workspace, Microsoft 365). Zodra dat gekozen is komen er MX-records bij,
   plus SPF, DKIM en DMARC. Pas daarna kan het formulier terug naar het eigen
   adres. De code gaat uit van `info@skinstudio-zuid.nl`; wordt het iets
   anders, dan is `EMAIL` in `lib/contact.ts` de enige regel die wijzigt.
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

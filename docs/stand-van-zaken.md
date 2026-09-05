# Stand van zaken

Bijgewerkt: 6 september 2026. Kort overzicht om een nieuwe sessie snel op gang
te helpen. Details staan in `docs/vercel.md` (migratie) en
`docs/te-controleren.md` (wat de kliniek moet aanleveren).

## Waar het draait

| Omgeving | Adres | Status |
|---|---|---|
| Vercel (nieuw) | `skin-studio-zuid.vercel.app` | Productie, bouwt van `main`. Op 6 september volledig nagelopen, in orde |
| Netlify (oud) | `skin-studio-zuid.netlify.app` | **Draait nog en kan nu los.** Indexeerbaar, met canonicals, robots-`Host` en sitemap naar het dode `skinstudiozuid.nl` |
| Eigen domein | `skinstudiozuid.nl` | **Geregistreerd maar dood.** Bij TransIP (registrar team.blue), gedelegeerd aan `ns0/ns1.mailhet.nu`, die de zone weigeren ("Query refused"). Geen A- en geen MX-record |

## Wat er staat

- Zes pagina's: `/`, `/laserontharing`, `/gezichtsbehandelingen`, `/tarieven`,
  `/boeken`, `/privacybeleid`. Elke pagina heeft precies één `<h1>`. Op
  `/boeken` is dat sinds 6 september de kop van `ContactSection` (prop
  `kopNiveau`); op de homepage blijft diezelfde kop een `<h2>` onder de hero.
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

Gevonden, nog open: het domein is geregistreerd maar de delegatie is kapot (zie
`docs/vercel.md`), en daardoor kan `info@skinstudiozuid.nl` geen mail ontvangen
— terwijl het contactformulier precies daar naartoe stuurt.

## Wat er nog moet

1. **Contactformulier naar een adres dat werkt.** Het formulier stuurt via
   formsubmit.co naar `info@skinstudiozuid.nl` (`app/api/contact/route.ts`),
   en dat adres kan geen mail ontvangen zolang het domein geen MX-record
   heeft. De bezoeker ziet "verzonden", de kliniek krijgt niets. Zet het
   tijdelijk op een mailbox die wél werkt en klik daar één keer op de
   activatiemail van formsubmit. Dit blokkeert boekingen, dus vóór alles.
2. **Netlify loskoppelen.** Nu, niet pas bij het domein — zie stap 9 in
   `docs/vercel.md`. Controleer eerst of de Netlify-URL nog ergens staat
   (Instagram-bio, Google Business Profile) en zet die om naar de Vercel-URL.
3. **Het domein repareren.** `skinstudiozuid.nl` staat bij TransIP
   (geregistreerd 20 maart 2025, laatst gewijzigd 18 december 2025). Wie het
   TransIP-account heeft — de kliniek of de vorige websitebouwer — logt in en
   zet de nameservers om: naar TransIP's eigen DNS met de records die Vercel
   toont bij het toevoegen van het domein, of rechtstreeks naar Vercel DNS.
   Omdat er nu niets resolvet, is er geen oude site die tijdens de
   omschakeling stuk kan gaan: stap 5 en 6 uit het draaiboek vervallen.
   Daarna `NEXT_PUBLIC_SITE_URL` zetten en `public/llms.txt` bijwerken.
4. **E-mail op het domein.** Bij het herstel van DNS moeten er MX-records
   komen voor de mailbox die de kliniek echt gebruikt (TransIP-mailbox,
   Google Workspace, Microsoft 365 — te kiezen). Uitzoeken bij de kliniek: is
   er ooit een mailbox voor `info@skinstudiozuid.nl` geweest, en zo ja waar?
   Pas daarna kan het formulier terug naar dat adres.
5. **GA4 en Search Console** aanmaken, dan `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   zetten. Pas zinvol als het domein er is.
6. **Boekingssysteem.** Besloten: Apple/iCloud-agenda via Cal.com. Wacht
   uitsluitend nog op de **behandelduur per behandeling** — zonder duur kan
   geen enkel systeem tijdsloten berekenen.
7. **Van de kliniek**: vrouwenprijzen laserontharing, openingstijden, wie er
   behandelt met certificering, en de twee tegenstrijdigheden tussen flyer en
   site (Diode Ice Laser versus Atres Triple Wave, Hydrafacial versus
   HydraSpa) — die laatste vóór er advertentiebudget op gaat. Zie
   `docs/te-controleren.md`.

## Twee dingen om te weten bij het verder bouwen

- **Meet de laadtijd voor en na.** Het gemeten LCP-element op de homepage is de
  `<h1>`, niet de foto. Een eerdere opzet splitste die kop in losse regels,
  waardoor de cookiebanner het grootste element werd en de LCP van 1,3 naar 3,0
  seconde sprong. Dat soort dingen zie je niet, je meet ze.
- **Verander het ontwerp niet als er om effecten gevraagd wordt.** Twee rondes
  zijn afgekeurd omdat er naast beweging ook typografie, kleuren en indeling
  waren aangepast. Het ontwerp van de bestaande site is het uitgangspunt.

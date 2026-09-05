# Stand van zaken

Bijgewerkt: 5 september 2026. Kort overzicht om een nieuwe sessie snel op gang
te helpen. Details staan in `docs/vercel.md` (migratie) en
`docs/te-controleren.md` (wat de kliniek moet aanleveren).

## Waar het draait

| Omgeving | Adres | Status |
|---|---|---|
| Vercel (nieuw) | `skin-studio-zuid.vercel.app` | Productie, bouwt van `main` |
| Netlify (oud) | `skin-studio-zuid.netlify.app` | Draait nog; loskoppelen zodra Vercel bevestigd is |
| Eigen domein | `skinstudiozuid.nl` | **Werkt niet.** Zie hieronder |

## Wat er staat

- Zes pagina's: `/`, `/laserontharing`, `/gezichtsbehandelingen`, `/tarieven`,
  `/boeken`, `/privacybeleid`.
- SEO/GEO-fundament: sitemap, robots met AI-crawlers expliciet toegelaten,
  JSON-LD (`BeautySalon`, `Service`, `FAQPage`, `BreadcrumbList`), canonicals,
  OpenGraph, `llms.txt`.
- Meten: Vercel Analytics en Speed Insights (allebei cookieloos, buiten de
  cookiebanner), plus een cookiebanner waarachter GA4 pas laadt ná toestemming.
- Bewegingslaag over het bestaande ontwerp, met een terugvaloptie voor
  browsers zonder `animation-timeline` (Firefox, Safari < 26).

## Wat er nog moet

1. **Het domein uitzoeken.** `SITE_URL` valt zonder `NEXT_PUBLIC_SITE_URL`
   terug op `skinstudiozuid.nl`, en dat adres is ooit afgeleid van het
   e-mailadres in de oorspronkelijke code en nooit geverifieerd. Op Vercel
   pakt de code nu automatisch de Vercel-URL, dus er wijst niets meer naar een
   dood adres — maar het echte domein moet er nog komen. Daarna
   `public/llms.txt` met de hand bijwerken.
2. **DNS omzetten** volgens `docs/vercel.md`. Het certificaat moet vooraf
   uitgegeven worden vóórdat de records omgaan.
3. **GA4 en Search Console** aanmaken, dan `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   zetten.
4. **Boekingssysteem.** Besloten: Apple/iCloud-agenda via Cal.com. Wacht
   uitsluitend nog op de **behandelduur per behandeling** — zonder duur kan
   geen enkel systeem tijdsloten berekenen.
5. **Van de kliniek**: vrouwenprijzen laserontharing, openingstijden, wie er
   behandelt met certificering, en de twee tegenstrijdigheden tussen flyer en
   site (Diode Ice Laser versus Atres Triple Wave, Hydrafacial versus
   HydraSpa). Zie `docs/te-controleren.md`.

## Twee dingen om te weten bij het verder bouwen

- **Meet de laadtijd voor en na.** Het gemeten LCP-element op de homepage is de
  `<h1>`, niet de foto. Een eerdere opzet splitste die kop in losse regels,
  waardoor de cookiebanner het grootste element werd en de LCP van 1,3 naar 3,0
  seconde sprong. Dat soort dingen zie je niet, je meet ze.
- **Verander het ontwerp niet als er om effecten gevraagd wordt.** Twee rondes
  zijn afgekeurd omdat er naast beweging ook typografie, kleuren en indeling
  waren aangepast. Het ontwerp van de bestaande site is het uitgangspunt.

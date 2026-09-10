# Editie 2 — "de studio in"

Bijgewerkt: 10 september 2026. De tweede, beeldrijke versie van de site, gebouwd
op branch `editie-2` als Vercel preview. De live site op `main` blijft
ongewijzigd tot Nicky akkoord geeft. Het volledige plan staat in het
goedgekeurde planbestand van 10 september; dit document houdt de besluiten,
de afwijkingen en de metingen bij.

## Besluiten (10 september 2026, Nicky)

- Effectniveau **3D-accenten**: rustige, snelle basis plus enkele WebGL-elementen.
- **Licht en warm, met diepte**: crème, zand en rosé-goud blijven de basis.
- **AI-beeld mag leidend zijn**, maar eerst bouwen met placeholders; de AI-set
  komt zodra er Higgsfield-tegoed is (nu ~1).
- **Klikbare preview** in dezelfde repo; branch `editie-2`, draft-PR naar `main`.

## Wat de 22 Labs-tryout is

`twentytwo-labs-3d-tryout.vercel.app`: Next.js met scroll-scrub en CSS-3D
(perspective, preserve-3d, matrix3d), géén WebGL. Donker met mintgroene gloed.
De mechanieken die we in warm licht overnemen: portal-hero (de poort schaalt bij
scrollen tot hij het scherm vult), dieptelagen, glas-kaarten met randgloed,
tekstreveal per regel, gepinde secties, en volledige reduced-motion-fallbacks.

## Opbouw

- **Datalaag ongewijzigd**: `lib/behandelingen.ts`, `lib/tarieven.ts`,
  `lib/agenda.ts`, `lib/site.ts` (JSON-LD), `lib/analytics.ts`, de contact-route,
  sitemap, robots, `llms.txt`.
- **Nieuw**: `components/editie2/*` (balk, footer, hero-portaal, scènes,
  accenten), `lib/editie2/beeld.ts` (beeldmanifest), `lib/editie2/beweging.ts`
  (tokens), sectie "Editie 2" onderaan `app/globals.css` (`e2-*`-klassen).
- **Bewegingsstack**: CSS scroll-driven animaties (bestaand) voor alles wat in
  beeld komt; GSAP 3.15 + ScrollTrigger, na idle geladen via
  `components/editie2/beweging/gsap.ts`, uitsluitend voor pins en tekstreveal per
  regel; geen Lenis, geen tweede bewegingsbibliotheek.
- **WebGL** alleen achter `components/editie2/accenten/webgl-poort.tsx`: desktop,
  muis, geen reduced motion, geen databesparing, WebGL 2 zonder software-
  rendering, na idle en pas als de sectie nadert. Anders een stilstaand beeld
  met dezelfde maten.

## Afwijkingen van het plan

- **Geen ffmpeg-clip in de hero.** De meegeleverde ffmpeg (Playwright-build)
  kent alleen VP8; belangrijker: de clip zou uit dezelfde stilstaande foto
  komen. Een CSS-zoom van 7% over achttien seconden op de foto in de poort
  (`.e2-kenburns`) geeft hetzelfde beeld voor nul bytes. Een echte AI-clip met
  parallax kan later in dezelfde poort; de manifest-slot blijft bestaan.

## Beeldmanifest en placeholders

Alles in `lib/editie2/beeld.ts`. Elk beeld heeft een `soort`:

| Soort | Betekenis | Op de site |
|---|---|---|
| `foto` | Echte foto van de studio | Gewoon |
| `placeholder` | Uitsnede van een echte foto tot het AI-beeld er is | Gewoon; bijschrift noemt "sfeerimpressie volgt" waar dat past |
| `ai-bewerking` | Met AI bewerkte variant van een echte foto | Bijschrift "Sfeerimpressie"; footerregel |
| `ai-sfeer` | Met AI gemaakt sfeerbeeld | Bijschrift "Sfeerimpressie"; footerregel |

De footerregel ("Sfeerbeelden zijn deels met AI bewerkt op basis van foto's van
de studio.") verschijnt automatisch zodra het manifest één AI-beeld bevat.

**Ethische grens**: AI-beeld is uitsluitend sfeer, interieur of abstractie. Nooit
een voor/na-"resultaat", nooit een persoon die als klant of medewerker wordt
gepresenteerd. De kliniek keurt elk AI-beeld goed via `docs/te-controleren.md`.

### Shotlist (mijlpaal M4, na opwaarderen van het tegoed)

Stijlzin in elke prompt: "Interieur van een kleine huidkliniek in Nederland,
zacht ochtendlicht door houten jaloezieën, kleuren crème, zand en rosé-goud,
visgraat eikenvloer, matte materialen, rustig en warm, fotorealistisch, geen
mensen, geen tekst, geen logo's." Beide studiofoto's als referentiebeeld, vaste
seed per reeks, eerst 1K-proeven (0,5 tegoed), daarna 2K (6,5).

| # | Plek | Onderwerp | Verhouding | Bestand | Tegoed |
|---|---|---|---|---|---|
| 1 | Hero | Behandelkamer bij het raam, camera in de deuropening | 4:5 en 16:9 | `Images/editie2/hero-poort.jpg` | 0 (echte foto) |
| 3–6 | Rondgang | Entree, lattenwand, productenplank, bed in avondlicht | 3:2 | `Images/editie2/rondgang-*.jpg` | 28 |
| 7 | Laser-kop | Warm licht door een matglazen, huidkleurige laag | 21:9 | `Images/editie2/laser-licht.jpg` | 7 |
| 8 | Gezicht-kop | Waterdruppels en licht in crème en rosé-goud | 21:9 | `Images/editie2/gezicht-water.jpg` | 7 |
| 9 | Sfeerband | Jaloezieën met lichtstrepen op de muur | 21:9 | `Images/editie2/band-daglicht.jpg` | 7 |
| 10 | Fallbacks | Renders uit de eigen WebGL-scènes | 16:9 | `Images/editie2/*-fallback.jpg` | 0 |

Geschat: must-haves ≈ 50 tegoed, met herkansingen ≈ 80.

## Prestatiebudget

| Meetpunt (lab, 4× CPU, Fast 4G) | Doel | Uitgangspunt (`main`) |
|---|---|---|
| LCP homepage desktop / mobiel | ≤ 1,8 s / ≤ 2,5 s | 1,3 s desktop |
| CLS / INP | ≤ 0,02 / ≤ 200 ms | — |
| First-load JS homepage | ≤ 170 kB gzip | 213 kB gzip |
| Lazy na idle | GSAP ≤ 55 kB; three ≤ 220 kB, alleen desktop | — |

Metingen per mijlpaal staan hieronder.

## Metingen

Gemeten met `cdp-meet.mjs` (headless Chromium, 4× CPU-vertraging, 4 Mbit/s,
150 ms latentie) op de lokale productiebuild. "Eerste lading" is alle JS tot het
load-event; "na idle" wat daarna nog binnenkomt (GSAP en de hero-scène).

| Mijlpaal | Scherm | LCP | LCP-element | CLS | JS eerste lading | JS na idle |
|---|---|---|---|---|---|---|
| M0 | 1440×900 | 0,97 s | poortbeeld (IMG) | 0 | 178 kB | 75 kB |
| M0 | 390×844 | 0,89 s | poortbeeld (IMG) | 0 | 178 kB | 54 kB |

Het poortbeeld is nu het grootste element in plaats van de h1; het staat er
ruim binnen het doel omdat het het enige `priority`-beeld is.

## Mijlpalen

| | Inhoud | Stand |
|---|---|---|
| M0 | Fundament: branch, bibliotheken, manifest, balk, hero-portaal, draft-PR | klaar (10 sep) |
| M1 | Homepage compleet | — |
| M2 | Behandelpagina's, huidlagen, lichtband | — |
| M3 | Ring-accent, tarieven/boeken/privacy, a11y, bundelmeting | — |
| M4 | AI-beeld (na tegoed) | — |
| M5 | Go-live | — |

## Checklist go-live

- Vercel: Deployment Protection gecontroleerd (Hobby zet Vercel Authentication
  voor previews standaard aan; de kliniek moet de preview kunnen openen), en
  `editie-2` is nooit Production Branch.
- Menu gemeten op 1024/1100/1280; hamburgericoon zichtbaar op transparante én
  vaste balk.
- Vóór/na-meting LCP/CLS/INP hierboven ingevuld; Speed Insights van de preview
  bekeken.
- Oude componenten en `public/images/*.jpg` verwijderd als niets ze meer
  importeert; `public/llms.txt` en `docs/stand-van-zaken.md` bijgewerkt.
- Precies één h1 per pagina, JSON-LD ongewijzigd (Rich Results Test), sitemap
  zes URL's.

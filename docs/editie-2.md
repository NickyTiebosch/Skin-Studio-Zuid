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
- **Homepage (M1)**, van boven naar beneden: hero-portaal → intro-strip →
  behandelkaarten (glas over een fotoband, plus kaart "Onder één dak" naar de
  tarieven) → tellers (6 / 18 / 3, uit de datalaag) → rondgang (desktop:
  gepind horizontaal; mobiel en reduced motion: native scroll-snap) → De Studio
  (rond beeld, slot voor accent A) → traject (gepinde tijdlijn met lichtstraal,
  knop naar `/boeken?behandeling=consult`) → quote → producten (echte
  plank-uitsnede) → contact (formulier in glas) → footer. Ankers
  `#behandelingen`, `#rondgang`, `#studio`, `#traject`, `#producten`, `#contact`.
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
- **`overflow: clip` in plaats van `overflow: hidden`** rond alles wat op de
  scroll-tijdlijn beweegt. Bij het bouwen van de tellers (M1) bleek dat
  `<main>` op elke pagina `overflow-x: hidden` had; zo'n element is voor de
  browser een scroll-container, en `animation-timeline: view()` rekent dan
  tegen dát element in plaats van tegen het venster. Gevolg: elke reveal stond
  meteen in de eindstand, ook op `main` (niemand merkte het, want de zichtbare
  toestand is de basis, regel 1). `overflow: clip` knipt wél en maakt géén
  scroll-container. Sinds M1 is dat regel 5 in `app/globals.css`; de live site
  heeft dezelfde fout nog (drie bestanden, één woord per regel).
- **Placeholders in de rondgang zijn uitsnedes met zoom en tint.** Zolang de
  AI-beelden er niet zijn, wijzen "De entree", "De Kalahari-plank" en "Aan het
  eind van de dag" naar de twee echte foto's; om ze niet drie keer identiek te
  tonen heeft het manifest `zoom` (inzoomfactor op de `positie`) en `tint:
  "avond"` (warme walnoot/rosé-verloop, `mix-blend-mode: multiply`). Bij het
  wisselen naar een AI-beeld vervallen die twee velden gewoon.
- **De aanvraagkalender laadt alleen op /boeken.** `components/contact-section.tsx`
  haalt `AfspraakKiezer` nu via `next/dynamic` (`ssr: false`) binnen; op de
  homepage zit hij niet meer in de eerste lading.
- **Geen "Waarom wij"-sectie meer.** De drie iconen ("Medische innovatie 2026",
  "Pijnvrije ervaring", "Direct zichtbaar resultaat") maakten claims die de
  datalaag niet draagt; de tellers (feiten uit `lib/tarieven.ts`) en het
  traject nemen die plek in.

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
150 ms latentie) op de lokale productiebuild. Sinds M1 telt "eerste lading" de
scripts die in de HTML zelf staan (alles wat nodig is om te tekenen en te
hydrateren) en "na idle" wat pas later via `import()` binnenkomt: GSAP +
ScrollTrigger (44 kB) en de scènes. De M0-rijen zijn met de oude, tijdgebonden
verdeling gemeten (alles vóór het load-event), dus 178 kB daar is vergelijkbaar
met 161 kB nu min de kalender die toen nog op de homepage zat. Bij "na idle"
zitten op desktop ook ~30 kB prefetch van de gelinkte pagina's
(`/laserontharing`, `/gezichtsbehandelingen`, `/tarieven`), gewoon Next.js-gedrag.

| Mijlpaal | Scherm | LCP | LCP-element | CLS | JS eerste lading | JS na idle |
|---|---|---|---|---|---|---|
| M0 | 1440×900 | 0,97 s | poortbeeld (IMG) | 0 | 178 kB | 75 kB |
| M0 | 390×844 | 0,89 s | poortbeeld (IMG) | 0 | 178 kB | 54 kB |
| M1 | 1440×900 | 0,94 s | poortbeeld (IMG) | 0 | 161 kB | 75 kB (44 GSAP + 30 prefetch) |
| M1 | 390×844 | 0,92 s | poortbeeld (IMG) | 0 | 161 kB | 54 kB (44 GSAP + 10 prefetch) |
| M1 | 1440×900, reduced motion | 0,95 s | poortbeeld (IMG) | 0 | 161 kB | 30 kB (alleen prefetch; geen GSAP) |

Het poortbeeld is nu het grootste element in plaats van de h1; het staat er
ruim binnen het doel omdat het het enige `priority`-beeld is. De eerste lading
zit sinds M1 onder het budget van 170 kB (`main`: 213 kB).

Gecontroleerd in M1, naast de metingen: de tellers tellen echt (0 → 2/6/1 →
6/18/3 bij het binnenkomen), reveals staan buiten beeld op 0 en in beeld op 1,
bij reduced motion staat alles direct in de eindstand en wordt GSAP niet
geladen (geen `canvas`, geen `video`, geen pin-spacer in de DOM), op desktop
staan precies drie pins (hero, rondgang, traject) en één h1.

## Mijlpalen

| | Inhoud | Stand |
|---|---|---|
| M0 | Fundament: branch, bibliotheken, manifest, balk, hero-portaal, draft-PR | klaar (10 sep) |
| M1 | Homepage compleet: glas-kaarten, tellers, rondgang, studio, traject, producten, contact in glas | klaar (10 sep) |
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

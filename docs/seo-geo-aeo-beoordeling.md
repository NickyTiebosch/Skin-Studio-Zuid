# Beoordeling SEO, GEO en AEO — Skin Studio Zuid, regio Den Bosch

Datum: 9 oktober 2026. Beoordeeld op de productie-URL
`https://skin-studio-zuid.vercel.app` (live opgehaald) én op de code op `main`.
Gebruikte skills: `ai-seo-google-expert`, `ai-geo-expert` en `ai-aeo-expert`,
eerst getoetst op actualiteit (zie `docs/skills/README.md`: alle drie waren
verouderd op punten die precies deze site raken; de bijgewerkte versies staan
in `docs/skills/`).

Wat níét gelukt is: zoekvolumes en moeilijkheidsscores uit Ahrefs ("Insufficient
plan") en Semrush ("geen API-units meer"). Waar hieronder over zoekvolume wordt
gesproken is dat een inschatting op basis van de SERP, niet een gemeten getal.
Ook kon Google Maps/Google Business Profile niet rechtstreeks bevraagd worden;
de conclusie daarover is afgeleid uit wat het open web over het bedrijf
teruggeeft.

---

## Samenvatting

**De techniek van de site is in orde, maar de site bestaat voor Google en voor
AI-assistenten nog niet.** De zoekopdracht `"Skin Studio Zuid" 's-Hertogenbosch`
levert op het open web alleen twee app-store-vermeldingen van de loyalty-app op,
plus een Instagram-account met 50 volgers. De website zelf komt niet voor, ook
niet op de eigen merknaam. Voor `laserontharing den bosch` en
`gezichtsbehandeling den bosch` staan tien concurrenten in de top 10, en Skin
Studio Zuid staat nergens.

Dat heeft drie oorzaken, in volgorde van gewicht:

1. **Het domein is nog niet gekoppeld.** Het echte domein is
   `skinstudio-zuid.nl` (mét streepje; de naam zonder streepje in oudere
   notities was een vergissing uit het e-mailadres). Het toont vandaag nog
   de parkeerpagina van TransIP, terwijl productie er sinds 9 oktober al naar
   canonicaliseert. De site draait op een `vercel.app`-subdomein, waar geen
   enkele externe link, vermelding of Google Business Profile naartoe wijst.
   Alles wat nu aan autoriteit wordt opgebouwd moet straks via een migratie
   worden meegenomen.
2. **Er is geen Google Business Profile (GBP) gevonden**, geen enkele review,
   geen vermelding in een gids, geen Search Console. Voor lokale zoekopdrachten
   is het local pack (de kaart met drie bedrijven) het slagveld; de concurrent
   Huidzorg Clinics heeft daar 327 Google-reviews. Zonder GBP is de site
   onzichtbaar in Maps, in de AI Overviews voor lokale vragen én in de
   "agentic booking" die Google in 2026 voor beauty-diensten uitrolt.
3. **De site mist de vertrouwens- en feitensignalen** waar Google en AI-modellen
   in 2026 expliciet op sturen: wie behandelt er (naam, opleiding,
   certificering), openingstijden, reviews, behandelduur, aantal sessies,
   nazorg. De tekst zegt "gecertificeerde specialisten" zonder te zeggen wie.

De on-page SEO (titels, canonicals, sitemap, structured data, één H1 per pagina,
alt-teksten, snelheid) is bovengemiddeld goed voor een site van deze omvang.
Daar hoeft weinig aan. De winst zit buiten de code: domein, GBP, reviews,
inhoud van de kliniek zelf.

### Score per onderdeel

| Onderdeel | Score | Toelichting |
|---|---|---|
| Technische SEO | 8/10 | Statisch gerenderd, canonicals, sitemap, robots, OG, lang=nl, geen fouten in de build. Minpunten: sitemap-`lastmod` is de buildtijd, `vercel.app`-URL overal |
| On-page SEO | 7/10 | Titels en meta's goed, H1's op subpagina's met behandeling + plaats. Homepage-H1 zonder behandeling of plaats, "Den Bosch" komt bijna niet voor in lopende tekst |
| Structured data | 7/10 | BeautySalon, Service met vanaf-prijs, BreadcrumbList, FAQPage. Mist openingstijden, geo, priceRange, personen, GBP in sameAs |
| Lokale SEO | 2/10 | Geen GBP gevonden, geen reviews, geen vermeldingen, geen contactpagina met eigen URL, geen buurt/plaats-dekking |
| Content en E-E-A-T | 4/10 | Goede uitleg per behandeling, maar anoniem, zonder cijfers, zonder nazorg, met twee feitelijke tegenstrijdigheden (laser, Hydrafacial) |
| AEO | 5/10 | Vraag-koppen en tabellen aanwezig; antwoorden ontwijken getallen. FAQ-schema levert sinds 7 mei 2026 geen rich result meer op |
| GEO | 4/10 | AI-crawlers toegelaten, llms.txt aanwezig (nul waarde voor Google). Geen enkele onafhankelijke bron noemt het bedrijf, dus AI kan het niet aanbevelen |
| Meten | 2/10 | Alleen Vercel Analytics. Geen Search Console, geen GA4, dus ook geen rapport over AI-vertoningen |

---

## 1. Wat er goed staat (en zo moet blijven)

Gecontroleerd op de live site:

- Alle pagina's geven 200, zijn statisch voorgerenderd (`○` in de build) en
  bevatten de volledige tekst in de HTML. Geen inhoud achter JavaScript.
- `robots.txt`: alles toegestaan, `/api/` uitgesloten, twaalf AI-crawlers
  expliciet toegelaten, sitemap-verwijzing. Preview-deploys staan op noindex.
- Sitemap: zes URL's, allemaal canoniek.
- Elke pagina precies één `<h1>`; canonicals per pagina; `max-snippet:-1`,
  `max-image-preview:large` (Google's eigen aanbeveling voor AI-vertoningen).
- Titels: "Gezichtsbehandelingen & laserontharing in Den Bosch | Skin Studio
  Zuid" en "Laserontharing Den Bosch — Atres Triple Wave | Skin Studio Zuid".
  Zoekwoord vooraan, plaats erin, merk erachter. Goed.
- Afbeeldingen: alle zes met beschrijvende alt-tekst, via `next/image`,
  hero met `priority`.
- JSON-LD: `BeautySalon` met adres, telefoon, e-mail, `areaServed`,
  `knowsAbout`, `makesOffer`; per behandelpagina `Service` (gekoppeld via
  `@id`), `FAQPage` en `BreadcrumbList`. De vanaf-prijs in `offers` klopt met
  de tarievenpagina (Google eist dat structured data overeenkomt met zichtbare
  tekst).
- Tarieven staan in echte `<table>`-elementen met `<th scope="row">`.
- Kruimelpad zichtbaar én als schema.
- Meting van Core Web Vitals via Speed Insights; LCP op de homepage is
  gedocumenteerd op 1,3 s.

---

## 2. Technische SEO — bevindingen

### 2.1 Het domein (blokkerend)

Het echte domein `skinstudio-zuid.nl` (en `www.`) toont vandaag de
"Reserved"-parkeerpagina van TransIP over http; de naam zonder streepje uit
oudere notities resolvet helemaal niet. Sinds de deploy van 9 oktober wijzen
canonical, sitemap en `robots.txt` van productie naar `skinstudio-zuid.nl`,
dus tot de DNS naar Vercel wijst, vertelt elke pagina aan Google dat de
echte versie op een parkeerpagina staat. Dat maakt de koppeling urgent.
Gevolgen zolang het niet gekoppeld is:

- Canonical, sitemap, `robots.txt`, OpenGraph, `llms.txt` en alle `@id`'s in
  de structured data wijzen naar `skin-studio-zuid.vercel.app`. Dat is
  technisch consistent, maar het is een adres dat niemand ooit linkt of
  intypt.
- Een GBP kan pas een website-URL krijgen die klanten herkennen als het domein
  werkt.
- Het e-mailadres `info@skinstudio-zuid.nl` staat in de structured data en op
  elke pagina, maar kan geen mail ontvangen (geen MX). Een AI-assistent of
  Google die dat adres doorgeeft, stuurt klanten naar een bodemloze put.

Zodra het domein werkt (stappen staan in `docs/vercel.md`): domein koppelen in
Vercel, `NEXT_PUBLIC_SITE_URL` zetten, `public/llms.txt` bijwerken, en in
Search Console de "Change of Address" gebruiken voor het `vercel.app`-adres
(Google heeft die tool in juni 2026 uitgebreid naar alle subdomeinvarianten).
Vercel zet dan zelf 308-redirects van `vercel.app` naar het domein.

### 2.2 Sitemap-`lastmod` is de buildtijd

`app/sitemap.ts` zet `lastModified: new Date()` op álle zes pagina's. Elke
deploy — ook een tekstwijziging in de footer — vertelt Google dat alle pagina's
vandaag zijn gewijzigd. Google heeft aangegeven `lastmod` alleen te vertrouwen
als hij consistent klopt; anders wordt hij genegeerd. Beter: een vaste datum
per pagina bijhouden (bijvoorbeeld in `lib/behandelingen.ts` en
`lib/tarieven.ts` een veld `bijgewerkt`), en die ook zichtbaar op de pagina
tonen ("Bijgewerkt op …"), wat tegelijk een freshness-signaal voor AI is.

### 2.3 Kleine punten

- `Host:` in `robots.txt` wordt alleen door Yandex gelezen; onschadelijk.
- `/boeken` is dynamisch (`ƒ`) vanwege de querystring; prima. Eigen titel,
  beschrijving en canonical staan erop (gecontroleerd in de code).
- De OG-afbeelding van de homepage krijgt een cache-hash in de URL, de
  subpagina's niet; dat is al gedocumenteerd in `lib/site.ts`.
- Er is geen `/contact`-URL: contact is `/#contact` op de homepage. Voor GBP,
  gidsen en AI-assistenten is een eigen contactpagina met NAP, kaart,
  openingstijden en route (parkeren, OV) het natuurlijke doel. Nu moet alles
  naar de homepage wijzen.

---

## 3. On-page SEO en zoekintentie voor Den Bosch

### 3.1 Welke zoekwoorden ertoe doen

Zonder volumedata, op basis van de SERP's en hoe de concurrentie zijn titels
heeft gebouwd:

| Cluster | Voorbeelden | Intentie | Pagina nu | Pagina die nodig is |
|---|---|---|---|---|
| Laserontharing + plaats | laserontharing den bosch, laser ontharen den bosch, definitief ontharen den bosch, laserkliniek den bosch | transactioneel/lokaal | `/laserontharing` | aanwezig, uitbreiden |
| Laserontharing + lichaamsdeel | laserontharing oksels, bikinilijn, gezicht, benen, rug mannen | commercieel | `/tarieven` (alleen prijsregel) | per zone een sectie of pagina met prijs, duur, aantal sessies |
| Laserontharing + vraag | hoeveel behandelingen laserontharing, doet laserontharing pijn, laseren in de zomer, laserontharing prijzen | informatief | FAQ op `/laserontharing` | antwoorden met getallen |
| Gezichtsbehandeling + plaats | gezichtsbehandeling den bosch, huidverbetering den bosch, schoonheidssalon den bosch | commercieel/lokaal | `/gezichtsbehandelingen` | aanwezig |
| Merk/apparaat | hydrafacial den bosch, atres hydraspa, triple wave laser | commercieel | verspreid | ligt gevoelig: zie 5.2 |
| Omliggende plaatsen | laserontharing vught, rosmalen, sint-michielsgestel, vlijmen, boxtel | lokaal | geen | werkgebied benoemen op de site en in GBP |

Let op de spelling. Zoekers typen bijna altijd "Den Bosch"; de site gebruikt
in de lopende tekst vrijwel uitsluitend "'s-Hertogenbosch" (homepage: één keer
"Den Bosch" tegenover vier keer "'s-Hertogenbosch"). Google begrijpt dat het
dezelfde plaats is, maar voor titels, H1's en de eerste alinea is de vorm die
mensen zoeken de betere keuze. Gebruik beide, en laat "Den Bosch" winnen waar
het om zoekwoorden gaat.

### 3.2 Homepage

- De H1 "Geef je huid de aandacht die het verdient." is een merkuitspraak
  zonder behandeling of plaats. Bewust zo gelaten (zie
  `docs/te-controleren.md`), maar het blijft de grootste on-page kans: de
  homepage is de pagina met de meeste interne links en zou op "laserontharing
  en gezichtsbehandelingen in Den Bosch" moeten mikken. Een compromis dat het
  ontwerp intact laat: de kleine regel erboven ("Skin Studio Zuid -
  's-Hertogenbosch") omzetten naar "Laserontharing & gezichtsbehandelingen in
  Den Bosch" en de H1 laten staan.
- De H3 "Medische Innovatie 2026" veroudert op 1 januari. Jaartallen in koppen
  zijn een bekende AI-valkuil (verouderde content wordt genegeerd).
- "Zuid" betekent voor een zoeker niets zonder context. Eén zin die de buurt
  benoemt ("in Zuid, vlak bij …, gratis parkeren voor de deur") helpt zowel
  mensen als het local-pack-algoritme, dat sinds de core update van maart 2026
  zwaarder op nabijheid en lokale inhoud weegt.

### 3.3 Behandelpagina's

- Openingsalinea van `/laserontharing` begint met "In onze kliniek werken wij
  uitsluitend met de beste technologie." Dat is marketing, geen antwoord. Voor
  snippet en AI-extractie hoort de eerste alinea de vraag te beantwoorden:
  wat, waar, voor wie, vanaf welke prijs, hoe begint het (gratis intake).
- H2's zijn generiek ("Hoe het werkt", "De voordelen op een rij"). Als vraag
  geformuleerd ("Hoe werkt laserontharing?", "Wat kost laserontharing in Den
  Bosch?") sluiten ze aan op hoe mensen zoeken en op People Also Ask. Google
  zegt in zijn AI-gids dat herschrijven "voor AI" niet nodig is; dit is geen
  truc maar gewoon duidelijker voor de lezer.
- De FAQ-antwoorden ontwijken systematisch het getal: "Hoeveel behandelingen
  heb ik nodig?" → "dat verschilt". Elke concurrent in de top 10 noemt een
  bandbreedte (6 tot 8 sessies, 4 tot 8 weken ertussen). Zonder getal wint de
  pagina geen snippet en citeert geen AI hem. Dit moet van de kliniek komen;
  zie `docs/te-controleren.md`.
- Er staat geen behandelduur, geen nazorg en geen contra-indicatie-indicatie.
  Nazorg ("24 uur geen zon, geen sauna") is informatie waar actief op gezocht
  wordt en die geen medisch risico vormt om te noemen.
- `/gezichtsbehandelingen` heeft maar één prijs (€ 45) en geen duur. Voor
  "gezichtsbehandeling den bosch" tonen concurrenten (Dermalogica, Faceland)
  prijsranges en behandeltypes; de pagina is daar dun tegenover.

### 3.4 Tarievenpagina

- H1 "Tarieven in 's-Hertogenbosch" mist het zoekwoord; "Tarieven
  laserontharing en gezichtsbehandeling Den Bosch" dekt de zoekvraag
  "laserontharing prijzen den bosch".
- De tabellen hebben alleen rijkoppen. Een `<thead>` met "Zone" en "Prijs per
  behandeling" maakt ze geschikt voor table-snippets en voor AI-extractie.
- Kolom "Duur" ontbreekt omdat de duur niet bekend is; die is ook de blokkade
  voor het boekingssysteem. Eén aanlevering van de kliniek lost drie dingen op.

### 3.5 Interne links

Goed: menu naar beide behandelpagina's en tarieven, kaarten op de homepage,
kruislinks tussen de behandelingen, footer. Te verbeteren: nergens een link
naar een contact- of over-ons-URL (die bestaan niet), en de ankerteksten zijn
alleen de behandelnaam. "Laserontharing in Den Bosch" als ankertekst op de
tarievenpagina staat er al; op de homepage nog niet.

---

## 4. Lokale SEO — de grootste achterstand

### 4.1 Google Business Profile

Niet gevonden via het open web; de kliniek moet zelf in Google Maps kijken.
Als er geen profiel is, is dit de eerste actie, vóór alles in de code. Het
local pack bepaalt voor "laserontharing den bosch" de bovenste helft van het
scherm op mobiel, en Google's eigen AI-gids (mei 2026) noemt GBP letterlijk als
de bron voor lokale bedrijven in AI Overviews en AI Mode.

Checklist voor het profiel, afgestemd op wat Google in 2026 zwaarder weegt
(volledigheid van het profiel, recente reviews, reactie van de eigenaar):

- Primaire categorie "Laserontharingscentrum" (Laser hair removal service),
  secundair "Schoonheidssalon" en "Huidverzorgingskliniek".
- Naam exact "Skin Studio Zuid" (geen zoekwoorden erin: dat is tegen de regels
  en wordt sinds 2025 actief bestraft).
- Adres, telefoon en website identiek aan de site (NAP). Telefoon: 073 689
  6423; de flyers tonen nog 073-2032756 en moeten herdrukt worden.
- Openingstijden invullen. "Op afspraak" kan in GBP, maar dan ontbreekt het
  profiel in "open nu"-zoekopdrachten.
- Diensten per lichaamsdeel met prijs (sinds maart 2026 vult Google die anders
  zelf in met AI, en dan vaak fout).
- Minimaal tien foto's: gevel, behandelkamer, apparaat, team.
- Reviewstrategie: elke klant na de behandeling een directe reviewlink (QR op
  de balie, link in de bevestigingsmail van het aanvraagformulier). Elke review
  beantwoorden. Doel: 25 reviews in het eerste kwartaal; Huidzorg Clinics zit
  op 327.
- Wekelijks een bericht (actie, tip, foto). Google heeft in 2026 terugkerende
  berichten mogelijk gemaakt; de kuuractie leent zich daarvoor.

### 4.2 Vermeldingen en links

Er is nu geen enkele onafhankelijke bron die het bedrijf noemt. Voor een lokale
kliniek zijn dit de eerste tien:

1. Google Business Profile (zie boven)
2. Apple Business Connect (Apple Kaarten; relevant omdat de agenda op iCloud
   draait en Siri/Apple-klanten lokaal zoeken)
3. Bing Places (voedt Copilot en ChatGPT-zoekresultaten)
4. KvK-vermelding met website
5. Treatwell of Salonized-profiel (staan allebei in de top 10 voor beide
   zoekwoorden; ook als er niet via geboekt wordt, is de vermelding een link)
6. Facebook-pagina met dezelfde NAP
7. Instagram-bio: website-URL en adres (nu alleen "Jouw luxe salon voor
   laserontharing & gezichtsbehandeling!")
8. De loyalty-app in Google Play en App Store (`nl.skinstudiozuid.app`):
   website-URL in de storevermelding, en andersom de app in `sameAs`
9. Leverancier van de Atres-apparatuur: vraag een vermelding op hun
   "waar te vinden"-pagina (dealer/partnerlijst). Dat is tegelijk het enige
   externe bewijs voor de claim "medisch gecertificeerde laser"
10. Lokale gidsen: indebuurt Den Bosch, Bossche Omroep/Brabants Dagblad bij een
    opening of actie, wijkvereniging Zuid

### 4.3 Werkgebied

De site noemt alleen 's-Hertogenbosch. De concurrentie in de top 10 zit in
Rosmalen, Waalwijk en Heesch en richt zich met aparte pagina's op Den Bosch.
Omgekeerd kan Skin Studio Zuid in één alinea op de contact- of homepage
benoemen dat klanten uit Vught, Rosmalen, Sint-Michielsgestel, Vlijmen, Engelen
en Boxtel komen, met reistijd en parkeren. Geen aparte plaatspagina's per dorp;
Google's gids van mei 2026 noemt dat soort "pagina per variant" expliciet als
scaled content abuse.

---

## 5. Content, E-E-A-T en feitelijke risico's

### 5.1 Wie behandelt er?

De site noemt geen enkele naam. Google's richtlijnen voor "Your Money or Your
Life"-onderwerpen (laserbehandelingen vallen daaronder) wegen aantoonbare
expertise zwaar, en de AI Overviews-update van mei 2026 voegde een
"Expert Advice"-blok toe dat juist eerstehands ervaring van genoemde mensen
toont. Nodig: een over-ons-pagina met naam, foto, opleiding, certificaten
(laserveiligheid, huidtherapie, Atres-training), jaren ervaring, en een
`Person`-object in de structured data gekoppeld aan `BeautySalon` via
`employee` of `founder`.

### 5.2 Twee tegenstrijdigheden die eerst opgelost moeten worden

Beide staan al in `docs/te-controleren.md`, maar ze zijn ook een SEO-risico:

- **Laser**: site zegt "Atres Triple Wave, drie golflengtes"; flyers zeggen
  "Professionele Diode Ice Laser". Een AI-model dat beide bronnen leest
  (site én een foto van de flyer op Instagram) ziet een inconsistentie en
  verlaagt zijn vertrouwen. Eén waarheid kiezen en overal doorvoeren.
- **Hydrafacial**: beschermd merk van een andere fabrikant. Op de
  tarievenpagina en in `llms.txt` staat "Hydrafacial EUR 45", op de
  behandelpagina "HydraSpa". Zoekers typen wel "hydrafacial den bosch";
  de nette oplossing is één zin op de pagina: "Zoekt u een hydrafacial?
  Onze HydraSpa-behandeling werkt volgens hetzelfde principe …" en het
  merkwoord verder nergens als eigen behandelnaam gebruiken.

### 5.3 Ontbrekende feiten (aan te leveren door de kliniek)

Dit is dezelfde lijst als in `docs/te-controleren.md`, nu gerangschikt op
SEO-effect:

1. Aantal sessies en interval per zone (grootste snippet- en AI-kans)
2. Behandelduur per behandeling (tarieven, boeken, GBP-diensten)
3. Openingstijden (GBP, schema, voice search "open nu")
4. Naam en certificering van de behandelaar(s)
5. Nazorg en wat te vermijden vóór een sessie (zon, scheren, crèmes)
6. Parkeren en bereikbaarheid
7. Geldigheid van de kuuractie

### 5.4 Reviews op de site

Zodra er Google-reviews zijn: drie citaten met voornaam op de homepage en de
behandelpagina's. Niet als `AggregateRating` in de structured data: Google
staat alleen reviews toe die op de site zelf zijn verzameld, en sinds juli
2026 geldt een extra richtlijn tegen onvermelde beloonde reviews. De
Google-sterren zelf komen via het GBP in de zoekresultaten.

---

## 6. AEO — antwoorden en snippets

Belangrijkste wijziging sinds de skill geschreven werd: **FAQ rich results zijn
op 7 mei 2026 door Google afgeschaft** en de documentatie is in juni verwijderd.
Het `FAQPage`-schema op de behandelpagina's mag blijven staan (Google zegt dat
ongebruikte structured data geen kwaad kan en Bing, Perplexity en ChatGPT lezen
hem nog), maar hij levert geen uitklapbare vragen onder het zoekresultaat meer
op. De inhoud van de FAQ telt nog wél: voor People Also Ask, voor AI Overviews
en voor ChatGPT.

Wat de site nu doet en wat beter kan:

| Element | Nu | Beter |
|---|---|---|
| Vraag-koppen | FAQ-vragen als H3 onder "Veelgestelde vragen" | Ook de hoofdsecties als vraag (H2), antwoord in de eerste 40 tot 60 woorden eronder |
| Antwoord-eerst | Openingsalinea is een USP-zin | Eerste alinea per pagina: wat, waar, vanaf-prijs, hoe het begint |
| Getallen | "verschilt per persoon" | Bandbreedtes: sessies, weken ertussen, minuten per zone, prijs vanaf |
| Tabellen | Tarieven in `<table>` met rijkoppen | Kolomkoppen toevoegen; een tabel "zone — duur — prijs — sessies" is de ideale table-snippet |
| Lijsten | Voordelen als `<ul>` | Een genummerde lijst "Zo verloopt een laserbehandeling in 5 stappen" (list-snippet, en HowTo-schema is hiervoor niet meer nodig: die rich result bestaat niet meer) |
| Voice / "in de buurt" | geen openingstijden | Openingstijden in GBP én `openingHoursSpecification` |
| Speakable-schema | geen | Niet toevoegen: alleen voor nieuwssites, geen effect voor een kliniek |

---

## 7. GEO — zichtbaarheid in AI-assistenten

### 7.1 Wat klopt

- AI-crawlers toegelaten (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot,
  Google-Extended, enz.). Dit is de voorwaarde om überhaupt geciteerd te worden.
- Volledige tekst server-side in de HTML.
- Structured data consistent met de zichtbare tekst.
- `llms.txt` aanwezig en inhoudelijk correct. Weet wel dat Google in juni 2026
  officieel heeft vastgelegd dat Search het bestand niet gebruikt, en dat
  metingen over 500 miljoen AI-bot-bezoeken laten zien dat ook GPTBot en
  ClaudeBot hem vrijwel nooit ophalen. Laten staan kost niets; bijhouden hoeft
  alleen bij een prijswijziging. Verwacht er geen zichtbaarheid van.

### 7.2 Wat ontbreekt

AI-assistenten bevelen een lokaal bedrijf aan op basis van wat meerdere
onafhankelijke bronnen erover zeggen. Voor Skin Studio Zuid is dat aantal nul.
Vraag ChatGPT, Perplexity of Google AI Mode vandaag "beste laserontharing in
Den Bosch" en het antwoord noemt Huidzorg Clinics, Aurea Aesthetics, Laserclinic
by Manon — bedrijven met reviews, gidsvermeldingen en nieuwsberichten. De
volgorde van werken is dus dezelfde als bij lokale SEO: GBP, reviews,
vermeldingen, dan pas verfijning op de site.

Google's eigen "mythbusting"-lijst (gids van mei 2026, bijgewerkt juli 2026)
is hier richtinggevend: geen aparte AI-bestanden, geen content "opknippen",
geen herschrijven voor AI, geen gezochte vermeldingen, geen extra schema. Wat
wél telt: unieke, eerstehands inhoud die niemand anders heeft. Voor een kliniek
is dat: eigen foto's van resultaat na X sessies (met toestemming), een
eerlijke uitleg wat niet werkt, de ervaring van de behandelaar.

### 7.3 Meten

- Search Console inrichten (kan nu al op het `vercel.app`-adres, later
  overzetten). Daarin zit sinds 2026 het rapport "Generatieve AI" met
  vertoningen en klikken uit AI Overviews en AI Mode. Controleer ook of de site
  daar "opgenomen in generatieve AI-functies" staat; dat is sinds 2026 een
  instelling.
- GA4 met een kanaalgroep "AI" voor verwijzingen van `chatgpt.com`,
  `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`, `claude.ai`.
- Maandelijks handmatig: vijf vaste prompts in ChatGPT, Perplexity en AI Mode
  ("laserontharing den bosch", "gezichtsbehandeling den bosch aanrader",
  "hoeveel kost laserontharing oksels den bosch", enz.) en noteren of en hoe
  het bedrijf genoemd wordt.

---

## 8. Structured data — concrete aanvullingen

In `lib/site.ts`, `bedrijfsSchema()`:

```
priceRange: "€20 - €250"
openingHoursSpecification: [...]          // zodra bekend
geo: { "@type": "GeoCoordinates", latitude, longitude }
hasMap: "<Google Maps-URL van het GBP>"
sameAs: [Instagram, Facebook, GBP-URL, Google Play, App Store, KvK]
founder / employee: { "@type": "Person", name, jobTitle, hasCredential }
currenciesAccepted: "EUR", paymentAccepted: "Pin, contant"
```

En per `Service`: `hoursAvailable` niet nodig, wel een `OfferCatalog` met de
zones en prijzen zodra de tarieven definitief zijn (ze staan nu alleen als
vanaf-prijs). Alles moet zichtbaar op de pagina staan; dat is sinds de AI-gids
een expliciete Google-eis.

Niet toevoegen: `AggregateRating` op basis van Google-reviews (niet toegestaan),
`HowTo` (rich result bestaat niet meer), `Speakable` (alleen nieuws).

---

## 9. Prioriteiten en planning

### Nu, buiten de code (kliniek en Nicky)

1. Domein repareren en e-mail werkend maken (`docs/vercel.md`).
2. Google Business Profile claimen of aanmaken en volledig invullen.
3. Reviews gaan vragen vanaf de eerste klant na het profiel.
4. De zeven feiten uit 5.3 aanleveren.
5. Laser- en Hydrafacial-tegenstrijdigheid beslissen.
6. Search Console en GA4 aanmaken.

### Daarna, in de code (één sprint)

7. Over-ons-pagina met behandelaar en certificaten; `Person` in schema.
8. Contactpagina op `/contact` met NAP, kaart, openingstijden, parkeren,
   werkgebied; `openingHoursSpecification`, `geo`, `hasMap`, `priceRange`,
   `sameAs` uitbreiden.
9. Behandelpagina's: antwoord-eerst openingsalinea, H2's als vragen,
   FAQ-antwoorden met getallen, nazorg-sectie, stappenlijst.
10. Tarieven: H1 met zoekwoord, kolomkoppen, kolom duur en sessies.
11. Homepage: subkop met behandeling + "Den Bosch", "2026" uit de kop, buurt
    en werkgebied benoemen.
12. Sitemap `lastmod` op echte wijzigingsdatum; "Bijgewerkt op" zichtbaar.
13. Bij domeinmigratie: `NEXT_PUBLIC_SITE_URL`, `llms.txt`, Change of Address.

### Doorlopend

- Wekelijks GBP-bericht, elke review beantwoorden.
- Per kwartaal: prijzen en teksten nalopen, `lastmod` bijwerken, vijf
  AI-prompts testen, Search Console-rapport generatieve AI bekijken.

### Verwachting

Lokale SEO reageert sneller dan organische rankings: een volledig GBP met
twintig recente reviews kan binnen zes tot tien weken in het local pack staan
voor "laserontharing den bosch". Organische posities op de behandelpagina's
duren drie tot zes maanden na de domeinmigratie. Vermelding in AI-antwoorden
volgt pas als er meerdere onafhankelijke bronnen zijn; reken op zes maanden na
de eerste reviews en vermeldingen.

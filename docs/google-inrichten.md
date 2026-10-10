# Google Business Profile en Search Console inrichten

Draaiboek voor Skinstudio Zuid, geschreven 10 oktober 2026, toen het domein
`skinstudio-zuid.nl` net op Vercel stond. Twee accounts, in deze volgorde:
eerst het Business Profile (dat bepaalt de zichtbaarheid op de kaart en in
AI-antwoorden), dan Search Console (dat meet wat Google met de site doet).

De gegevens die overal exact hetzelfde moeten zijn, komen uit
`lib/contact.ts`:

| Veld | Waarde |
|---|---|
| Naam | Skinstudio Zuid |
| Adres | Hildebrandstraat 8, 5216 VR 's-Hertogenbosch |
| Telefoon | 073 689 6423 |
| E-mail | info@skinstudio-zuid.nl |
| Website | https://skinstudio-zuid.nl |
| Afspraak | https://skinstudio-zuid.nl/boeken |

Eén afwijking (een extra woord in de naam, een ander nummer op de flyer) is
voor Google een reden om twee bedrijven te zien in plaats van één. De flyers
dragen nog 073-2032756; die moeten bij de volgende druk mee.

---

## Deel 1 — Google Business Profile

### Stap 0: wie is de eigenaar?

Het profiel hoort op een Google-account **van de kliniek**, niet op dat van
de websitebouwer. Een profiel dat op het account van een bureau staat, is
later lastig over te dragen en verdwijnt als het bureau stopt. Werkwijze:

1. De kliniek maakt (of heeft al) een Google-account, bij voorkeur op het
   eigen domein zodra de mailbox werkt: `info@skinstudio-zuid.nl`. Een
   Gmail-adres mag ook.
2. De kliniek maakt het profiel aan met dat account (stap 1 hieronder) en
   voegt daarna Nicky toe als **Beheerder** (Profiel → Instellingen →
   Personen en toegang → Toevoegen). Een beheerder kan alles aanpassen behalve
   het profiel verwijderen of eigenaren beheren.

### Stap 1: bestaat er al een profiel?

Zoek eerst in Google Maps op "Skinstudio Zuid" en op het adres. Drie
uitkomsten:

- **Niets gevonden** → aanmaken via https://business.google.com → "Nu
  beheren" → "Bedrijf toevoegen".
- **Er staat een profiel dat niemand beheert** (Google maakt die soms zelf
  aan uit openbare bronnen) → klik in Maps op "Ben je de eigenaar van dit
  bedrijf?" en claim het. Nooit een tweede aanmaken naast een bestaand
  profiel: dubbele profielen worden allebei onderdrukt.
- **Het profiel is geclaimd door iemand anders** (de vorige websitebouwer,
  een eerdere huurder van het pand) → "Toegang aanvragen"; de huidige
  eigenaar krijgt drie dagen om te reageren, daarna kan Google het
  overdragen.

### Stap 2: aanmaken, veld voor veld

| Veld | Invullen | Waarom zo |
|---|---|---|
| Bedrijfsnaam | `Skinstudio Zuid` | Exact de naam op de gevel en de site. Geen "Den Bosch" of "laserontharing" erbij: dat is tegen de regels en Google schort profielen daarvoor op |
| Primaire categorie | Laserontharingscentrum | Dit is de categorie waarop het profiel meedoet voor "laserontharing den bosch" |
| Extra categorieën | Schoonheidssalon, Huidverzorgingskliniek | Voor "gezichtsbehandeling den bosch" en "schoonheidssalon den bosch". Maximaal negen; alleen wat echt klopt |
| Locatie die klanten bezoeken | Ja | Nodig om op de kaart te staan |
| Adres | Hildebrandstraat 8, 5216 VR, 's-Hertogenbosch | Zonder toevoegingen |
| Servicegebied | Optioneel: Vught, Rosmalen, Sint-Michielsgestel, Vlijmen, Engelen, Boxtel | Hetzelfde lijstje als op de site. Het verandert de kaartpositie niet, wel de relevantie voor zoekers uit die plaatsen |
| Telefoon | 073 689 6423 | |
| Website | https://skinstudio-zuid.nl | De homepage; de contactpagina mag ook maar de homepage is de conventie |
| Afspraaklink | https://skinstudio-zuid.nl/boeken | Aparte knop "Afspraak maken" in het profiel |

**Let op bij een studio aan huis.** Google eist voor een profiel met zichtbaar
adres dat er op het adres permanente bewegwijzering is (een bord, een sticker
op de deur, iets met de bedrijfsnaam). Is dat er niet, dan slaagt de
verificatie vaak niet. Twee opties: alsnog een bord ophangen (ook voor de
videoverificatie hieronder), of het adres verbergen en alleen een
servicegebied opgeven. Dat laatste kost zichtbaarheid in het local pack;
voor een kliniek waar klanten naartoe komen is een bord de betere keuze.

### Stap 3: verifiëren

Google kiest de methode, meestal **video**: met de telefoon een doorlopende
opname van de straat met huisnummer, het bord met de bedrijfsnaam, de
behandelruimte en de apparatuur (de Atres-laser met typeplaatje telt als
bewijs dat de dienst echt wordt geleverd). De video wordt binnen vijf
werkdagen beoordeeld. Soms biedt Google een briefkaart met code (tot veertien
dagen) of een telefoontje aan. Tot de verificatie rond is, is het profiel
niet zichtbaar.

### Stap 4: volledig maken

Google weegt sinds de core update van maart 2026 de volledigheid van het
profiel expliciet mee, en vult lege velden anders zelf in met AI, vaak fout.
Alles invullen, in deze volgorde:

1. **Openingstijden.** Echte tijden, ook al is het op afspraak: zonder tijden
   komt het profiel niet voor in "open nu"-zoekopdrachten en toont AI "gesloten".
   Zet het attribuut "Alleen op afspraak" aan. Dit zijn ook de tijden die in
   `lib/contact.ts` en de structured data horen; die staan nu nog op "Op
   afspraak".
2. **Beschrijving** (maximaal 750 tekens, geen links of promoties). Voorzet,
   afgeleid van de site:

   > Skinstudio Zuid is een kliniek voor laserontharing en gezichtsbehandelingen
   > in het zuiden van 's-Hertogenbosch. Wij werken met de Atres Triple Wave,
   > een medisch gecertificeerde laser die drie golflengtes combineert en
   > daardoor geschikt is voor elk huid- en haartype, en met de Atres HydraSpa
   > voor reiniging, verstrakking met radiofrequentie en een anti-aging boost in
   > één behandeling. Een traject laserontharing begint altijd met een gratis
   > intake in de studio. Klanten komen uit 's-Hertogenbosch, Vught, Rosmalen,
   > Sint-Michielsgestel, Vlijmen, Engelen en Boxtel. Afspraken op
   > skinstudio-zuid.nl of via 073 689 6423.

3. **Diensten.** Per dienst een eigen regel met prijs, overgenomen uit
   `lib/tarieven.ts`: Gratis intakegesprek laserontharing (€ 0), Laserontharing
   oksels (€ 40), bikinilijn (€ 50), onderbenen (€ 80), volledige benen
   (€ 125), gehele gezicht (€ 75), rug (€ 85), kuur Smooth Essentials (€ 450),
   kuur Total Smooth (€ 750), Gezichtsbehandeling HydraSpa (€ 45). De
   complete lijst hoeft niet; de tien meest gezochte zones wel.
4. **Foto's**, minstens tien: logo (vierkant), omslagfoto, gevel met
   huisnummer, behandelkamer, de laser, de HydraSpa, de productplank, het
   team. Eigen foto's, geen stockbeeld; Google herkent stock en toont het niet.
   Daarna maandelijks één nieuwe foto: profielen met recente foto's scoren
   hoger op volledigheid.
5. **Attributen**: toegankelijkheid, betaalmethoden, "Vrouwelijke eigenaar"
   alleen als dat klopt, "Afspraak vereist".
6. **Vragen en antwoorden**: zet zelf de vijf vragen uit de FAQ op de site
   erin (doet laserontharing pijn, hoeveel behandelingen, kan ik in de zomer
   laseren, is er een intake, wat kost het) met korte antwoorden. Anders vult
   het publiek ze in.
7. **Berichten**: wekelijks één bericht (foto, tip, actie). De kuuractie als
   terugkerend bericht (Google ondersteunt sinds april 2026 herhaalde
   berichten).

### Stap 5: reviews

Dit is de factor die het verschil maakt tegenover Huidzorg Clinics (327
reviews). Google weegt sinds maart 2026 recentheid en de reactie van de
eigenaar zwaarder dan het aantal.

- In het profiel: "Vraag om reviews" → de korte link (vorm
  `g.page/r/…/review`) kopiëren. Zet hem in de bevestigingsmail van het
  aanvraagformulier, op een kaartje met QR-code bij de balie, en in de
  WhatsApp-bevestiging na de behandeling.
- Vraag elke klant na de eerste of tweede sessie, niet pas na de kuur.
- Beantwoord elke review binnen een paar dagen, ook de positieve, met de
  voornaam van de reviewer en de behandeling erin.
- Nooit reviews belonen met korting: Google heeft daar sinds juli 2026 een
  expliciete richtlijn tegen, en het leidt tot verwijdering.
- Doel: 25 reviews in het eerste kwartaal.

### Stap 6: maandelijks nalopen

Google voegt sinds maart 2026 zelf diensten en beschrijvingen toe aan
profielen. Eén keer per maand het profiel openen en controleren of er iets
bijgekomen is dat niet klopt (bijvoorbeeld "Hydrafacial" als dienst, of een
verkeerde prijs), en dat verwijderen of corrigeren.

### Daarna, zelfde gegevens

- **Apple Business Connect** (https://businessconnect.apple.com): zelfde
  NAP, voor Apple Kaarten en Siri. Relevant omdat de agenda op iCloud draait.
- **Bing Places** (https://www.bingplaces.com): import vanuit het Google
  Business Profile is één klik. Voedt Copilot en ChatGPT-zoekresultaten.
- Zodra de Google Maps-URL van het profiel bekend is: toevoegen aan `sameAs`
  en als `hasMap` in `lib/site.ts`, zodat de structured data en het profiel
  naar elkaar verwijzen.

---

## Deel 2 — Google Search Console

### Stap 1: eigenaar en property

Ook hier: op het account van de kliniek, met Nicky als volledige gebruiker
of mede-eigenaar (Instellingen → Gebruikers en rechten).

Ga naar https://search.google.com/search-console → "Property toevoegen" en
kies **Domein** (niet URL-prefix) met `skinstudio-zuid.nl`. Een
domeinproperty dekt http, https, met en zonder www en alle subdomeinen in
één keer, zodat de doorverwijzing van www nooit een apart rapport oplevert.

### Stap 2: verifiëren via DNS bij TransIP

Een domeinproperty verifieert alleen via een DNS-record. Google toont een
TXT-record van de vorm `google-site-verification=…`. Dat record gaat in het
controlepaneel van TransIP (Domein → DNS) op de root van het domein:

| Type | Naam | Waarde | TTL |
|---|---|---|---|
| TXT | `@` | `google-site-verification=…` | 1 uur |

Het record mag naast de bestaande records blijven staan (de A/CNAME naar
Vercel en de MX- en SPF-records voor de mail); meerdere TXT-records op `@`
zijn toegestaan. Klik in Search Console op "Verifiëren"; het kan tot een uur
duren voor TransIP's nameservers het record overal hebben. Laat het record
daarna permanent staan: Google controleert het periodiek opnieuw.

Lukt DNS niet, dan is het alternatief een URL-prefix-property
`https://skinstudio-zuid.nl` met een HTML-tag. Die tag kan in de code via
`metadata.verification.google` in `app/layout.tsx`; geef de code door en hij
staat er in één regel.

### Stap 3: direct na verificatie

1. **Sitemap indienen**: Sitemaps → `https://skinstudio-zuid.nl/sitemap.xml`.
   Status wordt "Geslaagd" met zeven gevonden URL's.
2. **Indexering aanvragen**: URL-inspectie → elke van de zeven URL's
   invoeren → "Indexering aanvragen". Dat versnelt de eerste opname van
   dagen naar meestal uren. De `/api/`-route hoort er niet bij.
3. **Generatieve AI-functies**: Instellingen → controleer dat de site
   "Opgenomen in generatieve AI-functies" staat. Sinds 2026 is dit een
   voorwaarde om in AI Overviews en AI Mode te verschijnen, en het rapport
   "Generatieve AI" onder Prestaties toont die vertoningen apart.
4. **Oude URL opruimen**: zoek in Google op `site:skin-studio-zuid.vercel.app`.
   Staan er pagina's in de index, zet dan in Vercel (Settings → Domains) de
   vercel.app-URL op "Redirect to skinstudio-zuid.nl". Google voegt de
   signalen dan samen op het domein. Een Change of Address is niet nodig
   zolang de vercel.app-URL nooit substantieel is geïndexeerd.
5. **Bing Webmaster Tools** (https://www.bing.com/webmasters): "Importeren
   uit Google Search Console" neemt de property en sitemap in één keer over.
   Bing voedt Copilot, en via de Bing-index ook ChatGPT-zoekopdrachten.

### Stap 4: wat je de eerste weken ziet

- **Dekking / Pagina's**: binnen een week horen zeven pagina's op
  "Geïndexeerd" te staan. Staat er een op "Gecrawld, momenteel niet
  geïndexeerd", dan is dat bij een nieuwe site normaal; opnieuw aanvragen na
  twee weken.
- **Prestaties**: de eerste vertoningen komen op de merknaam. Zodra er
  vertoningen zijn op "laserontharing den bosch" en varianten, is dat het
  moment om de posities te volgen. Filter op query, vergelijk per maand.
- **Core Web Vitals**: dit rapport vult pas na voldoende bezoekers (Chrome UX
  Report). Tot die tijd blijft Speed Insights in Vercel de bron.
- **Verbeteringen → Kruimelpaden**: moet zonder fouten staan; dat is de
  structured data van de site.

### Stap 5: maandelijks

Eén vaste check per maand, samen met het Business Profile:

- Prestaties: queries op positie 5 tot 20 met veel vertoningen → die
  pagina's verbeteren.
- Rapport Generatieve AI: op welke vragen de site in AI Overviews verschijnt.
- Pagina's: nieuwe fouten of uitgesloten pagina's.
- Links: nieuwe externe links (het Business Profile, gidsen, pers).

---

## Deel 3 — Google Analytics 4, als het meten verder moet

Vercel Analytics meet al bezoekers zonder cookies. GA4 voegt funnels en
bronnen toe en laadt op de site pas na toestemming via de cookiebanner.
Inrichten: https://analytics.google.com → account op naam van de kliniek →
property "Skinstudio Zuid" → gegevensstream Web `https://skinstudio-zuid.nl`
→ de Meting-ID (vorm `G-XXXXXXXXXX`) als `NEXT_PUBLIC_GA_MEASUREMENT_ID` in
Vercel zetten (Settings → Environment Variables, Production) en opnieuw
deployen. De gebeurtenissen staan al in de code (`lib/analytics.ts`) en gaan
ook zonder toestemming naar Vercel Analytics:

| Gebeurtenis | Wanneer | Eigenschap |
|---|---|---|
| `click_afspraak` | klik op een "Afspraak maken"-knop | `plek`: hero, menu, menu-mobiel, laserontharing, gezichtsbehandelingen, tarieven, contact, producten |
| `click_telefoon` | klik op het telefoonnummer | |
| `click_email` | klik op het e-mailadres | |
| `click_instagram` | klik naar Instagram | `plek`: footer, contact |
| `view_tarieven` | tarievenpagina geopend | |
| `booking_started` | datum gekozen in de aanvraagkalender | `behandeling` |
| `generate_lead` | formulier verstuurd | `behandeling` |
| `booking_completed` | aanvraag met datum verstuurd | `behandeling`, `dagdeel` |

Markeer in GA4 `generate_lead` en `booking_completed` als belangrijke
gebeurtenis (conversie). Laat in GA4 de "Verbeterde meting" aan staan: die
telt de paginaweergaven bij navigatie binnen de site; de code stuurt die
niet nog eens. In Vercel staan dezelfde gebeurtenissen onder Analytics →
Events; custom events hangen af van het Vercel-plan. Koppel daarna Search Console aan GA4 (Beheer →
Productkoppelingen) en maak een kanaalgroep "AI" voor verwijzingen van
`chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`
en `claude.ai`.

---

## Checklist

- [ ] Google-account van de kliniek, Nicky als beheerder
- [ ] Business Profile gevonden of aangemaakt, naam exact "Skinstudio Zuid"
- [ ] Geverifieerd (video)
- [ ] Openingstijden, beschrijving, diensten met prijzen, tien foto's, attributen, Q&A
- [ ] Reviewlink in bevestigingsmail en op de balie
- [ ] Apple Business Connect en Bing Places met dezelfde gegevens
- [ ] Maps-URL in `sameAs` en `hasMap` in `lib/site.ts`
- [ ] Search Console: domeinproperty `skinstudio-zuid.nl`, TXT-record bij TransIP
- [ ] Sitemap ingediend, zeven URL's ter indexering aangevraagd
- [ ] Instelling generatieve AI-functies gecontroleerd
- [ ] Vercel-URL doorsturen als hij geïndexeerd blijkt
- [ ] Bing Webmaster Tools geïmporteerd
- [ ] GA4 met Meting-ID in Vercel, gekoppeld aan Search Console

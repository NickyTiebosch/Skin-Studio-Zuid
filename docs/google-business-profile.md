# Google Business Profile aanmaken

Opgesteld op 9 oktober 2026, toen bleek dat de kliniek er nog geen heeft.

Voor een kliniek met één vestiging is dit de grootste hefboom die er ligt —
groter dan de hele SEO van de site. Het bepaalt of Skinstudio Zuid verschijnt
bij "schoonheidssalon Den Bosch", in de kaart naast de zoekresultaten en op
Google Maps. Dat is precies waar iemand zoekt die een behandeling wil boeken.

Er is nog een reden om hier haast mee te maken. Het domein heeft een
koppelteken (`skinstudio-zuid.nl`) terwijl de naam één woord is, en
`skinstudiozuid.nl` zónder koppelteken is van iemand anders. Wie het adres uit
zijn hoofd intypt komt dus nergens uit. Een Business Profile lost dat omzeilend
op: dan hoeft niemand een domeinnaam te raden.

## Waarom het letterlijk moet kloppen

De site vertelt Google al in machineleesbare vorm wie dit bedrijf is — een
`BeautySalon`-blok met naam, adres, telefoonnummer en diensten (`bedrijfsSchema()`
in `lib/site.ts`). Staat in het profiel iets anders dan op de site, dan ziet
Google twee bedrijven in plaats van één en verdeelt het de signalen over
allebei. Naam, adres en telefoonnummer moeten daarom **teken voor teken
hetzelfde** zijn.

Daarom staat hieronder per veld de exacte waarde, met de plek in de code waar
hij vandaan komt. Overtypen, niet herformuleren.

## Wat je invult

| Veld in Google | Exacte waarde | Waar het vandaan komt |
|---|---|---|
| Bedrijfsnaam | `Skinstudio Zuid` | `BEDRIJFSNAAM`, `lib/contact.ts` |
| Straat en nummer | `Hildebrandstraat 8` | `ADRES.straat` |
| Plaats | `'s-Hertogenbosch` | `ADRES.plaats` |
| Land | Nederland | `ADRES.land` |
| Telefoon | `073 689 6423` | `TELEFOON_WEERGAVE` |
| Website | voorlopig `https://skin-studio-zuid.vercel.app`, later `https://skinstudio-zuid.nl` | `lib/site.ts` |

Let op de apostrof in `'s-Hertogenbosch` en op de spaties in het
telefoonnummer: ook dat zijn tekens die moeten overeenkomen.

**Niet invullen:** het e-mailadres `info@skinstudio-zuid.nl`. Dat postvak
bestaat nog niet, dus mail erheen komt nergens aan.

**De website nu of later invullen?** Vul nu de Vercel-URL in. Het veld is later
met twee klikken te wijzigen, en een profiel zonder website is zwakker dan een
profiel met een tijdelijke. Zodra `skinstudio-zuid.nl` werkt: hier aanpassen,
en tegelijk in de Instagram-bio.

### Categorieën

De **hoofdcategorie** weegt het zwaarst. Kies er een die overeenkomt met wat de
site zegt (`"@type": "BeautySalon"`): in de Nederlandse keuzelijst is dat
**Schoonheidssalon**.

Daarnaast mogen er extra categorieën bij. Zoek in de keuzelijst op de termen
die de site al noemt in `knowsAbout`, en kies wat er het dichtst bij komt —
Google biedt alleen zijn eigen categorieën aan, dus de exacte benaming zie je
pas in het scherm:

- laserontharing / ontharing
- huidverzorging of huidverbetering

Niet overdrijven: twee of drie extra categorieën die echt kloppen werken beter
dan een lange lijst.

### Beschrijving

Deze zin staat al op de site (`SITE_BESCHRIJVING` in `lib/site.ts`) en kan er
één op één in:

> Skinstudio Zuid is een kliniek in 's-Hertogenbosch voor gezichtsbehandelingen
> en laserontharing, met de Atres Triple Wave laser en de Atres HydraSpa.

Wil je de ruimte verder vullen (Google laat ongeveer 750 tekens toe), dan kan
dit eronder — allemaal feiten die al op de site staan:

> Definitieve ontharing gebeurt met de Atres Triple Wave, een medisch
> gecertificeerde laser die drie golflengtes combineert en daardoor geschikt is
> voor elk huid- en haartype. Huidverbetering gaat met de Atres HydraSpa:
> reiniging met Vortex-technologie, verstrakking met radiofrequentie en een
> anti-aging boost met ultrasone trillingen. Laserontharing begint altijd met
> een gratis intakegesprek. Behandelingen op afspraak.

### Eerst dit uitzoeken: welke apparaten staan er écht?

De voorbeeldteksten hierboven noemen de **Atres Triple Wave** en de **Atres
HydraSpa**, want dat is wat de site zegt. Maar op het drukwerk van de kliniek
staan andere namen: "Professionele Diode Ice Laser" en "Hydrafacial". Die
tegenstrijdigheid staat al sinds 6 september open in `docs/te-controleren.md`
en is nooit opgelost.

Op de site is dat een punt om te corrigeren; in een Google Business Profile is
het vervelender. "Hydrafacial" is een beschermde merknaam van een ander bedrijf
— wordt de behandeling in werkelijkheid met een Atres-apparaat gedaan, dan is
die naam niet alleen onjuist maar ook een claim die je liever niet publiek
maakt. En een profiel dat eenmaal geïndexeerd is, corrigeer je niet zomaar uit
de zoekresultaten.

**Vraag dit dus na vóór je het profiel publiceert.** Blijkt de site het bij het
verkeerde eind te hebben, dan passen we de site aan en niet het profiel aan de
site — en dan moeten ook `lib/behandelingen.ts` en `lib/site.ts` mee.

### Diensten

| Dienst | Prijs | Bron |
|---|---|---|
| Laserontharing | vanaf € 20, per lichaamsdeel | `lib/tarieven.ts` |
| Gezichtsbehandeling (HydraSpa) | € 45 | `lib/tarieven.ts` |
| Intakegesprek laserontharing | gratis | `lib/agenda.ts` |

Deze bedragen zijn dezelfde die in de structured data op `/tarieven` staan.
Wijzigen de tarieven, dan wijzigen ze op beide plekken.

### Openingstijden

**Dit ontbreekt nog.** De site zegt alleen "Op afspraak"
(`OPENINGSTIJDEN_TEKST` in `lib/contact.ts`) omdat de echte tijden nooit zijn
aangeleverd. Google zet een profiel zonder tijden lager, dus dit is het moment
om ze op te vragen.

Werkt de kliniek echt uitsluitend op afspraak, dan biedt Google daar een aparte
instelling voor; vul dan geen verzonnen tijden in. Komen er wel vaste tijden,
geef ze dan door — ze horen dan ook in `OPENINGSTIJDEN_TEKST` en in het schema
te komen, zie hieronder.

### Foto's

Gebruik de echte studiofoto's die al in de repo staan (`Images/`): de
behandelkamer, het interieur, de gevel. Een profiel met foto's wordt aanzienlijk
vaker aangeklikt dan een profiel zonder.

**Zet hier geen AI-beeld op.** Editie 2 van de site krijgt AI-sfeerbeeld (M4),
duidelijk gelabeld als sfeerimpressie. Op een Business Profile is dat iets
anders: daar presenteert een foto zich als een weergave van de echte locatie.
Alleen echte foto's dus.

## Van wie het profiel moet zijn

Laat het profiel aanmaken op een Google-account **van de kliniek**, en voeg
Nicky daarna toe als beheerder. Andersom — aanmaken op een persoonlijk account
en later overdragen — werkt ook, maar eigendom overzetten bij Google is een
moeizaam proces dat je liever niet nodig hebt.

Google kiest zelf welke verificatiemethode het aanbiedt (dat verschilt per
bedrijf en per moment). Verificatie hoort bij het bedrijf zelf te gebeuren; ik
kan dit deel niet voor je doen, een Google-account en bedrijfsverificatie
vallen buiten wat ik kan.

## Wat er daarna in de code bij komt

Twee dingen, allebei klein, allebei pas mogelijk als het profiel bestaat:

1. **De profiel-URL toevoegen aan `sameAs`** in `bedrijfsSchema()`
   (`lib/site.ts`). Daar staat nu alleen de Instagram-link. Die verwijzing
   knoopt de site en het profiel aan elkaar — zonder dat moet Google zelf maar
   raden dat het om hetzelfde bedrijf gaat.
2. **De openingstijden**, zodra bekend: `OPENINGSTIJDEN_TEKST` in
   `lib/contact.ts` invullen en een `openingHoursSpecification` aan
   `bedrijfsSchema()` toevoegen, met exact dezelfde tijden als in het profiel.

Zeg het als het profiel er is, dan zet ik allebei erin.

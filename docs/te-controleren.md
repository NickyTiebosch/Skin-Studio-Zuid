# Teksten die nagelopen moeten worden

De behandelpagina's staan online, maar een deel van de teksten is door mij
geschreven op basis van wat er al op de site stond plus algemene kennis over
deze behandelingen. Die teksten moeten door de kliniek gecontroleerd worden
voordat er campagnes op gedraaid worden.

Wat hieronder staat is **niet** overgenomen uit een bestaande bron van Skin
Studio Zuid. Alles wat er níét in staat — de oorspronkelijke behandelteksten,
de voordelen-lijstjes, de contactgegevens — komt letterlijk uit de eerste
versie van de site en is ongewijzigd.

Alles staat in `lib/behandelingen.ts`, dus corrigeren kan op één plek.

---

## Laserontharing

### Uitleg onder "Hoe het werkt"

| Bewering | Nakijken op |
|---|---|
| "Het licht van de laser wordt opgenomen door het pigment in de haar; die energie wordt warmte en die schakelt de haarwortel uit." | Klopt als algemene beschrijving van laserontharing. Controleer of dit strookt met hoe jullie het zelf uitleggen aan klanten. |
| "De techniek is het effectiefst bij haren in de groeifase, en die fase verschilt per haar. Daarom bestaat een behandeling altijd uit meerdere sessies." | Feitelijk juist en de reden dat kuren nodig zijn. Bevestig dat jullie dit ook zo communiceren. |
| "Elke golflengte dringt tot een andere diepte door en werkt beter op een ander type haar of huid." | Dit is de reden dat een triple wave-laser meerwaarde heeft. Laat de leverancier van de Atres dit desgewenst bevestigen. |
| "De meeste mensen ervaren niet meer dan een korte, warme tik." | Dit is mijn formulering van "vrijwel pijnloos" uit de bestaande tekst. Vervang gerust door hoe jullie klanten het zelf beschrijven. |
| "Een traject begint altijd met een intake in de studio. (…) Pas daarna leggen we de data van de sessies vast." | Toegevoegd op 6 september 2026 op verzoek van Nicky. Bevestig dat dit de vaste werkwijze is. |

### Veelgestelde vragen

Zes vragen met antwoorden. Twee daarvan verwijzen bewust door naar de intake
in plaats van een getal te noemen:

- **"Kan ik direct een behandeling inplannen?"** — nieuw sinds 6 september
  2026: er is altijd eerst een intake, "gratis en vrijblijvend" (zo staat het
  ook op de tarievenpagina), en daarna worden de data vastgelegd. Bevestig de
  formulering; klopt "vrijblijvend" niet helemaal, dan hoort dat woord eruit.

- **"Hoeveel behandelingen heb ik nodig?"** — het antwoord zegt dat het per
  persoon en lichaamsdeel verschilt en tijdens de intake wordt ingeschat. **Als
  jullie een gebruikelijk aantal of een richtlijn hanteren, is dit dé plek om
  dat te noemen** — mensen zoeken hier actief op, en een concreet aantal maakt
  de pagina veel sterker.
- **"Werkt het op elk huid- en haartype?"** — het antwoord noemt de
  geschiktheid van de Atres, maar laat de beoordeling voor een individueel
  geval aan de intake.

---

## Gezichtsbehandelingen

### Uitleg onder "Hoe het werkt"

| Bewering | Nakijken op |
|---|---|
| "Waar een klassieke gezichtsbehandeling zich vooral op reiniging richt, combineert de HydraSpa drie technieken in één sessie." | Vergelijking met een gewone facial. Klopt dit met hoe jullie het positioneren? |
| "Een schone, goed gehydrateerde huid neemt actieve stoffen beter op dan een huid waarvan de poriën nog verstopt zijn." | Verklaring waarom de volgorde van de drie stappen uitmaakt. |
| "De behandeling kent geen hersteltijd." | Overgenomen uit de bestaande tekst op de homepage ("zonder hersteltijd" bij RF-lifting). Bevestig dat dit voor de hele HydraSpa geldt. |

### Veelgestelde vragen

Vijf vragen. Aandachtspunt:

- **"Wat doet radiofrequentie precies met de huid?"** — het antwoord zegt dat
  RF warmte in de diepere huidlagen brengt en collageenaanmaak stimuleert, met
  een direct zichtbaar effect dat zich in de weken erna verder opbouwt. Dit is
  de standaardverklaring van de techniek; controleer of jullie het zo willen
  formuleren.

---

## Wat er bewust níét op staat

Deze zaken zijn niet ingevuld omdat ik ze niet kan weten. Zolang ze ontbreken
missen de pagina's precies datgene waar bezoekers naar zoeken:

- **Prijzen** stonden hier tot 4 september 2026. Sindsdien staan de
  mannenprijzen op `/tarieven`, en sinds 7 september ook de vrouwenprijzen.
  Zie de twee tarievensecties onderaan.
- **Behandelduur per behandeling.** Nodig voor de site én technisch onmisbaar
  voor het boekingssysteem: zonder duur kan geen enkel systeem tijdsloten
  berekenen.
- **Aantal sessies en het interval ertussen** bij laserontharing.
- **Nazorg** — wat wel en niet te doen na een behandeling.
- **Contra-indicaties** — wanneer een behandeling niet geschikt is. Bewust
  weggelaten: hierover een fout maken op een website is een reëel risico.
- **Openingstijden.** Er staat nu alleen "Op afspraak". Dat is te vaag voor de
  structured data en voor Google Business Profile.
- **Wie er behandelt**, met naam, opleiding en certificering. De site zegt nu
  "gecertificeerde specialisten" zonder te zeggen wie of waarin. Voor het
  vertrouwenssignaal waar Google en AI-modellen op letten, is een naam met
  credentials aanzienlijk sterker.

---

## Twee losse punten

- **"Kalahari Rituelen"** stond in de footer als behandeling, maar bestaat
  nergens anders op de site. Kalahari is de productlijn, geen behandeling. Die
  link wijst nu naar de producten-sectie. Als het wél een dienst is, verdient
  hij een eigen pagina; zo niet, dan kan de link weg.
- **De `<h1>` van de homepage** luidt "Geef je huid de aandacht die het
  verdient". Mooi, maar zonder behandeling of plaatsnaam — en daar wordt op
  gezocht. Bewust niet gewijzigd omdat het een merkuitspraak is. De
  behandelpagina's ondervangen dit nu deels, want die hebben wél een kop met
  behandeling en plaats.

---

## Tarieven — aangeleverd 4 september 2026

De mannenprijzen zijn overgenomen van de twee flyers (prijslijst en
kuuractie). Ze staan in `lib/tarieven.ts`, dus corrigeren kan op één plek.

### Drie dingen die niet stroken met de website

Deze zijn belangrijker dan de prijzen zelf, want ze raken teksten die al
online staan.

| Wat | Op de flyer | Op de website | Stand |
|---|---|---|---|
| **Telefoonnummer** | 073-2032756 | 073 689 6423 | **Opgelost** |
| **De laser** | "Professionele Diode Ice Laser" | "Atres Triple Wave, drie golflengtes" | Open |
| **De gezichtsbehandeling** | "Hydrafacial" | "Atres HydraSpa" | Open |

**Het telefoonnummer is opgehelderd.** Het nummer op de site (073 689 6423) is
het juiste; de flyer is oud. Er hoeft dus niets aan de site te veranderen. Wel
goed om te weten voor wie nog drukwerk uitdeelt: daar staat een nummer op dat
niet meer klopt.

**De laser vraagt om opheldering.** De behandelpagina legt uit dat de Atres
Triple Wave drie golflengtes combineert, en waarom dat uitmaakt voor lichte
haartjes en een donkere huid. Een diode-laser werkt doorgaans met één
golflengte. Als de flyer klopt, moet die uitleg van de site af — dan klopt de
belangrijkste onderbouwing van de pagina niet. Mogelijke verklaringen: er
staan twee apparaten in de studio, de flyer is ouder, of "Diode Ice Laser" is
de handelsnaam van hetzelfde apparaat. Graag uitzoeken vóórdat hier
advertentiebudget op gezet wordt.

**Hydrafacial versus HydraSpa** is een kleinere kwestie, maar Hydrafacial is
een beschermde merknaam van een andere fabrikant. Als de behandeling met een
Atres-apparaat wordt gedaan, is "Hydrafacial" op het drukwerk mogelijk niet
de juiste benaming.

### Twee prijzen die ik moeilijk kon lezen

Op de foto weerkaatste het licht precies over twee regels. Zoals ik ze heb
overgenomen:

- Gehele billen — € 60
- Intieme zone compleet (incl. bilnaad) — € 250

Even nalopen of dat klopt.

### Wat er nog ontbreekt

- **Behandelduur per behandeling.** Staat op geen van de flyers. Dit is
  technisch onmisbaar voor het boekingssysteem: zonder duur kan geen enkel
  systeem tijdsloten berekenen. Dit is nu het enige dat het boekingssysteem
  nog blokkeert.
- **Geldigheid van de kuuractie.** Er staat geen einddatum op de flyer. Als
  de actie afloopt, moet iemand eraan denken de site bij te werken.

---

## Vrouwenprijzen — aangeleverd 7 september 2026

Overgenomen van de twee vrouwenflyers (prijslijst en kuuractie), net als bij
de mannen. Alles staat in `lib/tarieven.ts`. De foto's waren scherp; er is
geen regel waar ik over twijfel.

### Wat er anders is dan bij de mannen

- **De kuuractie voor vrouwen geldt alleen voor nieuwe klanten.** Zo staat
  het op de vrouwenflyer; op de mannenflyer staat die beperking niet. Daarom
  staat die voorwaarde nu alleen bij de vrouwenkuren. **Geldt hij ook voor
  mannen?** Dan is het één regel in `lib/tarieven.ts` (`kuurgroepen`).
- **Vrouwen staan bovenaan.** De tabellen staan per doelgroep bij elkaar:
  eerst laserontharing en combinatiepakketten voor vrouwen, dan hetzelfde
  voor mannen, dan de gezichtsbehandeling. Liever mannen eerst? Dat is de
  volgorde van `tariefgroepen` en `kuurgroepen` omdraaien.
- **De kuren heten zoals op de flyer:** Smooth Essentials (oksels en
  bikinilijn) en Total Smooth (oksels, bikinilijn en onderbenen), met het
  label "Meest gekozen" bij Total Smooth, precies zoals de flyer het
  aanprijst. Bij de losse combinatiepakketten staan de lichaamsdelen, want zo
  staat het op de prijslijst.
- **Full body** staat er als "van € 1050 voor € 250 per behandeling", zoals
  op de flyer.

### Hulp bij de twee onleesbare mannenprijzen

De vrouwenflyer geeft een vergelijkingspunt voor de twee regels van de
mannenlijst die ik moeilijk kon lezen: bij vrouwen kost gehele billen € 50 en
intieme zone compleet € 90. Bij mannen heb ik € 60 en **€ 250** overgenomen.
Vooral die € 250 verdient een blik: het is bijna drie keer het vrouwentarief
voor dezelfde zone.

### Dezelfde open punten

Ook op de vrouwenflyers staan "Professionele Diode Ice Laser", "Hydrafacial"
en het oude telefoonnummer 073-2032756. De stand daarvan is niet veranderd;
zie de tabel bij de mannenprijzen hierboven.

---

## Het boekingssysteem — besloten en nog open

**Besloten:** de agenda blijft **Apple/iCloud**, gekoppeld via **Cal.com**. Het
gratis plan van Cal.com volstaat en praat via CalDAV met `caldav.icloud.com`:
het leest bezette tijden én schrijft de boeking terug.

Wat daar bij hoort, zodat niemand later verrast wordt:

- **De koppeling werkt met een app-specifiek wachtwoord.** Wordt het Apple
  ID-wachtwoord ooit gewijzigd of gereset, dan trekt Apple *alle*
  app-specifieke wachtwoorden in en stopt de koppeling — zonder melding.
  Daarom hoort er een periodieke controle op: staat de koppeling nog?
- **Apple stuurt geen seintje bij wijzigingen.** Er zit dus altijd wat
  vertraging tussen "zij zet iets in haar agenda" en "het systeem weet het".
- **Blokkeren doet ze in haar eigen agenda.** Een afspraak of hele-dag-event
  maakt dat slot automatisch onboekbaar. Let op: een onbeantwoorde
  hele-dag-uitnodiging kan een hele werkdag dichtzetten.
- **Privé-afspraken moeten óók in de gekoppelde agenda staan**, anders blijft
  dat slot boekbaar.

**Nog nodig voordat er gebouwd kan worden:** de **behandelduur per
behandeling**. Dat is het enige dat nu nog blokkeert.

**Niet in het boekingsformulier zetten:** vragen over huidtype, medicijngebruik
of zwangerschap. Dat zijn gezondheidsgegevens onder artikel 9 AVG, met een
zwaarder regime. De medische intake hoort apart, niet in het formulier.

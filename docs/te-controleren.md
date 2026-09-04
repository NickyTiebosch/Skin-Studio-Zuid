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

### Veelgestelde vragen

Vijf vragen met antwoorden. Twee daarvan verwijzen bewust door naar de intake
in plaats van een getal te noemen:

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

- **Prijzen.** "Prijs" en "kosten" zijn veelgezochte termen. Concurrenten die
  wel tarieven tonen, winnen die zoekopdrachten. Zodra de tarieven er zijn kan
  er een `/tarieven`-pagina komen; het meetpunt daarvoor staat al klaar in de
  code.
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

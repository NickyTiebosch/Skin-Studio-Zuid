# Bijgewerkte skills: SEO, GEO en AEO

Gecontroleerd op 9 oktober 2026, vóór de beoordeling in
`docs/seo-geo-aeo-beoordeling.md`.

## Waar de skills vandaan komen

De drie skills `ai-seo-google-expert`, `ai-geo-expert` en `ai-aeo-expert`
worden als plugin gesynchroniseerd vanuit het claude.ai-account (bron
`plugin`, map `~/.claude/skills/synced/`). Ze zijn **niet** vanuit deze repo
aan te passen: een wijziging hier verandert niets aan wat Claude in een
volgende sessie laadt. De bijgewerkte versies in deze map zijn bedoeld om in
de plugin te plakken (claude.ai → Skills → de betreffende skill → SKILL.md
vervangen). Tot dat gebeurt, blijft de oude versie actief.

| Skill | Laatst bijgewerkt in plugin | Verouderd? |
|---|---|---|
| ai-seo-google-expert | 31 maart 2026 | Ja, op vier punten |
| ai-geo-expert | 2 april 2026 | Ja, op vijf punten |
| ai-aeo-expert | 10 april 2026 | Ja, op drie kernpunten |

## Wat er sinds april 2026 veranderd is en waarom dat uitmaakt

Allemaal geverifieerd op de pagina's van Google Search Central (changelog en
documentatie, opgehaald op 9 oktober 2026):

1. **FAQ rich results afgeschaft op 7 mei 2026.** Documentatie verwijderd in
   juni, Search Console-rapport en Rich Results Test-ondersteuning eveneens,
   API in augustus. `FAQPage`-markup mag blijven staan en wordt door Bing,
   Perplexity en ChatGPT nog gelezen, maar levert in Google geen uitklapbare
   vragen meer op. De AEO-skill beloofde "tot 40% hogere snippet-kansen" met
   FAQ-schema; de SEO-skill "FAQ: veelgestelde vragen direct in SERP tonen".
   Beide zijn weg.
2. **HowTo rich results bestaan niet meer** (desktop sinds september 2023,
   mobiel met dezelfde wijziging van mei 2026). De AEO-skill adviseerde HowTo
   "op alle stap-voor-stap content".
3. **Google publiceerde in mei 2026 de gids "Optimizing your website for
   generative AI features on Google Search"** (bijgewerkt 10 juli 2026) met
   een expliciete mythbusting-lijst: llms.txt en andere "speciale" bestanden
   doen niets voor Google, content opknippen is niet nodig, herschrijven voor
   AI is niet nodig, gezochte vermeldingen worden ontmoedigd, structured data
   is geen vereiste. Spamregels gelden ook voor AI-antwoorden. Nieuw: een site
   moet in Search Console "opgenomen in generatieve AI-functies" staan, en er
   is een rapport "Generatieve AI" in Search Console. De GEO-skill had
   `llms.txt` als checklistpunt en als quick win.
4. **AI Mode** heeft sinds I/O (19 mei 2026) meer dan een miljard gebruikers
   per maand, draait op Gemini 3.5 Flash en breidt "agentic booking" uit naar
   lokale diensten zoals beauty, inclusief Google dat namens de gebruiker
   belt. De skills noemden AI Mode niet.
5. **AI Overviews-update van 6 mei 2026**: inline citaties naast de
   ondersteunde tekst, hover-previews met sitenaam, een "Expert Advice"-blok
   met eerstehands ervaring van genoemde personen, "Explore new angles".
6. **Core update maart 2026** woog volledigheid van het Google Business
   Profile, recente reviews en reactie van de eigenaar zwaarder dan ruw
   reviewaantal; sinds maart 2026 vult Google zelf diensten in op profielen
   via AI als de eigenaar dat niet doet.
7. **Preferred sources** beschikbaar in alle talen (april 2026) en in AI Mode
   en AI Overviews (mei 2026); nieuwe reviewrichtlijn tegen onvermelde
   beloonde reviews (juli 2026).
8. Kleinere veroudering in de SEO-skill: `rel=next/prev` (door Google sinds
   2019 niet gebruikt), "SGE" (heet sinds mei 2024 AI Overviews),
   HARO/Connectively (gestopt december 2024), Yelp/TripAdvisor als
   standaardgidsen (voor Nederland niet relevant).
9. Kleinere veroudering in de GEO-skill: verwijzer `ai.chatgpt.com` bestaat
   niet (het is `chatgpt.com`); `Google-Extended` beperkt alleen Gemini-training
   en grounding, niet AI Overviews (daarvoor gelden `nosnippet`, `max-snippet`,
   `noindex` via Googlebot); schema-claim "300% hogere nauwkeurigheid" is niet
   herleidbaar en is geschrapt.

## Wat ongewijzigd blijft

De kern van alle drie de skills (zoekintentie, E-E-A-T, local pack-factoren,
antwoord-eerst schrijven, fact density, derde-partij-bevestiging, meten in
Search Console) is nog steeds juist en komt overeen met Google's eigen gids.

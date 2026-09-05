import { behandelingen } from "./behandelingen"

/**
 * De navigatie van de site, op één plek.
 *
 * Navbar en footer hielden elk hun eigen kopie van dezelfde lijst bij. Bij het
 * toevoegen van een pagina moest je er dus aan denken om twee bestanden bij te
 * werken — en één vergeten leverde een menu op dat op de ene plek wel en op de
 * andere niet klopte. Elke lijst staat hier daarom precies één keer.
 */

/**
 * Het menu in de balk, desktop en mobiel.
 *
 * Tot 6 september 2026 waren dit vier ankers naar secties op de homepage,
 * waardoor de site als one-pager overkwam en de behandel- en tarievenpagina's
 * alleen via de kaarten en de footer te vinden waren. Nu staan de pagina's
 * waar mensen op zoeken vooraan. "Producten" is naar de footer verhuisd en het
 * anker "Behandelingen" is vervangen door de behandelpagina's zelf.
 */
export const hoofdnavigatie = [
  ...behandelingen.map((b) => ({ label: b.tag, href: `/${b.slug}` })),
  { label: "Tarieven", href: "/tarieven" },
  { label: "De Studio", href: "/#studio" },
  { label: "Contact", href: "/#contact" },
]

/** De kolom "Navigatie" in de footer: de secties van de homepage. */
export const sectienavigatie = [
  { label: "Behandelingen", href: "/#behandelingen" },
  { label: "De Studio", href: "/#studio" },
  { label: "Producten", href: "/#producten" },
  { label: "Contact", href: "/#contact" },
]

/**
 * De kolom "Behandelingen" in de footer.
 *
 * Deze verwees eerder vier keer naar hetzelfde contactformulier, waaronder
 * voor "Kalahari Rituelen" — een naam die nergens in de site als behandeling
 * bestaat; Kalahari is de productlijn. Die link wijst nu naar de producten,
 * en "Consult" naar de afspraakpagina. Of "Kalahari Rituelen" een echte
 * dienst is die een eigen pagina verdient, is aan de kliniek.
 */
export const behandelingsnavigatie = [
  ...behandelingen.map((b) => ({ label: b.tag, href: `/${b.slug}` })),
  { label: "Tarieven", href: "/tarieven" },
  { label: "Kalahari producten", href: "/#producten" },
  { label: "Vrijblijvend consult", href: "/boeken?behandeling=consult" },
]

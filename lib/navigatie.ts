import { behandelingen } from "./behandelingen"

/**
 * De navigatie van de site, op één plek.
 *
 * Navbar en footer hielden elk hun eigen kopie van dezelfde lijst bij. Bij het
 * toevoegen van een pagina moest je er dus aan denken om twee bestanden bij te
 * werken — en één vergeten leverde een menu op dat op de ene plek wel en op de
 * andere niet klopte.
 */
export const hoofdnavigatie = [
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

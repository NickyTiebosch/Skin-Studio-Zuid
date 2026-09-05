import type { Metadata } from "next"
import { BehandelingPagina } from "@/components/behandeling-pagina"
import { behandelingBySlug } from "@/lib/behandelingen"
import { OPENGRAPH_BASIS } from "@/lib/site"

const behandeling = behandelingBySlug("laserontharing")!

export const metadata: Metadata = {
  // `title.absolute` omdat de metaTitel de merknaam al bevat; zonder dit zou
  // het sjabloon uit de layout er nog een keer "| Skin Studio Zuid" achter
  // plakken.
  title: { absolute: `${behandeling.metaTitel} | Skin Studio Zuid` },
  description: behandeling.metaBeschrijving,
  // Zonder eigen canonical erft de pagina die van de layout ('/') en vertelt
  // hij zoekmachines dat hij eigenlijk de homepage is.
  alternates: { canonical: `/${behandeling.slug}` },
  openGraph: {
    ...OPENGRAPH_BASIS,
    type: "article",
    url: `/${behandeling.slug}`,
    title: behandeling.metaTitel,
    description: behandeling.metaBeschrijving,
  },
}

export default function Laserontharing() {
  return <BehandelingPagina behandeling={behandeling} />
}

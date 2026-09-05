import type { Metadata } from "next"
import { BehandelingPagina } from "@/components/behandeling-pagina"
import { behandelingBySlug } from "@/lib/behandelingen"
import { OPENGRAPH_BASIS } from "@/lib/site"

const behandeling = behandelingBySlug("gezichtsbehandelingen")!

export const metadata: Metadata = {
  title: { absolute: `${behandeling.metaTitel} | Skin Studio Zuid` },
  description: behandeling.metaBeschrijving,
  alternates: { canonical: `/${behandeling.slug}` },
  openGraph: {
    ...OPENGRAPH_BASIS,
    type: "article",
    url: `/${behandeling.slug}`,
    title: behandeling.metaTitel,
    description: behandeling.metaBeschrijving,
  },
}

export default function Gezichtsbehandelingen() {
  return <BehandelingPagina behandeling={behandeling} />
}

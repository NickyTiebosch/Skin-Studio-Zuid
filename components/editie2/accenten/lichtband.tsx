"use client"

import dynamic from "next/dynamic"
import { WebglPoort } from "./webgl-poort"

/**
 * De lichtband op /laserontharing.
 *
 * Hier staat de poortwachter tussen: de WebGL-scène wordt alleen ingeladen
 * als het apparaat het comfortabel aankan én de band in beeld komt. Iedereen
 * anders — mobiel, geen muis, databesparing, beweging uitgezet, geen WebGL 2 —
 * krijgt de CSS-versie hieronder. Die is geen noodoplossing maar het
 * uitgangspunt: dezelfde drie linten in hetzelfde verloop, in een blok van
 * precies dezelfde hoogte, zodat er niets verspringt als de scène er wél komt.
 *
 * `next/dynamic` met `ssr: false` mag alleen in een clientcomponent, en dit is
 * de enige plek in editie 2 waar three.js in de bundel terechtkomt.
 */
const LichtbandScene = dynamic(
  () => import("./lichtband-scene").then((m) => m.LichtbandScene),
  { ssr: false }
)

export function Lichtband() {
  return (
    <div className="relative h-[52svh] min-h-[300px] w-full overflow-clip md:h-[56svh]">
      <WebglPoort className="absolute inset-0" fallback={<LichtbandStil />}>
        <LichtbandScene />
      </WebglPoort>

      {/* Boven- en onderrand vervagen naar de paginakleur, zodat de band geen
          rechthoek in de pagina is. Staat buiten de poort: geldt voor beide
          versies. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--cream), transparent 14%, transparent 86%, var(--cream))",
        }}
      />
      <p className="pointer-events-none absolute bottom-4 left-6 font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:left-10">
        Illustratie &mdash; licht op verschillende diepten
      </p>
    </div>
  )
}

/**
 * Dezelfde voorstelling in CSS: een warm verloop met drie zachte lichtlinten.
 * De linten staan in de basistoestand al op hun diepte (regel 1); alleen wie
 * een scroll-tijdlijn heeft en beweging aan laat staan, ziet ze ernaartoe
 * zakken. Alleen `transform`, dus buiten de hoofdthread om.
 */
function LichtbandStil() {
  return (
    <div className="e2-band absolute inset-0" aria-hidden="true">
      <span className="e2-band-lint e2-band-lint-1" />
      <span className="e2-band-lint e2-band-lint-2" />
      <span className="e2-band-lint e2-band-lint-3" />
    </div>
  )
}

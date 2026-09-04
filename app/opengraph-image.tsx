import { ImageResponse } from "next/og"
import { ADRES, BEDRIJFSNAAM } from "@/lib/contact"

/**
 * Het voorbeeld dat verschijnt wanneer iemand de site deelt in WhatsApp,
 * Instagram, LinkedIn of een chat-app. Zonder dit tonen die apps een lege
 * kaart of een willekeurig stuk van de pagina.
 *
 * Wordt bij de build één keer gegenereerd, dus het kost geen laadtijd.
 */
export const alt = `${BEDRIJFSNAAM} — gezichtsbehandelingen en laserontharing in ${ADRES.plaats}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // Exact de huisstijlkleuren uit globals.css (--walnut en --cream),
          // omgerekend van oklch naar hex omdat de beeldgenerator geen oklch kent.
          backgroundColor: "#301c0e",
          color: "#fcfaf6",
          fontFamily: "serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#c58582",
            marginBottom: 40,
          }}
        >
          {ADRES.plaats}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Skin Studio Zuid
        </div>

        <div
          style={{
            display: "flex",
            width: 80,
            height: 2,
            backgroundColor: "#c58582",
            margin: "48px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 34,
            textAlign: "center",
            color: "rgba(252, 250, 246, 0.75)",
          }}
        >
          Gezichtsbehandelingen &amp; laserontharing
        </div>
      </div>
    ),
    size
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // `images.unoptimized` en `typescript.ignoreBuildErrors` stonden hier eerder
  // allebei aan. Het eerste was een workaround voor Netlify, waar de
  // beeldoptimalisatie van Next.js per request opnieuw draaide zonder caching;
  // op Vercel wordt dat door het platform afgehandeld en is de workaround niet
  // alleen overbodig maar schadelijk — alles ging op volle grootte de lijn over.
  // Het tweede verborg type-fouten in een project dat op `strict: true` staat.

  experimental: {
    // Zet React's ViewTransition aan, zodat een behandelfoto van de homepage
    // kan doorgroeien naar de kop van de behandelpagina in plaats van dat het
    // scherm omklapt. Kost geen extra bytes: de component zit in de React die
    // Next.js zelf meelevert. Zie components/paginaovergang.tsx, dat blijft
    // werken als deze vlag ooit verdwijnt.
    viewTransition: true,
  },
}

export default nextConfig

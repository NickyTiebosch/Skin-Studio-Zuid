import type { Metadata } from 'next'
import { Playfair_Display, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { IS_PREVIEW, SITE_BESCHRIJVING, SITE_NAAM, SITE_URL, bedrijfsSchema } from '@/lib/site'
import { CookieBanner } from '@/components/cookie-banner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600'],
})

// Great Vibes is verwijderd: 29,6 kB die vooraf geladen werd voor een
// lettertype dat nergens gebruikt werd. De klasse `font-script` kwam in geen
// enkel bestand voor, en dat gewicht concurreerde wél met de hero-afbeelding
// om bandbreedte. Puur winst, niets aan te zien.

/**
 * Terugvaloptie voor browsers zonder scroll-tijdlijn.
 *
 * `animation-timeline` werkt in Chrome en Edge, en in Safari pas vanaf versie
 * 26. Firefox ondersteunt het niet. Zonder dit script zou daar helemaal geen
 * beweging te zien zijn, terwijl de rest van de bezoekers hem wel krijgt.
 *
 * Het staat bewust inline en niet in een apart bestand: de klasse moet gezet
 * zijn vóórdat de browser voor het eerst tekent, anders zie je de inhoud eerst
 * verschijnen en dan alsnog wegspringen. Een extra bestand ophalen kost precies
 * die tijd. Browsers die de scroll-tijdlijn wél kennen stoppen bij de eerste
 * regel en doen verder niets.
 *
 * Belangrijk: dit script kan alleen iets verbergen. Draait het niet — geen
 * JavaScript, een fout, een crawler — dan blijft de hele pagina zichtbaar.
 */
const TERUGVAL = `(function(){
if(window.CSS&&CSS.supports&&CSS.supports('animation-timeline: view()'))return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var d=document.documentElement;d.classList.add('ssz-js');
addEventListener('DOMContentLoaded',function(){
var o=new IntersectionObserver(function(es){es.forEach(function(e){
if(e.isIntersecting){e.target.classList.add('ssz-in');o.unobserve(e.target)}})},
{rootMargin:'0px 0px -10% 0px'});
d.querySelectorAll('.ssz-op,.ssz-lijn,.ssz-doek').forEach(function(el){o.observe(el)})})})()`

export const metadata: Metadata = {
  // Zonder metadataBase kan Next relatieve verwijzingen naar afbeeldingen niet
  // omzetten naar volledige URL's, waardoor deelvoorbeelden op social media
  // en in chat-apps leeg blijven.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gezichtsbehandelingen & laserontharing in Den Bosch | Skin Studio Zuid',
    // Subpagina's krijgen hun eigen titel met de merknaam erachter.
    template: '%s | Skin Studio Zuid',
  },
  description:
    'Skin Studio Zuid in ‘s-Hertogenbosch: definitieve laserontharing met de ' +
    'Atres Triple Wave en huidverbetering met de Atres HydraSpa. Vrijblijvend ' +
    'kennismaken kan.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: SITE_NAAM,
    title: 'Gezichtsbehandelingen & laserontharing in Den Bosch',
    description: SITE_BESCHRIJVING,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gezichtsbehandelingen & laserontharing in Den Bosch',
    description: SITE_BESCHRIJVING,
  },
  // Een preview-deploy op Vercel is publiek bereikbaar en bevat dezelfde
  // teksten als productie. Zonder deze uitzondering kan zo'n URL naast het
  // echte domein in de index belanden en daarmee met zichzelf concurreren.
  robots: IS_PREVIEW
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          // Zonder deze drie toont Google alleen een kleine thumbnail en een
          // afgeknot fragment.
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${raleway.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TERUGVAL }} />
      </head>
      <body className="font-sans antialiased">
        {/* Zonder deze link moet wie met het toetsenbord navigeert eerst de
            hele navigatiebalk doorlopen voordat hij bij de inhoud is. */}
        <a href="#inhoud" className="ssz-overslaan font-sans text-sm">
          Naar de inhoud
        </a>
        {/* Vertelt zoekmachines en AI-assistenten expliciet wat voor bedrijf
            dit is, waar het zit en wat het aanbiedt, in plaats van dat ze het
            uit de lopende tekst moeten afleiden. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bedrijfsSchema()) }}
        />
        {children}
        <CookieBanner />
        {/* Vercel Analytics telt cookieloos en heeft dus geen toestemming nodig. */}
        <Analytics />
      </body>
    </html>
  )
}

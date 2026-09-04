import type { Metadata } from 'next'
import { Playfair_Display, Raleway, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_BESCHRIJVING, SITE_NAAM, SITE_URL, bedrijfsSchema } from '@/lib/site'
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

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-script-family',
  weight: ['400'],
})

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
  robots: {
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
    <html lang="nl" className={`${playfair.variable} ${raleway.variable} ${greatVibes.variable}`}>
      <body className="font-sans antialiased">
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

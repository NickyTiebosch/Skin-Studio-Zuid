import type { Metadata } from 'next'
import { Playfair_Display, Raleway, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloat } from '@/components/whatsapp-float'
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
  title: 'Skin Studio Zuid — Exclusieve Gezichtsbehandelingen & Laserontharing',
  description: 'Skin Studio Zuid is een exclusieve kliniek voor gezichtsbehandelingen en laserontharing. Waar wetenschap en sereniteit samenkomen.',
  generator: 'v0.app',
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
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}

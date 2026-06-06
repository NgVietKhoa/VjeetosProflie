import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, DM_Mono } from 'next/font/google'
import './globals.css'

const pressStart = Press_Start_2P({
  variable: '--font-press-start',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Viet Khoa — Developer Portfolio',
  description:
    'Personal portfolio of Nguyen Viet Khoa — Developer. Dark luxury editorial design.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${pressStart.variable} ${dmMono.variable}`}
    >
      <body className="bg-background font-mono antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

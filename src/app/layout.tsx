import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import SessionWrapper from '../components/SessionWrapper'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Ignite Call',
    default: 'Ignite Call',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${roboto.variable} bg-gray-900 text-base text-gray-200 antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionWrapper>
  )
}

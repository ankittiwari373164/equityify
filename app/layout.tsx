import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Equityify — Professional Stock Market Education',
  description: 'Learn stock market trading and investing from Upanshu Asra — 7+ years experience, AmEx & NTT certified, NISM qualified.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

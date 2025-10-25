import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "PN'S Admin Panel",
  description: 'Food Delivery Administration Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

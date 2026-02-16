import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tiendex',
  description: 'Credit & Inventory Management for Small Latin American Stores',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

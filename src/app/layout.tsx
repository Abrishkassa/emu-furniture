import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import LanguageToggle from '@/components/LanguageToggle';
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emu Furniture - Ethiopian Craftsmanship',
  description: 'Modern furniture with Ethiopian craftsmanship. Custom orders, showroom visits, and delivery in Addis Ababa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
        <footer className="bg-amber-900 text-white py-8 text-center">
          <p>© {new Date().getFullYear()} Emu Furniture. All rights reserved.</p>
          <p className="mt-2 text-amber-200">Addis Ababa, Ethiopia</p>
        </footer>
      </body>
    </html>
  )
}
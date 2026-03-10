import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaTiktok, FaGithub } from 'react-icons/fa';

import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emu Furniture - Ethiopian Craftsmanship',
  description: 'Modern furniture with Ethiopian craftsmanship. Custom orders, showroom visits, and delivery in Hawassa.',
  icons: {
    icon: '/emu.png', 
  },
    verification: { google: 'iGWjhSjTemPqngmWsQyLLSCkOnMeJvc5GwOuDR7NP0k' },
  robots: { index: true, follow: true },
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
       <footer className="bg-amber-900 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start">

      {/* LEFT: Business identity + local SEO */}
      <div className="mb-8 md:mb-0 text-center md:text-left max-w-md">
        <p className="text-lg font-semibold">
          © {new Date().getFullYear()} EMU Furniture. All rights reserved.
        </p>

        <p className="mt-2 text-amber-200">
          EMU Furniture is a furniture shop in Hawassa, Sidama, Ethiopia,
          specializing in modern sofas, beds, dining tables, office furniture,
          and custom-made furniture for homes and businesses.
        </p>

        <p className="mt-2 text-amber-300 text-sm">
          Location: Hawassa, Sidama Region, Ethiopia
        </p>

        {/* Company social media */}
        <div className="mt-6">
          <p className="text-amber-100 font-medium mb-3">Follow EMU Furniture</p>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">

            <a
              href="https://www.facebook.com/share/1DXBBB97c6/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EMU Furniture Facebook"
              className="text-white hover:text-amber-300 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://t.me/M_achatoo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EMU Furniture Telegram"
              className="text-white hover:text-amber-300 transition-colors duration-300"
            >
              <FaTelegramPlane />
            </a>

            <a
              href="https://www.instagram.com/emu.furniture"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EMU Furniture Instagram"
              className="text-white hover:text-amber-300 transition-colors duration-300"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.tiktok.com/@emufurniture0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EMU Furniture TikTok"
              className="text-white hover:text-amber-300 transition-colors duration-300"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT: Developer info */}
      <div className="text-center">
        <p className="text-amber-100 font-medium mb-2">
          Developed by <span className="font-bold text-white">Abriham Kassa</span>
        </p>
        <p className="text-sm text-amber-300 mb-3">
          Freelancing Software Engineer 
        </p>

        <div className="flex justify-center space-x-4 text-2xl">
          <a
            href="https://github.com/Abrishkassa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abriham Kassa GitHub"
            className="text-white hover:text-amber-300 transition-colors duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>

    </div>
  </div>
</footer>
</body>
</html>
  )
}
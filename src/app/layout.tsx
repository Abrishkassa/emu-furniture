import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Emu Furniture - Ethiopian Craftsmanship',
  description: 'Modern furniture with Ethiopian craftsmanship. Custom orders, showroom visits, and delivery in Hawassa.',
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
    {/* Main footer content */}
    <div className="flex flex-col md:flex-row justify-between items-center">
      {/* Copyright and location */}
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <p className="text-lg font-semibold">© {new Date().getFullYear()} Emu Furniture. All rights reserved.</p>
        <p className="mt-2 text-amber-200">Hawassa, Sidama, Ethiopia</p>
      </div>

      {/* Developer info */}
      <div className="text-center">
        <p className="text-amber-100 font-medium mb-2">
          Developed by <span className="font-bold text-white">Abriham Kassa</span>
        </p>
        <p className="text-sm text-amber-300 mb-3">Software Engineer</p>
        
        {/* Social links */}
        <div className="flex justify-center space-x-4">
          {/* GitHub */}
          <a 
            href="https://github.com/Abrishkassa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/abriham-kassa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/abrish_kas" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 2.162c-3.259 0-3.667.014-4.947.072-2.905.14-3.386 1.063-3.527 3.526C3.014 8.333 3 8.741 3 12c0 3.259.014 3.668.072 4.948.14 2.905 1.063 3.386 3.526 3.527 1.28.058 1.688.072 4.948.072 3.259 0 3.668-.014 4.948-.072 2.905-.14 3.387-1.063 3.527-3.527.058-1.28.072-1.688.072-4.948 0-3.259-.014-3.667-.072-4.947-.14-2.905-1.063-3.386-3.527-3.527C15.668 4.014 15.259 4 12 4zm0 3.865a4.135 4.135 0 110 8.27 4.135 4.135 0 010-8.27zm0 1.802a2.333 2.333 0 100 4.666 2.333 2.333 0 000-4.666zm4.999-3.488a.966.966 0 110 1.932.966.966 0 010-1.932z" clipRule="evenodd"/>
            </svg>
          </a>

          {/* Facebook */}
          <a 
            href="https://web.facebook.com/abrish.smart.77" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
            </svg>
          </a>

          {/* Telegram */}
          <a 
            href="https://t.me/@kerekassakia" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-amber-300 transition-colors duration-300"
            aria-label="Telegram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.25 1.58-1.32 5.42-1.87 7.19-.14.45-.41.6-.68.61-.58.02-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.06-.2-.07-.06-.17-.04-.24-.02-.1.02-1.79 1.14-5.06 3.35-.48.33-.91.49-1.3.48-.43-.01-1.25-.24-1.86-.44-.75-.25-1.35-.38-1.3-.8.03-.25.37-.51 1.03-.78 4.08-1.74 6.79-2.88 8.14-3.45 3.9-1.64 4.71-1.93 5.24-1.94.11 0 .37.03.54.17.14.11.18.26.2.46.02.2-.04.63-.06.86z"/>
            </svg>
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
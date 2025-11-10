import './globals.css'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'

export const metadata = { title: 'Plataforma Judo Privada' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}

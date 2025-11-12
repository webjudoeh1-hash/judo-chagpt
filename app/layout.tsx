import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Academia Judo - Plataforma privada',
  description: 'Sistema de gestión para Academia Judo',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="navbar">
          <div className="nav-links">
            <a href="/">Inicio</a>
            <a href="/perfil">Mi perfil</a>
            <a href="/admin">Admin</a>
          </div>
          <button
            className="logout-btn"
            onClick={() => {
              try { localStorage.removeItem('supabase.auth.token') } catch(e) {}
              window.location.href = '/'
            }}
          >
            Salir
          </button>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  )
}

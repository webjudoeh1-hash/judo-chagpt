import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Academia Judo - Plataforma privada',
  description: 'Sistema de gestión para Academia Judo',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <a href="/" style={{ marginRight: '15px', color: 'white' }}>
              Inicio
            </a>
            <a href="/perfil" style={{ marginRight: '15px', color: 'white' }}>
              Mi perfil
            </a>
            <a href="/admin" style={{ color: 'white' }}>
              Admin
            </a>
          </div>
          <form
            action="/"
            method="get"
            onSubmit={() => localStorage.removeItem('supabase.auth.token')}
          >
            <button
              type="submit"
              style={{
                backgroundColor: 'white',
                color: '#0070f3',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 10px',
                cursor: 'pointer',
              }}
            >
              Salir
            </button>
          </form>
        </nav>

        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  );
}

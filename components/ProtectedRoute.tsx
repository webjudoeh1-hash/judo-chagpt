'use client'
import { useEffect, useState, ReactNode } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(r => {
      setSession(r.data.session)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Cargando...</div>
  if (!session) return <div>Debes iniciar sesión.</div>
  return <>{children}</>
}

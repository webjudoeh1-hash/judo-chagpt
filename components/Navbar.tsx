'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Navbar() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(r => setSession(r.data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, _session) => {
      supabase.auth.getSession().then(r => setSession(r.data.session))
    })
    return () => data.subscription.unsubscribe()
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <nav className="p-4 bg-gray-100">
      <Link href="/">Inicio</Link> |
      <Link href="/dashboard">Mi perfil</Link> |
      <Link href="/admin">Admin</Link>
      <button onClick={signOut} className="ml-4">Salir</button>
    </nav>
  )
}

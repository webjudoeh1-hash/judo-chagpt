'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function PerfilPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        window.location.href = '/'
      } else {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  if (!user) return <p>Cargando perfil...</p>

  return (
    <div className="profile-wrap">
      <h1>Bienvenido, {user.email}</h1>
      <p>ID de usuario: {user.id}</p>
    </div>
  )
}

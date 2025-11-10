'use client'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [docs, setDocs] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data: sessionRes } = await supabase.auth.getSession()
      const user = sessionRes?.session?.user
      if (!user) return
      const { data: pf } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(pf)
      const { data: documents } = await supabase.from('documents').select('*').or(`group_id.eq.${pf?.group_id},group_id.is.null`)
      setDocs(documents || [])
    }
    load()
  }, [])

  return (
    <ProtectedRoute>
      <h2>Mi perfil</h2>
      {profile && (
        <div>
          <p>Nombre: {profile.full_name}</p>
          <p>Teléfono: {profile.phone}</p>
          <p>Grupo: {profile.group_id}</p>
        </div>
      )}

      <h3>Documentos disponibles</h3>
      <ul>
        {docs.map(d => (
          <li key={d.id}>{d.title} — <a href={`/api/download?path=${encodeURIComponent(d.storage_path)}`}>Descargar</a></li>
        ))}
      </ul>
    </ProtectedRoute>
  )
}

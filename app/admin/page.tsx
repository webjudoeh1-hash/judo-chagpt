'use client'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import AdminDocumentForm from '../../components/AdminDocumentForm'

export default function AdminPage() {
  const [docs, setDocs] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('documents').select('*')
      setDocs(data || [])
    }
    load()
  }, [])

  return (
    <ProtectedRoute>
      <h2>Panel Administrador</h2>
      <AdminDocumentForm onUploaded={() => location.reload()} />

      <h3>Todos los documentos</h3>
      <ul>
        {docs.map(d => (
          <li key={d.id}>{d.title} — {d.group_id || 'Sin grupo'}</li>
        ))}
      </ul>
    </ProtectedRoute>
  )
}

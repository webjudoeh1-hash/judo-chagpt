'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AdminDocumentForm({ onUploaded }: { onUploaded?: ()=>void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [groupId, setGroupId] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  async function upload(e: any) {
    e.preventDefault()
    if (!file) return alert('Selecciona un archivo')

    const filename = `${Date.now()}_${file.name}`
    const { data, error: upErr } = await supabase.storage.from('private-docs').upload(filename, file, { cacheControl: '3600', upsert: false })
    if (upErr) return alert('Error subiendo a storage: ' + upErr.message)

    const storagePath = data.path
    const { error: insertErr } = await supabase.from('documents').insert([{ title, description, filename: file.name, storage_path: storagePath, mime: file.type, size: file.size, group_id: groupId }])
    if (insertErr) return alert('Error guardando metadata: ' + insertErr.message)
    alert('Subido')
    onUploaded && onUploaded()
  }

  return (
    <form onSubmit={upload} className="p-4 border">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button type="submit">Subir</button>
    </form>
  )
}

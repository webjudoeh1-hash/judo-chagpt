'use client'
import { supabase } from '../lib/supabaseClient'
import { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Revisa tu correo para el enlace mágico (OTP).')
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Plataforma privada - Academia Judo</h1>
      <p>Ingresa con tu correo registrado</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
      <button onClick={signIn}>Enviar enlace</button>
      <div>{message}</div>
    </div>
  )
}

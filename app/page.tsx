"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/perfil`,
      },
    });

    if (error) {
      setMessage("Error enviando enlace: " + error.message);
    } else {
      setMessage("Revisa tu correo para el enlace mágico ✉️");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Plataforma privada - Academia Judo
        </h1>

        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm"
        >
          <label className="block text-gray-700 mb-2 text-sm font-semibold">
            Ingresa con tu correo registrado
          </label>
          <input
            type="email"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </>
  );
}

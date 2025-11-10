import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(url, serviceKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path } = req.query
  if (!path || typeof path !== 'string') return res.status(400).send('missing path')

  const { data, error } = await supabase.storage.from('private-docs').createSignedUrl(path, 60)
  if (error) return res.status(500).json({ error: error.message })

  return res.redirect(data.signedUrl)
}

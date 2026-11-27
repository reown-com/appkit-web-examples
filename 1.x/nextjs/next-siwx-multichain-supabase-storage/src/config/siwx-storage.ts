import type { SIWXSession } from '@reown/appkit'
import type { SIWXStorage } from '@reown/appkit-siwx'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient( process.env.SUPABASE_URL || "", process.env.SUPABASE_KEY || "" )

export class SupabaseStorage implements SIWXStorage {
  async add(session: SIWXSession): Promise<void> {
    await supabase.from('siwx_sessions').insert(session)
  }

  async set(sessions: SIWXSession[]): Promise<void> {
    await supabase.from('siwx_sessions').delete()
    await supabase.from('siwx_sessions').insert(sessions)
  }

  async get(chainId: string, address: string): Promise<SIWXSession[]> {
    const { data } = await supabase.from('siwx_sessions').select('*').eq('address', address)
    return data || []
  }

  async delete(chainId: string, address: string): Promise<void> {
    await supabase.from('siwx_sessions').delete().eq('address', address)
  }
}
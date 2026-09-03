import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { AuthUser, AuthSession } from '../lib/auth'

interface AuthState {
  user: AuthUser | null
  session: AuthSession | null
  loading: boolean
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  useEffect(() => {
    // دریافت session اولیه
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        user: session?.user ?? null,
        session,
        loading: false
      })
    })

    // گوش دادن به تغییرات auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({
          user: session?.user ?? null,
          session,
          loading: false
        })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return state
}

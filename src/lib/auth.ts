import { supabase } from './supabase'
import type { User, Session } from '@supabase/supabase-js'

export type AuthUser = User
export type AuthSession = Session

// ثبت‌نام
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  })
  if (error) throw error
  return data
}

// ورود
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

// خروج
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// دریافت session فعلی
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

// دریافت کاربر فعلی
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

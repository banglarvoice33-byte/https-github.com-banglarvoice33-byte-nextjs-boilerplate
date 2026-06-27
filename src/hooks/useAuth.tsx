import { useState, useEffect, createContext, useContext, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

interface UserRole {
  id: string
  name: string
  permissions: string[]
}

interface StaffMember {
  id: string
  user_id: string
  role_id: string
  email: string
  name: string | null
  is_active: boolean
  role: UserRole | null
}

interface AuthContextType {
  user: any | null
  staff: StaffMember | null
  isLoading: boolean
  isAdmin: boolean
  isSuperAdmin: boolean
  canAccessEcosystem: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  staff: null,
  isLoading: true,
  isAdmin: false,
  isSuperAdmin: false,
  canAccessEcosystem: false,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null)
  const [staff, setStaff] = useState<StaffMember | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchStaffProfile(session.user.id)
      }
      setIsLoading(false)
    }
    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchStaffProfile(session.user.id)
      } else {
        setStaff(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchStaffProfile = async (userId: string) => {
    const { data } = await supabase
      .from('staff_members')
      .select('*, role:staff_roles(*)')
      .eq('user_id', userId)
      .eq('is_active', true)
      .maybeSingle()
    if (data) {
      setStaff(data as StaffMember)
    }
  }

  const isSuperAdmin = staff?.role?.name === 'super_admin'
  const isAdmin = isSuperAdmin || staff?.role?.name === 'admin'
  const canAccessEcosystem = isAdmin || staff?.role?.name === 'editor'

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setStaff(null)
  }

  return (
    <AuthContext.Provider value={{ user, staff, isLoading, isAdmin, isSuperAdmin, canAccessEcosystem, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

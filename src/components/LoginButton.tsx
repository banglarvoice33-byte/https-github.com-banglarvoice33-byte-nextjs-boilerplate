import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { LogIn, LogOut, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginButton() {
  const { user, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleLogout = async () => {
    setIsSigningOut(true)
    await signOut()
    setIsSigningOut(false)
  }

  if (!user) {
    return (
      <a
        href="/login"
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md',
          'text-sm font-medium text-white hover:text-white/90',
          'hover:bg-white/10 transition-colors'
        )}
      >
        <LogIn className="w-4 h-4" />
        লগ ইন
      </a>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <div
        className={cn(
          'w-8 h-8 rounded-full bg-[#2E4CB2] flex items-center justify-center',
          'text-white text-xs font-bold'
        )}
        title={user.email}
      >
        <User className="w-4 h-4" />
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        disabled={isSigningOut}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md',
          'text-sm font-medium text-white hover:text-white/90',
          'hover:bg-white/10 transition-colors',
          'disabled:opacity-60 disabled:cursor-not-allowed'
        )}
        aria-label="লগ আউট"
      >
        {isSigningOut ? (
          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
        <span className="hidden sm:inline">লগ আউট</span>
      </button>
    </div>
  )
}

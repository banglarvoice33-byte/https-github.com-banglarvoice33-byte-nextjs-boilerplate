import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock, LogIn, ArrowLeft, Chrome } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const { signIn, signInWithOAuth } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (!email.trim() || !password.trim()) {
      setError('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড উভয়ই প্রবেশ করুন')
      setIsLoading(false)
      return
    }

    const { error: signInError } = await signIn(email.trim(), password.trim())
    setIsLoading(false)

    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'ভুল ইমেইল বা পাসওয়ার্ড'
          : signInError.message || 'লগ ইন ব্যর্থ হয়েছে'
      )
      return
    }

    navigate('/ecosystem', { replace: true })
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsGoogleLoading(true)
    const { error: oauthError } = await signInWithOAuth()
    setIsGoogleLoading(false)
    if (oauthError) {
      setError(oauthError.message || 'Google sign-in failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#2E4CB2] hover:text-[#243d8f] font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          প্রচ্ছদে ফিরে যান
        </a>

        {/* Card */}
        <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 md:p-8">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-[#2E4CB2] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-headline font-bold text-2xl">ভ</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-[#2E4CB2] leading-tight">
              BANGLAR VOICE
            </h1>
            <p className="text-sm text-muted-foreground mt-1">বাংলার ভয়েস</p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className={cn(
              'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
              'bg-white border border-border text-foreground text-sm font-semibold',
              'hover:bg-gray-50 transition-colors',
              'disabled:opacity-60 disabled:cursor-not-allowed'
            )}
          >
            {isGoogleLoading ? (
              <span className="w-4 h-4 border-2 border-[#2E4CB2] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Chrome className="w-4 h-4 text-[#4285F4]" />
                Google দিয়ে লগ ইন করুন
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-muted-foreground">অথবা</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                ইমেইল
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল ঠিকানা"
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-foreground font-body',
                    'focus:outline-none focus:ring-2 focus:ring-[#2E4CB2] focus:border-transparent',
                    'placeholder:text-muted-foreground/60',
                    error ? 'border-red-400 focus:ring-red-300' : 'border-input'
                  )}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড"
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background text-foreground font-body',
                    'focus:outline-none focus:ring-2 focus:ring-[#2E4CB2] focus:border-transparent',
                    'placeholder:text-muted-foreground/60',
                    error ? 'border-red-400 focus:ring-red-300' : 'border-input'
                  )}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg',
                'bg-[#2E4CB2] text-white text-sm font-semibold',
                'hover:bg-[#243d8f] transition-colors',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  লগ ইন
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            কেবল অনুমোদিত স্টাফদের জন্য
          </p>
        </div>
      </div>
    </div>
  )
}

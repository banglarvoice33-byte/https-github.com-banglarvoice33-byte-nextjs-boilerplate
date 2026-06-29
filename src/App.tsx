import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EcosystemPage from './pages/EcosystemPage'
import ForbiddenPage from './pages/ForbiddenPage'
import MissionVisionPage from './pages/MissionVisionPage'

function AuthCallback() {
  const { user, isLoading, canAccessEcosystem } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (canAccessEcosystem) {
          navigate('/ecosystem', { replace: true })
        } else {
          navigate('/', { replace: true })
        }
      } else {
        setError('Authentication failed. Please try again.')
      }
    }
  }, [isLoading, user, canAccessEcosystem, navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-headline text-xl font-semibold text-foreground mb-2">
            Authentication Error
          </h1>
          <p className="text-sm text-red-600 mb-6">{error}</p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2E4CB2] text-white text-sm font-semibold hover:bg-[#243d8f] transition-colors"
          >
            লগ ইন পেজে ফিরে যান
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-[#2E4CB2] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background w-full overflow-x-hidden">
        <Header />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/staff/login" element={<LoginPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="/about" element={<MissionVisionPage />} />
            <Route path="/mission" element={<MissionVisionPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App

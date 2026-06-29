import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import EcosystemPage from './pages/EcosystemPage'
import ForbiddenPage from './pages/ForbiddenPage'
import MissionVisionPage from './pages/MissionVisionPage'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/staff/login" element={<LoginPage />} />
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

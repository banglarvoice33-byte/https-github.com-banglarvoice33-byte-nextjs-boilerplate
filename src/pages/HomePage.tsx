import HeroSection from '@/components/HeroSection'
import NewsCategories from '@/components/NewsCategories'
import SportsSection from '@/components/SportsSection'
import EntertainmentSection from '@/components/EntertainmentSection'
import EditorialSection from '@/components/EditorialSection'
import EPaperSection from '@/components/EPaperSection'
import { Sidebar } from '@/components/sidebar'

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Main content + sidebar grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left column: Main content */}
          <div className="md:col-span-2 space-y-8">
            <NewsCategories />
            <SportsSection />
            <EntertainmentSection />
            <EditorialSection />
          </div>

          {/* Right column: Sidebar */}
          <div className="md:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>

      <EPaperSection />
    </>
  )
}

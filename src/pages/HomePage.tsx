import HeroSection from '@/components/HeroSection'
import StudentLearningHub from '@/components/StudentLearningHub'
import NewsCategories from '@/components/NewsCategories'
import SportsSection from '@/components/SportsSection'
import EntertainmentSection from '@/components/EntertainmentSection'
import EditorialSection from '@/components/EditorialSection'
import EPaperSection from '@/components/EPaperSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StudentLearningHub />
      <NewsCategories />
      <SportsSection />
      <EntertainmentSection />
      <EditorialSection />
      <EPaperSection />
    </>
  )
}

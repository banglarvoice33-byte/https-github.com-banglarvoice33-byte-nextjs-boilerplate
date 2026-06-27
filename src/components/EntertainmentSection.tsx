import { Film, ChevronRight, Clock, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const entertainmentArticles = [
  {
    id: 'e1',
    title: 'বাংলাদেশি সিনেমা "দ্য লাস্ট হিরো" কান ফিল্ম ফেস্টিভালে প্রদর্শিত',
    summary: 'পরিচালক জনি হকের নতুন সিনেমা কান ফিল্ম ফেস্টিভালে স্ট্যান্ডিং ওভেশন পেয়েছে।',
    image: 'https://images.pexels.com/photos/109669/pexels-photo-109669.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'বিনোদন',
    readTime: 3,
    views: '১১.২K',
    date: '২৬ জুন',
  },
  {
    id: 'e2',
    title: 'ঢাকার কনসার্টে ৫০,০০০ দর্শকের উপস্থিতি',
    summary: 'ব্যান্ড মিউজিকের জনপ্রিয় অনুষ্ঠানে রাজধানীর সবচেয়ে বড় কনসার্ট অনুষ্ঠিত।',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'বিনোদন',
    readTime: 2,
    views: '৮.৫K',
    date: '২৫ জুন',
  },
  {
    id: 'e3',
    title: 'ঢালিউডের নতুন প্রজন্ম: ডিজিটাল সিনেমার উত্থান',
    summary: 'নতুন প্রযুক্তি ও স্ট্রিমিং প্ল্যাটফর্ম বাংলাদেশি সিনেমার দৃশ্যপট বদলে দিচ্ছে।',
    image: 'https://images.pexels.com/photos/7234207/pexels-photo-7234207.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'বিনোদন',
    readTime: 4,
    views: '৬.১K',
    date: '২৪ জুন',
  },
  {
    id: 'e4',
    title: 'নেটফ্লিক্সে বাংলাদেশি কন্টেন্টের নতুন যুগ',
    summary: 'আন্তর্জাতিক স্ট্রিমিং প্ল্যাটফর্মে বাংলাদেশি সিরিজ ও সিনেমা প্রদর্শন শুরু।',
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'বিনোদন',
    readTime: 3,
    views: '৯.৩K',
    date: '২৩ জুন',
  },
]

export default function EntertainmentSection() {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-[#f0f4ff] to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-[#C62828]" />
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-[#C62828]" />
              <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground">বিনোদন</h2>
            </div>
          </div>
          <a href="/entertainment" className="text-sm font-semibold text-[#2E4CB2] hover:text-[#1BA1E2] flex items-center gap-1 transition-colors">
            আরও দেখুন <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {entertainmentArticles.map((article, index) => (
            <article
              key={article.id}
              className={cn(
                'group bg-white rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
                index === 0 && 'md:col-span-2 lg:col-span-2'
              )}
            >
              <div className={cn(
                'relative overflow-hidden',
                index === 0 ? 'aspect-[16/9]' : 'aspect-[16/10]'
              )}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-[#C62828] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className={cn(
                  'font-headline font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-[#2E4CB2] transition-colors',
                  index === 0 ? 'text-lg' : 'text-base'
                )}>
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime} মিন
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {article.views}
                    </span>
                  </div>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { Newspaper, MapPin, Landmark, TrendingUp, Globe, Cpu, Heart, GraduationCap, Stethoscope, ChevronRight, Clock, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', label: 'সব', icon: Newspaper },
  { id: 'national', label: 'জাতীয়', icon: MapPin },
  { id: 'politics', label: 'রাজনীতি', icon: Landmark },
  { id: 'economy', label: 'অর্থনীতি', icon: TrendingUp },
  { id: 'international', label: 'আন্তর্জাতিক', icon: Globe },
  { id: 'tech', label: 'প্রযুক্তি', icon: Cpu },
  { id: 'sports', label: 'খেলা', icon: Heart },
  { id: 'education', label: 'শিক্ষা', icon: GraduationCap },
  { id: 'health', label: 'স্বাস্থ্য', icon: Stethoscope },
]

const articles = [
  {
    id: '1',
    title: 'বাংলাদেশে নতুন স্যাটেলাইট স্টেশন স্থাপনের উদ্যোগ',
    summary: 'দেশের প্রথম স্যাটেলাইট গ্রাউন্ড স্টেশন স্থাপনের কাজ শুরু হয়েছে। এটি মহাকাশ গবেষণায় নতুন দিগন্ত উন্মোচন করবে।',
    image: 'https://images.pexels.com/photos/256379/pexels-photo-256379.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'জাতীয়',
    readTime: 4,
    views: '৫.৩K',
    date: '২৬ জুন',
  },
  {
    id: '2',
    title: 'আগামী বাজেটে শিক্ষা খাতে রেকর্ড বরাদ্দের প্রস্তাব',
    summary: '২০২৬-২৭ অর্থবছরের বাজেটে শিক্ষা খাতে জিডিপির ৩ শতাংশ বরাদ্দ রাখার প্রস্তাব করা হয়েছে।',
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'শিক্ষা',
    readTime: 3,
    views: '৩.১K',
    date: '২৫ জুন',
  },
  {
    id: '3',
    title: 'ঢাকার বায়ুদূষণ কমাতে নতুন পরিবেশনীতি ঘোষণা',
    summary: 'রাজধানীর বায়ুদূষণ কমাতে সরকার নতুন পরিবেশনীতি ঘোষণা করেছে। বড় প্রকল্পে পরিবেশগত ছাড়পত্র বাধ্যতামূলক।',
    image: 'https://images.pexels.com/photos/221012/pexels-photo-221012.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'জাতীয়',
    readTime: 4,
    views: '২.৫K',
    date: '২৩ জুন',
  },
  {
    id: '4',
    title: 'আইফোন ১৬ প্রো বাংলাদেশে আনুষ্ঠানিকভাবে লঞ্চ',
    summary: 'আপেলের নতুন আইফোন ১৬ প্রো সিরিজ বাংলাদেশের বাজারে আনুষ্ঠানিকভাবে লঞ্চ হয়েছে। প্রাথমিক দাম শুরু হচ্ছে।',
    image: 'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'প্রযুক্তি',
    readTime: 3,
    views: '৭.২K',
    date: '২৪ জুন',
  },
  {
    id: '5',
    title: 'রাজনীতিতে নতুন জোট: গণতান্ত্রিক ঐক্যের আহ্বান',
    summary: 'বিরোধী দলগুলো একত্রিত হয়ে গণতান্ত্রিক আন্দোলনের নতুন কর্মসূচি ঘোষণা করেছে। আগামী নির্বাচনে অংশগ্রহণের প্রতিশ্রুতি।',
    image: 'https://images.pexels.com/photos/1550338/pexels-photo-1550338.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'রাজনীতি',
    readTime: 4,
    views: '৬.৮K',
    date: '২২ জুন',
  },
  {
    id: '6',
    title: 'বাংলাদেশের জিডিপি প্রবৃদ্ধি ৭.২ শতাংশে দাঁড়ালো',
    summary: 'বিশ্বব্যাংকের প্রতিবেদন অনুযায়ী বাংলাদেশের জিডিপি প্রবৃদ্ধি ৭.২ শতাংশে পৌঁছেছে। এটি এশিয়ার দ্রুততম বর্ধনশীল অর্থনীতির মধ্যে।',
    image: 'https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'অর্থনীতি',
    readTime: 5,
    views: '৪.১K',
    date: '২২ জুন',
  },
]

export default function NewsCategories() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter((a) => a.category === categories.find(c => c.id === activeCategory)?.label)

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-[#2E4CB2]" />
            <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground">সর্বশেষ সংবাদ</h2>
          </div>
          <a href="/all-news" className="text-sm font-semibold text-[#2E4CB2] hover:text-[#1BA1E2] flex items-center gap-1 transition-colors">
            আরও দেখুন <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
                  isActive
                    ? 'bg-[#2E4CB2] text-white shadow-md shadow-[#2E4CB2]/20'
                    : 'bg-white text-muted-foreground border border-border hover:text-[#2E4CB2] hover:border-[#2E4CB2]/30'
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article, index) => (
            <article
              key={article.id}
              className={cn(
                'group bg-white rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
                index === 0 && 'md:col-span-2 lg:col-span-1'
              )}
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-[#2E4CB2] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-headline text-base font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-[#2E4CB2] transition-colors">
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

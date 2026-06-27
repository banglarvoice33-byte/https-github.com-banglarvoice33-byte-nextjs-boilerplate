import { Trophy, ChevronRight, Clock, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'

const sportsArticles = [
  {
    id: 's1',
    title: 'বিশ্বকাপে বাংলাদেশের সেমিফাইনালে ওঠার সম্ভাবনা জোরালো',
    summary: 'আজকের ম্যাচে জয় পেলে সেমিফাইনালে এক পা দেবে বাংলাদেশ। দলের সব খেলোয়াড় ফিট।',
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'খেলাধুলা',
    readTime: 2,
    views: '৯.৮K',
    date: '২৬ জুন',
  },
  {
    id: 's2',
    title: 'বাংলাদেশ বনাম অস্ট্রেলিয়া দ্বিতীয় টেস্ট শুরু',
    summary: 'চট্টগ্রামে দ্বিতীয় টেস্ট শুরু হয়েছে। টস জিতে বাংলাদেশ প্রথমে ব্যাটিং করছে।',
    image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'খেলাধুলা',
    readTime: 3,
    views: '৭.১K',
    date: '২৫ জুন',
  },
  {
    id: 's3',
    title: 'মেসির জাদুকরী গোলে আর্জেন্টিনা কোপা আমেরিকা জয়ী',
    summary: 'ফাইনালে ব্রাজিলকে ২-১ গোলে হারিয়ে আর্জেন্টিনা কোপা আমেরিকা জিতেছে।',
    image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'খেলাধুলা',
    readTime: 4,
    views: '১২.৩K',
    date: '২৪ জুন',
  },
  {
    id: 's4',
    title: 'বাংলাদেশের যুব হকি দল এশিয়া কাপের ফাইনালে',
    summary: 'যুব হকি দল দারুণ পারফরম্যান্সে এশিয়া কাপের ফাইনালে উঠেছে।',
    image: 'https://images.pexels.com/photos/5274538/pexels-photo-5274538.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'খেলাধুলা',
    readTime: 2,
    views: '৪.৫K',
    date: '২৩ জুন',
  },
]

export default function SportsSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-[#E65100]" />
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#E65100]" />
              <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground">খেলাধুলা</h2>
            </div>
          </div>
          <a href="/sports" className="text-sm font-semibold text-[#2E4CB2] hover:text-[#1BA1E2] flex items-center gap-1 transition-colors">
            আরও দেখুন <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {sportsArticles.map((article, index) => (
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
                <span className="absolute top-3 left-3 bg-[#E65100] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
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

import { useEffect, useState } from 'react'
import { Clock, Eye, ArrowRight, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const heroSlides = [
  {
    title: 'বাংলাদেশের অর্থনীতিতে নতুন মাইলফলক: রপ্তানি আয় ৫০ বিলিয়ন ডলার ছাড়িয়েছে',
    summary: 'চলতি অর্থবছরে বাংলাদেশের রপ্তানি আয় ঐতিহাসিক উচ্চতায় পৌঁছেছে। পোশাক শিল্প ও আইটি সেক্টরের অবদানে এই সাফল্য অর্জিত হয়েছে।',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'অর্থনীতি',
    readTime: 5,
    views: '১২.৫K',
  },
  {
    title: 'ঢাকা-কক্সবাজার বুলেট ট্রেন প্রকল্পে চূড়ান্ত অনুমোদন',
    summary: 'দেশের প্রথম বুলেট ট্রেন প্রকল্পে মন্ত্রিসভার চূড়ান্ত অনুমোদন। ২০৩০ সালের মধ্যে প্রকল্প বাস্তবায়নের লক্ষ্য নির্ধারিত।',
    image: 'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'জাতীয়',
    readTime: 4,
    views: '৮.২K',
  },
  {
    title: 'বাংলাদেশ ক্রিকেট দল এশিয়া কাপের ফাইনালে উঠেছে',
    summary: 'বিদায়ী ম্যাচে ভারতের বিরুদ্ধে জয়ের মাধ্যমে বাংলাদেশ এশিয়া কাপের ফাইনালে নিজেদের জায়গা নিশ্চিত করেছে।',
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    category: 'খেলা',
    readTime: 3,
    views: '১৫.১K',
  },
]

const breakingTicker = [
  'ঢাকা মেট্রোরেলের নতুন রুট চালু',
  'বাংলাদেশ বনাম অস্ট্রেলিয়া দ্বিতীয় টেস্ট শুরু',
  'জ্বালানি তেলের দাম কমলো',
  'নতুন শিক্ষানীতি অনুমোদন',
  'বাংলাদেশ আইটি এক্সপো আজ থেকে শুরু',
]

export default function HeroSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => (a + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative">
      {/* Breaking news ticker */}
      <div className="bg-[#2E4CB2] text-white py-2 overflow-hidden">
        <div className="flex items-center gap-4 max-w-7xl mx-auto px-4">
          <span className="shrink-0 flex items-center gap-1.5 bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
            <TrendingUp className="w-3 h-3" /> লাইভ
          </span>
          <div className="overflow-hidden flex-1">
            <div className="animate-marquee whitespace-nowrap flex gap-12">
              {[...breakingTicker, ...breakingTicker].map((text, i) => (
                <span key={i} className="text-sm font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main hero */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main featured article */}
          <div className="lg:col-span-2 relative group overflow-hidden rounded-xl bg-card shadow-lg">
            {heroSlides.map((slide, i) => (
              <div
                key={i}
                className={cn(
                  'absolute inset-0 transition-opacity duration-700',
                  i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
              >
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block bg-[#1BA1E2] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {slide.category}
                  </span>
                  <h2 className="font-headline text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
                    {slide.summary}
                  </p>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {slide.readTime} মিনিট
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {slide.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Slide dots */}
            <div className="absolute top-4 right-4 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-300',
                    i === active ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                  )}
                  aria-label={`স্লাইড ${i + 1}`}
                />
              ))}
            </div>
            {/* Aspect ratio placeholder */}
            <div className="invisible pt-[56.25%] lg:pt-[48%]" />
          </div>

          {/* Side articles */}
          <div className="flex flex-col gap-4">
            {heroSlides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'text-left group flex gap-4 p-3 rounded-xl transition-all duration-300 border-2',
                  i === active
                    ? 'bg-white border-[#2E4CB2] shadow-md'
                    : 'bg-white border-transparent hover:border-border hover:shadow-sm'
                )}
              >
                <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-[#1BA1E2]">{slide.category}</span>
                  <h3 className="font-headline text-sm font-semibold text-foreground leading-snug mt-1 line-clamp-2">
                    {slide.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {slide.readTime} মিন
                    </span>
                  </div>
                </div>
              </button>
            ))}
            <a
              href="/all-news"
              className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#2E4CB2] hover:text-[#1BA1E2] transition-colors rounded-xl border-2 border-dashed border-[#2E4CB2]/30 hover:border-[#1BA1E2]/50"
            >
              সব সংবাদ দেখুন <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

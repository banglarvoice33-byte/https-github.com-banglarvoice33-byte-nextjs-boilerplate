import { useEffect, useRef } from 'react'
import { Users, Video, FileText, TrendingUp, MessageCircle, ArrowRight, Sparkles, GraduationCap, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Users,
    label: 'ব্যক্তিগত শিক্ষক নির্বাচন',
    desc: 'আপনার প্রয়োজন অনুযায়ী সেরা শিক্ষক বেছে নিন',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Video,
    label: 'লাইভ ক্লাস',
    desc: 'ইন্টারঅ্যাক্টিভ লাইভ ক্লাসে যোগ দিন যেকোনো সময়',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: FileText,
    label: 'পরীক্ষার প্রস্তুতি',
    desc: 'বোর্ড ও বিশ্ববিদ্যালয় পরীক্ষার কম্প্রিহেনসিভ প্রস্তুতি',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: TrendingUp,
    label: 'দক্ষতা উন্নয়ন',
    desc: 'কর্মজীবনের জন্য প্রয়োজনীয় দক্ষতা অর্জন করুন',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: MessageCircle,
    label: 'অনলাইন পরামর্শ',
    desc: '২৪/৭ শিক্ষাগত ও ক্যারিয়ার পরামর্শ পান',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
]

export default function StudentLearningHub() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const el = sectionRef.current
    if (el) {
      el.querySelectorAll('.animate-on-scroll').forEach((child) => {
        child.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
        observer.observe(child)
      })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-gradient-to-b from-background to-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main banner card */}
        <div className="animate-on-scroll relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-xl border border-[#2E4CB2]/10">
          {/* Decorative gradient blobs */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#2E4CB2]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#1BA1E2]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#2E4CB2]/3 to-[#1BA1E2]/5 rounded-full blur-3xl" />

          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E4CB2' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative p-6 md:p-10 lg:p-12">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] items-center justify-center shadow-lg animate-pulse-glow">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#1BA1E2]" />
                    <span className="text-xs font-semibold text-[#1BA1E2] uppercase tracking-wider">নতুন সেবা</span>
                  </div>
                  <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E4CB2] leading-tight">
                    বাংলার ভয়েস লার্নিং হাব
                  </h2>
                  <p className="text-xs font-medium text-[#1BA1E2] mt-1">
                    Banglar Voice Learning Hub
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">
                    একজন শিক্ষার্থীর জন্য একজন শিক্ষক
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(0x0985 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">১০,০০০+ শিক্ষার্থী যুক্ত</span>
              </div>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div
                    key={i}
                    className={cn(
                      'group relative p-5 rounded-xl border border-border/50 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer',
                      'hover:border-[#2E4CB2]/20'
                    )}
                  >
                    <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-all duration-300', feature.bgColor)}>
                      <Icon className={cn('w-5 h-5 transition-transform duration-300 group-hover:scale-110', feature.iconColor)} />
                    </div>
                    <h3 className="font-headline text-sm font-bold text-foreground mb-1">{feature.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                    {/* Hover gradient overlay */}
                    <div className={cn(
                      'absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none',
                      feature.color
                    )} />
                  </div>
                )
              })}
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/learning-hub/find-tutor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2E4CB2] to-[#1BA1E2] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[#2E4CB2]/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                <BookOpen className="w-4 h-4" />
                এখনই শিক্ষক খুঁজুন
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/learning-hub"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[#2E4CB2]/20 text-[#2E4CB2] font-semibold text-sm hover:bg-[#2E4CB2]/5 hover:border-[#2E4CB2]/40 transition-all duration-300"
              >
                <GraduationCap className="w-4 h-4" />
                লার্নিং হাবে প্রবেশ করুন
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

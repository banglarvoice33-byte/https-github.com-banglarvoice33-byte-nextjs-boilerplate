import { FileText, Calendar, Download, ChevronRight } from 'lucide-react'

export default function EPaperSection() {
  const today = '২৬ জুন ২০২৬'

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-[#f0f4ff] to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-[#1BA1E2]" />
            <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground">ই-পেপার</h2>
          </div>
          <a href="/e-paper" className="text-sm font-semibold text-[#2E4CB2] hover:text-[#1BA1E2] flex items-center gap-1 transition-colors">
            সব সংস্করণ <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Today's e-paper */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-xl bg-white shadow-lg border border-border/60 hover:shadow-xl transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[3/4] md:aspect-auto overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="আজকের ই-পেপার"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:to-white/40" />
                <div className="absolute top-4 left-4 bg-[#2E4CB2] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> {today}
                </div>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <span className="text-xs font-semibold text-[#1BA1E2] mb-2">আজকের সংস্করণ</span>
                <h3 className="font-headline text-xl font-bold text-foreground mb-3 leading-snug">
                  বাংলার ভয়েস — ই-পেপার
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  প্রতিদিন সকাল ৭টায় প্রকাশিত হয়। আজকের ১২ পৃষ্ঠার ই-পেপারে পড়ুন জাতীয়, রাজনৈতিক, অর্থনৈতিক ও আন্তর্জাতিক সংবাদ।
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/e-paper/read"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#2E4CB2] text-white text-sm font-semibold hover:bg-[#243d8f] transition-colors"
                  >
                    <FileText className="w-4 h-4" /> পড়ুন
                  </a>
                  <a
                    href="/e-paper/download"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#2E4CB2]/20 text-[#2E4CB2] text-sm font-semibold hover:bg-[#2E4CB2]/5 transition-colors"
                  >
                    <Download className="w-4 h-4" /> ডাউনলোড PDF
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Previous editions */}
          <div className="flex flex-col gap-4">
            {[
              { date: '২৫ জুন ২০২৬', pages: '১২' },
              { date: '২৪ জুন ২০২৬', pages: '১০' },
              { date: '২৩ জুন ২০২৬', pages: '১২' },
            ].map((edition, i) => (
              <a
                key={i}
                href={`/e-paper/${edition.date}`}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-border/60 shadow-sm hover:shadow-md hover:border-[#2E4CB2]/20 transition-all duration-300"
              >
                <div className="w-14 h-16 shrink-0 rounded-lg bg-[#2E4CB2]/10 flex items-center justify-center group-hover:bg-[#2E4CB2]/20 transition-colors">
                  <FileText className="w-6 h-6 text-[#2E4CB2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline text-sm font-semibold text-foreground truncate">
                    {edition.date}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{edition.pages} পৃষ্ঠা</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#2E4CB2] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

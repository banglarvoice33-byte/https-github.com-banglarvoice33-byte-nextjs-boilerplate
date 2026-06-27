import { PenTool, ChevronRight, Clock, Eye, Quote } from 'lucide-react'

const editorialArticles = [
  {
    id: 'ed1',
    title: 'জনগণের কণ্ঠস্বর: সংবাদ মাধ্যমের দায়িত্ব ও কর্তব্য',
    summary: 'গণতান্ত্রিক সমাজে সংবাদ মাধ্যমের ভূমিকা নিয়ে আমাদের সম্পাদকীয় মন্তব্য। সঠিক তথ্য প্রকাশের দায়িত্ব।',
    image: 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'সম্পাদকীয়',
    readTime: 5,
    views: '৫.২K',
    date: '২৬ জুন',
    author: 'সম্পাদকীয় পর্ষদ',
  },
  {
    id: 'ed2',
    title: 'শিক্ষার অধিকার: প্রতিটি শিশুর জন্য সমান সুযোগ',
    summary: 'বাংলাদেশে শিক্ষার অবস্থা ও উন্নয়নের পথে নেওয়া প্রয়োজনীয় পদক্ষেপ।',
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'সম্পাদকীয়',
    readTime: 4,
    views: '৩.৮K',
    date: '২৫ জুন',
    author: 'সম্পাদকীয় পর্ষদ',
  },
  {
    id: 'ed3',
    title: 'জলবায়ু পরিবর্তন: বাংলাদেশের জন্য এক বেঁচে থাকার লড়াই',
    summary: 'বিশ্ব জলবায়ু পরিবর্তনের প্রভাবে বাংলাদেশের ভূখণ্ড ও জনজীবনের উপর প্রভাব।',
    image: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'সম্পাদকীয়',
    readTime: 6,
    views: '৪.৬K',
    date: '২৪ জুন',
    author: 'সম্পাদকীয় পর্ষদ',
  },
]

export default function EditorialSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-[#8B3A3A]" />
            <div className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-[#8B3A3A]" />
              <h2 className="font-headline text-xl md:text-2xl font-bold text-foreground">সম্পাদকীয়</h2>
            </div>
          </div>
          <a href="/editorial" className="text-sm font-semibold text-[#2E4CB2] hover:text-[#1BA1E2] flex items-center gap-1 transition-colors">
            আরও দেখুন <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured editorial */}
          <article className="lg:col-span-2 group bg-white rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={editorialArticles[0].image}
                  alt={editorialArticles[0].title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:to-white/40" />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-4 h-4 text-[#8B3A3A]" />
                  <span className="text-xs font-semibold text-[#8B3A3A]">সম্পাদকীয়</span>
                </div>
                <h3 className="font-headline text-xl font-bold text-foreground leading-snug mb-3 group-hover:text-[#2E4CB2] transition-colors">
                  {editorialArticles[0].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {editorialArticles[0].summary}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {editorialArticles[0].readTime} মিন
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {editorialArticles[0].views}
                    </span>
                  </div>
                  <span>{editorialArticles[0].date}</span>
                </div>
              </div>
            </div>
          </article>

          {/* Side editorials */}
          <div className="flex flex-col gap-4">
            {editorialArticles.slice(1).map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 bg-[#8B3A3A] text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
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
      </div>
    </section>
  )
}

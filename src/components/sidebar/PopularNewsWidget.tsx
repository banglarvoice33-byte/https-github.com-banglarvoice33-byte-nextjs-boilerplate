import { Eye, Clock, Star } from 'lucide-react'

const popularNews = [
  {
    id: 'p1',
    title: 'বাংলাদেশের অর্থনীতিতে নতুন মাইলফলক',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
    readTime: 5,
    views: '১২.৫K',
  },
  {
    id: 'p2',
    title: 'ঢাকা-কক্সবাজার বুলেট ট্রেন প্রকল্প',
    image: 'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg?auto=compress&cs=tinysrgb&w=200',
    readTime: 4,
    views: '৮.২K',
  },
  {
    id: 'p3',
    title: 'বাংলাদেশ ক্রিকেট দল এশিয়া কাপ ফাইনালে',
    image: 'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg?auto=compress&cs=tinysrgb&w=200',
    readTime: 3,
    views: '১৫.১K',
  },
  {
    id: 'p4',
    title: 'নতুন শিক্ষানীতি অনুমোদন',
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=200',
    readTime: 6,
    views: '৫.৭K',
  },
]

export default function PopularNewsWidget() {
  return (
    <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
          <Star className="w-4 h-4 text-amber-500" />
        </div>
        <h3 className="font-headline text-sm font-bold text-foreground">জনপ্রিয় সংবাদ</h3>
      </div>
      <div className="space-y-3">
        {popularNews.map((item) => (
          <a
            key={item.id}
            href={`/news/${item.id}`}
            className="group flex items-start gap-3"
          >
            <div className="w-16 h-12 shrink-0 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground leading-snug line-clamp-2 group-hover:text-[#2E4CB2] transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3" /> {item.readTime} মিন
                </span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" /> {item.views}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

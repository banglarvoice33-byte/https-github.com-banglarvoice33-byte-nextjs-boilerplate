import { TrendingUp, Flame } from 'lucide-react'

const trendingItems = [
  { id: 't1', title: 'বিশ্বকাপে বাংলাদেশের সেমিফাইনালে ওঠার সম্ভাবনা', views: '১৫.২K' },
  { id: 't2', title: 'সুন্দরবনে বাঘ সংরক্ষণে নতুন উদ্যোগ', views: '১২.৮K' },
  { id: 't3', title: 'নতুন ডিজিটাল ব্যাংকিং প্ল্যাটফর্ম লঞ্চ', views: '৯.৫K' },
  { id: 't4', title: 'জ্বালানি তেলের দাম কমলো', views: '৮.১K' },
  { id: 't5', title: 'ঢাকা আন্তর্জাতিক বইমেলা শুরু', views: '৭.৩K' },
]

export default function TrendingWidget() {
  return (
    <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
          <Flame className="w-4 h-4 text-red-500" />
        </div>
        <h3 className="font-headline text-sm font-bold text-foreground">ট্রেন্ডিং</h3>
      </div>
      <div className="space-y-3">
        {trendingItems.map((item, i) => (
          <a
            key={item.id}
            href={`/news/${item.id}`}
            className="group flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#2E4CB2]/10 text-[#2E4CB2] flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground leading-snug line-clamp-2 group-hover:text-[#2E4CB2] transition-colors">
                {item.title}
              </p>
              <span className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {item.views}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

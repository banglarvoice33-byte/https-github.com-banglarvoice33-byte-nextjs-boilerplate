import { useEffect, useState } from 'react'
import { GraduationCap, BookOpen, TrendingUp, Eye, Flame, Tag, Megaphone } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'

/* ─── Category Grouping ─── */
interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
}

const CATEGORY_GROUPS = {
  'সংবাদ': ['national', 'politics', 'economy', 'international'],
  'জীবনযাপন': ['sports', 'entertainment', 'tech', 'education', 'health'],
  'বিশেষ': ['breaking', 'editorial'],
}

function CategoryWidget() {
  const [categories, setCategories] = useState<Category[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('categories').select('id,name,slug,icon,color').then(({ data }) => {
      if (data) setCategories(data)
    })
  }, [])

  const groups = Object.entries(CATEGORY_GROUPS).map(([group, slugs]) => ({
    group,
    items: categories.filter(c => slugs.includes(c.slug)),
  }))

  return (
    <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4">
      <h3 className="font-headline text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <Tag className="w-4 h-4 text-[#2E4CB2]" /> বিভাগ
      </h3>
      <div className="space-y-4">
        {groups.map(g => (
          <div key={g.group}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {g.group}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map(cat => (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setActive(cat.slug)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                    active === cat.slug
                      ? 'bg-[#2E4CB2] text-white'
                      : 'bg-muted/50 text-muted-foreground hover:bg-[#2E4CB2]/10 hover:text-[#2E4CB2]'
                  )}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Trending Widget ─── */
interface TrendingItem {
  id: string
  title: string
  views: number
  category: string
  slug: string
}

function TrendingWidget() {
  const [items, setItems] = useState<TrendingItem[]>([])

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, views, category_id:categories(slug), category_id:categories(name)')
      .order('views', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) {
          const normalized = data.map((a: any) => ({
            id: a.id,
            title: a.title,
            views: a.views,
            category: a.category_id?.name || '',
            slug: a.category_id?.slug || '',
          }))
          setItems(normalized)
        }
      })
  }, [])

  return (
    <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4">
      <h3 className="font-headline text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[#E65100]" /> ট্রেন্ডিং
      </h3>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item, i) => (
            <a
              key={item.id}
              href={`/article/${item.id}`}
              className="group flex items-start gap-2.5"
            >
              <span className={cn(
                'w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5',
                i < 3 ? 'bg-[#E65100] text-white' : 'bg-muted text-muted-foreground'
              )}>
                {i + 1}
              </span>
              <div>
                <p className="text-sm text-foreground leading-snug group-hover:text-[#2E4CB2] transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Flame className="w-3 h-3" /> {item.views?.toLocaleString('bn-BD')}
                  </span>
                  {item.category && (
                    <span className="text-[10px] text-[#2E4CB2]/70 bg-[#2E4CB2]/5 px-1.5 rounded">
                      {item.category}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-md bg-muted animate-pulse shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded animate-pulse" />
                  <div className="h-2.5 bg-muted rounded w-20 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Popular Widget ─── */
interface PopularItem {
  id: string
  title: string
  image_url: string
  views: number
  read_time: number
}

function PopularWidget() {
  const [items, setItems] = useState<PopularItem[]>([])

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, image_url, views, read_time')
      .order('views', { ascending: false })
      .limit(4)
      .then(({ data }) => {
        if (data) setItems(data as PopularItem[])
      })
  }, [])

  return (
    <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4">
      <h3 className="font-headline text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <Eye className="w-4 h-4 text-[#2E4CB2]" /> জনপ্রিয়
      </h3>
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <a
              key={item.id}
              href={`/article/${item.id}`}
              className="group flex items-center gap-3"
            >
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={item.image_url || '/placeholder.svg'}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug group-hover:text-[#2E4CB2] transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {item.views?.toLocaleString('bn-BD')}
                  </span>
                  <span>{item.read_time} মিন</span>
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-muted animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded animate-pulse" />
                  <div className="h-2.5 bg-muted rounded w-20 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Learning Hub ─── */
function LearningHubWidget() {
  return (
    <div className="bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] rounded-xl shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">Banglar Voice</span>
        </div>
        <h3 className="font-headline text-sm font-bold text-white leading-snug mb-2">
          বাংলার ভয়েস লার্নিং হাব
        </h3>
        <p className="text-xs text-white/80 leading-relaxed mb-3">
          একজন শিক্ষার্থীর জন্য একজন শিক্ষক। ব্যক্তিগত শিক্ষক, লাইভ ক্লাস, পরীক্ষার প্রস্তুতি।
        </p>
        <div className="flex flex-col gap-1.5">
          <a
            href="/learning-hub/find-tutor"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white text-[#2E4CB2] font-semibold text-xs hover:bg-white/90 transition-colors"
          >
            <BookOpen className="w-3 h-3" /> শিক্ষক খুঁজুন
          </a>
          <a
            href="/learning-hub"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-white/40 text-white font-semibold text-xs hover:bg-white/10 transition-colors"
          >
            <GraduationCap className="w-3 h-3" /> প্রবেশ করুন
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Ads Widget ─── */
function AdsWidget() {
  return (
    <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#2E4CB2]/10 flex items-center justify-center">
          <Megaphone className="w-4 h-4 text-[#2E4CB2]" />
        </div>
        <h3 className="font-headline text-sm font-bold text-foreground">বিজ্ঞাপন</h3>
      </div>
      <div className="space-y-3">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] flex items-center justify-center text-center p-4">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative">
            <p className="font-headline text-sm font-bold text-white mb-1">BANGLAR VOICE</p>
            <p className="text-xs text-white/80">বিজ্ঞাপনের জন্য যোগাযোগ করুন</p>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#8B3A3A] to-[#C62828] flex items-center justify-center text-center p-4">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} />
          <div className="relative">
            <p className="font-headline text-sm font-bold text-white mb-1">শিক্ষার সেবা</p>
            <p className="text-xs text-white/80">লার্নিং হাবে বিজ্ঞাপন দিন</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Sidebar ─── */
export default function Sidebar() {
  return (
    <div className="space-y-6">
      <CategoryWidget />
      <LearningHubWidget />
      <TrendingWidget />
      <PopularWidget />
      <AdsWidget />
    </div>
  )
}

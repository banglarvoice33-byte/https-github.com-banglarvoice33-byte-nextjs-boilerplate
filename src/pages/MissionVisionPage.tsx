import { useEffect, useRef } from 'react'
import {
  Target,
  Eye,
  TrendingUp,
  Users,
  BookOpen,
  GraduationCap,
  FileText,
  Building2,
  Globe,
  Megaphone,
  ShoppingBag,
  Link2,
  Newspaper,
  CalendarDays,
  ArrowDown,
  CheckCircle2,
  Star,
  Sparkles,
  Brain,
  Shield,
  Lightbulb,
  HeartHandshake,
  Layers,
  Award,
  Rocket,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ──────────────────────────────────────────────────────────────
   Revenue Ecosystem Data
────────────────────────────────────────────────────────────── */
const revenueStreams = [
  { icon: Megaphone, bn: 'বিজ্ঞাপন', en: 'Advertising', color: 'from-blue-600 to-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-700' },
  { icon: Users, bn: 'সাবস্ক্রিপশন', en: 'Subscriptions', color: 'from-indigo-600 to-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-200 dark:border-indigo-700' },
  { icon: Star, bn: 'মেম্বারশিপ', en: 'Memberships', color: 'from-violet-600 to-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200 dark:border-violet-700' },
  { icon: Brain, bn: 'AI Academy', en: 'AI Academy', color: 'from-purple-600 to-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-700' },
  { icon: Award, bn: 'সার্টিফিকেশন প্রোগ্রাম', en: 'Certification Programs', color: 'from-fuchsia-600 to-fuchsia-500', bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20', border: 'border-fuchsia-200 dark:border-fuchsia-700' },
  { icon: FileText, bn: 'প্রিমিয়াম রিপোর্ট', en: 'Premium Reports', color: 'from-rose-600 to-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', border: 'border-rose-200 dark:border-rose-700' },
  { icon: Building2, bn: 'কর্পোরেট ট্রেনিং', en: 'Corporate Training', color: 'from-orange-600 to-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-700' },
  { icon: GraduationCap, bn: 'রিসার্চ সার্ভিস', en: 'Research Services', color: 'from-amber-600 to-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-700' },
  { icon: Newspaper, bn: 'স্পনসর্ড কনটেন্ট', en: 'Sponsored Content', color: 'from-yellow-600 to-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-700' },
  { icon: CalendarDays, bn: 'ইভেন্ট ও কনফারেন্স', en: 'Events & Conferences', color: 'from-lime-600 to-lime-500', bg: 'bg-lime-50 dark:bg-lime-900/20', border: 'border-lime-200 dark:border-lime-700' },
  { icon: ShoppingBag, bn: 'মার্কেটপ্লেস', en: 'Marketplace', color: 'from-green-600 to-green-500', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-700' },
  { icon: Link2, bn: 'অ্যাফিলিয়েট প্রোগ্রাম', en: 'Affiliate Programs', color: 'from-teal-600 to-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-700' },
  { icon: Globe, bn: 'কনটেন্ট লাইসেন্সিং', en: 'Content Licensing', color: 'from-cyan-600 to-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-200 dark:border-cyan-700' },
]

/* ──────────────────────────────────────────────────────────────
   Mission Pillars
────────────────────────────────────────────────────────────── */
const missionPillars = [
  { icon: Newspaper, label: 'Public Interest Journalism', bn: 'জনস্বার্থ সাংবাদিকতা', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { icon: BookOpen, label: 'Knowledge Sharing', bn: 'জ্ঞান ভাগাভাগি', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { icon: Lightbulb, label: 'Media Innovation', bn: 'মিডিয়া উদ্ভাবন', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20' },
  { icon: GraduationCap, label: 'Digital Education', bn: 'ডিজিটাল শিক্ষা', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { icon: Brain, label: 'Responsible AI', bn: 'দায়িত্বশীল কৃত্রিম বুদ্ধিমত্তা', color: 'text-fuchsia-600', bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20' },
]

/* ──────────────────────────────────────────────────────────────
   Vision Roadmap
────────────────────────────────────────────────────────────── */
const roadmap = [
  { year: '২০২৬', en: '2026', label: 'Digital Foundation', bn: 'ডিজিটাল ভিত্তি', desc: 'বাংলা মিডিয়ার ডিজিটাল প্রেক্ষাপট শক্তিশালী করা', color: 'from-blue-600 to-blue-500', dot: 'bg-blue-600' },
  { year: '২০২৭', en: '2027', label: 'AI Newsroom', bn: 'AI নিউজরুম', desc: 'কৃত্রিম বুদ্ধিমত্তা-চালিত সম্পাদকীয় পরিবেশ স্থাপন', color: 'from-indigo-600 to-indigo-500', dot: 'bg-indigo-600' },
  { year: '২০২৮', en: '2028', label: 'Learning Hub', bn: 'লার্নিং হাব', desc: 'সম্পূর্ণ শিক্ষা ও দক্ষতা উন্নয়ন প্ল্যাটফর্ম চালু', color: 'from-violet-600 to-violet-500', dot: 'bg-violet-600' },
  { year: '২০৩০', en: '2030', label: 'Global Bengali Knowledge Platform', bn: 'বৈশ্বিক বাংলা জ্ঞান প্ল্যাটফর্ম', desc: 'বিশ্বব্যাপী বাংলাভাষী সম্প্রদায়কে একত্রিত করা', color: 'from-purple-600 to-purple-500', dot: 'bg-purple-600' },
  { year: '২০৩২', en: '2032', label: 'International Expansion', bn: 'আন্তর্জাতিক সম্প্রসারণ', desc: 'বৈশ্বিক সংবাদ নেটওয়ার্ক ও বহুভাষিক প্রকাশনা', color: 'from-fuchsia-600 to-fuchsia-500', dot: 'bg-fuchsia-600' },
  { year: '২০৩৫', en: '2035', label: 'Global Trusted AI Media Ecosystem', bn: 'বৈশ্বিক বিশ্বস্ত AI মিডিয়া ইকোসিস্টেম', desc: 'AI-চালিত, গবেষণানির্ভর, বিশ্বব্যাপী স্বীকৃত বাংলা মিডিয়া', color: 'from-rose-600 to-orange-500', dot: 'bg-rose-600' },
]

/* ──────────────────────────────────────────────────────────────
   Core Principles
────────────────────────────────────────────────────────────── */
const principles = [
  { icon: CheckCircle2, bn: 'সত্যনিষ্ঠতা', en: 'Truth & Integrity', desc: 'তথ্যের নির্ভুলতা ও সত্যতা আমাদের সর্বোচ্চ অগ্রাধিকার', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-100 dark:border-blue-800' },
  { icon: Eye, bn: 'স্বচ্ছতা', en: 'Transparency', desc: 'সম্পাদকীয় সিদ্ধান্ত ও অর্থায়নে সম্পূর্ণ স্বচ্ছতা', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20', border: 'border-indigo-100 dark:border-indigo-800' },
  { icon: HeartHandshake, bn: 'মানবকেন্দ্রিক AI', en: 'Human-Centered AI', desc: 'মানুষের কল্যাণে কৃত্রিম বুদ্ধিমত্তার ব্যবহার', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-100 dark:border-violet-800' },
  { icon: BookOpen, bn: 'জ্ঞানভিত্তিক সমাজ', en: 'Knowledge Society', desc: 'সবার জন্য উন্মুক্ত জ্ঞান ও তথ্য অ্যাক্সেস নিশ্চিত করা', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-100 dark:border-purple-800' },
  { icon: Shield, bn: 'নৈতিক সাংবাদিকতা', en: 'Ethical Journalism', desc: 'সাংবাদিকতার নৈতিক মানদণ্ড কঠোরভাবে অনুসরণ', color: 'text-fuchsia-600', bg: 'bg-fuchsia-50 dark:bg-fuchsia-900/20', border: 'border-fuchsia-100 dark:border-fuchsia-800' },
  { icon: Zap, bn: 'প্রযুক্তিগত উদ্ভাবন', en: 'Tech Innovation', desc: 'অগ্রগামী প্রযুক্তি দিয়ে মিডিয়ার ভবিষ্যৎ গড়া', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-100 dark:border-orange-800' },
  { icon: GraduationCap, bn: 'শিক্ষা সবার জন্য', en: 'Education for All', desc: 'বয়স-বর্ণ-শ্রেণী নির্বিশেষে সবার শিক্ষাসুবিধা', color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-100 dark:border-teal-800' },
  { icon: Layers, bn: 'দীর্ঘমেয়াদি টেকসই উন্নয়ন', en: 'Sustainable Growth', desc: 'আর্থিক, পরিবেশগত ও সামাজিক স্থায়িত্বের প্রতি প্রতিশ্রুতি', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-100 dark:border-green-800' },
]

/* ──────────────────────────────────────────────────────────────
   Vision 2035 Goals
────────────────────────────────────────────────────────────── */
const vision2035Goals = [
  { icon: Newspaper, label: 'Trusted Bengali Media Network', bn: 'বিশ্বস্ত বাংলা মিডিয়া নেটওয়ার্ক' },
  { icon: Brain, label: 'AI-Powered Editorial Ecosystem', bn: 'AI-চালিত সম্পাদকীয় ইকোসিস্টেম' },
  { icon: BookOpen, label: 'Learning Hub for All Ages', bn: 'সব বয়সের লার্নিং হাব' },
  { icon: FileText, label: 'Research & Knowledge Infrastructure', bn: 'গবেষণা ও জ্ঞান অবকাঠামো' },
  { icon: GraduationCap, label: 'AI Academy', bn: 'AI অ্যাকাডেমি' },
  { icon: Award, label: 'Certification Platform', bn: 'সার্টিফিকেশন প্ল্যাটফর্ম' },
  { icon: Globe, label: 'Global Contributor Community', bn: 'বৈশ্বিক অবদানকারী সম্প্রদায়' },
  { icon: Layers, label: 'Multi-language Publishing', bn: 'বহুভাষিক প্রকাশনা' },
  { icon: Zap, label: 'Enterprise AI Agents', bn: 'এন্টারপ্রাইজ AI এজেন্ট' },
  { icon: Rocket, label: 'Autonomous Newsroom', bn: 'স্বায়ত্তশাসিত নিউজরুম' },
  { icon: Shield, label: 'Ethical AI Governance', bn: 'নৈতিক AI গভর্নেন্স' },
  { icon: TrendingUp, label: 'Open Knowledge Platform', bn: 'উন্মুক্ত জ্ঞান প্ল্যাটফর্ম' },
]

/* ──────────────────────────────────────────────────────────────
   Scroll-reveal hook
────────────────────────────────────────────────────────────── */
function useScrollReveal(ref: React.RefObject<HTMLElement | null>) {
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const el = ref.current
    if (el) {
      el.querySelectorAll('.reveal').forEach((child) => {
        child.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700')
        observer.observe(child)
      })
    }
    return () => observer.disconnect()
  }, [ref])
}

/* ──────────────────────────────────────────────────────────────
   Page Component
────────────────────────────────────────────────────────────── */
export default function MissionVisionPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  return (
    <div ref={pageRef} className="bg-background min-h-screen">

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b4b] via-[#1a2e7a] to-[#0d1b4b] py-20 md:py-28">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#1BA1E2]/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#2E4CB2]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#1BA1E2]/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1BA1E2]/30 bg-[#1BA1E2]/10 text-[#1BA1E2] text-xs font-semibold tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3" />
            Banglar Voice — বাংলার ভয়েস
          </div>

          <h1 className="reveal font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            মিশন, ভিশন ও<br />
            <span className="bg-gradient-to-r from-[#1BA1E2] to-[#60C8F5] bg-clip-text text-transparent">
              টেকসই ইকোসিস্টেম
            </span>
          </h1>

          <p className="reveal text-lg md:text-xl text-white/70 font-body max-w-2xl mx-auto mt-4 leading-relaxed">
            Mission, Vision & Sustainability Framework
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-[#1BA1E2]" /> Global Bengali Platform</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5"><Brain className="w-4 h-4 text-[#1BA1E2]" /> AI-Powered</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-[#1BA1E2]" /> Vision 2035</span>
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="reveal text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1BA1E2] mb-3">
              <Target className="w-4 h-4" /> Our Mission
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#2E4CB2] dark:text-white">মিশন</h2>
          </div>

          {/* Mission quote card */}
          <div className="reveal relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#2E4CB2]/10 dark:border-[#2E4CB2]/30 bg-gradient-to-br from-[#f8faff] to-[#eef3ff] dark:from-slate-800 dark:to-slate-800/50 p-8 md:p-12 lg:p-16 mb-12">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2E4CB2] via-[#1BA1E2] to-[#2E4CB2]" />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2E4CB2]/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#1BA1E2]/5 blur-3xl" />

            <div className="relative text-center">
              <div className="text-6xl md:text-8xl text-[#2E4CB2]/10 font-serif leading-none mb-4 select-none">"</div>
              <blockquote className="font-headline text-xl md:text-2xl lg:text-3xl font-bold text-[#1a2040] dark:text-white leading-relaxed max-w-4xl mx-auto -mt-8">
                বিশ্বমানের বিশ্বাসযোগ্য বাংলা জ্ঞান ও সংবাদভিত্তিক ডিজিটাল ইকোসিস্টেম গড়ে তোলা।
              </blockquote>
              <p className="text-sm text-[#2E4CB2]/60 dark:text-slate-400 mt-4 font-body">
                To build a world-class, trustworthy Bengali knowledge and news-based digital ecosystem.
              </p>
            </div>
          </div>

          {/* Mission pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {missionPillars.map((pillar, i) => {
              const Icon = pillar.icon
              return (
                <div
                  key={i}
                  className={cn(
                    'reveal group flex flex-col items-center text-center p-5 rounded-2xl border border-border/50 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1',
                    pillar.bg
                  )}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform duration-300', pillar.bg)}>
                    <Icon className={cn('w-6 h-6', pillar.color)} />
                  </div>
                  <p className="font-headline text-sm font-bold text-foreground dark:text-white mb-1">{pillar.bn}</p>
                  <p className="text-[10px] text-muted-foreground">{pillar.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── VISION STATEMENT ── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f5f7ff] to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="reveal text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1BA1E2] mb-3">
              <Eye className="w-4 h-4" /> Our Vision
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#2E4CB2] dark:text-white">ভিশন</h2>
          </div>

          {/* Vision quote */}
          <div className="reveal relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#0d1b4b] via-[#162265] to-[#0d1b4b] p-8 md:p-12 mb-16">
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#1BA1E2]/10 blur-3xl" />
            <div className="relative text-center">
              <div className="text-6xl text-white/10 font-serif leading-none mb-4 select-none">"</div>
              <blockquote className="font-headline text-xl md:text-2xl lg:text-3xl font-bold text-white leading-relaxed max-w-4xl mx-auto -mt-8">
                ২০৩৫ সালের মধ্যে কৃত্রিম বুদ্ধিমত্তা-সমৃদ্ধ, গবেষণানির্ভর, বিশ্বব্যাপী স্বীকৃত বাংলা মিডিয়া ও লার্নিং প্ল্যাটফর্মে পরিণত হওয়া।
              </blockquote>
              <p className="text-sm text-white/50 mt-4 font-body max-w-2xl mx-auto">
                To become, by 2035, an AI-enriched, research-driven, globally recognised Bengali media and learning platform.
              </p>
            </div>
          </div>

          {/* Roadmap Timeline */}
          <div className="reveal">
            <h3 className="font-headline text-xl font-bold text-[#2E4CB2] dark:text-white text-center mb-10">
              দীর্ঘমেয়াদি রোডম্যাপ — Strategic Roadmap
            </h3>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block relative">
              {/* Connector line */}
              <div className="absolute top-[2.75rem] left-8 right-8 h-0.5 bg-gradient-to-r from-blue-600 via-violet-500 to-rose-500 opacity-30" />

              <div className="grid grid-cols-6 gap-3 relative">
                {roadmap.map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center group">
                    {/* Year badge / dot */}
                    <div className={cn(
                      'w-11 h-11 rounded-full flex items-center justify-center mb-4 ring-4 ring-white dark:ring-slate-800 shadow-md bg-gradient-to-br z-10',
                      item.color
                    )}>
                      <span className="text-white text-xs font-bold">{item.en.slice(-2)}</span>
                    </div>
                    {/* Year */}
                    <span className="font-headline text-sm font-bold text-[#2E4CB2] dark:text-[#60a5fa] mb-1">{item.year}</span>
                    {/* Milestone */}
                    <p className="text-xs font-bold text-foreground dark:text-white mb-1 leading-snug">{item.bn}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
                    {/* Hover card */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-block text-[9px] font-semibold text-[#1BA1E2] bg-[#1BA1E2]/10 px-2 py-0.5 rounded-full">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden space-y-0">
              {roadmap.map((item, i) => (
                <div key={i} className="flex gap-4">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br shadow-md', item.color)}>
                      <span className="text-white text-xs font-bold">{item.en.slice(-2)}</span>
                    </div>
                    {i < roadmap.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gradient-to-b from-current to-transparent opacity-20 my-1" style={{ minHeight: '2rem' }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6 pt-1">
                    <span className="font-headline text-base font-bold text-[#2E4CB2] dark:text-[#60a5fa]">{item.year}</span>
                    <p className="text-sm font-bold text-foreground dark:text-white mt-0.5">{item.bn}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    <span className="inline-block mt-1.5 text-[10px] font-semibold text-[#1BA1E2] bg-[#1BA1E2]/10 px-2 py-0.5 rounded-full">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVENUE ECOSYSTEM ── */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="reveal text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1BA1E2] mb-3">
              <TrendingUp className="w-4 h-4" /> Revenue Strategy
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#2E4CB2] dark:text-white mb-2">রেভিনিউ ইকোসিস্টেম</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto font-body">
              Diversified, sustainable enterprise media revenue — built for a global Bengali AI-powered ecosystem
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {revenueStreams.map((stream, i) => {
              const Icon = stream.icon
              const isLast = i === revenueStreams.length - 1
              return (
                <div key={i} className="reveal flex flex-col items-center" style={{ transitionDelay: `${i * 40}ms` }}>
                  {/* Stream card */}
                  <div className={cn(
                    'w-full flex items-center gap-4 px-6 py-4 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group',
                    stream.bg, stream.border
                  )}>
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm',
                      stream.color
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline text-lg font-bold text-foreground dark:text-white leading-tight">{stream.bn}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stream.en}</p>
                    </div>
                    <div className="text-muted-foreground/30 font-mono text-xs font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Connector arrow */}
                  {!isLast && (
                    <div className="flex flex-col items-center my-1.5 text-[#2E4CB2]/30 dark:text-slate-600">
                      <ArrowDown className="w-5 h-5" />
                    </div>
                  )}
                </div>
              )
            })}

            {/* Bottom summary */}
            <div className="reveal mt-8 rounded-2xl bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] p-6 text-center">
              <p className="font-headline text-lg font-bold text-white mb-1">সম্পূর্ণ টেকসই রেভিনিউ মডেল</p>
              <p className="text-white/70 text-sm font-body">Fully Diversified & Sustainable Revenue Model</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['13 Revenue Streams', 'Subscription-Ready', 'Enterprise-Grade', 'AI-Native'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#f5f7ff] to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="reveal text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1BA1E2] mb-3">
              <Shield className="w-4 h-4" /> Core Principles
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#2E4CB2] dark:text-white">মূলনীতি</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2 font-body">
              The foundational principles that guide every decision at Banglar Voice
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {principles.map((p, i) => {
              const Icon = p.icon
              return (
                <div
                  key={i}
                  className={cn(
                    'reveal group relative overflow-hidden rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
                    p.bg, p.border
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {/* Accent line */}
                  <div className={cn('absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-50', p.color.replace('text-', 'bg-'))} />

                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform duration-300'
                  )}>
                    <Icon className={cn('w-6 h-6', p.color)} />
                  </div>

                  <h3 className="font-headline text-base font-bold text-foreground dark:text-white mb-1">
                    {p.bn}
                  </h3>
                  <p className={cn('text-xs font-semibold mb-2', p.color)}>{p.en}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-body">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── VISION 2035 ── */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-[#0d1b4b] via-[#162265] to-[#0a1535]">
        {/* Background elements */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#1BA1E2]/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#2E4CB2]/15 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="reveal text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#1BA1E2] mb-3">
              <Rocket className="w-4 h-4" /> The Future
            </span>
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Banglar Voice <span className="text-[#1BA1E2]">২০৩৫</span>
            </h2>
            <p className="text-white/60 text-sm max-w-xl mx-auto font-body">
              Our vision for a comprehensive, AI-native, globally trusted Bengali media ecosystem
            </p>
          </div>

          {/* Goals grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {vision2035Goals.map((goal, i) => {
              const Icon = goal.icon
              return (
                <div
                  key={i}
                  className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 p-5"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1BA1E2]/15 border border-[#1BA1E2]/20 flex items-center justify-center mb-3 group-hover:bg-[#1BA1E2]/25 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#1BA1E2]" />
                  </div>
                  <p className="font-headline text-sm font-bold text-white mb-1 leading-snug">{goal.bn}</p>
                  <p className="text-[10px] text-white/40 leading-relaxed">{goal.label}</p>
                </div>
              )
            })}
          </div>

          {/* Bottom tagline */}
          <div className="reveal mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-8 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2E4CB2] flex items-center justify-center">
                  <span className="text-white font-bold text-xs">𝔹𝕍</span>
                </div>
                <span className="font-headline font-bold text-white">BANGLAR VOICE</span>
              </div>
              <span className="text-white/30 hidden sm:block">|</span>
              <p className="text-sm text-white/60 font-body">
                বাংলাদেশের সবচেয়ে নির্ভরযোগ্য সংবাদ পোর্টাল — বিশ্বের জন্য
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE TRUST BAND ── */}
      <section className="py-10 bg-white dark:bg-slate-900 border-t border-border dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="reveal flex flex-col items-center gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center">
              Enterprise-Grade Standards — Built for the Future
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Bengali Typography', 'Dark Mode', 'Responsive', 'SEO Optimized',
                'Schema.org', 'CMS Ready', 'AI-Native', 'Subscription Ready',
                'Knowledge Graph', 'Learning Hub', 'Accessible', 'Scalable'
              ].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2E4CB2]/15 dark:border-slate-700 text-[11px] font-semibold text-[#2E4CB2] dark:text-slate-300 bg-[#2E4CB2]/5 dark:bg-slate-800"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

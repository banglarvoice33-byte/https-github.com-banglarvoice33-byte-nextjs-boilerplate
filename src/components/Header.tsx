import { useState, useEffect } from 'react'
import { Menu, X, Search, Bell, Bookmark, ChevronDown } from 'lucide-react'
import LoginButton from '@/components/LoginButton'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'প্রচ্ছদ', href: '/' },
  { label: 'জাতীয়', href: '/national' },
  { label: 'রাজনীতি', href: '/politics' },
  { label: 'অর্থনীতি', href: '/economy' },
  { label: 'আন্তর্জাতিক', href: '/international' },
  { label: 'খেলাধুলা', href: '/sports' },
  { label: 'বিনোদন', href: '/entertainment' },
  { label: 'প্রযুক্তি', href: '/tech' },
  { label: 'শিক্ষা', href: '/education' },
  { label: 'স্বাস্থ্য', href: '/health' },
  { label: 'সম্পাদকীয়', href: '/editorial' },
  { label: 'আমাদের সম্পর্কে', href: '/about' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className={cn(
        "bg-[#2E4CB2] text-white text-sm transition-all duration-300",
        scrolled && "hidden"
      )}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">২৬ জুন ২০২৬, বৃহস্পতিবার</span>
            <span className="text-accent font-medium">ব্রেকিং নিউজ</span>
          </div>
          <div className="flex items-center gap-3">
            <LoginButton />
            <span className="opacity-40">|</span>
            <button className="hover:text-accent transition-colors">সাবস্ক্রাইব</button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className={cn(
        "bg-white border-b border-border transition-all duration-300",
        scrolled && "shadow-md"
      )}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#2E4CB2] flex items-center justify-center">
              <span className="text-white font-bold text-sm tracking-wide">𝔹𝕍</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-headline font-bold text-xl text-[#2E4CB2] leading-tight">BANGLAR VOICE</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">বাংলার ভয়েস — banglarvoice24news.com</p>
            </div>
          </a>

          {/* Center brand text */}
          <div className="hidden lg:flex items-center">
            <span className="font-bold tracking-wide text-lg text-[#2E4CB2]">BANGLAR VOICE</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 6).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-[#2E4CB2] hover:bg-primary/5 rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="relative group">
              <button className="px-3 py-2 text-sm font-medium text-foreground hover:text-[#2E4CB2] hover:bg-primary/5 rounded-md transition-all duration-200 flex items-center gap-1">
                আরও <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg border border-border p-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navLinks.slice(6).map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-sm text-foreground hover:text-[#2E4CB2] hover:bg-primary/5 rounded-md transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary/5 text-foreground hover:text-[#2E4CB2] transition-all"
              aria-label="অনুসন্ধান"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary/5 text-foreground hover:text-[#2E4CB2] transition-all hidden sm:flex"
              aria-label="বুকমার্ক"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary/5 text-foreground hover:text-[#2E4CB2] transition-all hidden sm:flex"
              aria-label="নোটিফিকেশন"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary/5 text-foreground hover:text-[#2E4CB2] transition-all"
              aria-label="মেনু"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-border bg-white px-4 py-3">
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="সংবাদ খুঁজুন..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-[#2E4CB2] focus:border-transparent text-foreground font-body"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:text-[#2E4CB2] hover:bg-primary/5 rounded-lg transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

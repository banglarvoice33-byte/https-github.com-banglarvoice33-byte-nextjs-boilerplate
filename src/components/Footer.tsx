import { Facebook, Twitter, Youtube, Instagram, Send, Mail, Phone, MapPin, Rss, ArrowUp, Linkedin, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const footerLinks = {
  categories: [
    { label: 'জাতীয়', href: '/national' },
    { label: 'রাজনীতি', href: '/politics' },
    { label: 'অর্থনীতি', href: '/economy' },
    { label: 'আন্তর্জাতিক', href: '/international' },
    { label: 'খেলাধুলা', href: '/sports' },
    { label: 'প্রযুক্তি', href: '/tech' },
  ],
  services: [
    { label: 'ই-পেপার', href: '/e-paper' },
    { label: 'বাংলার ভয়েস লার্নিং হাব', href: '/learning-hub' },
    { label: 'ব্রেকিং নিউজ', href: '/breaking' },
    { label: 'নিউজলেটার', href: '/newsletter' },
    { label: 'আর্কাইভ', href: '/archive' },
  ],
  company: [
    { label: 'আমাদের সম্পর্কে', href: '/about' },
    { label: 'সম্পাদকীয় নীতি', href: '/editorial-policy' },
    { label: 'বিজ্ঞাপন', href: '/advertise' },
    { label: 'যোগাযোগ', href: '/contact' },
    { label: 'ক্যারিয়ার', href: '/careers' },
  ],
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim().toLowerCase(), name: '', source: 'website_footer' })

      if (error) {
        if (error.message?.includes('duplicate')) {
          setStatus('error')
          setMessage('এই ইমেইলটি ইতিমধ্যে সাবস্ক্রাইব করা আছে')
        } else {
          setStatus('error')
          setMessage('সাবস্ক্রাইব করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন')
        }
        return
      }

      setStatus('success')
      setMessage('সফলভাবে সাবস্ক্রাইব হয়েছে!')
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('সাবস্ক্রাইব করতে সমস্যা হয়েছে')
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
          <Rss className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-headline text-lg font-bold text-white leading-tight">নিউজলেটার</h3>
          <p className="text-xs text-white/80 leading-relaxed">প্রতিদিন সকাল ৭টায় সরাসরি আপনার ইনবক্সে</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2E4CB2]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="আপনার ইমেইল ঠিকানা"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/50"
            disabled={status === 'loading'}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2.5 rounded-lg bg-[#1BA1E2] text-white text-sm font-semibold hover:bg-[#1890c9] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" /> সাবস্ক্রাইব
            </>
          )}
        </button>
      </form>
      {status === 'success' && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
          <CheckCircle className="w-4 h-4 text-white" />
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-white/90">
          <AlertCircle className="w-4 h-4 text-white" />
          {message}
        </div>
      )}
      <p className="text-xs text-white/70 mt-2">
        সাবস্ক্রাইব করলে আপনি আমাদের <a href="/privacy" className="underline hover:text-white">গোপনীয়তা নীতি</a> মেনে চলছেন বলে গণ্য হবে।
      </p>
    </div>
  )
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#1a1f3c] text-white">
      {/* Newsletter bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <NewsletterForm />
        </div>
      </div>

      {/* CEO Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="text-center">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.2em] mb-1">Founder & CEO</p>
              <p className="font-script text-2xl sm:text-3xl text-white/90 tracking-wide">
                MD DULAL HOSSAIN SARDER
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2E4CB2] flex items-center justify-center shrink-0">
                <span className="font-headline font-bold text-lg">ভ</span>
              </div>
              <div>
                <h2 className="font-headline text-xl font-bold leading-tight">BANGLAR VOICE</h2>
                <p className="text-xs text-white/60">বাংলার ভয়েস</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5 max-w-sm">
              বাংলাদেশের সবচেয়ে নির্ভরযোগ্য সংবাদ পortal। আমরা সঠিক, নিরপেক্ষ ও সময়োপযোগী সংবাদ প্রকাশে প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#1BA1E2] shrink-0" />
                <span>১২৩ প্রগতি সরণি, ঢাকা ১২১২</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1BA1E2] shrink-0" />
                <span>+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1BA1E2] shrink-0" />
                <span>banglarvoice33@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-headline text-sm font-bold mb-4 text-white/80 tracking-wide">বিভাগ</h4>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-[#1BA1E2] transition-colors leading-relaxed">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-headline text-sm font-bold mb-4 text-white/80 tracking-wide">সেবা</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-[#1BA1E2] transition-colors leading-relaxed">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-headline text-sm font-bold mb-4 text-white/80 tracking-wide">কোম্পানি</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/60 hover:text-[#1BA1E2] transition-colors leading-relaxed">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <a href="/ecosystem" className="text-sm text-[#1BA1E2]/60 hover:text-[#1BA1E2] transition-colors">
                ইকোসিস্টেম (অ্যাডমিন)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40 text-center sm:text-left leading-relaxed">
            © ২০২৬ BANGLAR VOICE – বাংলার ভয়েস। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-2">
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="X (Twitter)">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="Youtube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors" aria-label="RSS">
              <Rss className="w-4 h-4" />
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#1BA1E2] transition-colors sm:ml-auto"
            aria-label="উপরে যান"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}

import { Megaphone } from 'lucide-react'

export default function AdsWidget() {
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

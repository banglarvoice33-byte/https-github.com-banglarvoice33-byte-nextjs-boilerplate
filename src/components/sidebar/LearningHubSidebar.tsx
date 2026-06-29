import { GraduationCap, BookOpen } from 'lucide-react'

export default function LearningHubSidebar() {
  return (
    <div className="bg-gradient-to-br from-[#2E4CB2] to-[#1BA1E2] rounded-xl shadow-lg overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
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

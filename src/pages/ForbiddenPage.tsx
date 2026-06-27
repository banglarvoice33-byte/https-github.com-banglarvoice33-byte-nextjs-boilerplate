import { Shield, ArrowLeft } from 'lucide-react'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="font-headline text-4xl font-bold text-foreground mb-2">403</h1>
        <h2 className="font-headline text-xl font-semibold text-muted-foreground mb-4">
          প্রবেশাধিকার নেই
        </h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
          আপনার এই পৃষ্ঠায় প্রবেশের অনুমতি নেই। এই এলাকা কেবল অনুমোদিত স্টাফদের জন্য।
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2E4CB2] text-white text-sm font-semibold hover:bg-[#243d8f] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> প্রচ্ছদে ফিরে যান
        </a>
      </div>
    </div>
  )
}

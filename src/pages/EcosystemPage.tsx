import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Shield, Bot, Zap, Brain, Key, BarChart3, FileText, Webhook, Users, ChevronRight, Send, RefreshCw, Activity, Terminal, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react'

const ecosystemModules = [
  {
    id: 'telegram-bot',
    title: 'Telegram Bot Manager',
    bengaliTitle: 'টেলিগ্রাম বট ম্যানেজার',
    icon: Bot,
    color: 'bg-[#0088cc]/10 text-[#0088cc]',
    description: 'Telegram bot commands, sync status, and broadcast controls',
    superAdminOnly: false,
  },
  {
    id: 'n8n',
    title: 'n8n Automation',
    bengaliTitle: 'n8n অটোমেশন',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
    description: 'Workflow automation, trigger management, and execution logs',
    superAdminOnly: false,
  },
  {
    id: 'ai-agents',
    title: 'AI Agents & Models',
    bengaliTitle: 'এআই এজেন্ট ও মডেল',
    icon: Brain,
    color: 'bg-violet-50 text-violet-600',
    description: 'AI model configuration, prompt library, and agent controls',
    superAdminOnly: false,
  },
  {
    id: 'api-keys',
    title: 'API Manager',
    bengaliTitle: 'এপিআই ম্যানেজার',
    icon: Key,
    color: 'bg-emerald-50 text-emerald-600',
    description: 'CRUD actions on API keys, token management, and service integrations',
    superAdminOnly: false,
  },
  {
    id: 'analytics',
    title: 'Analytics & Logs',
    bengaliTitle: 'অ্যানালিটিক্স ও লগস',
    icon: BarChart3,
    color: 'bg-[#2E4CB2]/10 text-[#2E4CB2]',
    description: 'Traffic reports, engagement metrics, and system logs',
    superAdminOnly: false,
  },
  {
    id: 'prompts',
    title: 'Prompt Library',
    bengaliTitle: 'প্রম্পট লাইব্রেরি',
    icon: FileText,
    color: 'bg-rose-50 text-rose-600',
    description: 'AI prompt templates, workflow controls, and version history',
    superAdminOnly: false,
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    bengaliTitle: 'ওয়েবহুকস',
    icon: Webhook,
    color: 'bg-orange-50 text-orange-600',
    description: 'Incoming webhook configuration and endpoint management',
    superAdminOnly: false,
  },
  {
    id: 'user-mgmt',
    title: 'User Management',
    bengaliTitle: 'ইউজার ম্যানেজমেন্ট',
    icon: Users,
    color: 'bg-blue-50 text-blue-600',
    description: 'Invite members, assign roles, and manage staff access',
    superAdminOnly: true,
  },
]

export default function EcosystemPage() {
  const { user, staff, isLoading, isSuperAdmin, canAccessEcosystem } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && (!user || !canAccessEcosystem)) {
      navigate('/403', { replace: true })
    }
  }, [isLoading, user, canAccessEcosystem, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2E4CB2] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user || !canAccessEcosystem) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ecosystem Header */}
      <div className="bg-[#1a1f3c] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-6 h-6 text-[#1BA1E2]" />
            <span className="text-xs font-semibold text-[#1BA1E2] uppercase tracking-wider">Admin Only</span>
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold mb-1">Ecosystem Dashboard</h1>
          <p className="text-sm text-white/60">বাংলার ভয়েস ইকোসিস্টেম — অভ্যন্তরীণ ব্যবস্থাপনা প্যানেল</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Staff info bar */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-xl border border-border/60 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#2E4CB2] flex items-center justify-center text-white font-bold text-sm">
            {staff?.name?.charAt(0) ?? 'A'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{staff?.name ?? 'Admin'}</p>
            <p className="text-xs text-muted-foreground">{staff?.role?.name ?? 'staff'} • {staff?.email}</p>
          </div>
          {isSuperAdmin && (
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
              Super Admin
            </span>
          )}
        </div>

        {/* System status bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'System Status', value: 'Operational', icon: Activity, color: 'text-emerald-500' },
            { label: 'Last Sync', value: '2 min ago', icon: RefreshCw, color: 'text-[#1BA1E2]' },
            { label: 'Active Bots', value: '3', icon: Bot, color: 'text-[#0088cc]' },
            { label: 'Pending Reviews', value: '12', icon: AlertTriangle, color: 'text-amber-500' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-white rounded-xl border border-border/60 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="font-headline text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Modules grid */}
        <h2 className="font-headline text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#2E4CB2]" /> Management Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ecosystemModules
            .filter(m => !m.superAdminOnly || isSuperAdmin)
            .map((module) => {
              const Icon = module.icon
              return (
                <a
                  key={module.id}
                  href={`/ecosystem/${module.id}`}
                  className="group bg-white rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${module.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-headline text-sm font-bold text-foreground mb-1">{module.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{module.bengaliTitle}</p>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed">{module.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-[#2E4CB2] font-medium">
                    Manage <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              )
            })}
        </div>

        {/* Telegram Command Center */}
        {isSuperAdmin && (
          <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 mb-8">
            <h2 className="font-headline text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-[#0088cc]" /> Telegram Command Center (Super Admin Only)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { cmd: '/status', desc: 'Application/server health metrics', bengali: 'সার্ভার স্ট্যাটাস' },
                { cmd: '/news_volume', desc: 'Recent publication volumes', bengali: 'সংবাদ ভলিউম' },
                { cmd: '/generate_epaper', desc: 'Trigger E-paper compilation', bengali: 'ই-পেপার জেনারেট' },
                { cmd: '/force_sync', desc: 'Manual sync bypass', bengali: 'ফোর্স সিঙ্ক' },
                { cmd: '/analytics', desc: 'Traffic and engagement reports', bengali: 'অ্যানালিটিক্স' },
                { cmd: '/logs', desc: 'System error/info logs', bengali: 'সিস্টেম লগস' },
                { cmd: '/publish', desc: 'Command-line publishing', bengali: 'পাবলিশ' },
                { cmd: '/video', desc: 'Format and post video', bengali: 'ভিডিও পোস্ট' },
                { cmd: '/audio', desc: 'Format and post audio', bengali: 'অডিও পোস্ট' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <code className="text-xs font-mono bg-[#0088cc]/10 text-[#0088cc] px-2 py-1 rounded shrink-0">{item.cmd}</code>
                  <div>
                    <span className="text-xs font-medium text-foreground">{item.bengali}</span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Keys Section */}
        <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline text-lg font-bold text-foreground flex items-center gap-2">
              <Key className="w-5 h-5 text-[#2E4CB2]" /> API Keys
            </h2>
            <button className="px-4 py-2 rounded-lg bg-[#2E4CB2] text-white text-sm font-semibold hover:bg-[#243d8f] transition-colors">
              + Add New Key
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Telegram Bot Token', service: 'telegram', status: 'active', lastUsed: '2 min ago' },
              { name: 'OpenAI API Key', service: 'openai', status: 'active', lastUsed: '1 hr ago' },
              { name: 'n8n Webhook', service: 'n8n', status: 'active', lastUsed: '5 min ago' },
            ].map((key, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2E4CB2]/10 flex items-center justify-center">
                    <Key className="w-4 h-4 text-[#2E4CB2]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">{key.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">{key.service}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-emerald-600">
                    <CheckCircle className="w-3 h-3" /> {key.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{key.lastUsed}</span>
                  <button className="text-xs text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        {isSuperAdmin && (
          <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline text-lg font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2E4CB2]" /> User Management
              </h2>
              <button className="px-4 py-2 rounded-lg bg-[#2E4CB2] text-white text-sm font-semibold hover:bg-[#243d8f] transition-colors">
                + Invite Member
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'MD Dulal Hossain Sarder', email: 'banglarvoice33@gmail.com', role: 'super_admin', status: 'active' },
                { name: 'Editor One', email: 'editor@banglarvoice.com', role: 'editor', status: 'active' },
              ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2E4CB2] flex items-center justify-center text-white text-xs font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">{u.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{u.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === 'super_admin' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                      {u.role}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-emerald-600">
                      <CheckCircle className="w-3 h-3" /> {u.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

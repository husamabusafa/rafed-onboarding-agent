import { IconFlask, IconHome, IconLock, IconMessageCircle } from '@tabler/icons-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export function AppLayout() {
  const location = useLocation()

  const navItemClass = (path: string) => {
    const isActive = location.pathname === path
    return `inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
      isActive
        ? 'border-[#E1523E]/25 bg-[#E1523E]/10 text-[#002855] dark:border-[#E1523E]/30 dark:bg-[#E1523E]/10 dark:text-white'
        : 'border-[#002855]/10 bg-white/70 text-slate-700 hover:border-[#E1523E]/25 hover:bg-[#E1523E]/5 dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-200 dark:hover:border-[#E1523E]/30 dark:hover:bg-[#E1523E]/10'
    }`
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-[#002855]/10 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/30 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#002855] dark:text-white">Hayyak</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Onboarding assistant</p>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            <Link to="/" className={navItemClass('/')}
              >
              <IconHome className="h-4 w-4" />
              Home
            </Link>
            <Link to="/login" className={navItemClass('/login')}>
              <IconLock className="h-4 w-4" />
              Login
            </Link>
            <Link to="/chat" className={navItemClass('/chat')}>
              <IconMessageCircle className="h-4 w-4" />
              Chat
            </Link>
            <Link to="/test-components" className={navItemClass('/test-components')}>
              <IconFlask className="h-4 w-4" />
              Test Components
            </Link>
          </nav>
        </div>

        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

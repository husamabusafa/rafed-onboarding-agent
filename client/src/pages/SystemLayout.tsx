import {
  IconBell,
  IconCalendar,
  IconChecklist,
  IconCrown,
  IconHeartHandshake,
  IconLayoutDashboard,
  IconMenu2,
  IconMessageCircle,
  IconMoon,
  IconSettings,
  IconSun,
  IconTools,
  IconUsers,
  IconX,
} from '@tabler/icons-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

type ThemeMode = 'light' | 'dark'

type Props = {
  themeMode: ThemeMode
  onThemeToggle: () => void
}

export function SystemLayout({ themeMode, onThemeToggle }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home', Icon: IconLayoutDashboard },
    { to: '/actions', label: 'Actions', Icon: IconChecklist },
    { to: '/tools', label: 'Tools', Icon: IconTools },
    { to: '/leadership', label: 'Leadership', Icon: IconCrown },
    { to: '/buddy-team', label: 'Buddy Team', Icon: IconHeartHandshake },
    { to: '/employees', label: 'Employees', Icon: IconUsers },
    { to: '/calendar', label: 'Calendar', Icon: IconCalendar },
    { to: '/settings', label: 'Settings', Icon: IconSettings },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[#002855]/10 blur-3xl dark:bg-[#002855]/20" />
      <div className="pointer-events-none absolute -bottom-44 -left-44 h-[620px] w-[620px] rounded-full bg-[#E1523E]/10 blur-3xl dark:bg-[#E1523E]/15" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-[#002855]/5 blur-2xl dark:bg-[#002855]/12" />

      <div className="relative flex min-h-screen">
        <div
          className={`fixed inset-0 z-20 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
            mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <aside
          className={`group/sidebar fixed inset-y-0 left-0 z-30 flex h-screen w-72 flex-col overflow-hidden bg-white/50 backdrop-blur-xl transition-[transform,width] duration-300 ease-out hover:w-72 dark:bg-slate-950/50 md:w-20 md:hover:w-72 ${
            mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex h-16 items-center gap-3 px-6">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#002855] text-sm font-extrabold text-white shadow-sm shadow-[#002855]/20">
              H
            </div>
            <div className="min-w-0 transition-all duration-300 md:opacity-0 md:group-hover/sidebar:opacity-100">
              <p className="truncate font-bold text-[#002855] dark:text-white">Hayyak</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `group/nav-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#002855] shadow-sm ring-1 ring-slate-900/5 dark:bg-white/10 dark:text-white dark:ring-white/10'
                      : 'text-slate-600 hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                  }`
                }
              >
                <Icon className={`h-5 w-5 shrink-0 transition-colors ${
                  ({ isActive }: { isActive: boolean }) => isActive ? 'text-[#E1523E] dark:text-white' : 'text-slate-400 group-hover/nav-item:text-slate-600 dark:text-slate-500 dark:group-hover/nav-item:text-slate-300'
                }`} />
                <span className="min-w-0 flex-1 truncate transition-all duration-300 md:opacity-0 md:group-hover/sidebar:opacity-100">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-3">
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label="Notifications"
            >
              <IconBell className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
              <span className="min-w-0 flex-1 truncate text-left transition-all duration-300 md:opacity-0 md:group-hover/sidebar:opacity-100">Notifications</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E1523E]/10 px-1 text-[10px] font-bold text-[#E1523E] transition-all duration-300 md:opacity-0 md:group-hover/sidebar:opacity-100 dark:bg-[#E1523E]/20">
                0
              </span>
            </button>

            <Link
              to="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="group mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label="Open chat"
            >
              <IconMessageCircle className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
              <span className="min-w-0 flex-1 truncate transition-all duration-300 md:opacity-0 md:group-hover/sidebar:opacity-100">Chat</span>
            </Link>

            <button
              type="button"
              onClick={onThemeToggle}
              className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label={themeMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {themeMode === 'dark' ? (
                <IconSun className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
              ) : (
                <IconMoon className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
              )}
              <span className="min-w-0 flex-1 truncate text-left transition-all duration-300 md:opacity-0 md:group-hover/sidebar:opacity-100">
                {themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
              </span>
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex flex-1 flex-col md:pl-20">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-xl dark:bg-slate-950/80" />
            
            <div className="relative flex flex-1 items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 md:hidden dark:border-white/10 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-white/5"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
              </button>
              
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="hidden sm:inline">Hayyak System</span>
                <span className="hidden text-slate-300 sm:inline dark:text-slate-600">/</span>
                <span className="text-slate-900 dark:text-white">Workspace</span>
              </div>
            </div>

            <div className="relative flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-3 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-900/5 dark:bg-white/5 dark:ring-white/10">
                <span className="h-2 w-2 rounded-full bg-[#002855] dark:bg-blue-400" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Online</span>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-[#002855] to-[#E1523E] text-xs font-bold text-white shadow-md shadow-[#E1523E]/20">
                HY
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6 md:py-10">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

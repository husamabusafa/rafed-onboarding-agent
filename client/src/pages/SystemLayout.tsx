import {
  IconBell,
  IconCalendar,
  IconChevronRight,
  IconLayoutDashboard,
  IconMenu2,
  IconSettings,
  IconUsers,
  IconX,
} from '@tabler/icons-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const NAVY = '#002855'
const CORAL = '#E1523E'

export function SystemLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home', Icon: IconLayoutDashboard },
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
        <aside className="group/sidebar fixed inset-y-0 left-0 z-30 flex h-screen w-16 flex-col border-r border-[#002855]/10 bg-white/60 backdrop-blur transition-all duration-300 hover:w-72 lg:sticky lg:translate-x-0 dark:border-white/10 dark:bg-slate-950/45 md:w-16 ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}">
          <div className="flex items-center gap-3 px-4 py-5">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-[#002855] to-[#E1523E] text-sm font-extrabold tracking-tight text-white shadow-sm">
              H
            </div>
            <div className="min-w-0 opacity-0 transition-all duration-300 group-hover/sidebar:opacity-100">
              <p className="truncate text-sm font-semibold text-[#002855] dark:text-white">Hayyak</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">System</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-2">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `group/nav-item flex items-center gap-3 rounded-2xl px-1 py-1 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group-hover/sidebar:px-3 group-hover/sidebar:py-2 ${
                    isActive
                      ? 'bg-[#002855] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-[#002855]/5 dark:text-slate-200 dark:hover:bg-white/5'
                  }`
                }
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-transparent bg-white/40 text-slate-700 shadow-sm transition-colors group-hover/nav-item:border-[#E1523E]/20 dark:bg-slate-950/25 dark:text-slate-100">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1 translate-x-2 opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
                  <span className="truncate">{label}</span>
                </span>
                <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
                  <IconChevronRight className="h-4 w-4 opacity-60" />
                </span>
              </NavLink>
            ))}
          </nav>

            <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/60 px-3 py-3 backdrop-blur dark:border-white/10 dark:bg-slate-950/30">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#E1523E]/10 text-[#002855] dark:text-white">
                  <IconBell className="h-4 w-4" />
                </span>
                <div className="min-w-0 translate-x-2 opacity-0 transition-all duration-300 group-hover/sidebar:translate-x-0 group-hover/sidebar:opacity-100">
                  <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">Notifications</p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">All caught up</p>
              </div>
              <span className="opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100">
                <span className="inline-flex items-center rounded-full bg-[#002855]/10 px-2 py-1 text-[11px] font-semibold text-[#002855] dark:bg-white/10 dark:text-white">
                  0
                </span>
              </span>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex flex-1 flex-col md:ml-16">
          <header className="sticky top-0 z-20 border-b border-[#002855]/10 bg-white/60 backdrop-blur dark:border-white/10 dark:bg-slate-950/45">
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-[#002855]/10 bg-white/70 text-[#002855] transition-colors hover:bg-[#002855]/5 md:hidden dark:border-white/10 dark:bg-slate-950/30 dark:text-white dark:hover:bg-white/5"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <IconX className="h-5 w-5" /> : <IconMenu2 className="h-5 w-5" />}
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">Hayyak</p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">System workspace</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center rounded-full border border-[#002855]/10 bg-white/70 px-3 py-2 text-xs text-slate-500 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-400">
                  <span className="font-semibold" style={{ color: NAVY }}>
                    {NAVY}
                  </span>
                  <span className="px-2">/</span>
                  <span className="font-semibold" style={{ color: CORAL }}>
                    {CORAL}
                  </span>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full border border-[#002855]/10 bg-white/70 text-xs font-bold text-[#002855] shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
                  HY
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 md:px-6 md:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

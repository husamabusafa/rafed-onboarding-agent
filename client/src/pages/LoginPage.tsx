import { IconLock, IconMail, IconUser } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <div className="grid min-h-[calc(100vh-200px)] place-items-center">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-[#002855]/10 bg-white/70 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-slate-950/30">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-linear-to-br from-[#002855] to-[#E1523E] p-3 text-white shadow-sm">
                <IconUser className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Welcome back</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Sign in (UI only)</p>
              </div>
            </div>

            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#002855] dark:text-white">Email</span>
                <div className="relative">
                  <IconMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#002855]/45 dark:text-white/55" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full rounded-2xl border border-[#002855]/10 bg-white px-4 py-3 pl-11 text-sm text-slate-900 shadow-sm outline-none focus:border-[#E1523E]/45 focus:shadow-[0_0_0_4px_rgba(225,82,62,0.18)] dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-100 dark:focus:shadow-[0_0_0_4px_rgba(225,82,62,0.12)]"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#002855] dark:text-white">Password</span>
                <div className="relative">
                  <IconLock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#002855]/45 dark:text-white/55" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-[#002855]/10 bg-white px-4 py-3 pl-11 text-sm text-slate-900 shadow-sm outline-none focus:border-[#E1523E]/45 focus:shadow-[0_0_0_4px_rgba(225,82,62,0.18)] dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-100 dark:focus:shadow-[0_0_0_4px_rgba(225,82,62,0.12)]"
                  />
                </div>
              </label>

              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#002855] px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-[#001f44]"
              >
                Sign in
              </button>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">This page is UI-only (no auth)</span>
                <Link to="/" className="font-semibold text-[#E1523E] hover:underline">
                  Back home
                </Link>
              </div>
            </form>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-linear-to-br from-[#002855] via-[#002855]/85 to-[#E1523E]" />
            <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_55%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
              <div>
                <p className="text-sm font-semibold/none opacity-90">Onboarding Agent</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">A modern onboarding experience</h2>
                <p className="mt-3 text-sm opacity-85">
                  Explore the component library and onboarding workflows from the test page.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-sm font-semibold">Tip</p>
                <p className="mt-1 text-sm opacity-85">Go to <span className="font-semibold">Test Components</span> to see every tool UI with sample data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

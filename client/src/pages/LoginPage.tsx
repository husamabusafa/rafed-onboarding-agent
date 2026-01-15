import { IconLock, IconMail, IconUser } from '@tabler/icons-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'
import { useAuth } from '../auth/AuthContext'

export function LoginPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const fromPath = (location.state as { from?: Location })?.from?.pathname ?? '/'

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login()
    navigate(fromPath, { replace: true })
  }

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 lg:grid-cols-2">
      {/* Left Column: Form */}
      <div className="flex flex-col justify-center bg-white/70 px-8 py-12 backdrop-blur-sm dark:bg-slate-950/60 sm:px-12 lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:mx-0">
          <div className="mb-10 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#002855] text-white shadow-lg shadow-[#002855]/20">
              <IconUser className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-[#002855] dark:text-white">{t('app.name')}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-4xl">
            {t('login.title')}
          </h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400">{t('login.subtitle')}</p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-bold text-[#002855] dark:text-white">{t('login.email')}</label>
              <div className="relative">
                <IconMail className="pointer-events-none absolute left-4 rtl:left-auto rtl:right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border-0 bg-slate-50 py-4 pl-12 rtl:pl-4 rtl:pr-12 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#E1523E] dark:bg-slate-900 dark:text-white dark:ring-slate-800 dark:focus:ring-[#E1523E]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-[#002855] dark:text-white">{t('login.password')}</label>
              <div className="relative">
                <IconLock className="pointer-events-none absolute left-4 rtl:left-auto rtl:right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border-0 bg-slate-50 py-4 pl-12 rtl:pl-4 rtl:pr-12 pr-4 text-slate-900 ring-1 ring-inset ring-slate-200 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-[#E1523E] dark:bg-slate-900 dark:text-white dark:ring-slate-800 dark:focus:ring-[#E1523E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-[#002855] px-8 py-4 font-bold text-white shadow-lg shadow-[#002855]/20 transition-all hover:bg-[#001f44] hover:shadow-xl hover:shadow-[#002855]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002855]"
            >
              {t('login.signIn')}
            </button>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">{t('login.noAuth')}</span>
              <Link to="/" className="font-bold text-[#E1523E] hover:text-[#c44331]">
                {t('login.goDashboard')}
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Right Column: Image/Branding */}
      <div className="relative hidden lg:block bg-[#002855]">
        <div className="absolute inset-0 bg-linear-to-br from-[#002855] via-[#003B73] to-[#E1523E] opacity-90" />
        <div className="absolute inset-0 bg-[url('/company-logo.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-20 text-white">
          <div className="relative z-10">
            <p className="text-sm font-bold uppercase tracking-widest opacity-70">{t('login.onboardingAgent')}</p>
            <h2 className="mt-6 text-5xl font-extrabold tracking-tight leading-tight">
              {t('login.tagline')}
            </h2>
            <p className="mt-6 max-w-md text-lg text-blue-100">
              {t('login.taglineDetail')}
            </p>
          </div>
          
          <div className="relative z-10 rounded-3xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
            <p className="font-bold">{t('login.proTip')}</p>
            <p className="mt-2 text-sm text-blue-100">
              {t('login.proTipDetail')}
            </p>
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-1/4 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-[500px] w-[500px] rounded-full bg-[#E1523E]/20 blur-3xl" />
      </div>
    </div>
  )
}

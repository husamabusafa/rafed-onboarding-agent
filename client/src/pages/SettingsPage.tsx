import { IconMoon, IconSun, IconWorld } from '@tabler/icons-react'
import { useI18n } from '../i18n/i18n'

type ThemeMode = 'light' | 'dark'

type Props = {
  themeMode: ThemeMode
  onThemeToggle: () => void
}

export function SettingsPage({ themeMode, onThemeToggle }: Props) {
  const { t, locale, toggleLocale } = useI18n()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('settings.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('settings.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-[#002855] dark:text-white">{t('settings.theme.title')}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('settings.theme.subtitle')}</p>
            </div>

            <button
              type="button"
              onClick={onThemeToggle}
              className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              {themeMode === 'dark' ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
              {themeMode === 'dark' ? t('theme.light') : t('theme.dark')}
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-[#002855] dark:text-white">{t('settings.language.title')}</h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('settings.language.subtitle')}</p>
            </div>

            <button
              type="button"
              onClick={toggleLocale}
              className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <IconWorld className="h-4 w-4" />
              {locale.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

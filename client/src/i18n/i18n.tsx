import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { type Locale, messages } from './messages'

type I18nContextValue = {
  locale: Locale
  dir: 'ltr' | 'rtl'
  t: (key: string) => string
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'locale'

function resolveInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ar') return stored
  const browser = navigator.language?.toLowerCase() ?? 'en'
  return browser.startsWith('ar') ? 'ar' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => resolveInitialLocale())

  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale)
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.dataset.locale = locale
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale, dir])

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = messages[locale]
    return {
      locale,
      dir,
      t: (key: string) => dictionary[key] ?? key,
      setLocale: setLocaleState,
      toggleLocale: () => setLocaleState((prev) => (prev === 'en' ? 'ar' : 'en')),
    }
  }, [locale, dir])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

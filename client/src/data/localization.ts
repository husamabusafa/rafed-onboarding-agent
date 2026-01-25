export type LocalizedString = {
  en: string
  ar: string
}

export function l(locale: 'en' | 'ar', value: LocalizedString) {
  return locale === 'ar' ? value.ar : value.en
}

export function ls(en: string, ar: string): LocalizedString {
  return { en, ar }
}

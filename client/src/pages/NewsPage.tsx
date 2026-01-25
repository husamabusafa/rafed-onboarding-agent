import { IconBell, IconCheck } from '@tabler/icons-react'
import { useState } from 'react'
import { l, ls } from '../data/localization'
import { useI18n } from '../i18n/i18n'
import { getReadNews, toggleReadNews } from '../utils/experienceStorage'

const newsItems = [
  {
    id: 'news-1',
    title: ls('Welcome to Tatweer', 'مرحبًا بك في تطوير'),
    date: '2026-01-15',
    body: ls(
      'We are excited to have you onboard. Explore the onboarding journey and complete the required actions.',
      'نسعد بانضمامك إلينا. استعرض رحلة التهيئة وأكمل الإجراءات والمتطلبات المطلوبة.',
    ),
  },
  {
    id: 'news-2',
    title: ls('New employee services', 'خدمات جديدة للموظفين'),
    date: '2026-01-18',
    body: ls(
      'Meeting room booking and cafeteria ordering are now available in Hayyak (demo).',
      'تمت إضافة حجز قاعات الاجتماعات وطلب الكافيتريا ضمن حياك (تجريبي).',
    ),
  },
  {
    id: 'news-3',
    title: ls('Upcoming townhall', 'لقاء الشركة القادم'),
    date: '2026-01-22',
    body: ls(
      'Join the monthly townhall to hear updates from leadership and ask your questions.',
      'انضم إلى اللقاء الشهري للاستماع إلى مستجدات القيادة وطرح استفساراتك.',
    ),
  },
] as const

export function NewsPage() {
  const { t, locale } = useI18n()
  const [, setTick] = useState(0)

  const read = getReadNews()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('news.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('news.subtitle')}</p>
      </div>

      <div className="space-y-4">
        {newsItems.map((n) => {
          const isRead = !!read[n.id]

          return (
            <div key={n.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <IconBell className="h-5 w-5 text-[#E1523E]" />
                    <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{l(locale, n.title)}</h2>
                    {isRead ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
                        <IconCheck className="h-4 w-4" />
                        {t('news.read')}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">{n.date}</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    toggleReadNews(n.id)
                    setTick((x) => x + 1)
                  }}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    isRead
                      ? 'bg-[#002855]/5 text-[#002855] hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                      : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                  }`}
                >
                  {isRead ? t('news.markUnread') : t('news.markRead')}
                </button>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, n.body)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

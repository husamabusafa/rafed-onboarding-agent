import { IconCalendarEvent, IconMapPin, IconUserCheck } from '@tabler/icons-react'
import { useState } from 'react'
import { ls, l } from '../data/localization'
import { useI18n } from '../i18n/i18n'
import { getRsvps, toggleRsvp } from '../utils/experienceStorage'

const events = [
  {
    id: 'event-welcome',
    title: ls('Welcome Coffee', 'قهوة ترحيبية'),
    date: '2026-01-21',
    time: '09:30',
    location: ls('HQ Cafeteria', 'كافيتريا المقر'),
    description: ls('Meet your cohort and get to know the team in an informal setting.', 'لقاء تعارف مع دفعتك والتعرف على الفريق في أجواء غير رسمية.'),
  },
  {
    id: 'event-townhall',
    title: ls('Company Townhall', 'لقاء الشركة الشهري'),
    date: '2026-01-28',
    time: '13:00',
    location: ls('Auditorium · HQ', 'المسرح · المقر'),
    description: ls('Monthly updates from leadership and Q&A.', 'مستجدات شهرية من القيادة مع جلسة أسئلة وأجوبة.'),
  },
  {
    id: 'event-tour',
    title: ls('Office Tour', 'جولة تعريفية بالمكتب'),
    date: '2026-02-02',
    time: '10:00',
    location: ls('Reception · HQ', 'الاستقبال · المقر'),
    description: ls('A guided tour of key office areas and facilities.', 'جولة منظمة للتعرف على مرافق المكتب والأماكن المهمة.'),
  },
] as const

export function CompanyEventsPage() {
  const { t, locale } = useI18n()
  const [, setTick] = useState(0)

  const rsvps = getRsvps()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('events.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('events.subtitle')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => {
          const going = !!rsvps[e.id]

          return (
            <div key={e.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{l(locale, e.title)}</h2>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-2">
                      <IconCalendarEvent className="h-4 w-4 text-[#E1523E]" />
                      {e.date} · {e.time}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <IconMapPin className="h-4 w-4 text-[#E1523E]" />
                      {l(locale, e.location)}
                    </span>
                  </div>
                </div>

                {going ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
                    {t('events.going')}
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, e.description)}</p>

              <button
                type="button"
                onClick={() => {
                  toggleRsvp(e.id)
                  setTick((x) => x + 1)
                }}
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                  going
                    ? 'bg-[#002855]/5 text-[#002855] hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                    : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                }`}
              >
                <IconUserCheck className="h-4 w-4" />
                {going ? t('events.cancel') : t('events.rsvp')}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

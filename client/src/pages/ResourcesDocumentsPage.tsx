import { IconFileTypePdf } from '@tabler/icons-react'
import { useState } from 'react'
import { l, ls } from '../data/localization'
import { onboardingDocuments } from '../data/onboardingDocuments'
import { useI18n } from '../i18n/i18n'
import { getCompletedIds, setCompleted } from '../utils/onboardingProgress'

const manuals = [
  {
    id: 'manual:company-manuals',
    title: ls('Company Manuals', 'أدلة الشركة'),
  },
  {
    id: 'manual:company-info',
    title: ls('Company Manuals & Info', 'أدلة الشركة ومعلومات عامة'),
  },
] as const

export function ResourcesDocumentsPage() {
  const { locale, t } = useI18n()
  const [, setTick] = useState(0)

  const completed = getCompletedIds()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('resources.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('resources.subtitle')}</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('resources.requiredActions')}</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {onboardingDocuments.map((doc) => {
            const done = completed.has(doc.id)

            return (
              <div
                key={doc.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
                    <IconFileTypePdf className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{l(locale, doc.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, doc.description)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCompleted(doc.id, !done)
                    setTick((x) => x + 1)
                  }}
                  className={`mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                    done
                      ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                  }`}
                >
                  {done ? t('resources.signed') : t('resources.reviewSign')}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('resources.companyManuals')}</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="space-y-3">
          {manuals.map((m) => (
            <button
              key={m.id}
              type="button"
              className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E1523E]/10 text-[#E1523E]">
                <IconFileTypePdf className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-bold text-slate-900 dark:text-white">{l(locale, m.title)}</div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('resources.manualHint')}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

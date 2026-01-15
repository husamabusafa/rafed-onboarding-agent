import { IconArrowLeft, IconCalendar, IconCheck } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { l } from '../data/localization'
import { onboardingActions } from '../data/onboardingActions'
import { useI18n } from '../i18n/i18n'
import { isCompleted, setCompleted } from '../utils/onboardingProgress'

export function ActionDetailPage() {
  const { locale, t } = useI18n()
  const [, setTick] = useState(0)
  const { actionId } = useParams()
  const action = onboardingActions.find((a) => a.id === actionId)

  if (!action) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('actionDetail.notFound.title')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t('actionDetail.notFound.subtitle')}</p>
        <Link
          to="/actions"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-5 py-2.5 text-sm font-semibold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          <IconArrowLeft className="h-4 w-4" />
          {t('actionDetail.backToActions')}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-12">
      <div>
        <Link
          to="/actions"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#002855] dark:text-slate-400 dark:hover:text-white"
        >
          <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t('actionDetail.backToActions')}
        </Link>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-full bg-[#E1523E]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E1523E]">
                {action.category}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
              {l(locale, action.title)}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              {l(locale, action.description)}
            </p>

            <div>
              {(() => {
                const completionId = `action:${action.id}`
                const done = isCompleted(completionId)

                return (
                  <button
                    type="button"
                    onClick={() => {
                      setCompleted(completionId, !done)
                      setTick((x) => x + 1)
                    }}
                    className={`inline-flex items-center rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                      done
                        ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                    }`}
                  >
                    {done ? t('actionDetail.completed') : t('actionDetail.markComplete')}
                  </button>
                )
              })()}
            </div>
          </div>

          {action.sessionDate && (
            <div className="shrink-0 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
                  <IconCalendar className="h-5 w-5 text-[#E1523E]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{t('actionDetail.sessionDate')}</p>
                  <p className="font-semibold text-[#002855] dark:text-white">{l(locale, action.sessionDate)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('actionDetail.steps')}</h2>
        <div className="space-y-4">
          {action.steps.map((step, idx) => (
            <div
              key={l(locale, step)}
              className="group flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#002855]/5 text-sm font-bold text-[#002855] ring-1 ring-[#002855]/10 dark:bg-white/10 dark:text-white dark:ring-white/20">
                {idx + 1}
              </div>
              <div className="pt-1">
                <p className="text-base text-slate-700 dark:text-slate-200">{l(locale, step)}</p>
              </div>
              <div className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                <IconCheck className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import { IconCircleCheck, IconCircleDashed, IconClock } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { l } from '../data/localization'
import { onboardingJourneyPhases, type JourneyPhase, type JourneyItemStatus } from '../data/onboardingJourney'
import { onboardingActions } from '../data/onboardingActions'
import { onboardingDocuments } from '../data/onboardingDocuments'
import { useI18n } from '../i18n/i18n'
import { computeProgress, getCompletedIds } from '../utils/onboardingProgress'

function ProgressRing({ percent }: { percent: number }) {
  const size = 96
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percent))
  const offset = circumference * (1 - clamped / 100)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        className="fill-none stroke-slate-200 dark:stroke-slate-800"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="fill-none stroke-[#E1523E]"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

export function JourneyPage() {
  const { locale, t } = useI18n()

  const actionIds = onboardingActions.map((a) => `action:${a.id}`)
  const documentIds = onboardingDocuments.map((d) => d.id)
  const progress = computeProgress([...actionIds, ...documentIds])

  const completed = getCompletedIds()

  return (
    <div className="space-y-12 pb-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('journey.title')}</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('journey.subtitle')}</p>
        </div>

        <div className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <div className="relative">
            <ProgressRing percent={progress.percent} />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="text-xl font-extrabold text-[#002855] dark:text-white">{progress.percent}%</div>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t('journey.complete')}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {progress.completedCount} {t('journey.of')} {progress.totalCount}
            </div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('journey.progressHint')}</div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {onboardingJourneyPhases.map((phase: JourneyPhase) => (
          <section key={phase.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{l(locale, phase.title)}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{l(locale, phase.subtitle)}</p>
            </div>

            <div className="space-y-3">
              {phase.items.map((item) => {
                const isDone = completed.has(item.id)
                const status: JourneyItemStatus = isDone ? 'done' : item.status

                const Icon = status === 'done' ? IconCircleCheck : status === 'in_progress' ? IconClock : IconCircleDashed
                const iconClass =
                  status === 'done'
                    ? 'text-emerald-500'
                    : status === 'in_progress'
                      ? 'text-amber-500'
                      : 'text-slate-400'

                const to = item.id.startsWith('action:')
                  ? `/actions/${item.id.slice('action:'.length)}`
                  : '/resources'

                return (
                  <Link
                    key={item.id}
                    to={to}
                    className="group flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5 transition-all hover:bg-white hover:shadow-sm dark:bg-slate-950/30 dark:ring-white/10 dark:hover:bg-slate-900"
                  >
                    <div className={`grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10 ${iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-slate-900 dark:text-white">{l(locale, item.title)}</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t(`journey.status.${status}`)}</div>
                    </div>
                    <div className="text-sm font-semibold text-[#E1523E] opacity-0 transition-opacity group-hover:opacity-100">{t('journey.open')}</div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

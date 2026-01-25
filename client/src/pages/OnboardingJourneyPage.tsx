import { IconChecklist, IconClock, IconShieldCheck, IconStar } from '@tabler/icons-react'
import { l } from '../data/localization'
import { onboardingJourney, onboardingJourneyPhases } from '../data/onboardingJourney'
import { useI18n } from '../i18n/i18n'

const card = 'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10'

function getStatusColor(status: string) {
  if (status === 'completed' || status === 'acknowledged') return 'text-emerald-600 dark:text-emerald-400'
  if (status === 'in_progress') return 'text-[#E1523E]'
  if (status === 'overdue') return 'text-red-600 dark:text-red-400'
  return 'text-slate-500 dark:text-slate-300'
}

export function OnboardingJourneyPage() {
  const { locale, t } = useI18n()
  const journey = onboardingJourney

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
          {t('onboarding.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('onboarding.subtitle')}</p>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        <div className={card}>
          <p className="text-xs uppercase tracking-widest text-slate-400">{t('onboarding.profile')}</p>
          <p className="mt-3 text-lg font-semibold text-[#002855] dark:text-white">{journey.profile.employeeName}</p>
          <p className="mt-1 text-sm text-slate-500">{l(locale, journey.profile.role)}</p>
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            <p>{t('onboarding.startDate')}: {journey.profile.startDate}</p>
            <p>{t('onboarding.buddy')}: {journey.profile.buddy}</p>
            <p>{t('onboarding.manager')}: {journey.profile.manager}</p>
          </div>
        </div>
        <div className={`${card} md:col-span-2`}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#002855]/10 p-2 text-[#002855] dark:bg-white/10 dark:text-white">
              <IconClock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#002855] dark:text-white">{t('onboarding.timeline')}</h2>
          </div>
          <div className="mt-4 space-y-3">
            {journey.timeline.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-300">
                <span className="font-semibold text-[#002855] dark:text-white">{item.date}</span>
                <span className="flex-1">{l(locale, item.title)}</span>
                <span className="text-xs uppercase tracking-wide text-slate-400">{item.owner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className={card}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#E1523E]/10 p-2 text-[#E1523E]">
              <IconChecklist className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#002855] dark:text-white">{t('onboarding.policies')}</h2>
          </div>
          <div className="mt-4 space-y-4">
            {journey.policies.map((policy) => (
              <div key={policy.id} className="rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-950/30">
                <p className="font-semibold text-[#002855] dark:text-white">{l(locale, policy.name)}</p>
                <p className="mt-1 text-xs text-slate-500">{policy.owner} · {policy.version}</p>
                {policy.dueDate && (
                  <p className="mt-2 text-xs text-slate-500">{t('onboarding.due')}: {policy.dueDate}</p>
                )}
                <p className={`mt-2 text-xs font-semibold ${getStatusColor(policy.status)}`}>{policy.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#002855]/10 p-2 text-[#002855] dark:bg-white/10 dark:text-white">
              <IconShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#002855] dark:text-white">{t('onboarding.training')}</h2>
          </div>
          <div className="mt-4 space-y-4">
            {journey.training.map((module) => (
              <div key={module.id} className="rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-950/30">
                <p className="font-semibold text-[#002855] dark:text-white">{l(locale, module.title)}</p>
                <p className="mt-1 text-xs text-slate-500">{module.provider} · {module.durationMinutes}m</p>
                <p className={`mt-2 text-xs font-semibold ${getStatusColor(module.status)}`}>{module.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#002855]/10 p-2 text-[#002855] dark:bg-white/10 dark:text-white">
              <IconStar className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-[#002855] dark:text-white">{t('onboarding.checkins')}</h2>
          </div>
          <div className="mt-4 space-y-4">
            {journey.checkIns.map((checkIn) => (
              <div key={checkIn.id} className="rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-950/30">
                <p className="font-semibold text-[#002855] dark:text-white">{checkIn.date}</p>
                <p className="mt-1 text-xs text-slate-500">{checkIn.owner} · {checkIn.type}</p>
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">{l(locale, checkIn.notes)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className="text-lg font-semibold text-[#002855] dark:text-white">{t('onboarding.milestones')}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {journey.milestones.map((milestone) => (
            <div key={milestone.id} className="rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-slate-950/30">
              <p className="font-semibold text-[#002855] dark:text-white">{l(locale, milestone.title)}</p>
              <p className="mt-1 text-xs text-slate-500">{t('onboarding.due')}: {milestone.dueDate}</p>
              <p className={`mt-2 text-xs font-semibold ${getStatusColor(milestone.status)}`}>{milestone.status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className="text-lg font-semibold text-[#002855] dark:text-white">{t('onboarding.phases')}</h2>
        <div className="mt-4 space-y-4">
          {onboardingJourneyPhases.map((phase) => (
            <div key={phase.id} className="rounded-xl border border-slate-200/70 bg-white p-4 text-sm dark:border-white/10 dark:bg-slate-950/30">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-[#002855] dark:text-white">{l(locale, phase.title)}</p>
                  <p className="mt-1 text-xs text-slate-500">{l(locale, phase.subtitle)}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {phase.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600 dark:bg-slate-950/40 dark:text-slate-300">
                    <span>{l(locale, item.title)}</span>
                    <span className={`font-semibold ${getStatusColor(item.status)}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import {
  IconBrandUber,
  IconBus,
  IconCar,
  IconFingerprint,
  IconLayoutGrid,
  IconPercentage,
  IconShieldLock,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { l } from '../data/localization'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'

function Feature({
  title,
  subtitle,
  icon: Icon,
  items,
}: {
  title: string
  subtitle?: string
  icon: ComponentType<{ className?: string }>
  items: readonly string[]
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-[#002855] dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ToolsFacilitiesPage() {
  const { locale, t } = useI18n()
  const tools = tatweerInduction.toolsAndFacilities

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
          {t('tools.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('tools.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Feature
          title={l(locale, tools.hrSystem.name)}
          subtitle={l(locale, tools.hrSystem.purpose)}
          icon={IconLayoutGrid}
          items={tools.hrSystem.signInSteps.map((x) => l(locale, x))}
        />
        <Feature
          title={t('tools.internalPortal')}
          subtitle={l(locale, tools.internalPortal.description)}
          icon={IconShieldLock}
          items={tools.internalPortal.whatToFind.map((x) => l(locale, x))}
        />
        <Feature
          title={t('tools.fingerprintRegistration')}
          subtitle={l(locale, tools.fingerprintRegistration.when)}
          icon={IconFingerprint}
          items={[l(locale, tools.fingerprintRegistration.when)]}
        />
        <Feature
          title={l(locale, tools.walaPlus.programName)}
          subtitle={l(locale, tools.walaPlus.description)}
          icon={IconPercentage}
          items={[l(locale, tools.walaPlus.onboardingNote)]}
        />
        <Feature
          title={t('tools.shuttleService')}
          subtitle={l(locale, tools.shuttleService.description)}
          icon={IconBus}
          items={[l(locale, tools.shuttleService.description)]}
        />
        <Feature
          title={t('tools.uberService')}
          subtitle={l(locale, tools.uberService.description)}
          icon={IconBrandUber}
          items={[l(locale, tools.uberService.coverage), `${t('tools.criteria')}: ${l(locale, tools.uberService.criteria)}`]}
        />
      </div>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('tools.transport')}</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900/50">
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
             <div className="flex -space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
                  <IconCar className="h-5 w-5 text-[#002855] dark:text-white" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
                  <IconBrandUber className="h-5 w-5 text-[#002855] dark:text-white" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-800 dark:ring-white/10">
                  <IconBus className="h-5 w-5 text-[#002855] dark:text-white" />
                </div>
             </div>
             <p className="text-sm">{t('tools.transport.note')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

import { IconArrowRight, IconChecklist } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { l } from '../data/localization'
import { onboardingActions } from '../data/onboardingActions'
import { useI18n } from '../i18n/i18n'

export function ActionsPage() {
  const { locale, t } = useI18n()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
          {t('actions.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('actions.subtitle')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {onboardingActions.map((action) => (
          <Link
            key={action.id}
            to={`/actions/${action.id}`}
            className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E1523E]/10 text-[#E1523E]">
                <IconChecklist className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {action.category}
              </p>
              <h2 className="mt-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white">{l(locale, action.title)}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {l(locale, action.description)}
              </p>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#E1523E] transition-colors group-hover:text-[#c44331]">
              {t('actions.viewDetails')}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

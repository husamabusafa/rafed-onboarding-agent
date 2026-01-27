import { IconChevronRight } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { l } from '../data/localization'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'
import { getPersonImageSrc } from '../utils/peopleImages'

function PeopleLinks({
  title,
  subtitle,
  people,
  columns,
}: {
  title: string
  subtitle: string
  people: readonly { id?: string; name: string; title?: Parameters<typeof l>[1]; company?: Parameters<typeof l>[1] }[]
  columns: 'two' | 'three'
}) {
  const { locale } = useI18n()
  const cols = columns === 'two' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section>
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{title}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>

      <div className={`grid gap-4 ${cols}`}>
        {people.map((person) => {
          const imageSrc = getPersonImageSrc(person.name)
          const resolvedTitle = person.title ? l(locale, person.title) : undefined
          const resolvedCompany = person.company ? l(locale, person.company) : undefined
          const to = person.id ? `/leadership/${person.id}` : '/leadership'

          return (
            <Link
              key={person.id ?? person.name}
              to={to}
              className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-inner dark:bg-slate-800">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={person.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs font-bold text-slate-400">
                    {person.name
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{person.name}</p>
                {resolvedCompany ? <p className="mt-0.5 text-[13px] font-semibold text-[#E1523E] dark:text-[#E1523E]">{resolvedCompany}</p> : null}
                {resolvedTitle ? <p className="mt-0.5 line-clamp-2 text-[12px] text-slate-500 dark:text-slate-400">{resolvedTitle}</p> : null}
              </div>

              <IconChevronRight className="h-5 w-5 text-slate-300 transition-colors group-hover:text-slate-500" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function LeadershipPage() {
  const { t } = useI18n()
  const gov = tatweerInduction.governanceAndLeadership

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('leadership.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('leadership.subtitle')}
        </p>
      </div>

      <PeopleLinks
        title={t('leadership.thcGroupCeo')}
        subtitle={t('leadership.thcGroupCeo.subtitle')}
        people={[gov.thcGroupCeo]}
        columns="two"
      />

      <PeopleLinks
        title={t('leadership.groupCeos')}
        subtitle={t('leadership.groupCeos.subtitle')}
        people={gov.groupCeos}
        columns="three"
      />

      <PeopleLinks
        title={t('leadership.tatweerLeaders')}
        subtitle={t('leadership.tatweerLeaders.subtitle')}
        people={gov.tatweersLeaders}
        columns="three"
      />

      <PeopleLinks
        title={t('leadership.taOnboarding')}
        subtitle={t('leadership.taOnboarding.subtitle')}
        people={gov.talentAcquisitionAndOnboardingTeam}
        columns="three"
      />
    </div>
  )
}

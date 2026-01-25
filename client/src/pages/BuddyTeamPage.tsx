import { IconChevronRight } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { l } from '../data/localization'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'
import { getPersonImageSrc } from '../utils/peopleImages'

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="font-bold text-[#002855] dark:text-white">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BuddyTeamPage() {
  const { locale, t } = useI18n()
  const buddy = tatweerInduction.buddyProgram

  return (
    <div className="space-y-16 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
          {t('buddy.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{l(locale, buddy.objective)}</p>
      </div>

      <section>
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('buddy.team.title')}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">{t('buddy.team.subtitle')}</p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {buddy.assignedBuddyTeam.map((person) => {
            const imageSrc = getPersonImageSrc(person.name)
            const to = person.id ? `/buddy-team/${person.id}` : '/buddy-team'
            const actionCount = person.actions?.length ?? 0

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
                  {person.team ? (
                    <p className="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">
                      {t('common.team')}: {person.team}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {t('buddy.member.actionsCount').replace('{count}', String(actionCount))}
                  </p>
                </div>

                <IconChevronRight className="h-5 w-5 text-slate-300 transition-colors group-hover:text-slate-500" />
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('buddy.role.title')}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{t('buddy.role.subtitle')}</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <ul className="grid gap-4 sm:grid-cols-2">
            {buddy.buddyRole.map((item) => (
              <li key={l(locale, item)} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
                <span className="leading-relaxed">{l(locale, item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('buddy.responsibilities.title')}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{t('buddy.responsibilities.subtitle')}</p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <List title={t('buddy.resp.preJoining')} items={buddy.responsibilities.preJoining.map((x) => l(locale, x))} />
          <List title={t('buddy.resp.firstWeek')} items={buddy.responsibilities.firstWeek.map((x) => l(locale, x))} />
          <List title={t('buddy.resp.firstMonth')} items={buddy.responsibilities.firstMonth.map((x) => l(locale, x))} />
          <List title={t('buddy.resp.afterFirstMonth')} items={buddy.responsibilities.afterFirstMonth.map((x) => l(locale, x))} />
        </div>
      </section>
    </div>
  )
}

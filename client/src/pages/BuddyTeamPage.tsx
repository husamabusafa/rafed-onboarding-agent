import { PeopleGrid } from '../components/PeopleGrid'
import { l } from '../data/localization'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'

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

      <PeopleGrid
        title={t('buddy.team.title')}
        subtitle={t('buddy.team.subtitle')}
        people={buddy.assignedBuddyTeam}
        columns="three"
      />

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

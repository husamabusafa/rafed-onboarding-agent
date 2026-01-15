import { PeopleGrid } from '../components/PeopleGrid'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'

export function LeadershipPage() {
  const { t } = useI18n()
  const groupCeo = tatweerInduction.governanceAndLeadership.thcGroupCeo
  const groupCeos = tatweerInduction.governanceAndLeadership.groupCeos.map((name) => ({ name }))

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('leadership.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('leadership.subtitle')}
        </p>
      </div>

      <PeopleGrid
        title={t('leadership.thcGroupCeo')}
        subtitle={t('leadership.thcGroupCeo.subtitle')}
        people={[{ name: groupCeo }]}
        columns="two"
      />

      <PeopleGrid title={t('leadership.groupCeos')} subtitle={t('leadership.groupCeos.subtitle')} people={groupCeos} columns="three" />

      <PeopleGrid
        title={t('leadership.tatweerLeaders')}
        subtitle={t('leadership.tatweerLeaders.subtitle')}
        people={tatweerInduction.governanceAndLeadership.tatweersLeaders}
        columns="three"
      />

      <PeopleGrid
        title={t('leadership.taOnboarding')}
        subtitle={t('leadership.taOnboarding.subtitle')}
        people={tatweerInduction.governanceAndLeadership.talentAcquisitionAndOnboardingTeam}
        columns="three"
      />
    </div>
  )
}

import { PeopleGrid } from '../components/PeopleGrid'
import { tatweerInduction } from '../data/tatweerInduction'

export function LeadershipPage() {
  const groupCeo = tatweerInduction.governanceAndLeadership.thcGroupCeo
  const groupCeos = tatweerInduction.governanceAndLeadership.groupCeos.map((name) => ({ name }))

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">Leadership</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Get to know Tatweer leadership, group CEOs, and the teams supporting your onboarding.
        </p>
      </div>

      <PeopleGrid
        title="THC Group CEO"
        subtitle="Our group leadership"
        people={[{ name: groupCeo }]}
        columns="two"
      />

      <PeopleGrid title="Group CEOs" subtitle="Group executives" people={groupCeos} columns="three" />

      <PeopleGrid
        title="Tatweer Leaders"
        subtitle="Key leadership across the group"
        people={tatweerInduction.governanceAndLeadership.tatweersLeaders}
        columns="three"
      />

      <PeopleGrid
        title="Talent Acquisition & Onboarding"
        subtitle="Your onboarding contacts"
        people={tatweerInduction.governanceAndLeadership.talentAcquisitionAndOnboardingTeam}
        columns="three"
      />
    </div>
  )
}

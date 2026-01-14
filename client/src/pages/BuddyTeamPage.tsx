import { PeopleGrid } from '../components/PeopleGrid'
import { tatweerInduction } from '../data/tatweerInduction'

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
  const buddy = tatweerInduction.buddyProgram

  return (
    <div className="space-y-16 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
          Assigned Buddy
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{buddy.objective}</p>
      </div>

      <PeopleGrid
        title="Assigned Buddy Team"
        subtitle="Your first point of support"
        people={buddy.assignedBuddyTeam}
        columns="three"
      />

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">Buddy Role</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">What you can expect from your buddy</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <ul className="grid gap-4 sm:grid-cols-2">
            {buddy.buddyRole.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">Responsibilities</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Timeline of buddy support activities</p>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <List title="Pre-Joining" items={buddy.responsibilities.preJoining} />
          <List title="First Week" items={buddy.responsibilities.firstWeek} />
          <List title="First Month" items={buddy.responsibilities.firstMonth} />
          <List title="After First Month" items={buddy.responsibilities.afterFirstMonth} />
        </div>
      </section>
    </div>
  )
}

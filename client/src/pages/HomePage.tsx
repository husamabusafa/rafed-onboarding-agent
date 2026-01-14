import {
  IconChecklist,
  IconChevronRight,
  IconCrown,
  IconHeartHandshake,
  IconMessageCircle,
  IconTools,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { PeopleGrid } from '../components/PeopleGrid'
import { onboardingActions } from '../data/onboardingActions'
import { tatweerInduction } from '../data/tatweerInduction'

const quickActionBase =
  'group flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:ring-white/10'

function QuickAction({
  to,
  title,
  description,
  icon: Icon,
  accent,
}: {
  to: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
  accent: 'navy' | 'coral' | 'gold'
}) {
  const accentClass =
    accent === 'coral'
      ? 'text-[#E1523E] bg-[#E1523E]/5'
      : accent === 'gold'
        ? 'text-amber-600 bg-amber-500/10 dark:text-amber-400'
        : 'text-[#002855] bg-[#002855]/5 dark:text-blue-300'

  return (
    <Link to={to} className={quickActionBase}>
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClass} transition-transform group-hover:scale-110`}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="font-bold text-slate-900 dark:text-white">{title}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </Link>
  )
}

export function HomePage() {
  const arabicWelcome =
    'ﺣﻴﱠــــﺎك ﻓﻲ أﺳﺮﺗﻨـــﺎ!\nﻳﺴﻌــﺪﻧـــﺎ اﻧﻀﻤــــﺎﻣﻚ إﻟﻴﻨﺎ، ﻧﺘﻄﻠﻊ ﺑﺸﻐـــﻒ ﻟﻠﻌﻤـﻞ ﻣﻌﻚ\nﻳﺪ ً ا ﺑﻴﺪ ﻟﺘﺤﻘﻴﻖ أﻫﺪاﻓﻨـــﺎ اﻟﻤﺸﺘﺮﻛـــﺔ، ﻧﺆﻣﻦ ﺑﺄﻧـــﻚ ﺳﺘﻜﻮن\nإﺿﺎﻓﺔ ﻗﻴّﻤﺔ ﻟﻔﺮﻳﻘﻨﺎ، وﻧﻌﺘﺰ ﺑﺮوح اﻟﻬﻤﺔ اﻟﺘﻲ ﺗﺠﻤﻌﻨﺎ.م\nﻣﻌ ً ﺎ، ﻧﺴﻌـﻰ ﻟﺘﻄﻮﻳﺮ اﻟﺘﻌﻠﻴﻢ وﺻﻨﺎﻋﺔ ﺟﻴﻞ ﻣﻨﺎﻓﺲ ﻋﺎﻟﻤﻴ ً ﺎ\nﻟﻨﺘﺮك أﺛﺮ إﻳﺠﺎﺑـــﻴًﺎ وﻧﺒﻨﻲ ﻣﺴﺘﻘﺒـــﻼ ً ﻣﺸﺮﻗ ً ــــﺎ ﺑﻨﺎﺋﻨﺎ وﺑﻨـــﺎﺗﻨﺎ.م'

  const working = tatweerInduction.newMemberInformation.attendanceAndLeaves.workingHours
  const holidays = tatweerInduction.newMemberInformation.attendanceAndLeaves.publicHolidays

  const leadersPreview = tatweerInduction.governanceAndLeadership.tatweersLeaders.slice(0, 6)
  const buddyPreview = tatweerInduction.buddyProgram.assignedBuddyTeam.slice(0, 6)

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-6xl">
              Hayyak
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Start here. Everything you need for your first weeks at Tatweer.
            </p>
          </div>

          <Link
            to="/chat"
            className="group inline-flex items-center gap-2 rounded-full bg-[#E1523E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#E1523E]/20 transition-all hover:bg-[#E1523E]/90 hover:shadow-xl hover:shadow-[#E1523E]/30"
          >
            <IconMessageCircle className="h-5 w-5" />
            Start Chat
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Welcome Message */}
          <div className="col-span-2 overflow-hidden rounded-3xl bg-linear-to-br from-[#002855] to-[#003B73] p-8 text-white shadow-xl shadow-[#002855]/10 md:p-10">
            <div dir="rtl" lang="ar" className="relative z-10">
              <p className="whitespace-pre-line text-lg leading-loose opacity-90">{arabicWelcome}</p>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#E1523E]/20 blur-3xl" />
          </div>

          {/* Quick Stats/Info */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <h3 className="font-bold text-[#002855] dark:text-white">Working Hours</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#002855] dark:text-white">
                  {working.hoursPerDay}h
                </span>
                <span className="text-sm text-slate-500">/ day</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{working.flexTimeWindow}</p>
            </div>

            <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <h3 className="font-bold text-[#002855] dark:text-white">Public Holidays</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {holidays.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#002855] dark:text-white">Quick Access</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            to="/actions"
            title="Onboarding Actions"
            description="Track your journey"
            icon={IconChecklist}
            accent="coral"
          />
          <QuickAction
            to="/tools"
            title="Tools & Facilities"
            description="Access systems"
            icon={IconTools}
            accent="navy"
          />
          <QuickAction
            to="/leadership"
            title="Leadership"
            description="Meet the leaders"
            icon={IconCrown}
            accent="gold"
          />
          <QuickAction
            to="/buddy-team"
            title="Buddy Team"
            description="Your support network"
            icon={IconHeartHandshake}
            accent="coral"
          />
        </div>
      </section>

      {/* Leadership Preview */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#002855] dark:text-white">Tatweer Leaders</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Key people you should know</p>
          </div>
          <Link
            to="/leadership"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#E1523E] transition-colors hover:text-[#c44331]"
          >
            View all
            <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <PeopleGrid people={leadersPreview} columns="three" />
      </section>

      {/* Buddy Team Preview */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#002855] dark:text-white">Your Buddy Team</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Here to help you settle in</p>
          </div>
          <Link
            to="/buddy-team"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#E1523E] transition-colors hover:text-[#c44331]"
          >
            View program
            <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <PeopleGrid people={buddyPreview} columns="three" />
      </section>

      {/* Next Actions List */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#002855] dark:text-white">Up Next</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Recommended steps for you</p>
          </div>
          <Link
            to="/actions"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#E1523E] transition-colors hover:text-[#c44331]"
          >
            View all actions
            <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {onboardingActions.slice(0, 4).map((action) => (
            <Link
              key={action.id}
              to={`/actions/${action.id}`}
              className="group relative flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#002855]/5 text-[#002855] transition-colors group-hover:bg-[#002855]/10 dark:bg-white/5 dark:text-white">
                <IconChecklist className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E1523E]">
                    {action.category}
                  </span>
                </div>
                <h3 className="mt-1 truncate font-bold text-slate-900 dark:text-white">{action.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                  {action.sessionDate || action.description}
                </p>
              </div>
              <IconChevronRight className="h-5 w-5 self-center text-slate-300 transition-colors group-hover:text-slate-500" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

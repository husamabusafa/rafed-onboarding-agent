import {
  IconChecklist,
  IconChevronRight,
  IconCrown,
  IconFileTypePdf,
  IconHeartHandshake,
  IconLayoutGrid,
  IconMessageCircle,
  IconRoute,
  IconTools,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PeopleGrid } from '../components/PeopleGrid'
import { l, ls } from '../data/localization'
import { onboardingActions } from '../data/onboardingActions'
import { onboardingDocuments } from '../data/onboardingDocuments'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'
import { computeProgress, getCompletedIds } from '../utils/onboardingProgress'

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

function ProgressRing({ percent }: { percent: number }) {
  const size = 88
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, percent))
  const offset = circumference * (1 - clamped / 100)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        className="fill-none stroke-slate-200 dark:stroke-slate-800"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="fill-none stroke-[#E1523E]"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

export function HomePage() {
  const { locale, t } = useI18n()
  const [, setTick] = useState(0)

  const welcome = ls(
    'Welcome to our family! We’re excited to have you with us as you start your journey at Tatweer.',
    'حياك الله ضمن فريق تطوير.\nيسعدنا انضمامك إلينا، ونتطلع لدعمك خلال رحلة التهيئة الوظيفية حتى تكون جاهزًا ليومك الأول.\nستجد هنا كل ما تحتاجه من إجراءات ومستندات وموارد تساعدك على البدء بثقة.',
  )

  const arabicWelcome =
    'حياك الله ضمن فريق تطوير.\nيسعدنا انضمامك إلينا، ونتطلع لدعمك خلال رحلة التهيئة الوظيفية حتى تكون جاهزًا ليومك الأول.\nستجد هنا كل ما تحتاجه من إجراءات ومستندات وموارد تساعدك على البدء بثقة.'

  const working = tatweerInduction.newMemberInformation.attendanceAndLeaves.workingHours
  const holidays = tatweerInduction.newMemberInformation.attendanceAndLeaves.publicHolidays

  const leadersPreview = tatweerInduction.governanceAndLeadership.tatweersLeaders.slice(0, 6)
  const buddyPreview = tatweerInduction.buddyProgram.assignedBuddyTeam.slice(0, 6)

  const completed = getCompletedIds()
  const actionIds = onboardingActions.map((a) => `action:${a.id}`)
  const docIds = onboardingDocuments.map((d) => d.id)
  const progress = computeProgress([...actionIds, ...docIds])

  const upNextDocuments = onboardingDocuments.filter((d) => !completed.has(d.id)).slice(0, 2)
  const upNextActions = onboardingActions.filter((a) => !completed.has(`action:${a.id}`)).slice(0, 4 - upNextDocuments.length)

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
              {t('home.subtitle')}
            </p>
          </div>

          <Link
            to="/chat"
            className="group inline-flex items-center gap-2 rounded-full bg-[#E1523E] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#E1523E]/20 transition-all hover:bg-[#E1523E]/90 hover:shadow-xl hover:shadow-[#E1523E]/30"
          >
            <IconMessageCircle className="h-5 w-5" />
            {t('home.startChat')}
          </Link>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Welcome Message */}
          <div className="col-span-2 overflow-hidden rounded-3xl bg-linear-to-br from-[#002855] to-[#003B73] p-8 text-white shadow-xl shadow-[#002855]/10 md:p-10">
            <div dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale} className="relative z-10">
              <p className="whitespace-pre-line text-lg leading-loose opacity-90">{l(locale, welcome) || arabicWelcome}</p>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#E1523E]/20 blur-3xl" />
          </div>

          {/* Quick Stats/Info */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <h3 className="font-bold text-[#002855] dark:text-white">{t('home.workingHours')}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#002855] dark:text-white">
                  {working.hoursPerDay}h
                </span>
                <span className="text-sm text-slate-500">{t('home.perDay')}</span>
              </div>
              <p className="mt-2 text-sm text-slate-500">{l(locale, working.flexTimeWindow)}</p>
            </div>

            <div className="flex-1 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <h3 className="font-bold text-[#002855] dark:text-white">{t('home.publicHolidays')}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {holidays.map((h) => (
                  <span
                    key={l(locale, h)}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {l(locale, h)}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <h3 className="font-bold text-[#002855] dark:text-white">{t('home.progressSnapshot')}</h3>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative">
                  <ProgressRing percent={progress.percent} />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="text-lg font-extrabold text-[#002855] dark:text-white">{progress.percent}%</div>
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t('journey.complete')}</div>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    {progress.completedCount} {t('journey.of')} {progress.totalCount}
                  </div>
                  <div className="mt-3 space-y-2">
                    {upNextDocuments.slice(0, 1).map((d) => (
                      <Link
                        key={d.id}
                        to="/resources"
                        className="group flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-950/50"
                      >
                        <IconFileTypePdf className="h-4 w-4 text-[#E1523E]" />
                        <span className="min-w-0 flex-1 truncate">{l(locale, d.title)}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E1523E]">{t('home.actionRequired')}</span>
                      </Link>
                    ))}

                    {upNextActions.slice(0, 1).map((a) => (
                      <Link
                        key={a.id}
                        to={`/actions/${a.id}`}
                        className="group flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-950/50"
                      >
                        <IconChecklist className="h-4 w-4 text-[#E1523E]" />
                        <span className="min-w-0 flex-1 truncate">{l(locale, a.title)}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E1523E]">{t('home.actionRequired')}</span>
                      </Link>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setTick((x) => x + 1)}
                    className="sr-only"
                    aria-label="Refresh"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#002855] dark:text-white">{t('home.quickAccess')}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            to="/onboarding"
            title={t('home.quick.onboardingJourney')}
            description={t('home.quick.viewPlan')}
            icon={IconRoute}
            accent="navy"
          />
          <QuickAction
            to="/actions"
            title={t('home.quick.onboardingActions')}
            description={t('home.quick.trackJourney')}
            icon={IconChecklist}
            accent="coral"
          />
          <QuickAction
            to="/tools"
            title={t('home.quick.toolsFacilities')}
            description={t('home.quick.accessSystems')}
            icon={IconTools}
            accent="navy"
          />
          <QuickAction
            to="/leadership"
            title={t('home.quick.leadership')}
            description={t('home.quick.meetLeaders')}
            icon={IconCrown}
            accent="gold"
          />
          <QuickAction
            to="/buddy-team"
            title={t('home.quick.buddyTeam')}
            description={t('home.quick.supportNetwork')}
            icon={IconHeartHandshake}
            accent="coral"
          />
          <QuickAction
            to="/experience"
            title={t('home.quick.experience')}
            description={t('home.quick.experienceSubtitle')}
            icon={IconLayoutGrid}
            accent="gold"
          />
        </div>
      </section>

      {/* Leadership Preview */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#002855] dark:text-white">{t('home.leaders.title')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('home.leaders.subtitle')}</p>
          </div>
          <Link
            to="/leadership"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#E1523E] transition-colors hover:text-[#c44331]"
          >
            {t('home.viewAll')}
            <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <PeopleGrid people={leadersPreview} columns="three" />
      </section>

      {/* Buddy Team Preview */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#002855] dark:text-white">{t('home.buddy.title')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('home.buddy.subtitle')}</p>
          </div>
          <Link
            to="/buddy-team"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#E1523E] transition-colors hover:text-[#c44331]"
          >
            {t('home.buddy.viewProgram')}
            <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <PeopleGrid people={buddyPreview} columns="three" />
      </section>

      {/* Next Actions List */}
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#002855] dark:text-white">{t('home.upNext.title')}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('home.upNext.subtitle')}</p>
          </div>
          <Link
            to="/actions"
            className="group inline-flex items-center gap-1 text-sm font-semibold text-[#E1523E] transition-colors hover:text-[#c44331]"
          >
            {t('home.upNext.viewAllActions')}
            <IconChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            ...upNextDocuments.map((d) => ({
              id: d.id,
              title: l(locale, d.title),
              description: l(locale, d.description),
              category: t('home.actionRequired'),
              to: '/resources',
              kind: 'doc' as const,
            })),
            ...upNextActions.map((action) => ({
              id: action.id,
              title: l(locale, action.title),
              description: action.sessionDate ? l(locale, action.sessionDate) : l(locale, action.description),
              category: action.category,
              to: `/actions/${action.id}`,
              kind: 'action' as const,
            })),
          ].slice(0, 4).map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="group relative flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#002855]/5 text-[#002855] transition-colors group-hover:bg-[#002855]/10 dark:bg-white/5 dark:text-white">
                {item.kind === 'doc' ? <IconFileTypePdf className="h-6 w-6" /> : <IconChecklist className="h-6 w-6" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E1523E]">
                    {item.category}
                  </span>
                </div>
                <h3 className="mt-1 truncate font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
              <IconChevronRight className="h-5 w-5 self-center text-slate-300 transition-colors group-hover:text-slate-500" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

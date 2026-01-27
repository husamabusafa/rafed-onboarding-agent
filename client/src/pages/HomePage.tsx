import {
  IconChecklist,
  IconChevronRight,
  IconCrown,
  IconFileTypePdf,
  IconHeartHandshake,
  IconLayoutGrid,
  IconMessageCircle,
  IconPaperclip,
  IconSend,
  IconRoute,
  IconTools,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PeopleGrid } from '../components/PeopleGrid'
import Panorama from '../components/Panorama'
import { l, ls } from '../data/localization'
import { onboardingActions } from '../data/onboardingActions'
import { onboardingDocuments } from '../data/onboardingDocuments'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'
import { computeProgress, getCompletedIds } from '../utils/onboardingProgress'
import { getPersonImageSrc } from '../utils/peopleImages'

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
  const [chatDraft, setChatDraft] = useState('')
  const navigate = useNavigate()

  const welcome = ls(
    'Welcome to Tatweer. Your onboarding plan, next actions, and support network are all here to keep you on track.',
    'مرحبًا بك في تطوير. هنا ستجد خطة التهيئة، أهم الخطوات القادمة، والأشخاص الذين سيدعمونك خلال رحلتك.',
  )

  const heroStatus = ls('Day 3 · Pre-start checklist 72%', 'اليوم ٣ · قائمة ما قبل المباشرة ٧٢٪')
  const heroSubline = ls(
    'Keep momentum. Finish your top tasks today and explore your support network.',
    'حافظ على الزخم. أنجز أهم المهام اليوم وتعرّف على شبكة الدعم الخاصة بك.',
  )

  const ceo = tatweerInduction.governanceAndLeadership.thcGroupCeo
  const ceoImageSrc = getPersonImageSrc(ceo.name)

  const working = tatweerInduction.newMemberInformation.attendanceAndLeaves.workingHours
  const holidays = tatweerInduction.newMemberInformation.attendanceAndLeaves.publicHolidays
  const nextHoliday = holidays[0]

  const leadersPreview = tatweerInduction.governanceAndLeadership.tatweersLeaders.slice(0, 6)
  const buddyPreview = tatweerInduction.buddyProgram.assignedBuddyTeam.slice(0, 6)

  const completed = getCompletedIds()
  const actionIds = onboardingActions.map((a) => `action:${a.id}`)
  const docIds = onboardingDocuments.map((d) => d.id)
  const progress = computeProgress([...actionIds, ...docIds])

  const upNextDocuments = onboardingDocuments.filter((d) => !completed.has(d.id)).slice(0, 2)
  const upNextActions = onboardingActions.filter((a) => !completed.has(`action:${a.id}`)).slice(0, 4 - upNextDocuments.length)
  const nextBestDocument = upNextDocuments[0]
  const nextBestAction = upNextActions[0]
  const nextBest = nextBestDocument
    ? {
        label: l(locale, nextBestDocument.title),
        to: '/resources',
        kind: 'doc' as const,
      }
    : nextBestAction
      ? {
          label: l(locale, nextBestAction.title),
          to: `/actions/${nextBestAction.id}`,
          kind: 'action' as const,
        }
      : null
  const dueSoon = ls('Due soon', 'مستحق قريبًا')
  const dueToday = ls('Due today', 'مستحق اليوم')
  const effortQuick = ls('~10 min', 'حوالي ١٠ دقائق')
  const effortFocus = ls('~20 min', 'حوالي ٢٠ دقيقة')
  const nextHolidayLabel = ls('Next holiday', 'العطلة القادمة')
  const chatDraftPlaceholder = ls('Ask about tasks, documents, or your first week…', 'اسأل عن المهام أو المستندات أو أسبوعك الأول...')
  const chatSuggestions = [
    ls('Summarize my onboarding tasks', 'لخّص مهام التهيئة الخاصة بي'),
    ls('Where do I find required documents?', 'أين أجد المستندات المطلوبة؟'),
    ls('Who is my buddy and how do I contact them?', 'من هو زميلي المساند وكيف أتواصل معه؟'),
    ls('Explain working hours and leave policy', 'اشرح ساعات العمل وسياسة الإجازات'),
  ]

  const startChat = (text?: string) => {
    const draft = (text ?? chatDraft).trim()
    if (draft) {
      localStorage.setItem('rafed.chatDraft', draft)
      navigate('/chat', { state: { draft } })
      return
    }
    navigate('/chat')
  }
  const todayFocusItems = [
    ...upNextDocuments.map((d) => ({
      id: d.id,
      title: l(locale, d.title),
      description: l(locale, d.description),
      to: '/resources',
      due: l(locale, dueToday),
      effort: l(locale, effortQuick),
      kind: 'doc' as const,
    })),
    ...upNextActions.map((a) => ({
      id: a.id,
      title: l(locale, a.title),
      description: a.sessionDate ? l(locale, a.sessionDate) : l(locale, a.description),
      to: `/actions/${a.id}`,
      due: l(locale, dueSoon),
      effort: l(locale, effortFocus),
      kind: 'action' as const,
    })),
  ].slice(0, 2)

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="reveal-up" style={{ animationDelay: '80ms' }}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#002855]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#002855] dark:bg-white/10 dark:text-white">
              {l(locale, heroStatus)}
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-6xl">
              Hayyak
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              {t('home.subtitle')}
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              {l(locale, heroSubline)}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 rounded-full bg-[#002855] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#002855]/20 transition-all hover:bg-[#001f44] hover:shadow-xl"
            >
              {t('home.quick.onboardingJourney')}
            </Link>
            <Link
              to="/chat"
              className="group inline-flex items-center gap-2 rounded-full border border-[#E1523E]/40 bg-white px-6 py-3 text-sm font-bold text-[#E1523E] shadow-sm transition-all hover:border-[#E1523E] hover:bg-[#E1523E]/5 dark:bg-slate-900"
            >
              <IconMessageCircle className="h-5 w-5" />
              {t('home.startChat')}
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Welcome Message */}
          <div className="col-span-2 overflow-hidden rounded-3xl bg-linear-to-br from-[#002855] to-[#003B73] p-8 text-white shadow-xl shadow-[#002855]/10 md:p-10">
            <div dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale} className="relative z-10">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                      <IconHeartHandshake className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                        {l(locale, ls('Welcome', 'مرحبًا'))}
                      </p>
                      <p className="truncate text-lg font-extrabold">
                        {l(locale, ls('Your onboarding starts here', 'رحلة التهيئة تبدأ من هنا'))}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/onboarding"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#002855] shadow-sm transition hover:bg-white/90"
                    >
                      <IconRoute className="h-4 w-4" />
                      {t('home.quick.onboardingJourney')}
                    </Link>
                    <Link
                      to="/resources"
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                    >
                      <IconFileTypePdf className="h-4 w-4" />
                      {t('nav.resources')}
                    </Link>
                  </div>
                </div>

                <p className="whitespace-pre-line text-lg leading-loose opacity-90">{l(locale, welcome)}</p>

                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/15 sm:h-28 sm:w-28">
                      {ceoImageSrc ? (
                        <img src={ceoImageSrc} alt={ceo.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-sm font-extrabold text-white/70">CEO</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                        {l(locale, ls('A message from our CEO', 'رسالة من الرئيس التنفيذي'))}
                      </p>
                      <p className="mt-1 text-base font-extrabold text-white sm:text-lg">{ceo.name}</p>
                      <p className="mt-1 text-sm text-white/80">{l(locale, ceo.title)}</p>
                    </div>
                    <Link
                      to={`/leadership/${ceo.id}`}
                      className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                    >
                      {l(locale, ls('Read', 'اقرأ'))}
                      <IconChevronRight className="h-4 w-4 opacity-80" />
                    </Link>
                  </div>
                  <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-white/90">
                    {l(locale, ceo.message)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/buddy-team"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                  >
                    <IconHeartHandshake className="h-4 w-4" />
                    {t('home.quick.buddyTeam')}
                    <IconChevronRight className="h-4 w-4 opacity-70" />
                  </Link>
                  <Link
                    to="/actions"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                  >
                    <IconChecklist className="h-4 w-4" />
                    {t('nav.actions')}
                    <IconChevronRight className="h-4 w-4 opacity-70" />
                  </Link>
                  <Link
                    to="/chat"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
                  >
                    <IconMessageCircle className="h-4 w-4" />
                    {t('nav.chat')}
                    <IconChevronRight className="h-4 w-4 opacity-70" />
                  </Link>
                </div>
              </div>
            </div>
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
              {nextHoliday ? (
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-3 py-1 text-xs font-semibold text-[#002855] dark:bg-white/10 dark:text-white">
                  <span className="uppercase tracking-wider text-[10px]">{l(locale, nextHolidayLabel)}</span>
                  <span className="font-bold">{l(locale, nextHoliday)}</span>
                </div>
              ) : null}
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
                  {nextBest ? (
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {t('home.actionRequired')}
                      </p>
                      <Link
                        to={nextBest.to}
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#E1523E] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-[#E1523E]/20 transition hover:bg-[#E1523E]/90"
                      >
                        {nextBest.label}
                      </Link>
                    </div>
                  ) : null}
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
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#002855] dark:text-white">{t('home.upNext.title')}</h3>
                <Link to="/actions" className="text-xs font-semibold text-[#E1523E]">
                  {t('home.viewAll')}
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {todayFocusItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.to}
                    className="group flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-950/50"
                  >
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#002855]/5 text-[#002855] dark:bg-white/10 dark:text-white">
                      {item.kind === 'doc' ? <IconFileTypePdf className="h-5 w-5" /> : <IconChecklist className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-slate-900 dark:text-white">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        <span className="rounded-full bg-white px-2 py-0.5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
                          {item.due}
                        </span>
                        <span className="rounded-full bg-white px-2 py-0.5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10">
                          {item.effort}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 360° Office Tour */}
      <section>
        <Panorama />
      </section>

      {/* Chat Prompt */}
      <section className="reveal-up" style={{ animationDelay: '120ms' }}>
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,40,85,0.08),_transparent_55%)]" />
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-20 dark:[background-image:radial-gradient(#1f2937_1px,transparent_1px)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="w-full">
              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                {t('home.startChat')}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {l(locale, ls('Ask Tatweer to organize your onboarding.', 'اسأل تطوير لترتيب رحلة تهيئتك.'))}
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {l(locale, ls('Summarize tasks, find documents, or get answers instantly.', 'لخّص المهام، اعثر على المستندات، أو احصل على إجابات فورية.'))}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {chatSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.en}
                    type="button"
                    onClick={() => {
                      const text = l(locale, suggestion)
                      setChatDraft(text)
                    }}
                    className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-900/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15"
                  >
                    {l(locale, suggestion)}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
                <textarea
                  rows={3}
                  value={chatDraft}
                  onChange={(e) => setChatDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      startChat()
                    }
                  }}
                  placeholder={l(locale, chatDraftPlaceholder)}
                  className="w-full resize-none rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#002855]/30 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <IconPaperclip className="h-4 w-4" />
                      {l(locale, ls('Attach in chat', 'إرفاق داخل الدردشة'))}
                    </span>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden sm:inline">{l(locale, ls('Enter to continue', 'اضغط Enter للمتابعة'))}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => startChat()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002855] px-5 py-2 text-xs font-bold text-white shadow-lg shadow-[#002855]/20 transition-all hover:bg-[#001f44]"
                  >
                    <IconSend className="h-4 w-4" />
                    {l(locale, ls('Continue in chat', 'تابع في الدردشة'))}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="reveal-up" style={{ animationDelay: '140ms' }}>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-[#002855] dark:text-white">{t('home.quickAccess')}</h2>
        </div>
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {l(locale, ls('Operational', 'تشغيلي'))}
            </p>
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
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {l(locale, ls('People', 'الأشخاص'))}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {l(locale, ls('Culture', 'الثقافة'))}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickAction
                to="/experience"
                title={t('home.quick.experience')}
                description={t('home.quick.experienceSubtitle')}
                icon={IconLayoutGrid}
                accent="gold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="relative reveal-up" style={{ animationDelay: '200ms' }}>
        <div className="pointer-events-none absolute -left-10 -right-10 -top-6 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
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
      <section className="relative reveal-up" style={{ animationDelay: '260ms' }}>
        <div className="pointer-events-none absolute -left-10 -right-10 -top-6 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
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
      <section className="relative reveal-up" style={{ animationDelay: '320ms' }}>
        <div className="pointer-events-none absolute -left-10 -right-10 -top-6 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
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
            ...upNextDocuments.map((d, index) => ({
              id: d.id,
              title: l(locale, d.title),
              description: l(locale, d.description),
              category: t('home.actionRequired'),
              to: '/resources',
              kind: 'doc' as const,
              due: index === 0 ? dueToday : dueSoon,
              effort: effortQuick,
            })),
            ...upNextActions.map((action, index) => ({
              id: action.id,
              title: l(locale, action.title),
              description: action.sessionDate ? l(locale, action.sessionDate) : l(locale, action.description),
              category: action.category,
              to: `/actions/${action.id}`,
              kind: 'action' as const,
              due: index === 0 ? dueSoon : dueToday,
              effort: effortFocus,
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
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    {l(locale, item.due)}
                  </span>
                </div>
                <h3 className="mt-1 truncate font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                <p className="mt-3 text-xs font-semibold text-slate-400 dark:text-slate-500">{l(locale, item.effort)}</p>
              </div>
              <IconChevronRight className="h-5 w-5 self-center text-slate-300 transition-colors group-hover:text-slate-500" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

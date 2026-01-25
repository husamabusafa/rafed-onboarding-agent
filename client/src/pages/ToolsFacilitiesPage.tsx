import {
  IconBrandUber,
  IconBus,
  IconCar,
  IconExternalLink,
  IconFingerprint,
  IconLayoutGrid,
  IconMessageCircle,
  IconPercentage,
  IconSearch,
  IconShieldLock,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { l, ls } from '../data/localization'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'

type ToolCategory = 'hr' | 'facilities' | 'benefits' | 'transport'

function ToolCard({
  title,
  subtitle,
  icon: Icon,
  items,
  category,
  openUrl,
  chatDraft,
  locale,
}: {
  title: string
  subtitle?: string
  icon: ComponentType<{ className?: string }>
  items: readonly string[]
  category: ToolCategory
  openUrl?: string
  chatDraft: string
  locale: 'en' | 'ar'
}) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-[#002855] dark:text-white">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </div>
      </div>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {openUrl ? (
          <a
            href={openUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            <IconExternalLink className="h-4 w-4" />
            {l(locale, ls('Open', 'فتح'))}
          </a>
        ) : (
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-400 dark:bg-slate-800 dark:text-slate-500">
            <IconExternalLink className="h-4 w-4" />
            {l(locale, ls('Coming soon', 'قريبًا'))}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            localStorage.setItem('rafed.chatDraft', chatDraft)
            navigate('/chat', { state: { draft: chatDraft } })
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002855] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#002855]/20 transition hover:bg-[#001f44]"
        >
          <IconMessageCircle className="h-4 w-4" />
          {l(locale, ls('Ask in chat', 'اسأل في الدردشة'))}
        </button>

        <span className="ml-auto inline-flex items-center rounded-full bg-[#E1523E]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#E1523E] dark:bg-[#E1523E]/20">
          {category}
        </span>
      </div>
    </div>
  )
}

export function ToolsFacilitiesPage() {
  const { locale, t } = useI18n()
  const navigate = useNavigate()
  const tools = tatweerInduction.toolsAndFacilities

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | ToolCategory>('all')

  const categoryLabels = useMemo(
    () => ({
      all: ls('All', 'الكل'),
      hr: ls('HR', 'الموارد البشرية'),
      facilities: ls('Facilities', 'المرافق'),
      benefits: ls('Benefits', 'المزايا'),
      transport: ls('Transport', 'النقل'),
    }),
    [],
  )

  const cards = useMemo(() => {
    return [
      {
        id: 'hr-system',
        category: 'hr' as const,
        title: l(locale, tools.hrSystem.name),
        subtitle: l(locale, tools.hrSystem.purpose),
        icon: IconLayoutGrid,
        items: tools.hrSystem.signInSteps.map((x) => l(locale, x)),
        openUrl: undefined as string | undefined,
        chatDraft: l(
          locale,
          ls(
            'Help me access the HR system (ERP/OFOQ). What are the steps and who do I contact if I cannot log in?',
            'ساعدني في الوصول إلى نظام الموارد البشرية (ERP/OFOQ). ما الخطوات ومن أتواصل معه إذا واجهت مشكلة في الدخول؟',
          ),
        ),
      },
      {
        id: 'internal-portal',
        category: 'hr' as const,
        title: t('tools.internalPortal'),
        subtitle: l(locale, tools.internalPortal.description),
        icon: IconShieldLock,
        items: tools.internalPortal.whatToFind.map((x) => l(locale, x)),
        openUrl: undefined as string | undefined,
        chatDraft: l(
          locale,
          ls(
            'Where is the internal portal link and what should I check first as a new joiner?',
            'أين رابط البوابة الداخلية وما الذي يجب أن أراجعه أولاً كموظف جديد؟',
          ),
        ),
      },
      {
        id: 'fingerprint',
        category: 'facilities' as const,
        title: t('tools.fingerprintRegistration'),
        subtitle: l(locale, tools.fingerprintRegistration.when),
        icon: IconFingerprint,
        items: [
          l(locale, ls('Wait for an email from the Operations team.', 'انتظر رسالة بريد من فريق العمليات.')),
          l(locale, ls('Complete registration in the office within 48 hours.', 'أكمل التسجيل في المكتب خلال 48 ساعة.')),
          l(locale, ls('Ask Operations if you did not receive the email.', 'تواصل مع العمليات إذا لم تصلك الرسالة.')),
        ],
        openUrl: undefined as string | undefined,
        chatDraft: l(
          locale,
          ls(
            'I need help with fingerprint registration. When should I do it and what should I bring?',
            'أحتاج مساعدة في تسجيل البصمة. متى يتم ذلك وماذا يجب أن أحضر؟',
          ),
        ),
      },
      {
        id: 'wala-plus',
        category: 'benefits' as const,
        title: l(locale, tools.walaPlus.programName),
        subtitle: l(locale, tools.walaPlus.description),
        icon: IconPercentage,
        items: [l(locale, tools.walaPlus.onboardingNote)],
        openUrl: undefined as string | undefined,
        chatDraft: l(
          locale,
          ls(
            'How do I activate Wala Plus and where is the user guide?',
            'كيف أفعل ولاء بلس وأين أجد دليل المستخدم؟',
          ),
        ),
      },
      {
        id: 'shuttle',
        category: 'transport' as const,
        title: t('tools.shuttleService'),
        subtitle: l(locale, tools.shuttleService.description),
        icon: IconBus,
        items: [l(locale, tools.shuttleService.description)],
        openUrl: undefined as string | undefined,
        chatDraft: l(
          locale,
          ls(
            'Share the shuttle schedule/pickup point and how to use it.',
            'شارك جدول الحافلة/نقطة الانطلاق وكيفية استخدامها.',
          ),
        ),
      },
      {
        id: 'uber',
        category: 'transport' as const,
        title: t('tools.uberService'),
        subtitle: l(locale, tools.uberService.description),
        icon: IconBrandUber,
        items: [
          l(locale, tools.uberService.coverage),
          `${t('tools.criteria')}: ${l(locale, tools.uberService.criteria)}`,
        ],
        openUrl: undefined as string | undefined,
        chatDraft: l(
          locale,
          ls(
            'How do I use Uber Business for Tatweer and what is the eligibility/coverage?',
            'كيف أستخدم أوبر للأعمال ضمن تطوير وما هي الأهلية/نطاق التغطية؟',
          ),
        ),
      },
    ]
  }, [locale, t, tools])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return cards.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (!q) return true
      const haystack = `${c.title} ${c.subtitle ?? ''} ${c.items.join(' ')}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [cards, category, query])

  return (
    <div className="space-y-12 pb-12">
      <div className="w-full">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">
          {t('tools.title')}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {t('tools.subtitle')}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <IconSearch className="pointer-events-none absolute left-3 rtl:left-auto rtl:right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={l(locale, ls('Search tools & services...', 'ابحث في الأدوات والخدمات...'))}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 rtl:pl-3 rtl:pr-9 pr-3 text-sm text-slate-900 shadow-sm outline-none focus:border-[#002855]/30 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: 'all' as const, label: categoryLabels.all },
                { id: 'hr' as const, label: categoryLabels.hr },
                { id: 'facilities' as const, label: categoryLabels.facilities },
                { id: 'benefits' as const, label: categoryLabels.benefits },
                { id: 'transport' as const, label: categoryLabels.transport },
              ] as const
            ).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  category === c.id
                    ? 'bg-[#002855] text-white hover:bg-[#001f44]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {l(locale, c.label)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <ToolCard
            key={c.id}
            title={c.title}
            subtitle={c.subtitle}
            icon={c.icon}
            items={c.items}
            category={c.category}
            openUrl={c.openUrl}
            chatDraft={c.chatDraft}
            locale={locale}
          />
        ))}
      </div>

      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('tools.transport')}</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
                <IconCar className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-[#002855] dark:text-white">{l(locale, ls('Personal car', 'سيارة خاصة'))}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{l(locale, ls('Best if you commute daily.', 'مناسب إذا كنت تتنقل يوميًا.'))}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {[l(locale, ls('Use when you prefer flexibility.', 'استخدمه إذا كنت تفضل المرونة.')), l(locale, ls('Ask about parking policy if needed.', 'اسأل عن سياسة المواقف عند الحاجة.'))].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                const draft = l(locale, ls('What is the parking policy and where can I park?', 'ما هي سياسة المواقف وأين يمكنني الوقوف؟'))
                localStorage.setItem('rafed.chatDraft', draft)
                navigate('/chat', { state: { draft } })
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#002855] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#001f44]"
            >
              <IconMessageCircle className="h-4 w-4" />
              {l(locale, ls('Ask about parking', 'اسأل عن المواقف'))}
            </button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
                <IconBrandUber className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-[#002855] dark:text-white">{t('tools.uberService')}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{l(locale, ls('Best for inter-company trips.', 'مناسب للتنقل بين الجهات.'))}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {[l(locale, tools.uberService.coverage), `${t('tools.criteria')}: ${l(locale, tools.uberService.criteria)}`].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                const draft = l(locale, ls('How do I activate Uber Business and what is the coverage?', 'كيف أفعل أوبر للأعمال وما هو نطاق التغطية؟'))
                localStorage.setItem('rafed.chatDraft', draft)
                navigate('/chat', { state: { draft } })
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#002855] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#001f44]"
            >
              <IconMessageCircle className="h-4 w-4" />
              {l(locale, ls('Ask about Uber', 'اسأل عن أوبر'))}
            </button>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
                <IconBus className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-[#002855] dark:text-white">{t('tools.shuttleService')}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{l(locale, ls('Best if you use the metro/train.', 'مناسب إذا كنت تستخدم المترو/القطار.'))}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {[l(locale, tools.shuttleService.description), l(locale, ls('Ask for schedule and timing.', 'اسأل عن الجدول والمواعيد.'))].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E1523E]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                const draft = l(locale, ls('What is the shuttle pickup point and schedule?', 'ما هي نقطة انطلاق الحافلة وما هو جدولها؟'))
                localStorage.setItem('rafed.chatDraft', draft)
                navigate('/chat', { state: { draft } })
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#002855] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#001f44]"
            >
              <IconMessageCircle className="h-4 w-4" />
              {l(locale, ls('Ask about shuttle', 'اسأل عن الحافلة'))}
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-6 dark:bg-slate-900/50">
          <p className="text-sm text-slate-600 dark:text-slate-400">{t('tools.transport.note')}</p>
        </div>
      </section>
    </div>
  )
}

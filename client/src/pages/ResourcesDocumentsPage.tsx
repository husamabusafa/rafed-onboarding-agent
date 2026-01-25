import { IconExternalLink, IconFileTypePdf, IconSearch, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { l, ls } from '../data/localization'
import { onboardingDocuments, type OnboardingDocument } from '../data/onboardingDocuments'
import { useI18n } from '../i18n/i18n'
import { getCompletedIds, setCompleted } from '../utils/onboardingProgress'

const manuals = [
  {
    id: 'manual:company-manuals',
    title: ls('Company Manuals', 'أدلة الشركة'),
    url: undefined as string | undefined,
  },
  {
    id: 'manual:company-info',
    title: ls('Company Manuals & Info', 'أدلة ومعلومات الشركة'),
    url: undefined as string | undefined,
  },
] as const

export function ResourcesDocumentsPage() {
  const { locale, t } = useI18n()
  const [, setTick] = useState(0)
  const [query, setQuery] = useState('')
  const [pendingOnly, setPendingOnly] = useState(false)
  const [activeDoc, setActiveDoc] = useState<OnboardingDocument | null>(null)

  const completed = getCompletedIds()

  const totalDocs = onboardingDocuments.length
  const signedCount = onboardingDocuments.reduce((acc, doc) => acc + (completed.has(doc.id) ? 1 : 0), 0)
  const percent = totalDocs === 0 ? 0 : Math.round((signedCount / totalDocs) * 100)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredDocs = onboardingDocuments.filter((doc) => {
    const done = completed.has(doc.id)
    if (pendingOnly && done) return false
    if (!normalizedQuery) return true
    const haystack = `${l(locale, doc.title)} ${l(locale, doc.description)}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })

  const progressLabel = ls('Signed', 'تم التوقيع')
  const ofLabel = ls('of', 'من')
  const searchPlaceholder = ls('Search documents...', 'ابحث في المستندات...')
  const pendingOnlyLabel = ls('Pending only', 'غير المكتملة فقط')
  const openLabel = ls('Preview', 'عرض')
  const noDocsTitle = ls('No documents found', 'لا توجد مستندات')
  const noDocsSubtitle = ls('Try adjusting your search or filters.', 'جرّب تعديل البحث أو عوامل التصفية.')
  const comingSoonLabel = ls('Coming soon', 'قريبًا')

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('resources.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('resources.subtitle')}</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('resources.requiredActions')}</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {l(locale, progressLabel)} {signedCount} {l(locale, ofLabel)} {totalDocs}
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:w-72">
              <div className="h-full rounded-full bg-[#E1523E]" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <IconSearch className="pointer-events-none absolute left-3 rtl:left-auto rtl:right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={l(locale, searchPlaceholder)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 rtl:pl-3 rtl:pr-9 pr-3 text-sm text-slate-900 shadow-sm outline-none focus:border-[#002855]/30 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <button
              type="button"
              onClick={() => setPendingOnly((v) => !v)}
              className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                pendingOnly
                  ? 'bg-[#002855] text-white hover:bg-[#001f44]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {l(locale, pendingOnlyLabel)}
            </button>
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              <IconFileTypePdf className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-bold text-slate-900 dark:text-white">{l(locale, noDocsTitle)}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{l(locale, noDocsSubtitle)}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocs.map((doc) => {
            const done = completed.has(doc.id)

            return (
              <div
                key={doc.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
              >
                <div>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
                    <IconFileTypePdf className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{l(locale, doc.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, doc.description)}</p>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDoc(doc)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <IconExternalLink className="h-4 w-4" />
                    {l(locale, openLabel)}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCompleted(doc.id, !done)
                      setTick((x) => x + 1)
                    }}
                    className={`inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-bold transition-colors ${
                      done
                        ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                    }`}
                  >
                    {done ? t('resources.signed') : t('resources.reviewSign')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        )}
      </section>

      {activeDoc ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveDoc(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-white/10">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">{t('resources.requiredActions')}</p>
                <h3 className="mt-1 truncate text-xl font-extrabold text-slate-900 dark:text-white">{l(locale, activeDoc.title)}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                aria-label="Close"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:ring-white/10">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">{l(locale, activeDoc.description)}</p>
                <p className="mt-3 text-xs font-semibold text-slate-400">{l(locale, comingSoonLabel)}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {t('resources.reviewSign')}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const done = completed.has(activeDoc.id)
                    setCompleted(activeDoc.id, !done)
                    setTick((x) => x + 1)
                    setActiveDoc(null)
                  }}
                  className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                    completed.has(activeDoc.id)
                      ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                  }`}
                >
                  {completed.has(activeDoc.id) ? t('resources.signed') : t('resources.reviewSign')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('resources.companyManuals')}</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="space-y-3">
          {manuals.map((m) =>
            m.url ? (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E1523E]/10 text-[#E1523E]">
                  <IconFileTypePdf className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold text-slate-900 dark:text-white">{l(locale, m.title)}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('resources.manualHint')}</div>
                </div>
              </a>
            ) : (
              <div
                key={m.id}
                className="flex w-full items-center gap-4 rounded-2xl bg-white/70 p-5 text-left shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900/60 dark:ring-white/10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E1523E]/10 text-[#E1523E]">
                  <IconFileTypePdf className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-bold text-slate-900 dark:text-white">{l(locale, m.title)}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{l(locale, comingSoonLabel)}</div>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

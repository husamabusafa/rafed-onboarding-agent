import {
  IconArrowLeft,
  IconCopy,
  IconMail,
  IconMessageCircle,
  IconPhone,
} from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { l } from '../data/localization'
import { type Person, tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'
import { getPersonImageSrc } from '../utils/peopleImages'

type GroupKey = 'thcGroupCeo' | 'groupCeos' | 'tatweerLeaders' | 'taOnboarding'

export function LeaderDetailPage() {
  const { locale, t } = useI18n()
  const { leaderId } = useParams()
  const [copied, setCopied] = useState(false)

  const { person, groupKey } = useMemo(() => {
    const gov = tatweerInduction.governanceAndLeadership

    const candidates: Array<{ groupKey: GroupKey; person: Person }> = [
      { groupKey: 'thcGroupCeo', person: gov.thcGroupCeo },
      ...gov.groupCeos.map((p) => ({ groupKey: 'groupCeos' as const, person: p })),
      ...gov.tatweersLeaders.map((p) => ({ groupKey: 'tatweerLeaders' as const, person: p })),
      ...gov.talentAcquisitionAndOnboardingTeam.map((p) => ({ groupKey: 'taOnboarding' as const, person: p })),
    ]

    const found = leaderId ? candidates.find((x) => x.person.id === leaderId) : undefined
    return {
      person: found?.person,
      groupKey: found?.groupKey,
    }
  }, [leaderId])

  if (!person || !groupKey) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('leader.notFound.title')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t('leader.notFound.subtitle')}</p>
        <Link
          to="/leadership"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-5 py-2.5 text-sm font-semibold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          <IconArrowLeft className="h-4 w-4" />
          {t('leader.back')}
        </Link>
      </div>
    )
  }

  const imageSrc = getPersonImageSrc(person.name)
  const resolvedTitle = person.title ? l(locale, person.title) : undefined
  const message = person.message ? l(locale, person.message) : undefined

  const groupLabelKey =
    groupKey === 'thcGroupCeo'
      ? 'leadership.thcGroupCeo'
      : groupKey === 'groupCeos'
        ? 'leadership.groupCeos'
        : groupKey === 'tatweerLeaders'
          ? 'leadership.tatweerLeaders'
          : 'leadership.taOnboarding'

  const copyTemplate = t('leader.copyTemplate').replace('{name}', person.name)

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-12">
      <div>
        <Link
          to="/leadership"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#002855] dark:text-slate-400 dark:hover:text-white"
        >
          <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t('leader.back')}
        </Link>

        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10 sm:flex-row sm:items-start sm:justify-between sm:p-8">
          <div className="flex items-start gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-inner dark:bg-slate-800">
              {imageSrc ? (
                <img src={imageSrc} alt={person.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-sm font-bold text-slate-400">
                  {person.name
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#E1523E]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E1523E]">
                  {t(groupLabelKey)}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#002855] dark:text-white">{person.name}</h1>
              {resolvedTitle ? <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{resolvedTitle}</p> : null}
              {person.bio ? <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, person.bio)}</p> : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-[#E1523E] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E1523E]/90"
            >
              <IconMessageCircle className="h-4 w-4" />
              {t('leader.openChat')}
            </Link>

            {person.email ? (
              <a
                href={`mailto:${person.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2.5 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <IconMail className="h-4 w-4" />
                {t('leader.email')}
              </a>
            ) : null}

            {person.phone ? (
              <a
                href={`tel:${person.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2.5 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <IconPhone className="h-4 w-4" />
                {t('leader.call')}
              </a>
            ) : null}

            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(copyTemplate)
                  setCopied(true)
                  window.setTimeout(() => setCopied(false), 1200)
                } catch {
                  setCopied(false)
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2.5 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <IconCopy className="h-4 w-4" />
              {copied ? t('leader.copied') : t('leader.copyMessage')}
            </button>
          </div>
        </div>
      </div>

      {message ? (
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('leader.message.title')}</h2>
          <p className="mt-4 whitespace-pre-line text-slate-600 dark:text-slate-300">{message}</p>
        </section>
      ) : null}
    </div>
  )
}

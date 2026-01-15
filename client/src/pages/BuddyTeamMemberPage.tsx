import {
  IconArrowLeft,
  IconCheck,
  IconCopy,
  IconMail,
  IconMessageCircle,
  IconPhone,
} from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { l } from '../data/localization'
import { tatweerInduction } from '../data/tatweerInduction'
import { useI18n } from '../i18n/i18n'
import { getPersonImageSrc } from '../utils/peopleImages'
import { isCompleted, setCompleted } from '../utils/onboardingProgress'

export function BuddyTeamMemberPage() {
  const { locale, t } = useI18n()
  const { memberId } = useParams()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [, setTick] = useState(0)

  const buddy = tatweerInduction.buddyProgram

  const member = useMemo(() => {
    if (!memberId) return undefined
    return buddy.assignedBuddyTeam.find((p) => p.id === memberId)
  }, [buddy.assignedBuddyTeam, memberId])

  if (!member) {
    return (
      <div className="mx-auto max-w-lg py-12 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('buddy.member.notFound.title')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t('buddy.member.notFound.subtitle')}</p>
        <Link
          to="/buddy-team"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-5 py-2.5 text-sm font-semibold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
        >
          <IconArrowLeft className="h-4 w-4" />
          {t('buddy.member.back')}
        </Link>
      </div>
    )
  }

  const imageSrc = getPersonImageSrc(member.name)

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-12">
      <div>
        <Link
          to="/buddy-team"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-[#002855] dark:text-slate-400 dark:hover:text-white"
        >
          <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          {t('buddy.member.back')}
        </Link>

        <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10 sm:flex-row sm:items-start sm:justify-between sm:p-8">
          <div className="flex items-start gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-inner dark:bg-slate-800">
              {imageSrc ? (
                <img src={imageSrc} alt={member.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-sm font-bold text-slate-400">
                  {member.name
                    .split(' ')
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#002855] dark:text-white">{member.name}</h1>
              {member.team ? (
                <p className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {t('common.team')}: {member.team}
                </p>
              ) : null}
              {member.bio ? <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, member.bio)}</p> : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-full bg-[#E1523E] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E1523E]/90"
            >
              <IconMessageCircle className="h-4 w-4" />
              {t('buddy.member.openChat')}
            </Link>

            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2.5 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <IconMail className="h-4 w-4" />
                {t('buddy.member.email')}
              </a>
            ) : null}

            {member.phone ? (
              <a
                href={`tel:${member.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2.5 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                <IconPhone className="h-4 w-4" />
                {t('buddy.member.call')}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{t('buddy.member.actions.title')}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">{t('buddy.member.actions.subtitle')}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {(member.actions ?? []).map((action) => {
            const completionId = `buddy-action:${member.id}:${action.id}`
            const done = isCompleted(completionId)

            return (
              <div
                key={action.id}
                className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{l(locale, action.title)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{l(locale, action.description)}</p>
                    </div>

                    {done ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-200">
                        <IconCheck className="h-4 w-4" />
                        {t('buddy.member.actions.done')}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const template = l(locale, action.messageTemplate)
                      try {
                        await navigator.clipboard.writeText(template)
                        setCopiedId(action.id)
                        window.setTimeout(() => setCopiedId((x) => (x === action.id ? null : x)), 1200)
                      } catch {
                        setCopiedId(null)
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#002855]/5 px-4 py-2 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                  >
                    <IconCopy className="h-4 w-4" />
                    {copiedId === action.id ? t('buddy.member.actions.copied') : t('buddy.member.actions.copyMessage')}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCompleted(completionId, !done)
                      setTick((x) => x + 1)
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                      done
                        ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:bg-emerald-500/20 dark:text-emerald-200'
                        : 'bg-[#E1523E] text-white hover:bg-[#E1523E]/90'
                    }`}
                  >
                    <IconCheck className="h-4 w-4" />
                    {done ? t('buddy.member.actions.markNotDone') : t('buddy.member.actions.markDone')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

import type { LocalizedString } from '../data/localization'
import { l } from '../data/localization'
import { useI18n } from '../i18n/i18n'
import { getPersonImageSrc } from '../utils/peopleImages'

type Person = {
  name: string
  title?: string | LocalizedString
  team?: string
}

type Props = {
  title?: string
  subtitle?: string
  people: readonly Person[]
  columns?: 'two' | 'three' | 'four'
}

function getCols(columns: Props['columns']) {
  if (columns === 'two') return 'grid-cols-1 sm:grid-cols-2'
  if (columns === 'four') return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
}

export function PeopleGrid({ title, subtitle, people, columns = 'three' }: Props) {
  const { locale, t } = useI18n()

  return (
    <section>
      {(title || subtitle) && (
        <div className="flex flex-col gap-2 mb-6">
          {title && <h2 className="text-2xl font-bold tracking-tight text-[#002855] dark:text-white">{title}</h2>}
          {subtitle && <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
        </div>
      )}

      <div className={`grid gap-4 ${getCols(columns)}`}>
        {people.map((person) => {
          const imageSrc = getPersonImageSrc(person.name)
          const resolvedTitle =
            typeof person.title === 'string' ? person.title : person.title ? l(locale, person.title) : undefined
          return (
            <div
              key={`${person.name}-${resolvedTitle ?? person.team ?? ''}`}
              className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-inner dark:bg-slate-800">
                {imageSrc ? (
                  <img src={imageSrc} alt={person.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs font-bold text-slate-400">
                    {person.name
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join('')}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900 dark:text-white">{person.name}</p>
                {resolvedTitle ? (
                  <p className="mt-0.5 line-clamp-2 text-[12px] text-slate-500 dark:text-slate-400">{resolvedTitle}</p>
                ) : null}
                {person.team ? (
                  <p className="mt-1 inline-flex w-fit items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    {t('common.team')}: {person.team}
                  </p>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

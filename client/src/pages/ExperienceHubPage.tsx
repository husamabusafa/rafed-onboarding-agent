import {
  IconCalendarEvent,
  IconBell,
  IconBuilding,
  IconCup,
  IconPhoto,
} from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/i18n'

function Card({
  to,
  title,
  description,
  Icon,
}: {
  to: string
  title: string
  description: string
  Icon: ComponentType<{ className?: string }>
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
    >
      <div>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#002855]/10 text-[#002855] dark:bg-white/10 dark:text-white">
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      <div className="mt-6 text-sm font-bold text-[#E1523E]">{title}</div>
    </Link>
  )
}

export function ExperienceHubPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('experience.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('experience.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card to="/experience/cafeteria" title={t('experience.cafeteria.title')} description={t('experience.cafeteria.subtitle')} Icon={IconCup} />
        <Card to="/experience/rooms" title={t('experience.rooms.title')} description={t('experience.rooms.subtitle')} Icon={IconBuilding} />
        <Card to="/experience/events" title={t('experience.events.title')} description={t('experience.events.subtitle')} Icon={IconCalendarEvent} />
        <Card to="/experience/news" title={t('experience.news.title')} description={t('experience.news.subtitle')} Icon={IconBell} />
        <Card to="/experience/gallery" title={t('experience.gallery.title')} description={t('experience.gallery.subtitle')} Icon={IconPhoto} />
      </div>
    </div>
  )
}

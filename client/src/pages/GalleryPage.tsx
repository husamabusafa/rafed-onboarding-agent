import { IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useI18n } from '../i18n/i18n'

// Experience gallery: neutral event / company visuals (Pexels)
const images = [
  {
    id: 'event-townhall',
    src: 'https://images.pexels.com/photos/1181408/pexels-photo-1181408.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Company townhall event with employees gathered in a modern hall',
  },
  {
    id: 'workshop-onboarding',
    src: 'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Onboarding workshop with team members collaborating around a table',
  },
  {
    id: 'office-lobby',
    src: 'https://images.pexels.com/photos/1560932/pexels-photo-1560932.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Bright corporate lobby with people walking and talking',
  },
  {
    id: 'meeting-room',
    src: 'https://images.pexels.com/photos/1181528/pexels-photo-1181528.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Meeting room with a presentation on a large screen',
  },
  {
    id: 'team-collaboration',
    src: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Team collaborating on laptops in an open workspace',
  },
  {
    id: 'office-panorama',
    src: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Panoramic view of a modern office building exterior',
  },
] as const

export function GalleryPage() {
  const { t } = useI18n()
  const [active, setActive] = useState<(typeof images)[number] | null>(null)

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('gallery.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('gallery.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(img)}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-900/5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 dark:ring-white/10"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setActive(null)} />
          <div className="relative mx-auto flex h-full max-w-5xl items-center justify-center px-4">
            <div className="relative w-full overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-slate-700 shadow-sm ring-1 ring-slate-900/10 hover:bg-white dark:bg-slate-950/60 dark:text-slate-200 dark:ring-white/10"
                aria-label="close"
              >
                <IconX className="h-5 w-5" />
              </button>
              <img src={active.src} alt={active.alt} className="max-h-[80vh] w-full object-contain bg-slate-950" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

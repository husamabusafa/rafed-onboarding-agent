import { IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { useI18n } from '../i18n/i18n'

const images = [
  { id: 'logo', src: '/company-logo.png', alt: 'Company' },
  { id: 'leader-1', src: '/eng-metab-al-shahrani.png', alt: 'Leader' },
  { id: 'leader-2', src: '/mr-mohammed-alhizam.png', alt: 'Leader' },
  { id: 'leader-3', src: '/eng-fahad-al-solaie.png', alt: 'Leader' },
  { id: 'leader-4', src: '/eng-omar-al-suwaiyan.png', alt: 'Leader' },
  { id: 'leader-5', src: '/eng-mohamed-al-mehiemeed.png', alt: 'Leader' },
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

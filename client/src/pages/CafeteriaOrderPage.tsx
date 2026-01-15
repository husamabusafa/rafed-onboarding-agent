import { IconMinus, IconPlus, IconShoppingCart, IconTrash } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { CafeteriaMenu } from '../components/CafeteriaMenu'
import { useI18n } from '../i18n/i18n'
import { addToCart, clearCart, getCart, setCartQty } from '../utils/experienceStorage'

type CafeteriaInput = NonNullable<Parameters<typeof CafeteriaMenu>[0]['input']>

const menuInput: CafeteriaInput = {
  categories: [
    {
      nameEn: 'Hot Drinks',
      nameAr: 'مشروبات ساخنة',
      items: [
        {
          nameEn: 'Arabic Coffee',
          nameAr: 'قهوة عربية',
          descriptionEn: 'Light coffee with cardamom',
          descriptionAr: 'قهوة خفيفة مع الهيل',
          caffeineLevel: 'Low',
          type: 'Hot',
        },
        {
          nameEn: 'Espresso',
          nameAr: 'إسبريسو',
          descriptionEn: 'Single shot espresso',
          descriptionAr: 'جرعة إسبريسو مركزة',
          caffeineLevel: 'High',
          type: 'Hot',
        },
        {
          nameEn: 'Latte',
          nameAr: 'لاتيه',
          descriptionEn: 'Milk with espresso',
          descriptionAr: 'حليب مع إسبريسو',
          caffeineLevel: 'Medium',
          type: 'Hot',
        },
      ],
    },
    {
      nameEn: 'Cold Drinks',
      nameAr: 'مشروبات باردة',
      items: [
        {
          nameEn: 'Iced Latte',
          nameAr: 'آيس لاتيه',
          descriptionEn: 'Chilled latte over ice',
          descriptionAr: 'لاتيه بارد مع الثلج',
          caffeineLevel: 'Medium',
          type: 'Cold',
        },
        {
          nameEn: 'Water',
          nameAr: 'ماء',
          descriptionEn: 'Bottled water',
          descriptionAr: 'مياه معبأة',
          caffeineLevel: 'None',
          type: 'Cold',
        },
      ],
    },
  ],
}

export function CafeteriaOrderPage() {
  const { t, locale } = useI18n()
  const [, setTick] = useState(0)

  const cart = getCart()

  const categories = menuInput.categories ?? []

  const quickItems = useMemo(() => {
    return categories.flatMap((c) =>
      c.items.map((i) => ({
        id: `${c.nameEn}:${i.nameEn}`,
        nameEn: i.nameEn,
        nameAr: i.nameAr,
        categoryEn: c.nameEn,
        categoryAr: c.nameAr,
      })),
    )
  }, [categories])

  const totalQty = cart.reduce((sum, x) => sum + x.qty, 0)

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('cafeteriaOrder.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('cafeteriaOrder.subtitle')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <CafeteriaMenu input={{ categories }} />

          <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
            <h2 className="text-lg font-bold text-[#002855] dark:text-white">{t('cafeteriaOrder.quickAdd')}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('cafeteriaOrder.quickAdd.subtitle')}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickItems.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    addToCart({ id: it.id, nameEn: it.nameEn, nameAr: it.nameAr })
                    setTick((x) => x + 1)
                  }}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-950/30 dark:text-slate-200 dark:hover:bg-slate-950/50"
                >
                  <span className="min-w-0 flex-1 truncate">{locale === 'ar' ? it.nameAr : it.nameEn}</span>
                  <IconPlus className="h-5 w-5 text-[#E1523E]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconShoppingCart className="h-5 w-5 text-[#E1523E]" />
              <h2 className="text-lg font-bold text-[#002855] dark:text-white">{t('cafeteriaOrder.cart')}</h2>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('cafeteriaOrder.itemsCount').replace('{count}', String(totalQty))}</span>
          </div>

          {cart.length === 0 ? (
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">{t('cafeteriaOrder.cartEmpty')}</p>
          ) : (
            <div className="mt-6 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950/30">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-slate-900 dark:text-white">{locale === 'ar' ? item.nameAr : item.nameEn}</div>
                    <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t('cafeteriaOrder.qty').replace('{count}', String(item.qty))}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCartQty(item.id, item.qty - 1)
                        setTick((x) => x + 1)
                      }}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-900/5 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-800"
                      aria-label="decrease"
                    >
                      <IconMinus className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCartQty(item.id, item.qty + 1)
                        setTick((x) => x + 1)
                      }}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-900/5 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-800"
                      aria-label="increase"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCartQty(item.id, 0)
                        setTick((x) => x + 1)
                      }}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-900/5 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-white/10 dark:hover:bg-slate-800"
                      aria-label="remove"
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  clearCart()
                  setTick((x) => x + 1)
                }}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#002855]/5 px-4 py-2.5 text-sm font-bold text-[#002855] transition-colors hover:bg-[#002855]/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                {t('cafeteriaOrder.clearCart')}
              </button>

              <button
                type="button"
                onClick={() => {
                  clearCart()
                  setTick((x) => x + 1)
                }}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#E1523E] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#E1523E]/90"
              >
                {t('cafeteriaOrder.placeOrder')}
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

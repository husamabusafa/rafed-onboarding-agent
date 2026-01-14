import { useEffect } from 'react'
import { IconCup, IconFlame } from '@tabler/icons-react'

const theme = {
  card: {
    base: 'rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15',
  },
  header: {
    icon: 'p-3 rounded-2xl',
    title: 'text-2xl font-semibold tracking-tight text-[#002855] dark:text-white',
    subtitle: 'text-sm text-slate-500 dark:text-slate-400',
  },
  gradient: {
    coral: 'bg-linear-to-r from-[#002855]/18 via-white/40 to-[#E1523E]/14 dark:from-[#002855]/25 dark:via-slate-950/30 dark:to-[#E1523E]/15',
  },
  item: {
    compact:
      'p-3 rounded-2xl border border-[#002855]/10 bg-white shadow-sm transition-all group hover:border-[#E1523E]/25 hover:shadow-md dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-[#E1523E]/30',
  },
  badge: {
    base: 'text-xs px-2 py-1 rounded-full border',
  },
  text: {
    primary: 'text-[#002855] dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-200',
    muted: 'text-slate-500 dark:text-slate-300',
    subtle: 'text-slate-500/80 dark:text-slate-400/80',
  },
  icon: {
    primary: 'text-[#002855] dark:text-white',
    teal: 'text-[#E1523E] dark:text-[#E1523E]',
    gold: 'text-[#002855]/70 dark:text-white/70',
  },
  section: {
    light: 'bg-white/60 dark:bg-slate-950/25',
  },
}

const iconBackgrounds = {
  gold: 'bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25',
}

const borders = {
  base: 'border-[#002855]/10 dark:border-white/10',
}

const statusColors = {
  caffeine: {
    None: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
    Low: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
    Medium: 'border border-[#002855]/10 bg-white text-slate-700 dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-200',
    High: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  } as Record<string, string>,
}

interface MenuItem {
  nameAr: string
  nameEn: string
  descriptionAr: string
  descriptionEn: string
  caffeineLevel: 'None' | 'Low' | 'Medium' | 'High'
  type: 'Hot' | 'Cold'
}

interface Category {
  nameAr: string
  nameEn: string
  items: MenuItem[]
}

const EMPTY_CATEGORIES: Category[] = []

interface Props {
  input?: {
    selectedCategory?: string
    categories?: Category[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}


export function CafeteriaMenu({ input, toolName, toolCallId, addToolResult }: Props) {
  const categories = input?.categories ?? EMPTY_CATEGORIES;
  
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          categoriesCount: categories.length,
          totalItems: totalItems,
          categories: categories,
          message: `Showing ${categories.length} categories with ${totalItems} drink(s)`
        }
      });
    }
  }, [categories, toolName, toolCallId, addToolResult]);

  return (
    <div className={`${theme.card.base} max-w-4xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBackgrounds.gold} ${theme.header.icon}`}>
          <IconCup className={`w-6 h-6 ${theme.icon.gold}`} />
        </div>
        <div>
          <h2 className={theme.header.title}>Cafeteria Menu</h2>
          <p className={theme.header.subtitle}>قائمة المشروبات</p>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category, idx) => (
          <div key={idx} className={`${borders.base} rounded-3xl overflow-hidden`}>
            <div className={`${theme.gradient.coral} p-4 ${borders.base} border-b`}>
              <h3 className={`text-lg font-bold ${theme.text.primary}`}>{category.nameEn}</h3>
              <p className={`text-sm ${theme.text.muted}`}>{category.nameAr}</p>
            </div>
            
            <div className={`p-4 grid grid-cols-1 md:grid-cols-2 gap-4 ${theme.section.light}`}>
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className={theme.item.compact}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className={`font-semibold ${theme.text.primary}`}>{item.nameEn}</h4>
                      <p className={`text-xs ${theme.text.subtle}`}>{item.nameAr}</p>
                    </div>
                    <span className={`${theme.badge.base} ${statusColors.caffeine[item.caffeineLevel]}`}>
                      {item.caffeineLevel}
                    </span>
                  </div>
                  <p className={`text-sm ${theme.text.secondary} mb-2`}>{item.descriptionEn}</p>
                  <p className={`text-xs ${theme.text.subtle} mb-2`}>{item.descriptionAr}</p>
                  <div className="flex items-center gap-2">
                    {item.type === 'Hot' ? (
                      <IconFlame className={`w-4 h-4 ${theme.icon.primary}`} />
                    ) : (
                      <IconCup className={`w-4 h-4 ${theme.icon.teal}`} />
                    )}
                    <span className={`text-xs font-medium ${theme.text.muted}`}>{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

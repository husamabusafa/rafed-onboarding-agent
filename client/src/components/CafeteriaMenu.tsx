import { useEffect } from 'react'
import { IconCup, IconFlame } from '@tabler/icons-react'
import { theme, iconBackgrounds, statusColors, borders } from './theme'

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

interface Props {
  input?: {
    selectedCategory?: string
    categories?: Category[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}


export function CafeteriaMenu({ input, toolName, toolCallId, addToolResult }: Props) {
  const categories = input?.categories || [];
  
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

import { useEffect } from 'react'
import { IconCup, IconFlame } from '@tabler/icons-react'

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
  selectedCategory?: string
  categories: Category[]
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

const caffeineLevelColors = {
  None: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  Low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  High: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function CafeteriaMenu({ categories = [], toolName, toolCallId, addToolResult }: Props) {
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
          message: `Showing ${categories.length} categories with ${totalItems} drink(s)`
        }
      });
    }
  }, [categories.length, toolName, toolCallId, addToolResult]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-xl">
          <IconCup className="w-6 h-6 text-orange-600 dark:text-orange-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cafeteria Menu</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">قائمة المشروبات</p>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900 dark:to-amber-900 p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{category.nameEn}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{category.nameAr}</p>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.nameEn}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.nameAr}</p>
                    </div>
                    {item.type === 'Hot' && (
                      <IconFlame className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{item.descriptionEn}</p>
                  
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${caffeineLevelColors[item.caffeineLevel]}`}>
                    Caffeine: {item.caffeineLevel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

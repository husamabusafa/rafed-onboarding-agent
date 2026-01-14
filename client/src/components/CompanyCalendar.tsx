import { IconCalendar, IconStar } from '@tabler/icons-react'
import { useEffect } from 'react'

interface Holiday {
  date?: string
  startDate?: string
  endDate?: string
  nameEn: string
  nameAr: string
}

interface Month {
  monthNumber: number
  nameEn: string
  nameAr: string
  hijriRangeEn: string
  hijriRangeAr: string
  totalDays: number
  startsOn: string
  holidays: Holiday[]
}

interface Props {
  year: number
  selectedMonth?: number
  months: Month[]
  weekendDays: string[]
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

export function CompanyCalendar({ year, months = [], weekendDays = [], toolName, toolCallId, addToolResult }: Props) {
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      const totalHolidays = months.reduce((sum, month) => sum + month.holidays.length, 0);
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          year: year,
          monthsCount: months.length,
          totalHolidays: totalHolidays,
          message: `Showing calendar for ${year} with ${totalHolidays} holiday(s)`
        }
      });
    }
  }, [year, months.length, toolName, toolCallId, addToolResult]);
  const currentMonth = new Date().getMonth() + 1
  const upcomingMonths = months.filter(m => m.monthNumber >= currentMonth).slice(0, 3)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <IconCalendar className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Company Calendar {year}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">التقويم الشركة</p>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Weekend Days:</strong> {weekendDays.join(', ')}
        </p>
      </div>

      <div className="space-y-4">
        {upcomingMonths.map((month) => (
          <div key={month.monthNumber} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{month.nameEn}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{month.nameAr}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{month.hijriRangeEn}</p>
            </div>
            
            <div className="p-4">
              {month.holidays.length > 0 ? (
                <div className="space-y-2">
                  {month.holidays.map((holiday, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
                      <IconBeach className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{holiday.nameEn}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{holiday.nameAr}</p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          {holiday.date || `${holiday.startDate} to ${holiday.endDate}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">No holidays this month</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

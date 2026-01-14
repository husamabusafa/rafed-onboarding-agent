import { useEffect } from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { theme, iconBackgrounds, borders } from './theme'

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
  input?: {
    year?: number
    selectedMonth?: number
    months?: Month[]
    weekendDays?: string[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

export function CompanyCalendar({ input, toolName, toolCallId, addToolResult }: Props) {
  const year = input?.year || 2026;
  const months = input?.months || [];
  const weekendDays = input?.weekendDays || [];
  
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
  }, [year, months, toolName, toolCallId, addToolResult]);
  const currentMonth = new Date().getMonth() + 1
  const upcomingMonths = months.filter(m => m.monthNumber >= currentMonth).slice(0, 3)

  return (
    <div className={`${theme.card.base} max-w-4xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBackgrounds.teal} ${theme.header.icon}`}>
          <IconCalendar className={`w-6 h-6 ${theme.icon.teal}`} />
        </div>
        <div>
          <h2 className={theme.header.title}>Company Calendar {year}</h2>
          <p className={theme.header.subtitle}>التقويم الشركة</p>
        </div>
      </div>

      <div className={`mb-6 ${theme.infoBox.base} ${theme.infoBox.info}`}>
        <p className={`text-sm font-medium ${theme.text.secondary}`}>Weekend Days:</p>
        <p className={`text-xs ${theme.text.muted} mt-1`}>{weekendDays.join(', ')}</p>
      </div>

      <div className="space-y-4">
        {upcomingMonths.map((month) => (
          <div key={month.monthNumber} className={`${borders.base} rounded-3xl overflow-hidden`}>
            <div className={`${theme.gradient.primary} p-4 ${borders.base} border-b`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`text-lg font-bold ${theme.text.primary}`}>{month.nameEn}</h3>
                  <p className={`text-xs ${theme.text.muted}`}>{month.nameAr}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs ${theme.text.muted}`}>Hijri: {month.hijriRangeEn}</p>
                  <p className={`text-xs ${theme.text.subtle}`}>{month.hijriRangeAr}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 ${theme.section.light}`}>
              <p className={`text-xs ${theme.text.subtle} mb-3`}>
                {month.totalDays} days, starts on {month.startsOn}
              </p>
              
              {month.holidays.length > 0 ? (
                <div className="space-y-2">
                  {month.holidays.map((holiday, idx) => (
                    <div key={idx} className={`${theme.infoBox.base} ${theme.infoBox.primary}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className={`font-semibold text-sm ${theme.text.primary}`}>{holiday.nameEn}</p>
                          <p className={`text-xs ${theme.text.muted}`}>{holiday.nameAr}</p>
                          <p className={`text-xs ${theme.text.subtle} mt-1`}>
                            {holiday.date || `${holiday.startDate} - ${holiday.endDate}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={`text-sm ${theme.text.subtle} italic`}>No holidays this month</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

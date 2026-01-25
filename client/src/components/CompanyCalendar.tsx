import { useEffect } from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { useI18n } from '../i18n/i18n'

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
    primary: 'bg-linear-to-r from-[#002855]/18 via-white/40 to-[#E1523E]/14 dark:from-[#002855]/25 dark:via-slate-950/30 dark:to-[#E1523E]/15',
  },
  section: {
    light: 'bg-white/60 dark:bg-slate-950/25',
  },
  infoBox: {
    base: 'p-3 rounded-2xl border',
    primary: 'bg-white/70 border-[#002855]/10 shadow-sm dark:bg-slate-950/35 dark:border-white/10',
    info: 'bg-white/70 border-[#002855]/10 shadow-sm dark:bg-slate-950/35 dark:border-white/10',
  },
  text: {
    primary: 'text-[#002855] dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-200',
    muted: 'text-slate-500 dark:text-slate-300',
    subtle: 'text-slate-500/80 dark:text-slate-400/80',
  },
  icon: {
    teal: 'text-[#002855] dark:text-white',
  },
}

const iconBackgrounds = {
  teal: 'bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25',
}

const borders = {
  base: 'border-[#002855]/10 dark:border-white/10',
}

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

const EMPTY_MONTHS: Month[] = []
const EMPTY_WEEKEND_DAYS: string[] = []

interface Props {
  input?: {
    year?: number
    selectedMonth?: number
    months?: Month[]
    weekendDays?: string[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

export function CompanyCalendar({ input, toolName, toolCallId, addToolResult }: Props) {
  const { locale } = useI18n()
  const year = input?.year || 2026;
  const months = input?.months ?? EMPTY_MONTHS;
  const weekendDays = input?.weekendDays ?? EMPTY_WEEKEND_DAYS;
  
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      const totalHolidays = months.reduce((sum, month) => sum + (month.holidays ?? []).length, 0);
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
          <h2 className={theme.header.title}>
            {locale === 'ar' ? `تقويم الشركة ${year}` : `Company Calendar ${year}`}
          </h2>
          <p className={theme.header.subtitle}>{locale === 'ar' ? 'الإجازات والمناسبات' : 'Holidays & events'}</p>
        </div>
      </div>

      <div className={`mb-6 ${theme.infoBox.base} ${theme.infoBox.info}`}>
        <p className={`text-sm font-medium ${theme.text.secondary}`}>{locale === 'ar' ? 'عطلة نهاية الأسبوع:' : 'Weekend Days:'}</p>
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
                  <p className={`text-xs ${theme.text.muted}`}>
                    {locale === 'ar' ? `هجري: ${month.hijriRangeAr}` : `Hijri: ${month.hijriRangeEn}`}
                  </p>
                  <p className={`text-xs ${theme.text.subtle}`}>{month.hijriRangeAr}</p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 ${theme.section.light}`}>
              <p className={`text-xs ${theme.text.subtle} mb-3`}>
                {locale === 'ar'
                  ? `عدد الأيام: ${month.totalDays} · يبدأ يوم ${month.startsOn}`
                  : `${month.totalDays} days, starts on ${month.startsOn}`}
              </p>
              
              {(month.holidays ?? []).length > 0 ? (
                <div className="space-y-2">
                  {(month.holidays ?? []).map((holiday, idx) => (
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
                <p className={`text-sm ${theme.text.subtle} italic`}>
                  {locale === 'ar' ? 'لا توجد إجازات في هذا الشهر' : 'No holidays this month'}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

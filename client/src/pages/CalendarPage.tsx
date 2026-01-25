import { CompanyCalendar } from '../components/CompanyCalendar'
import { useI18n } from '../i18n/i18n'

export function CalendarPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-12 pb-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002855] dark:text-white sm:text-5xl">{t('calendar.title')}</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{t('calendar.subtitle')}</p>
      </div>

      <CompanyCalendar
        input={{
          year: 2026,
          weekendDays: ['Friday', 'Saturday'],
          months: [
            {
              monthNumber: 1,
              nameEn: 'January',
              nameAr: 'يناير',
              hijriRangeEn: 'Jumada II – Rajab',
              hijriRangeAr: 'جمادى الآخرة – رجب',
              totalDays: 31,
              startsOn: 'Thursday',
              holidays: [{ date: '2026-01-01', nameEn: 'New Year', nameAr: 'رأس السنة' }],
            },
            {
              monthNumber: 2,
              nameEn: 'February',
              nameAr: 'فبراير',
              hijriRangeEn: 'Rajab – Sha’ban',
              hijriRangeAr: 'رجب – شعبان',
              totalDays: 28,
              startsOn: 'Sunday',
              holidays: [],
            },
            {
              monthNumber: 3,
              nameEn: 'March',
              nameAr: 'مارس',
              hijriRangeEn: 'Sha’ban – Ramadan',
              hijriRangeAr: 'شعبان – رمضان',
              totalDays: 31,
              startsOn: 'Sunday',
              holidays: [{ date: '2026-03-11', nameEn: 'Founding Day (sample)', nameAr: 'يوم التأسيس (تجريبي)' }],
            },
          ],
        }}
      />
    </div>
  )
}

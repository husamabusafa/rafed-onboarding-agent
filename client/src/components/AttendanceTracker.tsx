import { useEffect } from 'react'
import { IconClock, IconMapPin, IconCheck, IconX } from '@tabler/icons-react'
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
    success: 'bg-linear-to-r from-[#002855]/20 via-white/40 to-[#E1523E]/15 dark:from-[#002855]/25 dark:via-slate-950/20 dark:to-[#E1523E]/15',
  },
  item: {
    compact:
      'p-3 rounded-2xl border border-[#002855]/10 bg-white shadow-sm transition-all group hover:border-[#E1523E]/25 hover:shadow-md dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-[#E1523E]/30',
  },
  badge: {
    base: 'text-xs px-2 py-1 rounded-full border',
    navy: 'bg-[#002855]/5 text-[#002855] border-[#002855]/10 dark:bg-white/5 dark:text-white dark:border-white/10',
  },
  text: {
    primary: 'text-[#002855] dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-200',
    muted: 'text-slate-500 dark:text-slate-300',
  },
  icon: {
    primary: 'text-[#002855] dark:text-white',
    green: 'text-emerald-700 dark:text-emerald-200',
    muted: 'text-[#002855]/55 dark:text-white/60',
  },
  infoBox: {
    base: 'p-3 rounded-2xl border',
    success: 'bg-white/70 border-[#002855]/10 shadow-sm dark:bg-slate-950/35 dark:border-white/10',
  },
  table: {
    container: 'overflow-x-auto rounded-2xl border border-[#002855]/10 bg-white/70 shadow-sm dark:border-white/10 dark:bg-slate-950/30',
    header: 'border-b border-[#002855]/10 bg-white/70 dark:border-white/10 dark:bg-slate-950/35',
    headerCell: 'text-start py-3 px-4 text-xs font-semibold text-[#002855] dark:text-slate-200',
    body: 'bg-white/60 dark:bg-slate-950/25',
    row: 'border-b border-[#002855]/10 last:border-0 hover:bg-[#E1523E]/5 transition-colors dark:border-white/10 dark:hover:bg-[#E1523E]/10',
    cell: 'py-3 px-4 text-sm',
  },
}

const iconBackgrounds = {
  green: 'bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25',
}

const statusColors = {
  attendance: {
    present: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
    absent: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    late: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    on_leave: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
    remote: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
    PRESENT: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
    ABSENT: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    LATE: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    ON_LEAVE: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
    REMOTE: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  } as Record<string, string>,
}

interface AttendanceHistory {
  date: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: string
}

const EMPTY_RECENT_HISTORY: AttendanceHistory[] = []

interface Props {
  input?: {
    employeeId?: number
    date?: string
    checkInTime?: string
    checkOutTime?: string
    status?: 'present' | 'absent' | 'late' | 'on_leave' | 'remote' | 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE' | 'REMOTE'
    location?: string
    biometricVerified?: boolean
    recentHistory?: AttendanceHistory[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}


export function AttendanceTracker({ input, toolName, toolCallId, addToolResult }: Props) {
  const { t } = useI18n()
  const date = input?.date || '';
  const checkInTime = input?.checkInTime;
  const checkOutTime = input?.checkOutTime;
  const status = input?.status || 'ABSENT';
  const location = input?.location;
  const biometricVerified = input?.biometricVerified || false;
  const recentHistory = input?.recentHistory ?? EMPTY_RECENT_HISTORY;
  
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          currentStatus: status,
          date: date,
          checkInTime: checkInTime,
          checkOutTime: checkOutTime,
          biometricVerified: biometricVerified,
          message: `Attendance status: ${status}${checkInTime ? ` - Checked in at ${checkInTime}` : ''}`
        }
      });
    }
  }, [status, date, checkInTime, checkOutTime, biometricVerified, toolName, toolCallId, addToolResult]);

  return (
    <div className={`${theme.card.base} max-w-4xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBackgrounds.green} ${theme.header.icon}`}>
          <IconClock className={`w-6 h-6 ${theme.icon.green}`} />
        </div>
        <div>
          <h2 className={theme.header.title}>{t('attendance.title')}</h2>
          <p className={theme.header.subtitle}>{t('attendance.subtitle')}</p>
        </div>
      </div>

      <div className={`${theme.gradient.success} rounded-3xl p-6 mb-6 ${theme.infoBox.base} ${theme.infoBox.success}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className={`text-sm ${theme.text.muted}`}>{t('common.todayStatus')}</p>
            <p className={`text-2xl font-bold ${theme.text.primary}`}>{date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme.badge.base} ${statusColors.attendance[status] || statusColors.attendance.ABSENT}`}>
            {status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>{t('common.checkIn')}</p>
            <p className={`text-lg font-bold ${theme.text.primary}`}>{checkInTime || '--:--'}</p>
          </div>
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>{t('common.checkOut')}</p>
            <p className={`text-lg font-bold ${theme.text.primary}`}>{checkOutTime || '--:--'}</p>
          </div>
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>{t('common.location')}</p>
            <div className="flex items-center gap-1">
              <IconMapPin className={`w-4 h-4 ${theme.icon.muted}`} />
              <p className={`text-sm font-medium ${theme.text.primary}`}>{location || t('common.na')}</p>
            </div>
          </div>
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>{t('common.verified')}</p>
            <div className="flex items-center gap-1">
              {biometricVerified ? (
                <><IconCheck className={`w-4 h-4 ${theme.icon.green}`} /><span className={`text-sm font-medium ${theme.text.muted}`}>{t('common.yes')}</span></>
              ) : (
                <><IconX className={`w-4 h-4 ${theme.icon.primary}`} /><span className={`text-sm font-medium ${theme.text.muted}`}>{t('common.no')}</span></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>{t('common.recentHistory')}</h3>
        <div className={theme.table.container}>
          <table className="w-full">
            <thead>
              <tr className={theme.table.header}>
                <th className={theme.table.headerCell}>{t('common.date')}</th>
                <th className={theme.table.headerCell}>{t('common.checkIn')}</th>
                <th className={theme.table.headerCell}>{t('common.checkOut')}</th>
                <th className={theme.table.headerCell}>{t('common.hours')}</th>
                <th className={theme.table.headerCell}>{t('common.status')}</th>
              </tr>
            </thead>
            <tbody className={theme.table.body}>
              {recentHistory.map((record, idx) => (
                <tr key={idx} className={theme.table.row}>
                  <td className={`${theme.table.cell} ${theme.text.primary}`}>{record.date}</td>
                  <td className={`${theme.table.cell} ${theme.text.secondary}`}>{record.checkIn}</td>
                  <td className={`${theme.table.cell} ${theme.text.secondary}`}>{record.checkOut}</td>
                  <td className={`${theme.table.cell} ${theme.text.secondary}`}>{record.hoursWorked}h</td>
                  <td className={theme.table.cell}>
                    <span className={`${theme.badge.base} ${statusColors.attendance[record.status] || theme.badge.navy}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

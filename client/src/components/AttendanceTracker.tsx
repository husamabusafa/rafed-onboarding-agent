import { useEffect } from 'react'
import { IconClock, IconMapPin, IconCheck, IconX } from '@tabler/icons-react'
import { theme, iconBackgrounds, statusColors } from './theme'

interface AttendanceHistory {
  date: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: string
}

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
  addToolResult?: (result: any) => void
}


export function AttendanceTracker({ input, toolName, toolCallId, addToolResult }: Props) {
  const date = input?.date || '';
  const checkInTime = input?.checkInTime;
  const checkOutTime = input?.checkOutTime;
  const status = input?.status || 'ABSENT';
  const location = input?.location;
  const biometricVerified = input?.biometricVerified || false;
  const recentHistory = input?.recentHistory || [];
  
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
          <h2 className={theme.header.title}>Attendance Tracker</h2>
          <p className={theme.header.subtitle}>تتبع الحضور</p>
        </div>
      </div>

      <div className={`${theme.gradient.success} rounded-3xl p-6 mb-6 ${theme.infoBox.base} ${theme.infoBox.success}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className={`text-sm ${theme.text.muted}`}>Today's Status</p>
            <p className={`text-2xl font-bold ${theme.text.primary}`}>{date}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme.badge.base} ${statusColors.attendance[status] || statusColors.attendance.ABSENT}`}>
            {status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>Check In</p>
            <p className={`text-lg font-bold ${theme.text.primary}`}>{checkInTime || '--:--'}</p>
          </div>
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>Check Out</p>
            <p className={`text-lg font-bold ${theme.text.primary}`}>{checkOutTime || '--:--'}</p>
          </div>
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>Location</p>
            <div className="flex items-center gap-1">
              <IconMapPin className={`w-4 h-4 ${theme.icon.muted}`} />
              <p className={`text-sm font-medium ${theme.text.primary}`}>{location || 'N/A'}</p>
            </div>
          </div>
          <div className={theme.item.compact}>
            <p className={`text-xs ${theme.text.muted} mb-1`}>Verified</p>
            <div className="flex items-center gap-1">
              {biometricVerified ? (
                <><IconCheck className={`w-4 h-4 ${theme.icon.green}`} /><span className={`text-sm font-medium ${theme.text.muted}`}>Yes</span></>
              ) : (
                <><IconX className={`w-4 h-4 ${theme.icon.primary}`} /><span className={`text-sm font-medium ${theme.text.muted}`}>No</span></>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className={`text-lg font-semibold ${theme.text.primary} mb-4`}>Recent History</h3>
        <div className={theme.table.container}>
          <table className="w-full">
            <thead>
              <tr className={theme.table.header}>
                <th className={theme.table.headerCell}>Date</th>
                <th className={theme.table.headerCell}>Check In</th>
                <th className={theme.table.headerCell}>Check Out</th>
                <th className={theme.table.headerCell}>Hours</th>
                <th className={theme.table.headerCell}>Status</th>
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

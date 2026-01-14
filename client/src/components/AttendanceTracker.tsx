import { useEffect } from 'react'
import { IconClock, IconCheck, IconX, IconMapPin } from '@tabler/icons-react'

interface AttendanceHistory {
  date: string
  checkIn: string
  checkOut: string
  hoursWorked: number
  status: string
}

interface Props {
  employeeId: number
  date: string
  checkInTime?: string
  checkOutTime?: string
  status: 'present' | 'absent' | 'late' | 'on_leave' | 'remote'
  location?: string
  biometricVerified: boolean
  recentHistory: AttendanceHistory[]
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

const statusColors = {
  present: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  absent: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  late: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  on_leave: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  remote: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

export function AttendanceTracker({ date, checkInTime, checkOutTime, status, location, biometricVerified, recentHistory = [], toolName, toolCallId, addToolResult }: Props) {
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
          <IconClock className="w-6 h-6 text-green-600 dark:text-green-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Tracker</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">تتبع الحضور</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Today's Status</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{date}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Check In</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{checkInTime || '--:--'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Check Out</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{checkOutTime || '--:--'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Biometric</p>
            <div className="flex items-center gap-2">
              {biometricVerified ? (
                <IconCheck className="w-5 h-5 text-green-600" />
              ) : (
                <IconX className="w-5 h-5 text-red-600" />
              )}
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {biometricVerified ? 'Verified' : 'Not Verified'}
              </p>
            </div>
          </div>
          {location && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Location</p>
              <div className="flex items-center gap-1">
                <IconMapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">{location}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Recent History</h3>
      <div className="space-y-2">
        {recentHistory.slice(0, 5).map((record, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{record.date}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{record.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-900 dark:text-white">{record.checkIn} - {record.checkOut}</p>
              <p className="text-sm text-green-600 dark:text-green-400">{record.hoursWorked}h worked</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

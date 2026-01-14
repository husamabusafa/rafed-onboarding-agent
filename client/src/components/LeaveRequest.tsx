import { IconBeach, IconCalendarEvent } from '@tabler/icons-react'

interface Props {
  requestId?: string
  employeeId: number
  leaveType: 'annual' | 'sick' | 'emergency' | 'unpaid' | 'hajj' | 'maternity' | 'paternity' | 'bereavement' | 'study'
  startDate: string
  endDate: string
  totalDays: number
  reason: string
  contactDuringLeave?: string
  remainingBalance?: number
  status: 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'rejected'
  approverComments?: string
}

const leaveTypeLabels = {
  annual: 'Annual Leave',
  sick: 'Sick Leave',
  emergency: 'Emergency Leave',
  unpaid: 'Unpaid Leave',
  hajj: 'Hajj Leave',
  maternity: 'Maternity Leave',
  paternity: 'Paternity Leave',
  bereavement: 'Bereavement Leave',
  study: 'Study Leave',
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  pending_approval: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function LeaveRequest({ leaveType, startDate, endDate, totalDays, reason, contactDuringLeave, remainingBalance, status, approverComments }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-xl">
          <IconBeach className="w-6 h-6 text-teal-600 dark:text-teal-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Request</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">طلب إجازة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Request Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{status.replace('_', ' ').toUpperCase()}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <IconCalendarEvent className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">{leaveTypeLabels[leaveType]}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">End Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Days</p>
                <p className="font-medium text-teal-600 dark:text-teal-400 text-lg">{totalDays} days</p>
              </div>
            </div>

            {remainingBalance !== undefined && (
              <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Remaining Balance</p>
                <p className="text-lg font-bold text-teal-600 dark:text-teal-400">{remainingBalance} days</p>
              </div>
            )}
            
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason</p>
              <p className="font-medium text-gray-900 dark:text-white">{reason}</p>
            </div>

            {contactDuringLeave && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Contact During Leave</p>
                <p className="font-medium text-gray-900 dark:text-white">{contactDuringLeave}</p>
              </div>
            )}

            {approverComments && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approver Comments</p>
                <p className="font-medium text-gray-900 dark:text-white">{approverComments}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

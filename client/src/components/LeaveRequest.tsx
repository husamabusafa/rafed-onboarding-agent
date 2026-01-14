import { useEffect } from 'react'
import { IconBeach, IconCalendarEvent } from '@tabler/icons-react'

interface Props {
  input?: {
    requestId?: string
    employeeId?: number
    leaveType?: 'annual' | 'sick' | 'emergency' | 'unpaid' | 'hajj' | 'maternity' | 'paternity' | 'bereavement' | 'study'
    startDate?: string
    endDate?: string
    totalDays?: number
    reason?: string
    contactDuringLeave?: string
    remainingBalance?: number
    status?: 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'rejected'
    approverComments?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
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
  draft: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  submitted: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  pending_approval: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  approved: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  rejected: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

export function LeaveRequest({ input, toolName, toolCallId, addToolResult }: Props) {
  const leaveType = input?.leaveType ?? 'annual'
  const startDate = input?.startDate ?? ''
  const endDate = input?.endDate ?? ''
  const totalDays = input?.totalDays ?? 0
  const reason = input?.reason ?? ''
  const contactDuringLeave = input?.contactDuringLeave
  const remainingBalance = input?.remainingBalance
  const status = input?.status ?? 'draft'
  const approverComments = input?.approverComments

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          requestStatus: status,
          leaveType: leaveType,
          startDate: startDate,
          endDate: endDate,
          totalDays: totalDays,
          remainingBalance: remainingBalance,
          message: `Leave request: ${status} (${leaveTypeLabels[leaveType]})`,
        },
      })
    }
  }, [leaveType, startDate, endDate, totalDays, reason, contactDuringLeave, remainingBalance, status, approverComments, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconBeach className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Leave Request</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">طلب إجازة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Request Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{status.replace('_', ' ').toUpperCase()}</p>
          </div>
          <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div className="mb-4 flex items-center gap-2">
            <IconCalendarEvent className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
            <h3 className="font-semibold text-[#002855] dark:text-white">{leaveTypeLabels[leaveType]}</h3>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Start Date</p>
                <p className="font-medium text-[#002855] dark:text-white">{startDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">End Date</p>
                <p className="font-medium text-[#002855] dark:text-white">{endDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Days</p>
                <p className="text-lg font-semibold text-[#002855] dark:text-white">{totalDays} days</p>
              </div>
            </div>

            {remainingBalance !== undefined && (
              <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                <p className="text-sm text-slate-500 dark:text-slate-400">Remaining Balance</p>
                <p className="text-lg font-semibold text-[#002855] dark:text-white">{remainingBalance} days</p>
              </div>
            )}
            
            <div>
              <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Reason</p>
              <p className="font-medium text-[#002855] dark:text-white">{reason}</p>
            </div>

            {contactDuringLeave && (
              <div>
                <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Contact During Leave</p>
                <p className="font-medium text-[#002855] dark:text-white">{contactDuringLeave}</p>
              </div>
            )}

            {approverComments && (
              <div className="rounded-2xl border border-[#E1523E]/20 bg-[#E1523E]/10 p-3 shadow-sm dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10">
                <p className="mb-1 text-sm text-slate-600 dark:text-slate-300">Approver Comments</p>
                <p className="font-medium text-[#002855] dark:text-white">{approverComments}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

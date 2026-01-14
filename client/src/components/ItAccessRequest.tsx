import { useEffect } from 'react'
import { IconKey, IconShieldCheck } from '@tabler/icons-react'

interface SystemAccess {
  systemName: string
  accessLevel: 'read_only' | 'standard' | 'power_user' | 'admin'
  justification: string
}

interface ManagerApproval {
  approved?: boolean
  approverName?: string
  approvalDate?: string
  comments?: string
}

interface Props {
  input?: {
    requestId?: string
    employeeId?: number
    systems?: SystemAccess[]
    urgency?: 'standard' | 'high' | 'critical'
    managerApproval?: ManagerApproval
    status?: 'draft' | 'pending_manager_approval' | 'pending_it_review' | 'in_progress' | 'completed' | 'rejected'
    requestedDate?: string
    completionDate?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const accessLevelColors = {
  read_only: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  standard: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  power_user: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  admin: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

const statusColors = {
  draft: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  pending_manager_approval: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  pending_it_review: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  in_progress: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  completed: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  rejected: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

const urgencyColors = {
  standard: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  high: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  critical: 'border border-[#E1523E]/25 bg-[#E1523E]/15 text-[#E1523E] dark:border-[#E1523E]/30 dark:bg-[#E1523E]/15 dark:text-white',
}

const EMPTY_SYSTEMS: SystemAccess[] = []

export function ItAccessRequest({ input, toolName, toolCallId, addToolResult }: Props) {
  const systems = input?.systems ?? EMPTY_SYSTEMS
  const urgency = input?.urgency ?? 'standard'
  const managerApproval = input?.managerApproval
  const status = input?.status ?? 'draft'
  const requestedDate = input?.requestedDate ?? ''
  const completionDate = input?.completionDate

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          requestStatus: status,
          urgency: urgency,
          systemsCount: systems.length,
          requestedDate: requestedDate,
          completionDate: completionDate,
          managerApproval: managerApproval,
          message: `IT access request: ${status} (${systems.length} system(s))`,
        },
      })
    }
  }, [systems, urgency, managerApproval, status, requestedDate, completionDate, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconKey className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">IT Access Request</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">طلب الوصول لأنظمة تقنية المعلومات</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Request Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{status.replace(/_/g, ' ').toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${urgencyColors[urgency]}`}>
              {urgency.toUpperCase()}
            </span>
            <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
              {status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div className="mb-4 flex items-center gap-2">
            <IconShieldCheck className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
            <h3 className="font-semibold text-[#002855] dark:text-white">Requested Systems ({systems.length})</h3>
          </div>
          
          <div className="space-y-3">
            {systems.map((system, idx) => (
              <div key={idx} className="rounded-2xl border border-[#002855]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-[#002855] dark:text-white">{system.systemName}</h4>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${accessLevelColors[system.accessLevel]}`}>
                    {system.accessLevel.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <strong>Justification:</strong> {system.justification}
                </p>
              </div>
            ))}
          </div>
        </div>

        {managerApproval && (
          <div className={`rounded-2xl border p-4 shadow-sm ${
            managerApproval.approved
              ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10'
              : 'border-[#E1523E]/20 bg-[#E1523E]/10 dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10'
          }`}>
            <h3 className="mb-2 font-semibold text-[#002855] dark:text-white">Manager Approval</h3>
            <div className="space-y-2 text-sm">
              {managerApproval.approved !== undefined && (
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${managerApproval.approved ? 'text-emerald-800 dark:text-emerald-200' : 'text-[#E1523E] dark:text-white'}`}>
                    {managerApproval.approved ? '✓ Approved' : '⏳ Pending'}
                  </span>
                </div>
              )}
              {managerApproval.approverName && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Approver:</span> {managerApproval.approverName}
                </div>
              )}
              {managerApproval.approvalDate && (
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Date:</span> {managerApproval.approvalDate}
                </div>
              )}
              {managerApproval.comments && (
                <div className="mt-2 rounded-2xl border border-[#002855]/10 bg-white p-2 dark:border-white/10 dark:bg-slate-950/30">
                  <span className="text-slate-500 dark:text-slate-400">Comments:</span> {managerApproval.comments}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Requested Date:</span>
              <span className="font-medium text-[#002855] dark:text-white">{requestedDate}</span>
            </div>
            {completionDate && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Completion Date:</span>
                <span className="font-medium text-[#002855] dark:text-white">{completionDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

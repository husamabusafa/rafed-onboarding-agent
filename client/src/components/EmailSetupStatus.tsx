import { useEffect } from 'react'
import { IconMail, IconCheck, IconClock, IconX } from '@tabler/icons-react'

interface Props {
  input?: {
    employeeId?: number
    emailAddress?: string
    status?: 'requested' | 'in_progress' | 'created' | 'credentials_sent' | 'activated' | 'failed'
    accountType?: 'standard' | 'admin' | 'service'
    requestDate?: string
    creationDate?: string
    activationDate?: string
    accessGroups?: string[]
    mobileDeviceConfigured?: boolean
    initialPassword?: string
    setupInstructions?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const statusConfig = {
  requested: {
    label: 'Requested',
    color: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
    icon: IconClock,
  },
  in_progress: {
    label: 'In Progress',
    color: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    icon: IconClock,
  },
  created: {
    label: 'Created',
    color: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
    icon: IconCheck,
  },
  credentials_sent: {
    label: 'Credentials Sent',
    color: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
    icon: IconCheck,
  },
  activated: {
    label: 'Activated',
    color: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
    icon: IconCheck,
  },
  failed: {
    label: 'Failed',
    color: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    icon: IconX,
  },
}

const EMPTY_ACCESS_GROUPS: string[] = []

export function EmailSetupStatus({ input, toolName, toolCallId, addToolResult }: Props) {
  const emailAddress = input?.emailAddress
  const status = input?.status ?? 'requested'
  const accountType = input?.accountType ?? 'standard'
  const requestDate = input?.requestDate ?? ''
  const creationDate = input?.creationDate
  const activationDate = input?.activationDate
  const accessGroups = input?.accessGroups ?? EMPTY_ACCESS_GROUPS
  const mobileDeviceConfigured = input?.mobileDeviceConfigured ?? false
  const initialPassword = input?.initialPassword
  const setupInstructions = input?.setupInstructions

  const StatusIcon = statusConfig[status].icon

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          emailStatus: status,
          accountType: accountType,
          emailAddress: emailAddress,
          requestDate: requestDate,
          creationDate: creationDate,
          activationDate: activationDate,
          accessGroupsCount: accessGroups.length,
          mobileDeviceConfigured: mobileDeviceConfigured,
          message: `Email setup: ${statusConfig[status].label}`,
        },
      })
    }
  }, [status, accountType, emailAddress, requestDate, creationDate, activationDate, accessGroups, mobileDeviceConfigured, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconMail className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Email Setup Status</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">حالة إعداد البريد الإلكتروني</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Setup Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{statusConfig[status].label}</p>
          </div>
          <span className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium ${statusConfig[status].color}`}>
            <StatusIcon className="h-5 w-5" />
            {statusConfig[status].label}
          </span>
        </div>

        {emailAddress && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Email Address</p>
            <p className="break-all font-mono text-xl font-bold text-[#002855] dark:text-white">{emailAddress}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Account Type</p>
            <p className="font-medium capitalize text-[#002855] dark:text-white">{accountType}</p>
          </div>

          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Mobile Device</p>
            <div className="flex items-center gap-2">
              {mobileDeviceConfigured ? (
                <>
                  <IconCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  <span className="font-medium text-emerald-700 dark:text-emerald-200">Configured</span>
                </>
              ) : (
                <>
                  <IconX className="h-5 w-5 text-slate-400" />
                  <span className="font-medium text-slate-600 dark:text-slate-300">Not Configured</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Request Date:</span>
              <span className="font-medium text-[#002855] dark:text-white">{requestDate}</span>
            </div>
            {creationDate && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Creation Date:</span>
                <span className="font-medium text-[#002855] dark:text-white">{creationDate}</span>
              </div>
            )}
            {activationDate && (
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Activation Date:</span>
                <span className="font-medium text-[#002855] dark:text-white">{activationDate}</span>
              </div>
            )}
          </div>
        </div>

        {accessGroups.length > 0 && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Access Groups</h3>
            <div className="flex flex-wrap gap-2">
              {accessGroups.map((group, idx) => (
                <span key={idx} className="rounded-full border border-[#002855]/10 bg-white px-3 py-1 text-sm text-[#002855] shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
                  {group}
                </span>
              ))}
            </div>
          </div>
        )}

        {initialPassword && (
          <div className="rounded-2xl border border-[#E1523E]/20 bg-[#E1523E]/10 p-4 shadow-sm dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10">
            <p className="mb-1 text-sm text-slate-600 dark:text-slate-300">Initial Password (Change on first login)</p>
            <p className="font-mono font-bold text-[#002855] dark:text-white">{initialPassword}</p>
          </div>
        )}

        {setupInstructions && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-2 font-semibold text-[#002855] dark:text-white">Setup Instructions</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300">{setupInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}

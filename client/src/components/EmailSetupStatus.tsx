import { IconMail, IconCheck, IconClock, IconX } from '@tabler/icons-react'

interface Props {
  employeeId: number
  emailAddress?: string
  status: 'requested' | 'in_progress' | 'created' | 'credentials_sent' | 'activated' | 'failed'
  accountType: 'standard' | 'admin' | 'service'
  requestDate: string
  creationDate?: string
  activationDate?: string
  accessGroups?: string[]
  mobileDeviceConfigured: boolean
  initialPassword?: string
  setupInstructions?: string
}

const statusConfig = {
  requested: { label: 'Requested', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300', icon: IconClock },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: IconClock },
  created: { label: 'Created', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300', icon: IconCheck },
  credentials_sent: { label: 'Credentials Sent', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300', icon: IconCheck },
  activated: { label: 'Activated', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', icon: IconCheck },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', icon: IconX },
}

export function EmailSetupStatus({ emailAddress, status, accountType, requestDate, creationDate, activationDate, accessGroups = [], mobileDeviceConfigured, initialPassword, setupInstructions }: Props) {
  const StatusIcon = statusConfig[status].icon

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <IconMail className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Setup Status</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">حالة إعداد البريد الإلكتروني</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Setup Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{statusConfig[status].label}</p>
          </div>
          <span className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${statusConfig[status].color}`}>
            <StatusIcon className="w-5 h-5" />
            {statusConfig[status].label}
          </span>
        </div>

        {emailAddress && (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl border-2 border-blue-200 dark:border-blue-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Email Address</p>
            <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400 break-all">{emailAddress}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Account Type</p>
            <p className="font-medium text-gray-900 dark:text-white capitalize">{accountType}</p>
          </div>

          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Mobile Device</p>
            <div className="flex items-center gap-2">
              {mobileDeviceConfigured ? (
                <>
                  <IconCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-600">Configured</span>
                </>
              ) : (
                <>
                  <IconX className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-600 dark:text-gray-400">Not Configured</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Request Date:</span>
              <span className="font-medium text-gray-900 dark:text-white">{requestDate}</span>
            </div>
            {creationDate && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Creation Date:</span>
                <span className="font-medium text-gray-900 dark:text-white">{creationDate}</span>
              </div>
            )}
            {activationDate && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Activation Date:</span>
                <span className="font-medium text-gray-900 dark:text-white">{activationDate}</span>
              </div>
            )}
          </div>
        </div>

        {accessGroups.length > 0 && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Access Groups</h3>
            <div className="flex flex-wrap gap-2">
              {accessGroups.map((group, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {group}
                </span>
              ))}
            </div>
          </div>
        )}

        {initialPassword && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Initial Password (Change on first login)</p>
            <p className="font-mono font-bold text-gray-900 dark:text-white">{initialPassword}</p>
          </div>
        )}

        {setupInstructions && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Setup Instructions</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{setupInstructions}</p>
          </div>
        )}
      </div>
    </div>
  )
}

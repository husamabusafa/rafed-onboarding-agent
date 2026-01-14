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
  requestId?: string
  employeeId: number
  systems: SystemAccess[]
  urgency: 'standard' | 'high' | 'critical'
  managerApproval?: ManagerApproval
  status: 'draft' | 'pending_manager_approval' | 'pending_it_review' | 'in_progress' | 'completed' | 'rejected'
  requestedDate: string
  completionDate?: string
}

const accessLevelColors = {
  read_only: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  standard: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  power_user: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  admin: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  pending_manager_approval: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  pending_it_review: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const urgencyColors = {
  standard: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function ItAccessRequest({ systems = [], urgency, managerApproval, status, requestedDate, completionDate }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
          <IconKey className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">IT Access Request</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">طلب الوصول لأنظمة تقنية المعلومات</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Request Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{status.replace(/_/g, ' ').toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${urgencyColors[urgency]}`}>
              {urgency.toUpperCase()}
            </span>
            <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
              {status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <IconShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Requested Systems ({systems.length})</h3>
          </div>
          
          <div className="space-y-3">
            {systems.map((system, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{system.systemName}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${accessLevelColors[system.accessLevel]}`}>
                    {system.accessLevel.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Justification:</strong> {system.justification}
                </p>
              </div>
            ))}
          </div>
        </div>

        {managerApproval && (
          <div className={`p-4 border rounded-xl ${
            managerApproval.approved 
              ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' 
              : 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700'
          }`}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Manager Approval</h3>
            <div className="space-y-2 text-sm">
              {managerApproval.approved !== undefined && (
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${managerApproval.approved ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                    {managerApproval.approved ? '✓ Approved' : '⏳ Pending'}
                  </span>
                </div>
              )}
              {managerApproval.approverName && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Approver:</span> {managerApproval.approverName}
                </div>
              )}
              {managerApproval.approvalDate && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Date:</span> {managerApproval.approvalDate}
                </div>
              )}
              {managerApproval.comments && (
                <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded">
                  <span className="text-gray-600 dark:text-gray-400">Comments:</span> {managerApproval.comments}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Requested Date:</span>
              <span className="font-medium text-gray-900 dark:text-white">{requestedDate}</span>
            </div>
            {completionDate && (
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Completion Date:</span>
                <span className="font-medium text-gray-900 dark:text-white">{completionDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

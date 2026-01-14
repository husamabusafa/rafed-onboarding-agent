import { IconDeviceLaptop, IconPackage } from '@tabler/icons-react'

interface Approver {
  approver: string
  status: string
  date?: string
}

interface Props {
  requestId?: string
  employeeId: number
  equipmentType: 'laptop' | 'desktop' | 'mobile_phone' | 'tablet' | 'monitor' | 'keyboard' | 'mouse' | 'headset' | 'office_supplies' | 'other'
  quantity: number
  specifications?: string
  justification: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  preferredDeliveryDate?: string
  status: 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'ordered' | 'delivered' | 'rejected'
  approvalChain?: Approver[]
}

const equipmentLabels = {
  laptop: 'Laptop',
  desktop: 'Desktop Computer',
  mobile_phone: 'Mobile Phone',
  tablet: 'Tablet',
  monitor: 'Monitor',
  keyboard: 'Keyboard',
  mouse: 'Mouse',
  headset: 'Headset',
  office_supplies: 'Office Supplies',
  other: 'Other Equipment',
}

const urgencyColors = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  pending_approval: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  ordered: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function EquipmentRequest({ equipmentType, quantity, specifications, justification, urgency, preferredDeliveryDate, status, approvalChain = [] }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
          <IconDeviceLaptop className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Equipment Request</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">طلب معدات</p>
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
            <IconPackage className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">{equipmentLabels[equipmentType]}</h3>
            <span className="ml-auto px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              Qty: {quantity}
            </span>
          </div>
          
          <div className="space-y-3">
            {specifications && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Specifications</p>
                <p className="font-medium text-gray-900 dark:text-white">{specifications}</p>
              </div>
            )}
            
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Justification</p>
              <p className="font-medium text-gray-900 dark:text-white">{justification}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Urgency</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${urgencyColors[urgency]}`}>
                  {urgency.toUpperCase()}
                </span>
              </div>
              {preferredDeliveryDate && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Preferred Delivery</p>
                  <p className="font-medium text-gray-900 dark:text-white mt-1">{preferredDeliveryDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {approvalChain.length > 0 && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Approval Chain</h3>
            <div className="space-y-2">
              {approvalChain.map((approval, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-sm text-gray-900 dark:text-white">{approval.approver}</span>
                  <div className="flex items-center gap-2">
                    {approval.date && <span className="text-xs text-gray-600 dark:text-gray-400">{approval.date}</span>}
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {approval.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

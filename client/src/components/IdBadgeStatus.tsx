import { IconId, IconCheck, IconAlertCircle } from '@tabler/icons-react'

interface Props {
  employeeId: number
  badgeNumber?: string
  status: 'photo_pending' | 'in_production' | 'ready_for_pickup' | 'issued' | 'replacement_requested' | 'lost_reported'
  photoSubmitted: boolean
  productionDate?: string
  issuedDate?: string
  pickupLocation?: string
  accessLevels?: string[]
  expiryDate?: string
}

const statusConfig = {
  photo_pending: { label: 'Photo Pending', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300', icon: IconAlertCircle },
  in_production: { label: 'In Production', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', icon: IconAlertCircle },
  ready_for_pickup: { label: 'Ready for Pickup', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', icon: IconCheck },
  issued: { label: 'Issued', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300', icon: IconCheck },
  replacement_requested: { label: 'Replacement Requested', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', icon: IconAlertCircle },
  lost_reported: { label: 'Lost Reported', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', icon: IconAlertCircle },
}

export function IdBadgeStatus({ badgeNumber, status, photoSubmitted, productionDate, issuedDate, pickupLocation, accessLevels = [], expiryDate }: Props) {
  const StatusIcon = statusConfig[status].icon

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-xl">
          <IconId className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ID Badge Status</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">حالة بطاقة الهوية</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{statusConfig[status].label}</p>
          </div>
          <span className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${statusConfig[status].color}`}>
            <StatusIcon className="w-5 h-5" />
            {statusConfig[status].label}
          </span>
        </div>

        {badgeNumber && (
          <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900 dark:to-blue-900 rounded-xl border-2 border-cyan-200 dark:border-cyan-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Badge Number</p>
            <p className="text-3xl font-mono font-bold text-cyan-600 dark:text-cyan-400">{badgeNumber}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Photo Status</p>
            <div className="flex items-center gap-2">
              {photoSubmitted ? (
                <>
                  <IconCheck className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-600">Submitted</span>
                </>
              ) : (
                <>
                  <IconAlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-yellow-600">Pending</span>
                </>
              )}
            </div>
          </div>

          {pickupLocation && (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pickup Location</p>
              <p className="font-medium text-gray-900 dark:text-white">{pickupLocation}</p>
            </div>
          )}
        </div>

        {(productionDate || issuedDate || expiryDate) && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline</h3>
            <div className="space-y-2 text-sm">
              {productionDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Production Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{productionDate}</span>
                </div>
              )}
              {issuedDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Issued Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{issuedDate}</span>
                </div>
              )}
              {expiryDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Expiry Date:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{expiryDate}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {accessLevels.length > 0 && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Access Levels</h3>
            <div className="flex flex-wrap gap-2">
              {accessLevels.map((level, idx) => (
                <span key={idx} className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-full text-sm">
                  {level}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

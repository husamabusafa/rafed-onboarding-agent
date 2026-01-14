import { useEffect } from 'react'
import { IconId, IconCheck, IconAlertCircle } from '@tabler/icons-react'

interface Props {
  input?: {
    employeeId?: number
    badgeNumber?: string
    status?: 'photo_pending' | 'in_production' | 'ready_for_pickup' | 'issued' | 'replacement_requested' | 'lost_reported'
    photoSubmitted?: boolean
    productionDate?: string
    issuedDate?: string
    pickupLocation?: string
    accessLevels?: string[]
    expiryDate?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const statusConfig = {
  photo_pending: {
    label: 'Photo Pending',
    color: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    icon: IconAlertCircle,
  },
  in_production: {
    label: 'In Production',
    color: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
    icon: IconAlertCircle,
  },
  ready_for_pickup: {
    label: 'Ready for Pickup',
    color: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
    icon: IconCheck,
  },
  issued: {
    label: 'Issued',
    color: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
    icon: IconCheck,
  },
  replacement_requested: {
    label: 'Replacement Requested',
    color: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    icon: IconAlertCircle,
  },
  lost_reported: {
    label: 'Lost Reported',
    color: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
    icon: IconAlertCircle,
  },
}

const EMPTY_ACCESS_LEVELS: string[] = []

export function IdBadgeStatus({ input, toolName, toolCallId, addToolResult }: Props) {
  const badgeNumber = input?.badgeNumber
  const status = input?.status ?? 'photo_pending'
  const photoSubmitted = input?.photoSubmitted ?? false
  const productionDate = input?.productionDate
  const issuedDate = input?.issuedDate
  const pickupLocation = input?.pickupLocation
  const accessLevels = input?.accessLevels ?? EMPTY_ACCESS_LEVELS
  const expiryDate = input?.expiryDate

  const StatusIcon = statusConfig[status].icon

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          badgeStatus: status,
          badgeNumber: badgeNumber,
          photoSubmitted: photoSubmitted,
          accessLevelsCount: accessLevels.length,
          message: `ID badge: ${statusConfig[status].label}`,
        },
      })
    }
  }, [status, badgeNumber, photoSubmitted, productionDate, issuedDate, pickupLocation, accessLevels, expiryDate, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconId className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">ID Badge Status</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">حالة بطاقة الهوية</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Current Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{statusConfig[status].label}</p>
          </div>
          <span className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium ${statusConfig[status].color}`}>
            <StatusIcon className="h-5 w-5" />
            {statusConfig[status].label}
          </span>
        </div>

        {badgeNumber && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
            <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Badge Number</p>
            <p className="text-3xl font-bold text-[#002855] dark:text-white">{badgeNumber}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Photo Status</p>
            <div className="flex items-center gap-2">
              {photoSubmitted ? (
                <>
                  <IconCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  <span className="font-medium text-emerald-700 dark:text-emerald-200">Submitted</span>
                </>
              ) : (
                <>
                  <IconAlertCircle className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
                  <span className="font-medium text-[#E1523E] dark:text-white">Pending</span>
                </>
              )}
            </div>
          </div>

          {pickupLocation && (
            <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
              <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Pickup Location</p>
              <p className="font-medium text-[#002855] dark:text-white">{pickupLocation}</p>
            </div>
          )}
        </div>

        {(productionDate || issuedDate || expiryDate) && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Timeline</h3>
            <div className="space-y-2 text-sm">
              {productionDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Production Date:</span>
                  <span className="font-medium text-[#002855] dark:text-white">{productionDate}</span>
                </div>
              )}
              {issuedDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Issued Date:</span>
                  <span className="font-medium text-[#002855] dark:text-white">{issuedDate}</span>
                </div>
              )}
              {expiryDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Expiry Date:</span>
                  <span className="font-medium text-[#002855] dark:text-white">{expiryDate}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {accessLevels.length > 0 && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Access Levels</h3>
            <div className="flex flex-wrap gap-2">
              {accessLevels.map((level, idx) => (
                <span key={idx} className="rounded-full border border-[#002855]/10 bg-white px-3 py-1 text-sm text-[#002855] shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
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

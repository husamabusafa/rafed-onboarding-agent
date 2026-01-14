import { useEffect } from 'react'
import { IconParking, IconCar } from '@tabler/icons-react'

interface Props {
  input?: {
    requestId?: string
    employeeId?: number
    vehicleType?: 'car' | 'motorcycle' | 'bicycle'
    licensePlate?: string
    vehicleMake?: string
    vehicleModel?: string
    vehicleColor?: string
    preferredLocation?: string
    disabilityAccommodation?: boolean
    startDate?: string
    status?: 'pending' | 'approved' | 'assigned' | 'rejected'
    assignedSpotNumber?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const vehicleIcons = {
  car: '🚗',
  motorcycle: '🏍️',
  bicycle: '🚲',
}

const statusColors = {
  pending: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  approved: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  assigned: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  rejected: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

export function ParkingRequest({ input, toolName, toolCallId, addToolResult }: Props) {
  const vehicleType = input?.vehicleType ?? 'car'
  const licensePlate = input?.licensePlate ?? ''
  const vehicleMake = input?.vehicleMake ?? ''
  const vehicleModel = input?.vehicleModel ?? ''
  const vehicleColor = input?.vehicleColor ?? ''
  const preferredLocation = input?.preferredLocation
  const disabilityAccommodation = input?.disabilityAccommodation ?? false
  const startDate = input?.startDate ?? ''
  const status = input?.status ?? 'pending'
  const assignedSpotNumber = input?.assignedSpotNumber

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          requestStatus: status,
          vehicleType: vehicleType,
          licensePlate: licensePlate,
          assignedSpotNumber: assignedSpotNumber,
          startDate: startDate,
          disabilityAccommodation: disabilityAccommodation,
          message: `Parking request: ${status}`,
        },
      })
    }
  }, [vehicleType, licensePlate, vehicleMake, vehicleModel, vehicleColor, preferredLocation, disabilityAccommodation, startDate, status, assignedSpotNumber, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconParking className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Parking Request</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">طلب موقف سيارة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Request Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{status.toUpperCase()}</p>
          </div>
          <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {assignedSpotNumber && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
            <div className="flex items-center gap-3">
              <IconCar className="h-8 w-8 text-[#E1523E] dark:text-[#E1523E]" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Assigned Parking Spot</p>
                <p className="text-3xl font-semibold text-[#002855] dark:text-white">#{assignedSpotNumber}</p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{vehicleIcons[vehicleType]}</span>
            <div>
              <h3 className="font-semibold capitalize text-[#002855] dark:text-white">{vehicleType}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{vehicleMake} {vehicleModel}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">License Plate</p>
                <p className="text-lg font-bold text-[#002855] dark:text-white">{licensePlate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Color</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-6 w-6 rounded-full border border-[#002855]/10 dark:border-white/10" style={{ backgroundColor: vehicleColor.toLowerCase() }} />
                  <p className="font-medium capitalize text-[#002855] dark:text-white">{vehicleColor}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Start Date</p>
              <p className="font-medium text-[#002855] dark:text-white">{startDate}</p>
            </div>

            {preferredLocation && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Preferred Location</p>
                <p className="font-medium text-[#002855] dark:text-white">{preferredLocation}</p>
              </div>
            )}

            {disabilityAccommodation && (
              <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                <p className="text-sm font-medium text-[#002855] dark:text-white">♿ Disability Accommodation Requested</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

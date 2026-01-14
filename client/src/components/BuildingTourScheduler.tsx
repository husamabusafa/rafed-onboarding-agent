import { useEffect } from 'react'
import { IconBuildingSkyscraper, IconMapPin, IconClock } from '@tabler/icons-react'

interface TourStop {
  location: string
  description: string
  estimatedTime: number
}

interface Props {
  input?: {
    tourId?: string
    employeeId?: number
    employeeLevel?: 'executive_14_19' | 'staff_1_13'
    tourDate?: string
    tourTime?: string
    duration?: number
    tourType?: 'full_building' | 'department_only' | 'facilities_only' | 'executive'
    meetingPoint?: string
    tourGuide?: string
    status?: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
    stops?: TourStop[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const statusColors = {
  scheduled: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  confirmed: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  completed: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  cancelled: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  rescheduled: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

const tourTypeLabels = {
  full_building: 'Full Building Tour',
  department_only: 'Department Only',
  facilities_only: 'Facilities Only',
  executive: 'Executive Tour',
}

const EMPTY_STOPS: TourStop[] = []

export function BuildingTourScheduler({ input, toolName, toolCallId, addToolResult }: Props) {
  const employeeLevel = input?.employeeLevel ?? 'staff_1_13'
  const tourDate = input?.tourDate ?? ''
  const tourTime = input?.tourTime ?? ''
  const duration = input?.duration ?? 0
  const tourType = input?.tourType ?? 'full_building'
  const meetingPoint = input?.meetingPoint ?? ''
  const tourGuide = input?.tourGuide
  const status = input?.status ?? 'scheduled'
  const stops = input?.stops ?? EMPTY_STOPS

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          tourStatus: status,
          tourType: tourType,
          tourDate: tourDate,
          tourTime: tourTime,
          duration: duration,
          meetingPoint: meetingPoint,
          tourGuide: tourGuide,
          stopsCount: stops.length,
          message: `Building tour: ${status} (${tourTypeLabels[tourType]})`,
        },
      })
    }
  }, [employeeLevel, tourDate, tourTime, duration, tourType, meetingPoint, tourGuide, status, stops, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconBuildingSkyscraper className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Building Tour</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">جولة في المبنى</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tour Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{status.toUpperCase()}</p>
          </div>
          <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tour Type</p>
              <p className="text-lg font-semibold text-[#002855] dark:text-white">{tourTypeLabels[tourType]}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <IconClock className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Date & Time</p>
                  <p className="font-medium text-[#002855] dark:text-white">{tourDate}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{tourTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
                <p className="text-lg font-semibold text-[#002855] dark:text-white">{duration} min</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <IconMapPin className="mt-0.5 h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Meeting Point</p>
                <p className="font-medium text-[#002855] dark:text-white">{meetingPoint}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Employee Level</p>
            <p className="font-medium text-[#002855] dark:text-white">
              {employeeLevel === 'executive_14_19' ? 'Executive (14-19)' : 'Staff (1-13)'}
            </p>
          </div>

          {tourGuide && (
            <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
              <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Tour Guide</p>
              <p className="font-medium text-[#002855] dark:text-white">{tourGuide}</p>
            </div>
          )}
        </div>

        {stops.length > 0 && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Tour Stops</h3>
            <div className="space-y-3">
              {stops.map((stop, idx) => (
                <div key={idx} className="flex gap-3 rounded-2xl border border-[#002855]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#002855] to-[#E1523E] text-sm font-bold text-white">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#002855] dark:text-white">{stop.location}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{stop.description}</p>
                    <p className="mt-1 text-xs text-[#E1523E] dark:text-[#E1523E]">{stop.estimatedTime} minutes</p>
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

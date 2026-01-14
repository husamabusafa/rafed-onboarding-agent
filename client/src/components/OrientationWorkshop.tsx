import { useEffect } from 'react'
import { IconSchool, IconUsers, IconCalendar } from '@tabler/icons-react'

interface Props {
  input?: {
    workshopId?: string
    title?: {
      ar: string
      en: string
    }
    description?: {
      ar: string
      en: string
    }
    workshopType?: 'company_introduction' | 'policies_procedures' | 'cybersecurity' | 'hr_systems' | 'department_specific' | 'leadership_orientation'
    date?: string
    startTime?: string
    endTime?: string
    location?: string
    facilitator?: string
    maxAttendees?: number
    currentAttendees?: number
    isRequired?: boolean
    targetAudience?: 'all_new_employees' | 'executives' | 'staff' | 'specific_department'
    registrationStatus?: 'open' | 'full' | 'closed'
    employeeRegistered?: boolean
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const workshopTypeLabels = {
  company_introduction: 'Company Introduction',
  policies_procedures: 'Policies & Procedures',
  cybersecurity: 'Cybersecurity',
  hr_systems: 'HR Systems',
  department_specific: 'Department Specific',
  leadership_orientation: 'Leadership Orientation',
}

const registrationStatusColors = {
  open: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  full: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  closed: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
}

const EMPTY_TEXT = { ar: '', en: '' }

export function OrientationWorkshop({ input, toolName, toolCallId, addToolResult }: Props) {
  const title = input?.title ?? EMPTY_TEXT
  const description = input?.description ?? EMPTY_TEXT
  const workshopType = input?.workshopType ?? 'company_introduction'
  const date = input?.date ?? ''
  const startTime = input?.startTime ?? ''
  const endTime = input?.endTime ?? ''
  const location = input?.location ?? ''
  const facilitator = input?.facilitator ?? ''
  const maxAttendees = input?.maxAttendees ?? 0
  const currentAttendees = input?.currentAttendees ?? 0
  const isRequired = input?.isRequired ?? false
  const targetAudience = input?.targetAudience ?? 'all_new_employees'
  const registrationStatus = input?.registrationStatus ?? 'open'
  const employeeRegistered = input?.employeeRegistered ?? false

  const spotsRemaining = maxAttendees - currentAttendees
  const capacityPercentage = maxAttendees > 0 ? (currentAttendees / maxAttendees) * 100 : 0

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          workshopType: workshopType,
          registrationStatus: registrationStatus,
          isRequired: isRequired,
          employeeRegistered: employeeRegistered,
          currentAttendees: currentAttendees,
          maxAttendees: maxAttendees,
          capacityPercentage: capacityPercentage,
          message: `Workshop: ${workshopTypeLabels[workshopType]} (${registrationStatus})`,
        },
      })
    }
  }, [title, description, workshopType, date, startTime, endTime, location, facilitator, maxAttendees, currentAttendees, isRequired, targetAudience, registrationStatus, employeeRegistered, capacityPercentage, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconSchool className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Orientation Workshop</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">ورشة التوجيه</p>
        </div>
        {isRequired && (
          <span className="rounded-full border border-[#E1523E]/20 bg-[#E1523E]/10 px-3 py-1 text-sm font-medium text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white">
            Required
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
          <h3 className="mb-2 text-xl font-semibold text-[#002855] dark:text-white">{title.en}</h3>
          <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">{title.ar}</p>
          <span className="mt-2 inline-block rounded-full border border-[#002855]/10 bg-[#002855]/5 px-3 py-1 text-xs font-medium text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white">
            {workshopTypeLabels[workshopType]}
          </span>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">{description.en}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{description.ar}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <div className="flex items-center gap-2 mb-2">
              <IconCalendar className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Date & Time</p>
            </div>
            <p className="font-semibold text-[#002855] dark:text-white">{date}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{startTime} - {endTime}</p>
          </div>

          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Location</p>
            <p className="font-medium text-[#002855] dark:text-white">{location}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Facilitator: {facilitator}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <IconUsers className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
              <span className="font-medium text-[#002855] dark:text-white">Capacity</span>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${registrationStatusColors[registrationStatus]}`}>
              {registrationStatus.toUpperCase()}
            </span>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500 dark:text-slate-400">{currentAttendees} / {maxAttendees} Registered</span>
              <span className="text-slate-500 dark:text-slate-400">{spotsRemaining} spots left</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#002855]/10 dark:bg-white/10">
              <div 
                className="h-full bg-linear-to-r from-[#002855] to-[#E1523E] transition-all"
                style={{ width: `${capacityPercentage}%` }}
              />
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Target Audience: <span className="font-medium">{targetAudience.replace('_', ' ')}</span>
          </p>
        </div>

        {employeeRegistered ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-500/25 dark:bg-emerald-500/10">
            <p className="font-medium text-emerald-800 dark:text-emerald-200">✓ You are registered for this workshop</p>
          </div>
        ) : registrationStatus === 'open' ? (
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#002855] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#001f44]">
            Register Now
          </button>
        ) : (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 text-center shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="text-slate-500 dark:text-slate-400">Registration {registrationStatus}</p>
          </div>
        )}
      </div>
    </div>
  )
}

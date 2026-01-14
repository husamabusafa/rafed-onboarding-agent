import { IconSchool, IconUsers, IconCalendar } from '@tabler/icons-react'

interface Props {
  workshopId: string
  title: {
    ar: string
    en: string
  }
  description: {
    ar: string
    en: string
  }
  workshopType: 'company_introduction' | 'policies_procedures' | 'cybersecurity' | 'hr_systems' | 'department_specific' | 'leadership_orientation'
  date: string
  startTime: string
  endTime: string
  location: string
  facilitator: string
  maxAttendees: number
  currentAttendees: number
  isRequired: boolean
  targetAudience: 'all_new_employees' | 'executives' | 'staff' | 'specific_department'
  registrationStatus: 'open' | 'full' | 'closed'
  employeeRegistered: boolean
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
  open: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  full: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  closed: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
}

export function OrientationWorkshop({ title, description, workshopType, date, startTime, endTime, location, facilitator, maxAttendees, currentAttendees, isRequired, targetAudience, registrationStatus, employeeRegistered }: Props) {
  const spotsRemaining = maxAttendees - currentAttendees
  const capacityPercentage = (currentAttendees / maxAttendees) * 100

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-xl">
          <IconSchool className="w-6 h-6 text-teal-600 dark:text-teal-300" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orientation Workshop</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">ورشة التوجيه</p>
        </div>
        {isRequired && (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
            Required
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900 rounded-xl border border-teal-200 dark:border-teal-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title.en}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title.ar}</p>
          <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-300 rounded-full text-xs font-medium mt-2">
            {workshopTypeLabels[workshopType]}
          </span>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{description.en}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description.ar}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <IconCalendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Date & Time</p>
            </div>
            <p className="font-bold text-gray-900 dark:text-white">{date}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{startTime} - {endTime}</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
            <p className="font-medium text-gray-900 dark:text-white">{location}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Facilitator: {facilitator}</p>
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <IconUsers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="font-medium text-gray-900 dark:text-white">Capacity</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${registrationStatusColors[registrationStatus]}`}>
              {registrationStatus.toUpperCase()}
            </span>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">{currentAttendees} / {maxAttendees} Registered</span>
              <span className="text-gray-600 dark:text-gray-400">{spotsRemaining} spots left</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-600 dark:bg-teal-400 transition-all"
                style={{ width: `${capacityPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Target Audience: <span className="font-medium">{targetAudience.replace('_', ' ')}</span>
          </p>
        </div>

        {employeeRegistered ? (
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-700">
            <p className="text-green-700 dark:text-green-300 font-medium">✓ You are registered for this workshop</p>
          </div>
        ) : registrationStatus === 'open' ? (
          <button className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Register Now
          </button>
        ) : (
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center">
            <p className="text-gray-600 dark:text-gray-400">Registration {registrationStatus}</p>
          </div>
        )}
      </div>
    </div>
  )
}

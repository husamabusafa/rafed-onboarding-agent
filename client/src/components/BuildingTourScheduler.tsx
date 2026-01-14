import { IconBuildingSkyscraper, IconMapPin, IconClock } from '@tabler/icons-react'

interface TourStop {
  location: string
  description: string
  estimatedTime: number
}

interface Props {
  tourId?: string
  employeeId: number
  employeeLevel: 'executive_14_19' | 'staff_1_13'
  tourDate: string
  tourTime: string
  duration: number
  tourType: 'full_building' | 'department_only' | 'facilities_only' | 'executive'
  meetingPoint: string
  tourGuide?: string
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  stops?: TourStop[]
}

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  completed: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  rescheduled: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
}

const tourTypeLabels = {
  full_building: 'Full Building Tour',
  department_only: 'Department Only',
  facilities_only: 'Facilities Only',
  executive: 'Executive Tour',
}

export function BuildingTourScheduler({ employeeLevel, tourDate, tourTime, duration, tourType, meetingPoint, tourGuide, status, stops = [] }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
          <IconBuildingSkyscraper className="w-6 h-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Building Tour</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">جولة في المبنى</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tour Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{status.toUpperCase()}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl border border-purple-200 dark:border-purple-700">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tour Type</p>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{tourTypeLabels[tourType]}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <IconClock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Date & Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{tourDate}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{tourTime}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{duration} min</p>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <IconMapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Meeting Point</p>
                <p className="font-medium text-gray-900 dark:text-white">{meetingPoint}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Employee Level</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {employeeLevel === 'executive_14_19' ? 'Executive (14-19)' : 'Staff (1-13)'}
            </p>
          </div>

          {tourGuide && (
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tour Guide</p>
              <p className="font-medium text-gray-900 dark:text-white">{tourGuide}</p>
            </div>
          )}
        </div>

        {stops.length > 0 && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tour Stops</h3>
            <div className="space-y-3">
              {stops.map((stop, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{stop.location}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stop.description}</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">{stop.estimatedTime} minutes</p>
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

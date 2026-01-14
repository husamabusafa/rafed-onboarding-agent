import { IconParking, IconCar } from '@tabler/icons-react'

interface Props {
  requestId?: string
  employeeId: number
  vehicleType: 'car' | 'motorcycle' | 'bicycle'
  licensePlate: string
  vehicleMake: string
  vehicleModel: string
  vehicleColor: string
  preferredLocation?: string
  disabilityAccommodation: boolean
  startDate: string
  status: 'pending' | 'approved' | 'assigned' | 'rejected'
  assignedSpotNumber?: string
}

const vehicleIcons = {
  car: '🚗',
  motorcycle: '🏍️',
  bicycle: '🚲',
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  assigned: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

export function ParkingRequest({ vehicleType, licensePlate, vehicleMake, vehicleModel, vehicleColor, preferredLocation, disabilityAccommodation, startDate, status, assignedSpotNumber }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <IconParking className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Parking Request</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">طلب موقف سيارة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Request Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{status.toUpperCase()}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        {assignedSpotNumber && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-xl border-2 border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-3">
              <IconCar className="w-8 h-8 text-blue-600 dark:text-blue-300" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Assigned Parking Spot</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">#{assignedSpotNumber}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{vehicleIcons[vehicleType]}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{vehicleType}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{vehicleMake} {vehicleModel}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">License Plate</p>
                <p className="font-mono font-bold text-gray-900 dark:text-white text-lg">{licensePlate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Color</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600" style={{ backgroundColor: vehicleColor.toLowerCase() }} />
                  <p className="font-medium text-gray-900 dark:text-white capitalize">{vehicleColor}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{startDate}</p>
            </div>

            {preferredLocation && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Preferred Location</p>
                <p className="font-medium text-gray-900 dark:text-white">{preferredLocation}</p>
              </div>
            )}

            {disabilityAccommodation && (
              <div className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-200">♿ Disability Accommodation Requested</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

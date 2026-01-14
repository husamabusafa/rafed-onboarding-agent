import { IconClockHour4, IconCircleCheck, IconAlertCircle } from '@tabler/icons-react'

interface Milestone {
  name: string
  dueDate: string
  completed: boolean
  completedDate?: string
  notes?: string
}

interface Evaluation {
  evaluationType: '30_day' | '60_day' | '90_day' | 'final'
  scheduledDate: string
  completedDate?: string
  evaluator: string
  rating?: number
  comments?: string
}

interface Props {
  employeeId: number
  startDate: string
  endDate: string
  duration: number
  currentDay: number
  progressPercentage: number
  status: 'active' | 'extended' | 'completed' | 'terminated'
  milestones: Milestone[]
  evaluations: Evaluation[]
  nextEvaluationDate?: string
}

const statusColors = {
  active: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  extended: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  completed: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  terminated: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

const evaluationTypeLabels = {
  '30_day': '30-Day Review',
  '60_day': '60-Day Review',
  '90_day': '90-Day Review',
  'final': 'Final Review',
}

export function ProbationTracker({ startDate, endDate, duration, currentDay, progressPercentage, status, milestones = [], evaluations = [], nextEvaluationDate }: Props) {
  const daysRemaining = duration - currentDay

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
          <IconClockHour4 className="w-6 h-6 text-amber-600 dark:text-amber-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Probation Period Tracker</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">متابعة فترة التجربة</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900 dark:to-orange-900 rounded-xl border border-amber-200 dark:border-amber-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Probation Status</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{status.toUpperCase()}</p>
            </div>
            <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
              {status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Start Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{startDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">End Date</p>
              <p className="font-medium text-gray-900 dark:text-white">{endDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
              <p className="font-medium text-gray-900 dark:text-white">{duration} days</p>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700 dark:text-gray-300">Day {currentDay} of {duration}</span>
              <span className="text-gray-700 dark:text-gray-300">{daysRemaining} days remaining</span>
            </div>
            <div className="h-3 bg-white dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{progressPercentage}%</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">Complete</span>
            </div>
          </div>
        </div>

        {nextEvaluationDate && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
              📅 Next Evaluation: {nextEvaluationDate}
            </p>
          </div>
        )}

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Milestones</h3>
          <div className="space-y-3">
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${
                milestone.completed 
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' 
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}>
                <div className="flex items-start gap-3">
                  {milestone.completed ? (
                    <IconCircleCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  ) : (
                    <IconAlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 dark:text-white">{milestone.name}</h4>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Due: {milestone.dueDate}</span>
                    </div>
                    {milestone.completedDate && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">Completed: {milestone.completedDate}</p>
                    )}
                    {milestone.notes && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{milestone.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Evaluations</h3>
          <div className="space-y-3">
            {evaluations.map((evaluation, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${
                evaluation.completedDate 
                  ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700' 
                  : 'bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{evaluationTypeLabels[evaluation.evaluationType]}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Evaluator: {evaluation.evaluator}</p>
                  </div>
                  {evaluation.rating && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= evaluation.rating! ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{evaluation.rating}/5</p>
                    </div>
                  )}
                </div>
                
                <div className="text-sm space-y-1">
                  <p className="text-gray-700 dark:text-gray-300">
                    Scheduled: {evaluation.scheduledDate}
                  </p>
                  {evaluation.completedDate ? (
                    <p className="text-green-600 dark:text-green-400">
                      ✓ Completed: {evaluation.completedDate}
                    </p>
                  ) : (
                    <p className="text-yellow-600 dark:text-yellow-400">
                      ⏳ Pending
                    </p>
                  )}
                </div>

                {evaluation.comments && (
                  <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{evaluation.comments}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

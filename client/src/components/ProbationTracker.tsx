import { useEffect } from 'react'
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
  input?: {
    employeeId?: number
    startDate?: string
    endDate?: string
    duration?: number
    currentDay?: number
    progressPercentage?: number
    status?: 'active' | 'extended' | 'completed' | 'terminated'
    milestones?: Milestone[]
    evaluations?: Evaluation[]
    nextEvaluationDate?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const statusColors = {
  active: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  extended: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  completed: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  terminated: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

const evaluationTypeLabels = {
  '30_day': '30-Day Review',
  '60_day': '60-Day Review',
  '90_day': '90-Day Review',
  'final': 'Final Review',
}

const EMPTY_MILESTONES: Milestone[] = []
const EMPTY_EVALUATIONS: Evaluation[] = []

export function ProbationTracker({ input, toolName, toolCallId, addToolResult }: Props) {
  const startDate = input?.startDate ?? ''
  const endDate = input?.endDate ?? ''
  const duration = input?.duration ?? 0
  const currentDay = input?.currentDay ?? 0
  const progressPercentage = input?.progressPercentage ?? 0
  const status = input?.status ?? 'active'
  const milestones = input?.milestones ?? EMPTY_MILESTONES
  const evaluations = input?.evaluations ?? EMPTY_EVALUATIONS
  const nextEvaluationDate = input?.nextEvaluationDate

  const daysRemaining = duration - currentDay

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          probationStatus: status,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
          currentDay: currentDay,
          progressPercentage: progressPercentage,
          milestonesCount: milestones.length,
          evaluationsCount: evaluations.length,
          nextEvaluationDate: nextEvaluationDate,
          message: `Probation: ${status} (${progressPercentage}% complete)`,
        },
      })
    }
  }, [startDate, endDate, duration, currentDay, progressPercentage, status, milestones, evaluations, nextEvaluationDate, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-4xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconClockHour4 className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Probation Period Tracker</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">متابعة فترة التجربة</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Probation Status</p>
              <p className="text-2xl font-semibold text-[#002855] dark:text-white">{status.toUpperCase()}</p>
            </div>
            <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
              {status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Start Date</p>
              <p className="font-medium text-[#002855] dark:text-white">{startDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">End Date</p>
              <p className="font-medium text-[#002855] dark:text-white">{endDate}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Duration</p>
              <p className="font-medium text-[#002855] dark:text-white">{duration} days</p>
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-700 dark:text-slate-300">Day {currentDay} of {duration}</span>
              <span className="text-slate-700 dark:text-slate-300">{daysRemaining} days remaining</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#002855]/10 dark:bg-white/10">
              <div 
                className="h-full bg-linear-to-r from-[#002855] to-[#E1523E] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-semibold text-[#002855] dark:text-white">{progressPercentage}%</span>
              <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">Complete</span>
            </div>
          </div>
        </div>

        {nextEvaluationDate && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <p className="text-sm font-medium text-[#002855] dark:text-white">
              📅 Next Evaluation: {nextEvaluationDate}
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-4 font-semibold text-[#002855] dark:text-white">Milestones</h3>
          <div className="space-y-3">
            {milestones.map((milestone, idx) => (
              <div key={idx} className={`rounded-2xl border p-3 shadow-sm ${
                milestone.completed 
                  ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10' 
                  : 'border-[#002855]/10 bg-white dark:border-white/10 dark:bg-slate-950/30'
              }`}>
                <div className="flex items-start gap-3">
                  {milestone.completed ? (
                    <IconCircleCheck className="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                  ) : (
                    <IconAlertCircle className="mt-0.5 h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-[#002855] dark:text-white">{milestone.name}</h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Due: {milestone.dueDate}</span>
                    </div>
                    {milestone.completedDate && (
                      <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-200">Completed: {milestone.completedDate}</p>
                    )}
                    {milestone.notes && (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{milestone.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-4 font-semibold text-[#002855] dark:text-white">Performance Evaluations</h3>
          <div className="space-y-3">
            {evaluations.map((evaluation, idx) => (
              <div key={idx} className={`rounded-2xl border p-4 shadow-sm ${
                evaluation.completedDate 
                  ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10' 
                  : 'border-[#E1523E]/20 bg-[#E1523E]/10 dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-[#002855] dark:text-white">{evaluationTypeLabels[evaluation.evaluationType]}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Evaluator: {evaluation.evaluator}</p>
                  </div>
                  {evaluation.rating && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= evaluation.rating! ? 'text-[#E1523E]' : 'text-slate-300 dark:text-slate-600'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{evaluation.rating}/5</p>
                    </div>
                  )}
                </div>
                
                <div className="text-sm space-y-1">
                  <p className="text-slate-700 dark:text-slate-300">
                    Scheduled: {evaluation.scheduledDate}
                  </p>
                  {evaluation.completedDate ? (
                    <p className="text-emerald-700 dark:text-emerald-200">
                      ✓ Completed: {evaluation.completedDate}
                    </p>
                  ) : (
                    <p className="text-[#E1523E] dark:text-white">
                      ⏳ Pending
                    </p>
                  )}
                </div>

                {evaluation.comments && (
                  <div className="mt-3 rounded-2xl border border-[#002855]/10 bg-white p-3 dark:border-white/10 dark:bg-slate-950/30">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{evaluation.comments}</p>
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

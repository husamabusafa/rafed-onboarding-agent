import { useEffect } from 'react'
import { IconChecklist, IconCircleCheck, IconClock, IconAlertCircle } from '@tabler/icons-react'

interface Task {
  taskId: number
  stage: string
  taskAr: string
  taskEn: string
  responsibleParty: string
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  dueDate?: string
  completedDate?: string
  priority: 'high' | 'medium' | 'low'
}

interface Props {
  employeeId: number
  onboardingStage: 'pre_joining' | 'first_day' | 'post_joining'
  tasks: Task[]
  progressPercentage: number
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

interface CustomToolUIRenderProps {
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

const statusConfig = {
  pending: { icon: IconClock, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-700' },
  in_progress: { icon: IconClock, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900' },
  completed: { icon: IconCircleCheck, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900' },
  blocked: { icon: IconAlertCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900' },
}

export function OnboardingTaskTracker({ onboardingStage, tasks = [], progressPercentage, toolName, toolCallId, addToolResult }: Props) {
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          stage: onboardingStage,
          totalTasks: tasks.length,
          completedTasks: completedTasks,
          progressPercentage: progressPercentage,
          message: `Onboarding progress: ${progressPercentage}% (${completedTasks}/${tasks.length} tasks completed)`
        }
      });
    }
  }, [onboardingStage, tasks.length, progressPercentage, toolName, toolCallId, addToolResult]);

  const stageName = onboardingStage.replace('_', ' ').toUpperCase()
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
          <IconChecklist className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Onboarding Tasks</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">مهام التهيئة</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{progressPercentage}%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Complete</p>
        </div>
      </div>

      <div className="mb-6 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Current Stage: <span className="text-indigo-600 dark:text-indigo-400">{stageName}</span></p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.map((task) => {
          const StatusIcon = statusConfig[task.status].icon
          
          return (
            <div key={task.taskId} className={`p-4 rounded-xl border ${statusConfig[task.status].bg} border-gray-200 dark:border-gray-700`}>
              <div className="flex items-start gap-3">
                <StatusIcon className={`w-5 h-5 ${statusConfig[task.status].color} mt-0.5`} />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{task.taskEn}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{task.taskAr}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded">Stage: {task.stage}</span>
                    <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded">{task.responsibleParty}</span>
                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

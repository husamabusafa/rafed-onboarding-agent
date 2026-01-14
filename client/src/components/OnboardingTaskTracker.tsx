import { useEffect } from 'react'
import { IconChecklist, IconClock, IconCircleCheck, IconAlertCircle } from '@tabler/icons-react'
import { theme, iconBackgrounds } from './theme'

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
  input?: {
    employeeId?: number
    onboardingStage?: 'pre_joining' | 'first_day' | 'post_joining'
    tasks?: Task[]
    progressPercentage?: number
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

const statusConfig: Record<string, any> = {
  pending: { icon: IconClock, color: theme.icon.muted, bg: theme.badge.navy },
  PENDING: { icon: IconClock, color: theme.icon.muted, bg: theme.badge.navy },
  in_progress: { icon: IconClock, color: theme.icon.teal, bg: theme.badge.teal },
  IN_PROGRESS: { icon: IconClock, color: theme.icon.teal, bg: theme.badge.teal },
  completed: { icon: IconCircleCheck, color: theme.icon.green, bg: theme.badge.green },
  COMPLETED: { icon: IconCircleCheck, color: theme.icon.green, bg: theme.badge.green },
  blocked: { icon: IconAlertCircle, color: theme.icon.primary, bg: theme.badge.primary },
  BLOCKED: { icon: IconAlertCircle, color: theme.icon.primary, bg: theme.badge.primary },
}

export function OnboardingTaskTracker({ input, toolName, toolCallId, addToolResult }: Props) {
  const onboardingStage = input?.onboardingStage || 'pre_joining';
  const tasks = input?.tasks || [];
  const progressPercentage = input?.progressPercentage || 0;
  
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
  }, [onboardingStage, tasks, progressPercentage, toolName, toolCallId, addToolResult]);

  const stageName = onboardingStage.replace('_', ' ').toUpperCase()
  
  return (
    <div className={`${theme.card.base} max-w-4xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBackgrounds.primary} ${theme.header.icon}`}>
          <IconChecklist className={`w-6 h-6 ${theme.icon.primary}`} />
        </div>
        <div className="flex-1">
          <h2 className={theme.header.title}>Onboarding Tasks</h2>
          <p className={theme.header.subtitle}>مهام التأهيل</p>
        </div>
        <div className="text-right">
          <p className={`text-3xl font-bold ${theme.icon.primary}`}>{progressPercentage}%</p>
          <p className={`text-xs ${theme.text.muted}`}>Complete</p>
        </div>
      </div>

      <div className={`mb-6 h-3 ${theme.section.light} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${theme.gradient.primary} transition-all duration-500`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className={`mb-4 ${theme.infoBox.base} ${theme.infoBox.primary}`}>
        <p className={`text-sm font-medium ${theme.text.primary}`}>Current Stage: <span className={theme.text.muted}>{stageName}</span></p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.map((task: Task) => {
          const StatusIcon = statusConfig[task.status].icon
          
          return (
            <div key={task.taskId} className={theme.item.compact}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${iconBackgrounds[task.status === 'completed' ? 'green' : task.status === 'blocked' ? 'primary' : task.status === 'in_progress' ? 'teal' : 'navy']}`}>
                  <StatusIcon className={`w-5 h-5 ${statusConfig[task.status].color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme.text.primary}`}>{task.taskEn}</h3>
                  <p className={`text-sm ${theme.text.subtle}`}>{task.taskAr}</p>
                  <div className={`flex items-center gap-3 mt-2 text-xs ${theme.text.muted}`}>
                    <span className={`px-2 py-1 ${theme.badge.base} ${theme.badge.navy} rounded`}>Stage: {task.stage}</span>
                    <span className={`px-2 py-1 ${theme.badge.base} ${theme.badge.teal} rounded`}>{task.responsibleParty}</span>
                    {task.dueDate && <span>Due: {task.dueDate}</span>}
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${theme.badge.base} ${
                  task.priority === 'high' ? theme.badge.primary :
                  task.priority === 'medium' ? theme.badge.gold :
                  theme.badge.navy
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

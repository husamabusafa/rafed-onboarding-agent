import { useEffect, type ComponentType } from 'react'
import { IconChecklist, IconClock, IconCircleCheck, IconAlertCircle } from '@tabler/icons-react'

const theme = {
  card: {
    base: 'rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15',
  },
  header: {
    icon: 'p-3 rounded-2xl',
    title: 'text-2xl font-semibold tracking-tight text-[#002855] dark:text-white',
    subtitle: 'text-sm text-slate-500 dark:text-slate-400',
  },
  gradient: {
    primary: 'bg-linear-to-r from-[#002855]/30 via-[#002855]/15 to-[#E1523E]/25 dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/20',
  },
  section: {
    light: 'bg-white/60 dark:bg-slate-950/25',
  },
  item: {
    compact:
      'p-3 rounded-2xl border border-[#002855]/10 bg-white shadow-sm transition-all group hover:border-[#E1523E]/25 hover:shadow-md dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-[#E1523E]/30',
  },
  badge: {
    base: 'text-xs px-2 py-1 rounded-full border',
    primary: 'bg-[#E1523E]/10 text-[#E1523E] border-[#E1523E]/20 dark:bg-[#E1523E]/10 dark:text-white dark:border-[#E1523E]/25',
    navy: 'bg-[#002855]/5 text-[#002855] border-[#002855]/10 dark:bg-white/5 dark:text-white dark:border-white/10',
    teal: 'bg-white text-[#002855] border-[#002855]/10 dark:bg-slate-950/30 dark:text-white dark:border-white/10',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/25',
    gold: 'bg-white text-slate-700 border-[#002855]/10 dark:bg-slate-950/30 dark:text-slate-200 dark:border-white/10',
  },
  text: {
    primary: 'text-[#002855] dark:text-white',
    muted: 'text-slate-500 dark:text-slate-300',
    subtle: 'text-slate-500/80 dark:text-slate-400/80',
  },
  icon: {
    primary: 'text-[#002855] dark:text-white',
    teal: 'text-[#002855]/70 dark:text-white/70',
    green: 'text-emerald-700 dark:text-emerald-200',
    muted: 'text-[#002855]/55 dark:text-white/60',
  },
  infoBox: {
    base: 'p-3 rounded-2xl border',
    primary: 'bg-white/70 border-[#002855]/10 shadow-sm dark:bg-slate-950/35 dark:border-white/10',
  },
}

const iconBackgrounds = {
  primary: 'bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25',
  navy: 'bg-[#002855]/10 dark:bg-white/10',
  teal: 'bg-[#E1523E]/10 dark:bg-[#E1523E]/15',
  green: 'bg-emerald-500/10 dark:bg-emerald-500/15',
}

type StatusConfigEntry = {
  icon: ComponentType<{ className?: string }>
  color: string
  bg: string
}

interface Task {
  taskId: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  status: 'pending' | 'PENDING' | 'in_progress' | 'IN_PROGRESS' | 'completed' | 'COMPLETED' | 'blocked' | 'BLOCKED'
  dueDate: string
  owner: string
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
  addToolResult?: (result: unknown) => void
}

const statusConfig: Record<string, StatusConfigEntry> = {
  pending: { icon: IconClock, color: theme.icon.muted, bg: theme.badge.navy },
  PENDING: { icon: IconClock, color: theme.icon.muted, bg: theme.badge.navy },
  in_progress: { icon: IconClock, color: theme.icon.teal, bg: theme.badge.teal },
  IN_PROGRESS: { icon: IconClock, color: theme.icon.teal, bg: theme.badge.teal },
  completed: { icon: IconCircleCheck, color: theme.icon.green, bg: theme.badge.green },
  COMPLETED: { icon: IconCircleCheck, color: theme.icon.green, bg: theme.badge.green },
  blocked: { icon: IconAlertCircle, color: theme.icon.primary, bg: theme.badge.primary },
  BLOCKED: { icon: IconAlertCircle, color: theme.icon.primary, bg: theme.badge.primary },
}

const EMPTY_TASKS: Task[] = []

export function OnboardingTaskTracker({ input, toolName, toolCallId, addToolResult }: Props) {
  const onboardingStage = input?.onboardingStage || 'pre_joining';
  const tasks = input?.tasks ?? EMPTY_TASKS;
  const progressPercentage = input?.progressPercentage || 0;
  
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      const completedTasks = tasks.filter((t) => t.status.toLowerCase() === 'completed').length;
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
          const normalizedStatus = task.status.toLowerCase() as 'pending' | 'in_progress' | 'completed' | 'blocked'
          const StatusIcon = statusConfig[task.status].icon
          
          return (
            <div key={task.taskId} className={theme.item.compact}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${iconBackgrounds[normalizedStatus === 'completed' ? 'green' : normalizedStatus === 'blocked' ? 'primary' : normalizedStatus === 'in_progress' ? 'teal' : 'navy']}`}>
                  <StatusIcon className={`w-5 h-5 ${statusConfig[task.status].color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${theme.text.primary}`}>{task.titleEn}</h3>
                  <p className={`text-sm ${theme.text.subtle}`}>{task.titleAr}</p>
                  <div className={`flex items-center gap-3 mt-2 text-xs ${theme.text.muted}`}>
                    <span className={`${theme.badge.base} ${theme.badge.navy}`}>{task.owner}</span>
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

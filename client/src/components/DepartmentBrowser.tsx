import { useEffect } from 'react'
import { IconBuilding, IconUsers } from '@tabler/icons-react'

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
    primary: 'bg-linear-to-r from-[#002855]/18 via-white/40 to-[#E1523E]/14 dark:from-[#002855]/25 dark:via-slate-950/30 dark:to-[#E1523E]/15',
  },
  item: {
    compact:
      'p-3 rounded-2xl border border-[#002855]/10 bg-white shadow-sm transition-all group hover:border-[#E1523E]/25 hover:shadow-md dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-[#E1523E]/30',
  },
  badge: {
    base: 'text-xs px-2 py-1 rounded-full border',
    teal: 'bg-[#002855]/5 text-[#002855] border-[#002855]/10 dark:bg-white/5 dark:text-white dark:border-white/10',
  },
  text: {
    primary: 'text-[#002855] dark:text-white',
    secondary: 'text-slate-700 dark:text-slate-200',
    muted: 'text-slate-500 dark:text-slate-300',
    subtle: 'text-slate-500/80 dark:text-slate-400/80',
  },
  icon: {
    secondary: 'text-[#002855] dark:text-white',
    muted: 'text-[#002855]/55 dark:text-white/60',
  },
  section: {
    light: 'bg-white/60 dark:bg-slate-950/25',
  },
}

const iconBackgrounds = {
  navy: 'bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25',
}

const borders = {
  base: 'border-[#002855]/10 dark:border-white/10',
}

interface Department {
  nameAr: string
  nameEn: string
  headCount: number
  manager?: string
  region: string
}

interface Division {
  nameAr: string
  nameEn: string
  departments: Department[]
}

const EMPTY_DIVISIONS: Division[] = []

interface Props {
  input?: {
    selectedDivision?: string
    divisions?: Division[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

export function DepartmentBrowser({ input, toolName, toolCallId, addToolResult }: Props) {
  const divisions = input?.divisions ?? EMPTY_DIVISIONS;

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      const totalDepartments = divisions.reduce((sum, div) => sum + div.departments.length, 0);
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          divisionsCount: divisions.length,
          totalDepartments: totalDepartments,
          divisions: divisions,
          message: `Showing ${divisions.length} division(s) with ${totalDepartments} department(s)`
        }
      });
    }
  }, [divisions, toolName, toolCallId, addToolResult]);

  return (
    <div className={`${theme.card.base} max-w-4xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBackgrounds.navy} ${theme.header.icon}`}>
          <IconBuilding className={`w-6 h-6 ${theme.icon.secondary}`} />
        </div>
        <div>
          <h2 className={theme.header.title}>Department Browser</h2>
          <p className={theme.header.subtitle}>متصفح الأقسام</p>
        </div>
      </div>

      <div className="space-y-4">
        {divisions?.map((division, idx) => (
          <div key={idx} className={`${borders.base} rounded-3xl overflow-hidden`}>
            <div className={`${theme.gradient.primary} p-4 ${borders.base} border-b`}>
              <h3 className={`text-lg font-bold ${theme.text.primary}`}>{division.nameEn}</h3>
              <p className={`text-sm ${theme.text.muted}`}>{division.nameAr}</p>
            </div>
            
            <div className={`p-4 ${theme.section.light} space-y-3`}>
              {(division.departments ?? []).map((dept, deptIdx) => (
                <div key={deptIdx} className={theme.item.compact}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-semibold ${theme.text.primary}`}>{dept.nameEn}</h4>
                      <p className={`text-xs ${theme.text.subtle}`}>{dept.nameAr}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <IconUsers className={`w-4 h-4 ${theme.icon.muted} mx-auto mb-1`} />
                        <p className={`text-xs font-medium ${theme.text.secondary}`}>{dept.headCount}</p>
                      </div>
                      {dept.manager && (
                        <div className="text-right">
                          <p className={`text-xs ${theme.text.subtle}`}>Manager</p>
                          <p className={`text-xs font-medium ${theme.text.primary}`}>{dept.manager}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`${theme.badge.base} ${theme.badge.teal}`}>
                      {dept.region}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

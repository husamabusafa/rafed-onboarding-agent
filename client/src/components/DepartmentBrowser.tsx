import { useState, useEffect } from 'react'
import { IconBuilding, IconUsers } from '@tabler/icons-react'
import { theme, iconBackgrounds, borders } from './theme'

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

interface Props {
  input?: {
    selectedDivision?: string
    divisions?: Division[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

export function DepartmentBrowser({ input, toolName, toolCallId, addToolResult }: Props) {
  const divisions = input?.divisions || [];
  const [expandedDivisions] = useState<Set<number>>(new Set());

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
        {divisions.map((division, idx) => (
          <div key={idx} className={`${borders.base} rounded-3xl overflow-hidden`}>
            <div className={`${theme.gradient.primary} p-4 ${borders.base} border-b`}>
              <h3 className={`text-lg font-bold ${theme.text.primary}`}>{division.nameEn}</h3>
              <p className={`text-sm ${theme.text.muted}`}>{division.nameAr}</p>
            </div>
            
            <div className={`p-4 ${theme.section.light} space-y-3`}>
              {division.departments.map((dept, deptIdx) => (
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

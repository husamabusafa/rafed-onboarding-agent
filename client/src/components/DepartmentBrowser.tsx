import { IconBuilding, IconUsers, IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import { useState, useEffect } from 'react'

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
  selectedDivision?: string
  divisions: Division[]
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

export function DepartmentBrowser({ divisions = [], toolName, toolCallId, addToolResult }: Props) {
  const [expandedDivisions, setExpandedDivisions] = useState<Set<number>>(new Set())

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
          message: `Showing ${divisions.length} division(s) with ${totalDepartments} department(s)`
        }
      });
    }
  }, [divisions.length, toolName, toolCallId, addToolResult]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
          <IconBuilding className="w-6 h-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Department Browser</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">متصفح الأقسام</p>
        </div>
      </div>

      <div className="space-y-6">
        {divisions.map((division, idx) => (
          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{division.nameEn}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{division.nameAr}</p>
            </div>
            
            <div className="p-4 space-y-3">
              {division.departments.map((dept, deptIdx) => (
                <div key={deptIdx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{dept.nameEn}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{dept.nameAr}</p>
                    {dept.manager && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Manager: {dept.manager}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full font-medium">
                      {dept.region}
                    </span>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <IconUsers className="w-4 h-4" />
                      <span className="text-sm font-medium">{dept.headCount}</span>
                    </div>
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

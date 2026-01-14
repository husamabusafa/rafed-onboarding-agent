import { useEffect } from 'react'
import { IconSearch, IconUser, IconMail, IconPhone, IconBuilding } from '@tabler/icons-react'
import { theme, iconBackgrounds, borders } from './theme'

interface Employee {
  empId: number
  nameAr: string
  nameEn: string
  positionAr: string
  positionEn: string
  department: string
  division: string
  region: string
  email: string
  mobile: string
}

interface Props {
  input?: {
    searchQuery?: string
    filters?: {
      department?: string
      region?: string
      division?: string
    }
    employees?: Employee[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

export function EmployeeDirectory({ input, toolName, toolCallId, addToolResult }: Props) {
  const employees = input?.employees || [];
  const searchQuery = input?.searchQuery || '';
  
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          employeeCount: employees.length,
          searchQuery: searchQuery,
          employees: employees,
          message: `Showing ${employees.length} employee(s)`
        }
      });
    }
  }, [employees, searchQuery, toolName, toolCallId, addToolResult]);
  return (
    <div className={`${theme.card.base} max-w-4xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`${iconBackgrounds.primary} ${theme.header.icon}`}>
          <IconUser className={`w-6 h-6 ${theme.icon.primary}`} />
        </div>
        <div>
          <h2 className={theme.header.title}>Employee Directory</h2>
          <p className={theme.header.subtitle}>دليل الموظفين</p>
        </div>
      </div>

      {searchQuery && (
        <div className={`mb-4 ${theme.infoBox.base} ${theme.infoBox.primary}`}>
          <p className={`text-sm ${theme.text.secondary}`}>Search results for: <strong>{searchQuery}</strong></p>
        </div>
      )}

      <div className="mb-4 relative">
        <IconSearch className={`absolute left-3 top-3 w-5 h-5 ${theme.icon.muted}`} />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          readOnly
          className={`w-full pl-10 pr-4 py-3 ${borders.base} rounded-xl ${theme.section.light} ${theme.text.primary}`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.slice(0, 10).map((emp) => (
          <div key={emp.empId} className={theme.item.base}>
            <div className="flex items-start gap-3">
              <div className={`p-2 ${iconBackgrounds.primary} rounded-xl shrink-0`}>
                <IconUser className={`w-5 h-5 ${theme.icon.primary}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold ${theme.text.primary} text-sm`}>{emp.nameEn}</h3>
                <p className={`text-xs ${theme.text.subtle} mt-1`}>{emp.nameAr}</p>
                <p className={`text-xs ${theme.text.muted} font-medium mt-1`}>{emp.positionEn}</p>
                <p className={`text-xs ${theme.text.subtle} mt-1`}>{emp.positionAr}</p>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className={`${theme.badge.base} ${theme.badge.teal}`}>
                    <IconBuilding className="w-3 h-3 inline mr-1" />
                    {emp.department}
                  </span>
                  {emp.division && (
                    <span className={`${theme.badge.base} ${theme.badge.green}`}>
                      {emp.division}
                    </span>
                  )}
                </div>
                
                <div className="mt-3 space-y-1">
                  <div className={`flex items-center gap-2 text-xs ${theme.text.muted}`}>
                    <IconMail className="w-3 h-3" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${theme.text.muted}`}>
                    <IconPhone className="w-3 h-3" />
                    <span>{emp.mobile}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length > 10 && (
        <div className={`mt-6 ${theme.infoBox.base} ${theme.infoBox.info} text-center`}>
          <p className={`text-sm ${theme.text.muted}`}>
            Showing 10 of {employees.length} employees
          </p>
        </div>
      )}
    </div>
  )
}

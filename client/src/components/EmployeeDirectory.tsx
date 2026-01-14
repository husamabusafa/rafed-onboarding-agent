import { useEffect } from 'react'
import { IconSearch, IconUser, IconMail, IconPhone, IconBuilding } from '@tabler/icons-react'

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
  searchQuery?: string
  filters?: {
    department?: string
    region?: string
    division?: string
  }
  employees: Employee[]
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: any) => void
}

export function EmployeeDirectory({ searchQuery = '', employees = [], toolName, toolCallId, addToolResult }: Props) {
  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          employeeCount: employees.length,
          searchQuery: searchQuery,
          message: `Showing ${employees.length} employee(s)`
        }
      });
    }
  }, [employees.length, searchQuery, toolName, toolCallId, addToolResult]);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <IconUser className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Directory</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">دليل الموظفين</p>
        </div>
      </div>

      <div className="mb-4 relative">
        <IconSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchQuery}
          readOnly
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {employees.slice(0, 10).map((emp) => (
          <div key={emp.empId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{emp.nameEn}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{emp.nameAr}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{emp.positionEn}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                {emp.region}
              </span>
            </div>
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <IconBuilding className="w-4 h-4" />
                <span>{emp.department}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <IconMail className="w-4 h-4" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <IconPhone className="w-4 h-4" />
                <span>{emp.mobile}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length > 10 && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Showing 10 of {employees.length} employees
        </p>
      )}
    </div>
  )
}

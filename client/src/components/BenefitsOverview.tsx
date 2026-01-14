import { IconGift, IconCreditCard, IconBeach, IconHeartbeat } from '@tabler/icons-react'

interface Allowance {
  type: string
  amount: number
}

interface LeaveEntitlement {
  leaveType: string
  annualAllocation: number
  used: number
  remaining: number
}

interface Props {
  employeeId: number
  salary?: {
    basicSalary: number
    allowances: Allowance[]
    totalPackage: number
  }
  medicalInsurance?: {
    provider: string
    policyNumber?: string
    coverage: 'employee_only' | 'employee_and_dependents'
    dependentsCount: number
    startDate: string
    endDate: string
    cardIssued: boolean
  }
  leaveEntitlements: LeaveEntitlement[]
  additionalBenefits?: Array<{
    benefitName: string
    description: string
    eligibility?: string
  }>
  performanceReview?: {
    cycle: string
    nextReviewDate?: string
  }
}

export function BenefitsOverview({ salary, medicalInsurance, leaveEntitlements = [], additionalBenefits = [], performanceReview }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
          <IconGift className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Benefits Overview</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">نظرة عامة على المزايا</p>
        </div>
      </div>

      <div className="space-y-6">
        {salary && (
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900 dark:to-teal-900 rounded-xl border border-emerald-200 dark:border-emerald-700">
            <div className="flex items-center gap-2 mb-4">
              <IconCreditCard className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Compensation Package</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Basic Salary</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  SAR {salary.basicSalary.toLocaleString()}
                </span>
              </div>

              {salary.allowances.length > 0 && (
                <div className="pt-3 border-t border-emerald-200 dark:border-emerald-700">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Allowances</p>
                  {salary.allowances.map((allowance, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600 dark:text-gray-400">{allowance.type}</span>
                      <span className="font-medium text-gray-900 dark:text-white">SAR {allowance.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-emerald-200 dark:border-emerald-700 flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">Total Package</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  SAR {salary.totalPackage.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {medicalInsurance && (
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <IconHeartbeat className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Medical Insurance</h3>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Provider</p>
                  <p className="font-medium text-gray-900 dark:text-white">{medicalInsurance.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Coverage</p>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {medicalInsurance.coverage.replace('_', ' ')}
                  </p>
                </div>
              </div>

              {medicalInsurance.policyNumber && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Policy Number</p>
                  <p className="font-mono font-medium text-gray-900 dark:text-white">{medicalInsurance.policyNumber}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Period</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {medicalInsurance.startDate} - {medicalInsurance.endDate}
                  </p>
                </div>
                {medicalInsurance.dependentsCount > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dependents</p>
                    <p className="font-medium text-gray-900 dark:text-white">{medicalInsurance.dependentsCount}</p>
                  </div>
                )}
              </div>

              <div className={`p-3 rounded-lg ${medicalInsurance.cardIssued ? 'bg-green-50 dark:bg-green-900/30' : 'bg-yellow-50 dark:bg-yellow-900/30'}`}>
                <p className={`text-sm font-medium ${medicalInsurance.cardIssued ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                  {medicalInsurance.cardIssued ? '✓ Insurance Card Issued' : '⏳ Insurance Card Pending'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <IconBeach className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Leave Entitlements</h3>
          </div>

          <div className="space-y-3">
            {leaveEntitlements.map((leave, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{leave.leaveType}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {leave.remaining} of {leave.annualAllocation} days remaining
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 dark:bg-blue-400"
                    style={{ width: `${(leave.used / leave.annualAllocation) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {additionalBenefits.length > 0 && (
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Additional Benefits</h3>
            <div className="space-y-3">
              {additionalBenefits.map((benefit, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white">{benefit.benefitName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{benefit.description}</p>
                  {benefit.eligibility && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      Eligibility: {benefit.eligibility}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {performanceReview && (
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Review</h3>
            <div className="text-sm">
              <p className="text-gray-700 dark:text-gray-300">Cycle: <span className="font-medium">{performanceReview.cycle}</span></p>
              {performanceReview.nextReviewDate && (
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Next Review: <span className="font-medium">{performanceReview.nextReviewDate}</span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

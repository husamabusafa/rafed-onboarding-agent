import { useEffect } from 'react'
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
  input?: {
    employeeId?: number
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
    leaveEntitlements?: LeaveEntitlement[]
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
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const EMPTY_LEAVE_ENTITLEMENTS: LeaveEntitlement[] = []
const EMPTY_ADDITIONAL_BENEFITS: Array<{ benefitName: string; description: string; eligibility?: string }> = []

export function BenefitsOverview({ input, toolName, toolCallId, addToolResult }: Props) {
  const salary = input?.salary
  const medicalInsurance = input?.medicalInsurance
  const leaveEntitlements = input?.leaveEntitlements ?? EMPTY_LEAVE_ENTITLEMENTS
  const additionalBenefits = input?.additionalBenefits ?? EMPTY_ADDITIONAL_BENEFITS
  const performanceReview = input?.performanceReview

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          hasSalary: Boolean(salary),
          hasMedicalInsurance: Boolean(medicalInsurance),
          leaveEntitlementsCount: leaveEntitlements.length,
          additionalBenefitsCount: additionalBenefits.length,
          performanceReview: performanceReview,
          message: `Benefits overview: ${leaveEntitlements.length} leave entitlement(s)`,
        },
      })
    }
  }, [salary, medicalInsurance, leaveEntitlements, additionalBenefits, performanceReview, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-4xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconGift className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Benefits Overview</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">نظرة عامة على المزايا</p>
        </div>
      </div>

      <div className="space-y-6">
        {salary && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
            <div className="mb-4 flex items-center gap-2">
              <IconCreditCard className="h-6 w-6 text-[#E1523E] dark:text-[#E1523E]" />
              <h3 className="text-lg font-semibold text-[#002855] dark:text-white">Compensation Package</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-700 dark:text-slate-300">Basic Salary</span>
                <span className="text-xl font-semibold text-[#002855] dark:text-white">
                  SAR {salary.basicSalary.toLocaleString()}
                </span>
              </div>

              {salary.allowances.length > 0 && (
                <div className="pt-3 border-t border-[#002855]/10 dark:border-white/10">
                  <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Allowances</p>
                  {salary.allowances.map((allowance, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span className="text-slate-500 dark:text-slate-400">{allowance.type}</span>
                      <span className="font-medium text-[#002855] dark:text-white">SAR {allowance.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-[#002855]/10 dark:border-white/10">
                <span className="font-semibold text-[#002855] dark:text-white">Total Package</span>
                <span className="text-2xl font-semibold text-[#002855] dark:text-white">
                  SAR {salary.totalPackage.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {medicalInsurance && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <div className="mb-4 flex items-center gap-2">
              <IconHeartbeat className="h-6 w-6 text-[#E1523E] dark:text-[#E1523E]" />
              <h3 className="text-lg font-semibold text-[#002855] dark:text-white">Medical Insurance</h3>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Provider</p>
                  <p className="font-medium text-[#002855] dark:text-white">{medicalInsurance.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Coverage</p>
                  <p className="font-medium text-[#002855] dark:text-white capitalize">
                    {medicalInsurance.coverage.replace('_', ' ')}
                  </p>
                </div>
              </div>

              {medicalInsurance.policyNumber && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Policy Number</p>
                  <p className="font-mono font-medium text-[#002855] dark:text-white">{medicalInsurance.policyNumber}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Period</p>
                  <p className="text-sm font-medium text-[#002855] dark:text-white">
                    {medicalInsurance.startDate} - {medicalInsurance.endDate}
                  </p>
                </div>
                {medicalInsurance.dependentsCount > 0 && (
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Dependents</p>
                    <p className="font-medium text-[#002855] dark:text-white">{medicalInsurance.dependentsCount}</p>
                  </div>
                )}
              </div>

              <div className={`rounded-2xl border p-3 shadow-sm ${medicalInsurance.cardIssued ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-500/25 dark:bg-emerald-500/10' : 'border-[#E1523E]/20 bg-[#E1523E]/10 dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10'}`}>
                <p className={`text-sm font-medium ${medicalInsurance.cardIssued ? 'text-emerald-800 dark:text-emerald-200' : 'text-[#E1523E] dark:text-white'}`}>
                  {medicalInsurance.cardIssued ? '✓ Insurance Card Issued' : '⏳ Insurance Card Pending'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div className="mb-4 flex items-center gap-2">
            <IconBeach className="h-6 w-6 text-[#E1523E] dark:text-[#E1523E]" />
            <h3 className="text-lg font-semibold text-[#002855] dark:text-white">Leave Entitlements</h3>
          </div>

          <div className="space-y-3">
            {leaveEntitlements.map((leave, idx) => (
              <div key={idx} className="rounded-2xl border border-[#002855]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-[#002855] dark:text-white">{leave.leaveType}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {leave.remaining} of {leave.annualAllocation} days remaining
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#002855]/10 dark:bg-white/10">
                  <div 
                    className="h-full bg-linear-to-r from-[#002855] to-[#E1523E]"
                    style={{ width: `${(leave.used / leave.annualAllocation) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {additionalBenefits.length > 0 && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-4 text-lg font-semibold text-[#002855] dark:text-white">Additional Benefits</h3>
            <div className="space-y-3">
              {additionalBenefits.map((benefit, idx) => (
                <div key={idx} className="rounded-2xl border border-[#002855]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                  <h4 className="font-medium text-[#002855] dark:text-white">{benefit.benefitName}</h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{benefit.description}</p>
                  {benefit.eligibility && (
                    <p className="mt-2 text-xs text-[#E1523E] dark:text-[#E1523E]">
                      Eligibility: {benefit.eligibility}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {performanceReview && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-2 font-semibold text-[#002855] dark:text-white">Performance Review</h3>
            <div className="text-sm">
              <p className="text-slate-700 dark:text-slate-300">Cycle: <span className="font-medium">{performanceReview.cycle}</span></p>
              {performanceReview.nextReviewDate && (
                <p className="mt-1 text-slate-700 dark:text-slate-300">
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

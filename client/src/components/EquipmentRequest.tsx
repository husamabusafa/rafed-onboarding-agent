import { useEffect } from 'react'
import { IconDeviceLaptop, IconPackage } from '@tabler/icons-react'

interface Approver {
  approver: string
  status: string
  date?: string
}

interface Props {
  input?: {
    requestId?: string
    employeeId?: number
    equipmentType?: 'laptop' | 'desktop' | 'mobile_phone' | 'tablet' | 'monitor' | 'keyboard' | 'mouse' | 'headset' | 'office_supplies' | 'other'
    quantity?: number
    specifications?: string
    justification?: string
    urgency?: 'low' | 'medium' | 'high' | 'critical'
    preferredDeliveryDate?: string
    status?: 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'ordered' | 'delivered' | 'rejected'
    approvalChain?: Approver[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const equipmentLabels = {
  laptop: 'Laptop',
  desktop: 'Desktop Computer',
  mobile_phone: 'Mobile Phone',
  tablet: 'Tablet',
  monitor: 'Monitor',
  keyboard: 'Keyboard',
  mouse: 'Mouse',
  headset: 'Headset',
  office_supplies: 'Office Supplies',
  other: 'Other Equipment',
}

const urgencyColors = {
  low: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  medium: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  high: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  critical: 'border border-[#E1523E]/25 bg-[#E1523E]/15 text-[#E1523E] dark:border-[#E1523E]/30 dark:bg-[#E1523E]/15 dark:text-white',
}

const statusColors = {
  draft: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  submitted: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  pending_approval: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  approved: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  ordered: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  delivered: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  rejected: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
}

const EMPTY_APPROVAL_CHAIN: Approver[] = []

export function EquipmentRequest({ input, toolName, toolCallId, addToolResult }: Props) {
  const equipmentType = input?.equipmentType ?? 'other'
  const quantity = input?.quantity ?? 1
  const specifications = input?.specifications
  const justification = input?.justification ?? ''
  const urgency = input?.urgency ?? 'low'
  const preferredDeliveryDate = input?.preferredDeliveryDate
  const status = input?.status ?? 'draft'
  const approvalChain = input?.approvalChain ?? EMPTY_APPROVAL_CHAIN

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          requestStatus: status,
          equipmentType: equipmentType,
          quantity: quantity,
          urgency: urgency,
          approvalSteps: approvalChain.length,
          message: `Equipment request: ${status} (${equipmentLabels[equipmentType]})`,
        },
      })
    }
  }, [equipmentType, quantity, specifications, justification, urgency, preferredDeliveryDate, status, approvalChain, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconDeviceLaptop className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Equipment Request</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">طلب معدات</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Request Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{status.replace('_', ' ').toUpperCase()}</p>
          </div>
          <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div className="mb-4 flex items-center gap-2">
            <IconPackage className="h-5 w-5 text-[#E1523E] dark:text-[#E1523E]" />
            <h3 className="font-semibold text-[#002855] dark:text-white">{equipmentLabels[equipmentType]}</h3>
            <span className="ml-auto rounded-full border border-[#002855]/10 bg-white px-3 py-1 text-sm font-medium text-[#002855] shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
              Qty: {quantity}
            </span>
          </div>
          
          <div className="space-y-3">
            {specifications && (
              <div>
                <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Specifications</p>
                <p className="font-medium text-[#002855] dark:text-white">{specifications}</p>
              </div>
            )}
            
            <div>
              <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Justification</p>
              <p className="font-medium text-[#002855] dark:text-white">{justification}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Urgency</p>
                <span className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${urgencyColors[urgency]}`}>
                  {urgency.toUpperCase()}
                </span>
              </div>
              {preferredDeliveryDate && (
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Preferred Delivery</p>
                  <p className="mt-1 font-medium text-[#002855] dark:text-white">{preferredDeliveryDate}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {approvalChain.length > 0 && (
          <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
            <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Approval Chain</h3>
            <div className="space-y-2">
              {approvalChain.map((approval, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                  <span className="text-sm text-[#002855] dark:text-white">{approval.approver}</span>
                  <div className="flex items-center gap-2">
                    {approval.date && <span className="text-xs text-slate-500 dark:text-slate-400">{approval.date}</span>}
                    <span className="rounded-full border border-[#002855]/10 bg-[#002855]/5 px-2 py-1 text-xs text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white">
                      {approval.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

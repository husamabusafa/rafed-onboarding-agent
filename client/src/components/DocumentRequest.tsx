import { useEffect } from 'react'
import { IconFile, IconSend } from '@tabler/icons-react'

interface Props {
  input?: {
    requestId?: string
    employeeId?: number
    documentType?: 'employment_certificate' | 'salary_certificate' | 'contract_copy' | 'id_letter' | 'experience_letter' | 'other'
    purpose?: string
    deliveryMethod?: 'email' | 'printed' | 'both'
    urgency?: 'normal' | 'urgent'
    additionalNotes?: string
    status?: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'completed'
    submittedDate?: string
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const docTypeLabels = {
  employment_certificate: 'Employment Certificate',
  salary_certificate: 'Salary Certificate',
  contract_copy: 'Contract Copy',
  id_letter: 'ID Letter',
  experience_letter: 'Experience Letter',
  other: 'Other',
}

const statusColors = {
  draft: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  submitted: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  in_review: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  approved: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  rejected: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  completed: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
}

export function DocumentRequest({ input, toolName, toolCallId, addToolResult }: Props) {
  const documentType = input?.documentType ?? 'other'
  const purpose = input?.purpose ?? ''
  const deliveryMethod = input?.deliveryMethod ?? 'email'
  const urgency = input?.urgency ?? 'normal'
  const additionalNotes = input?.additionalNotes
  const status = input?.status ?? 'draft'
  const submittedDate = input?.submittedDate

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          requestStatus: status,
          documentType: documentType,
          deliveryMethod: deliveryMethod,
          urgency: urgency,
          submittedDate: submittedDate,
          message: `Document request: ${status} (${docTypeLabels[documentType]})`,
        },
      })
    }
  }, [documentType, purpose, deliveryMethod, urgency, additionalNotes, status, submittedDate, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-2xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconFile className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Document Request</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">طلب وثيقة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Status</p>
            <p className="text-lg font-semibold text-[#002855] dark:text-white">{status.replace('_', ' ').toUpperCase()}</p>
          </div>
          <span className={`rounded-full px-4 py-2 font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Request Details</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Document Type</p>
              <p className="font-medium text-[#002855] dark:text-white">{docTypeLabels[documentType]}</p>
            </div>
            
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Purpose</p>
              <p className="font-medium text-[#002855] dark:text-white">{purpose}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Delivery Method</p>
                <p className="font-medium capitalize text-[#002855] dark:text-white">{deliveryMethod}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Urgency</p>
                <span className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  urgency === 'urgent' ? 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white' : 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white'
                }`}>
                  {urgency}
                </span>
              </div>
            </div>

            {additionalNotes && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Additional Notes</p>
                <p className="font-medium text-[#002855] dark:text-white">{additionalNotes}</p>
              </div>
            )}

            {submittedDate && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Submitted Date</p>
                <p className="font-medium text-[#002855] dark:text-white">{submittedDate}</p>
              </div>
            )}
          </div>
        </div>

        {status === 'draft' && (
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#002855] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#001f44]">
            <IconSend className="h-5 w-5" />
            Submit Request
          </button>
        )}
      </div>
    </div>
  )
}

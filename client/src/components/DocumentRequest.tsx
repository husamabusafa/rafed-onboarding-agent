import { IconFile, IconSend } from '@tabler/icons-react'

interface Props {
  requestId?: string
  employeeId: number
  documentType: 'employment_certificate' | 'salary_certificate' | 'contract_copy' | 'id_letter' | 'experience_letter' | 'other'
  purpose: string
  deliveryMethod: 'email' | 'printed' | 'both'
  urgency: 'normal' | 'urgent'
  additionalNotes?: string
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected' | 'completed'
  submittedDate?: string
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
  draft: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  in_review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  approved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
}

export function DocumentRequest({ documentType, purpose, deliveryMethod, urgency, additionalNotes, status, submittedDate }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
          <IconFile className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Document Request</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">طلب وثيقة</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{status.replace('_', ' ').toUpperCase()}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-medium ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Request Details</h3>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Document Type</p>
              <p className="font-medium text-gray-900 dark:text-white">{docTypeLabels[documentType]}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Purpose</p>
              <p className="font-medium text-gray-900 dark:text-white">{purpose}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Method</p>
                <p className="font-medium text-gray-900 dark:text-white capitalize">{deliveryMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Urgency</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  urgency === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {urgency}
                </span>
              </div>
            </div>

            {additionalNotes && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Additional Notes</p>
                <p className="font-medium text-gray-900 dark:text-white">{additionalNotes}</p>
              </div>
            )}

            {submittedDate && (
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submitted Date</p>
                <p className="font-medium text-gray-900 dark:text-white">{submittedDate}</p>
              </div>
            )}
          </div>
        </div>

        {status === 'draft' && (
          <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            <IconSend className="w-5 h-5" />
            Submit Request
          </button>
        )}
      </div>
    </div>
  )
}

import { useEffect } from 'react'
import { IconAddressBook, IconSearch, IconMail, IconPhone } from '@tabler/icons-react'

interface Contact {
  departmentAr: string
  departmentEn: string
  serviceType: string
  contactPerson?: string
  email: string
  phone?: string
  extension?: string
  location?: string
  availability?: string
}

interface Props {
  input?: {
    searchQuery?: string
    category?: 'hr' | 'it' | 'finance' | 'administration' | 'operations' | 'safety_security' | 'communications' | 'legal' | 'facilities'
    contacts?: Contact[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const categoryLabels = {
  hr: 'Human Resources',
  it: 'IT & Technology',
  finance: 'Finance',
  administration: 'Administration',
  operations: 'Operations',
  safety_security: 'Safety & Security',
  communications: 'Communications',
  legal: 'Legal',
  facilities: 'Facilities',
}

const categoryColors = {
  hr: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  it: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  finance: 'border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200',
  administration: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  operations: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  safety_security: 'border border-[#E1523E]/20 bg-[#E1523E]/10 text-[#E1523E] dark:border-[#E1523E]/25 dark:bg-[#E1523E]/10 dark:text-white',
  communications: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
  legal: 'border border-[#002855]/10 bg-[#002855]/5 text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white',
  facilities: 'border border-[#002855]/10 bg-white text-[#002855] dark:border-white/10 dark:bg-slate-950/30 dark:text-white',
}

const EMPTY_CONTACTS: Contact[] = []

export function InternalContactDirectory({ input, toolName, toolCallId, addToolResult }: Props) {
  const searchQuery = input?.searchQuery ?? ''
  const category = input?.category
  const contacts = input?.contacts ?? EMPTY_CONTACTS

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          contactCount: contacts.length,
          searchQuery: searchQuery,
          category: category,
          message: `Showing ${contacts.length} internal contact(s)`,
        },
      })
    }
  }, [contacts, searchQuery, category, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-4xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconAddressBook className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Internal Contacts</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">دليل الاتصالات الداخلية</p>
        </div>
      </div>

      <div className="mb-4 relative">
        <IconSearch className="absolute left-3 top-3 h-5 w-5 text-[#002855]/45 dark:text-white/60" />
        <input
          type="text"
          placeholder="Search departments or services..."
          value={searchQuery}
          readOnly
          className="w-full rounded-2xl border border-[#002855]/10 bg-white px-4 py-3 pl-10 text-sm text-slate-900 shadow-sm outline-none focus:border-[#E1523E]/45 focus:shadow-[0_0_0_4px_rgba(225,82,62,0.18)] dark:border-white/10 dark:bg-slate-950/35 dark:text-slate-100 dark:focus:shadow-[0_0_0_4px_rgba(225,82,62,0.12)]"
        />
      </div>

      {category && (
        <div className="mb-4 rounded-2xl border border-[#002855]/10 bg-white/70 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${categoryColors[category]}`}>
            {categoryLabels[category]}
          </span>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {contacts.map((contact, idx) => (
          <div key={idx} className="rounded-2xl border border-[#002855]/10 bg-white p-4 shadow-sm transition-colors hover:border-[#E1523E]/25 hover:bg-[#E1523E]/5 dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-[#E1523E]/30 dark:hover:bg-[#E1523E]/10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#002855] dark:text-white">{contact.departmentEn}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{contact.departmentAr}</p>
                <p className="mt-1 text-sm text-[#E1523E] dark:text-[#E1523E]">{contact.serviceType}</p>
              </div>
              {contact.location && (
                <span className="rounded-full border border-[#002855]/10 bg-[#002855]/5 px-3 py-1 text-xs text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white">
                  {contact.location}
                </span>
              )}
            </div>

            {contact.contactPerson && (
              <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                <strong>Contact Person:</strong> {contact.contactPerson}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#E1523E] dark:text-slate-300 dark:hover:text-white">
                <IconMail className="h-4 w-4 text-[#002855]/45 dark:text-white/55" />
                <span className="truncate">{contact.email}</span>
              </a>

              {(contact.phone || contact.extension) && (
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <IconPhone className="h-4 w-4 text-[#002855]/45 dark:text-white/55" />
                  <span>
                    {contact.phone}
                    {contact.extension && ` ext. ${contact.extension}`}
                  </span>
                </div>
              )}
            </div>

            {contact.availability && (
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Available: {contact.availability}
              </p>
            )}
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No contacts found</p>
        </div>
      )}
    </div>
  )
}

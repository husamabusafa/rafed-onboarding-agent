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
  searchQuery?: string
  category?: 'hr' | 'it' | 'finance' | 'administration' | 'operations' | 'safety_security' | 'communications' | 'legal' | 'facilities'
  contacts: Contact[]
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
  hr: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  it: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  finance: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  administration: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  operations: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  safety_security: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  communications: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
  legal: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  facilities: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
}

export function InternalContactDirectory({ searchQuery = '', category, contacts = [] }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-xl">
          <IconAddressBook className="w-6 h-6 text-cyan-600 dark:text-cyan-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Internal Contacts</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">دليل الاتصالات الداخلية</p>
        </div>
      </div>

      <div className="mb-4 relative">
        <IconSearch className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search departments or services..."
          value={searchQuery}
          readOnly
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {category && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColors[category]}`}>
            {categoryLabels[category]}
          </span>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {contacts.map((contact, idx) => (
          <div key={idx} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{contact.departmentEn}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contact.departmentAr}</p>
                <p className="text-sm text-cyan-600 dark:text-cyan-400 mt-1">{contact.serviceType}</p>
              </div>
              {contact.location && (
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 text-xs rounded-full">
                  {contact.location}
                </span>
              )}
            </div>

            {contact.contactPerson && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <strong>Contact Person:</strong> {contact.contactPerson}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                <IconMail className="w-4 h-4" />
                <span className="truncate">{contact.email}</span>
              </a>

              {(contact.phone || contact.extension) && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <IconPhone className="w-4 h-4" />
                  <span>
                    {contact.phone}
                    {contact.extension && ` ext. ${contact.extension}`}
                  </span>
                </div>
              )}
            </div>

            {contact.availability && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Available: {contact.availability}
              </p>
            )}
          </div>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No contacts found</p>
        </div>
      )}
    </div>
  )
}

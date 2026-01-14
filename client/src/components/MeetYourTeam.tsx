import { IconUsers, IconStar, IconMail, IconPhone } from '@tabler/icons-react'

interface TeamMember {
  empId: number
  nameAr: string
  nameEn: string
  position: string
  email: string
  role: string
  joinedDate?: string
  expertise?: string[]
  photo?: string
}

interface DirectManager {
  empId: number
  nameAr: string
  nameEn: string
  position: string
  email: string
  mobile: string
  bio?: string
  photo?: string
}

interface RelatedDepartment {
  name: string
  contactPerson: string
  relationship: string
}

interface Props {
  newEmployeeId: number
  department: string
  directManager: DirectManager
  teamMembers: TeamMember[]
  relatedDepartments?: RelatedDepartment[]
}

export function MeetYourTeam({ department, directManager, teamMembers = [], relatedDepartments = [] }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
          <IconUsers className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meet Your Team</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">تعرف على فريقك</p>
        </div>
      </div>

      <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Department:</strong> {department}
        </p>
      </div>

      <div className="mb-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl border-2 border-indigo-200 dark:border-indigo-700">
        <div className="flex items-center gap-2 mb-4">
          <IconStar className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Direct Manager</h3>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-16 h-16 bg-indigo-200 dark:bg-indigo-800 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-300">
            {directManager.nameEn.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">{directManager.nameEn}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{directManager.nameAr}</p>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{directManager.position}</p>
            {directManager.bio && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{directManager.bio}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-3">
              <a href={`mailto:${directManager.email}`} className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <IconMail className="w-4 h-4" />
                {directManager.email}
              </a>
              <a href={`tel:${directManager.mobile}`} className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                <IconPhone className="w-4 h-4" />
                {directManager.mobile}
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Team Members</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {teamMembers.map((member) => (
          <div key={member.empId} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 dark:text-gray-300">
                {member.nameEn.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{member.nameEn}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">{member.nameAr}</p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">{member.position}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{member.role}</p>
                {member.expertise && member.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.expertise.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {relatedDepartments.length > 0 && (
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Related Departments</h3>
          <div className="space-y-2">
            {relatedDepartments.map((dept, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{dept.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Contact: {dept.contactPerson}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
                    {dept.relationship}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

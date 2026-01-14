import { useEffect } from 'react'
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
  input?: {
    newEmployeeId?: number
    department?: string
    directManager?: DirectManager
    teamMembers?: TeamMember[]
    relatedDepartments?: RelatedDepartment[]
  }
  toolName?: string
  toolCallId?: string
  addToolResult?: (result: unknown) => void
}

const EMPTY_TEAM_MEMBERS: TeamMember[] = []
const EMPTY_RELATED_DEPARTMENTS: RelatedDepartment[] = []

export function MeetYourTeam({ input, toolName, toolCallId, addToolResult }: Props) {
  const department = input?.department ?? ''
  const directManager = input?.directManager
  const teamMembers = input?.teamMembers ?? EMPTY_TEAM_MEMBERS
  const relatedDepartments = input?.relatedDepartments ?? EMPTY_RELATED_DEPARTMENTS

  useEffect(() => {
    if (addToolResult && toolName && toolCallId) {
      addToolResult({
        tool: toolName,
        toolCallId: toolCallId,
        output: {
          status: 'displayed',
          department: department,
          teamMembersCount: teamMembers.length,
          relatedDepartmentsCount: relatedDepartments.length,
          managerName: directManager?.nameEn,
          message: `Team overview: ${teamMembers.length} team member(s)`,
        },
      })
    }
  }, [department, directManager, teamMembers, relatedDepartments, toolName, toolCallId, addToolResult])

  return (
    <div className="max-w-4xl rounded-3xl border border-[#002855]/10 bg-linear-to-br from-[#002855]/10 via-white/70 to-[#E1523E]/10 p-6 shadow-[0_10px_30px_rgba(0,40,85,0.10)] backdrop-blur dark:border-white/10 dark:bg-linear-to-br dark:from-[#002855]/25 dark:via-slate-950/55 dark:to-[#E1523E]/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-linear-to-br from-[#002855]/12 via-[#002855]/6 to-[#E1523E]/12 p-3 text-[#002855] dark:from-[#002855]/35 dark:via-[#002855]/15 dark:to-[#E1523E]/25 dark:text-white">
          <IconUsers className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[#002855] dark:text-white">Meet Your Team</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">تعرف على فريقك</p>
        </div>
      </div>

      <div className="mb-4 rounded-2xl border border-[#002855]/10 bg-white/70 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
        <p className="text-sm text-slate-700 dark:text-slate-300">
          <strong>Department:</strong> {department}
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-[#002855]/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
        <div className="mb-4 flex items-center gap-2">
          <IconStar className="h-6 w-6 text-[#E1523E]" />
          <h3 className="text-lg font-semibold text-[#002855] dark:text-white">Your Direct Manager</h3>
        </div>
        
        {directManager ? (
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#002855] to-[#E1523E] text-2xl font-bold text-white">
              {directManager.nameEn.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-[#002855] dark:text-white">{directManager.nameEn}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{directManager.nameAr}</p>
              <p className="mt-1 text-sm text-[#E1523E] dark:text-[#E1523E]">{directManager.position}</p>
              {directManager.bio && (
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{directManager.bio}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-3">
                <a href={`mailto:${directManager.email}`} className="flex items-center gap-1 text-sm text-slate-600 hover:text-[#E1523E] dark:text-slate-300 dark:hover:text-white">
                  <IconMail className="h-4 w-4 text-[#002855]/45 dark:text-white/55" />
                  {directManager.email}
                </a>
                <a href={`tel:${directManager.mobile}`} className="flex items-center gap-1 text-sm text-slate-600 hover:text-[#E1523E] dark:text-slate-300 dark:hover:text-white">
                  <IconPhone className="h-4 w-4 text-[#002855]/45 dark:text-white/55" />
                  {directManager.mobile}
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#002855]/10 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-300">
            No manager information available
          </div>
        )}
      </div>

      <h3 className="mb-4 text-lg font-semibold text-[#002855] dark:text-white">Team Members</h3>
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {teamMembers.map((member) => (
          <div key={member.empId} className="rounded-2xl border border-[#002855]/10 bg-white p-4 shadow-sm transition-colors hover:border-[#E1523E]/25 hover:bg-[#E1523E]/5 dark:border-white/10 dark:bg-slate-950/30 dark:hover:border-[#E1523E]/30 dark:hover:bg-[#E1523E]/10">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#002855]/10 text-lg font-bold text-[#002855] dark:bg-white/10 dark:text-white">
                {member.nameEn.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-[#002855] dark:text-white">{member.nameEn}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{member.nameAr}</p>
                <p className="mt-1 text-sm text-[#E1523E] dark:text-[#E1523E]">{member.position}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                {member.expertise && member.expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.expertise.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="rounded-full border border-[#002855]/10 bg-white px-2 py-0.5 text-xs text-[#002855] shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-white">
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
        <div className="rounded-2xl border border-[#002855]/10 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/35">
          <h3 className="mb-3 font-semibold text-[#002855] dark:text-white">Related Departments</h3>
          <div className="space-y-2">
            {relatedDepartments.map((dept, idx) => (
              <div key={idx} className="rounded-2xl border border-[#002855]/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-[#002855] dark:text-white">{dept.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Contact: {dept.contactPerson}</p>
                  </div>
                  <span className="rounded-full border border-[#002855]/10 bg-[#002855]/5 px-2 py-1 text-xs text-[#002855] dark:border-white/10 dark:bg-white/5 dark:text-white">
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

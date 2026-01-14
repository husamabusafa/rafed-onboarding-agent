import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { AttendanceTracker } from '../components/AttendanceTracker'
import { BenefitsOverview } from '../components/BenefitsOverview'
import { BuildingTourScheduler } from '../components/BuildingTourScheduler'
import { CafeteriaMenu } from '../components/CafeteriaMenu'
import { CompanyCalendar } from '../components/CompanyCalendar'
import { DepartmentBrowser } from '../components/DepartmentBrowser'
import { DocumentRequest } from '../components/DocumentRequest'
import { EmailSetupStatus } from '../components/EmailSetupStatus'
import { EmployeeDirectory } from '../components/EmployeeDirectory'
import { EquipmentRequest } from '../components/EquipmentRequest'
import { FeedbackSurvey } from '../components/FeedbackSurvey'
import { IdBadgeStatus } from '../components/IdBadgeStatus'
import { InternalContactDirectory } from '../components/InternalContactDirectory'
import { ItAccessRequest } from '../components/ItAccessRequest'
import { LeaveRequest } from '../components/LeaveRequest'
import { MeetYourTeam } from '../components/MeetYourTeam'
import { OnboardingTaskTracker } from '../components/OnboardingTaskTracker'
import { OrientationWorkshop } from '../components/OrientationWorkshop'
import { ParkingRequest } from '../components/ParkingRequest'
import { ProbationTracker } from '../components/ProbationTracker'
import { WelcomeOnboarding } from '../components/WelcomeOnboarding'

type PropsOf<T> = T extends (props: infer P) => unknown ? P : never
type InputOf<T> = PropsOf<T> extends { input?: infer I } ? I : never

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-2 dark:border-slate-800">
        <h2 className="text-xl font-bold text-[#002855] dark:text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </div>
      <div className="rounded-2xl bg-slate-50/50 p-6 ring-1 ring-slate-900/5 dark:bg-slate-900/20 dark:ring-white/5">{children}</div>
    </section>
  )
}

export function TestComponentsPage() {
  const [toolResults, setToolResults] = useState<unknown[]>([])

  const addToolResult = useCallback((result: unknown) => {
    setToolResults((prev) => [result, ...prev].slice(0, 50))
  }, [])

  const sample = useMemo(() => {
    return {
      EmployeeDirectory: {
        input: {
          searchQuery: 'ali',
          filters: { department: 'Engineering', region: 'Riyadh', division: 'Digital' },
          employees: [
            {
              empId: 1001,
              nameAr: 'علي أحمد',
              nameEn: 'Ali Ahmed',
              positionAr: 'مهندس برمجيات',
              positionEn: 'Software Engineer',
              department: 'Engineering',
              division: 'Digital',
              region: 'Riyadh',
              email: 'ali.ahmed@tetco.sa',
              mobile: '+966500000001',
            },
            {
              empId: 1002,
              nameAr: 'سارة محمد',
              nameEn: 'Sara Mohammed',
              positionAr: 'محلل نظم',
              positionEn: 'Systems Analyst',
              department: 'Engineering',
              division: 'Digital',
              region: 'Riyadh',
              email: 'sara.mohammed@tetco.sa',
              mobile: '+966500000002',
            },
          ],
        },
      },

      DepartmentBrowser: {
        input: {
          divisions: [
            {
              nameAr: 'التحول الرقمي',
              nameEn: 'Digital Transformation',
              departments: [
                { nameAr: 'الهندسة', nameEn: 'Engineering', headCount: 42, manager: 'Khalid', region: 'Riyadh' },
                { nameAr: 'المنتج', nameEn: 'Product', headCount: 16, manager: 'Huda', region: 'Riyadh' },
              ],
            },
          ],
        },
      },

      CafeteriaMenu: {
        input: {
          categories: [
            {
              nameAr: 'مشروبات ساخنة',
              nameEn: 'Hot Drinks',
              items: [
                {
                  nameAr: 'قهوة عربية',
                  nameEn: 'Arabic Coffee',
                  descriptionAr: 'قهوة خفيفة مع الهيل',
                  descriptionEn: 'Light coffee with cardamom',
                  caffeineLevel: 'Low',
                  type: 'Hot',
                },
                {
                  nameAr: 'لاتيه',
                  nameEn: 'Latte',
                  descriptionAr: 'حليب مع إسبرسو',
                  descriptionEn: 'Milk with espresso',
                  caffeineLevel: 'Medium',
                  type: 'Hot',
                },
              ],
            },
          ],
        },
      },

      CompanyCalendar: {
        input: {
          year: 2026,
          weekendDays: ['Friday', 'Saturday'],
          months: [
            {
              monthNumber: 1,
              nameEn: 'January',
              nameAr: 'يناير',
              hijriRangeEn: 'Jumada II – Rajab',
              hijriRangeAr: 'جمادى الآخرة – رجب',
              totalDays: 31,
              startsOn: 'Thursday',
              holidays: [{ date: '2026-01-01', nameEn: 'New Year', nameAr: 'رأس السنة' }],
            },
            {
              monthNumber: 2,
              nameEn: 'February',
              nameAr: 'فبراير',
              hijriRangeEn: 'Rajab – Sha’ban',
              hijriRangeAr: 'رجب – شعبان',
              totalDays: 28,
              startsOn: 'Sunday',
              holidays: [],
            },
            {
              monthNumber: 3,
              nameEn: 'March',
              nameAr: 'مارس',
              hijriRangeEn: 'Sha’ban – Ramadan',
              hijriRangeAr: 'شعبان – رمضان',
              totalDays: 31,
              startsOn: 'Sunday',
              holidays: [{ startDate: '2026-03-20', endDate: '2026-03-22', nameEn: 'Company Offsite', nameAr: 'فعالية الشركة' }],
            },
          ],
        },
      },

      AttendanceTracker: {
        input: {
          date: '2026-01-14',
          checkInTime: '08:37',
          checkOutTime: '17:12',
          status: 'PRESENT',
          location: 'HQ - Riyadh',
          biometricVerified: true,
          recentHistory: [
            { date: '2026-01-13', checkIn: '08:41', checkOut: '17:05', hoursWorked: 8.4, status: 'PRESENT' },
            { date: '2026-01-12', checkIn: '09:10', checkOut: '17:00', hoursWorked: 7.8, status: 'LATE' },
          ],
        },
      },

      OnboardingTaskTracker: {
        input: {
          onboardingStage: 'first_day',
          progressPercentage: 42,
          tasks: [
            {
              taskId: 1,
              stage: 'first_day',
              taskAr: 'استلام بطاقة الهوية',
              taskEn: 'Pick up ID badge',
              responsibleParty: 'HR',
              status: 'in_progress',
              dueDate: '2026-01-14',
              priority: 'high',
            },
            {
              taskId: 2,
              stage: 'first_day',
              taskAr: 'إعداد البريد الإلكتروني',
              taskEn: 'Email setup',
              responsibleParty: 'IT',
              status: 'pending',
              dueDate: '2026-01-14',
              priority: 'medium',
            },
            {
              taskId: 3,
              stage: 'first_day',
              taskAr: 'جولة في المبنى',
              taskEn: 'Building tour',
              responsibleParty: 'Admin',
              status: 'completed',
              completedDate: '2026-01-13',
              priority: 'low',
            },
          ],
        },
      },

      DocumentRequest: {
        input: {
          documentType: 'employment_certificate',
          purpose: 'Bank account opening',
          deliveryMethod: 'both',
          urgency: 'normal',
          status: 'submitted',
          submittedDate: '2026-01-14',
        },
      },

      LeaveRequest: {
        input: {
          leaveType: 'annual',
          startDate: '2026-02-01',
          endDate: '2026-02-05',
          totalDays: 5,
          reason: 'Family trip',
          remainingBalance: 16,
          status: 'pending_approval',
          approverComments: 'Please ensure handover notes are shared.',
        },
      },

      EquipmentRequest: {
        input: {
          equipmentType: 'laptop',
          quantity: 1,
          specifications: '16-inch, 32GB RAM, 1TB SSD',
          justification: 'Development workstation',
          urgency: 'high',
          preferredDeliveryDate: '2026-01-16',
          status: 'pending_approval',
          approvalChain: [
            { approver: 'Line Manager', status: 'approved', date: '2026-01-14' },
            { approver: 'IT Procurement', status: 'pending' },
          ],
        },
      },

      ParkingRequest: {
        input: {
          vehicleType: 'car',
          licensePlate: 'Riyadh 1234',
          vehicleMake: 'Toyota',
          vehicleModel: 'Camry',
          vehicleColor: 'White',
          preferredLocation: 'Building A',
          disabilityAccommodation: false,
          startDate: '2026-01-15',
          status: 'approved',
          assignedSpotNumber: 'B-42',
        },
      },

      IdBadgeStatus: {
        input: {
          badgeNumber: 'TET-000102',
          status: 'ready_for_pickup',
          photoSubmitted: true,
          productionDate: '2026-01-13',
          pickupLocation: 'Security Desk',
          accessLevels: ['HQ Entrance', 'Engineering Floor'],
          expiryDate: '2027-01-13',
        },
      },

      EmailSetupStatus: {
        input: {
          emailAddress: 'new.joiner@tetco.sa',
          status: 'credentials_sent',
          accountType: 'standard',
          requestDate: '2026-01-13',
          creationDate: '2026-01-14',
          accessGroups: ['All Staff', 'Engineering'],
          mobileDeviceConfigured: false,
          initialPassword: 'TempPass!234',
          setupInstructions: 'Sign in using the temporary password, then change it immediately.',
        },
      },

      BuildingTourScheduler: {
        input: {
          employeeLevel: 'staff_1_13',
          tourDate: '2026-01-14',
          tourTime: '10:30',
          duration: 45,
          tourType: 'full_building',
          meetingPoint: 'Reception',
          tourGuide: 'Omar',
          status: 'confirmed',
          stops: [
            { location: 'Reception', description: 'Welcome and badge pickup', estimatedTime: 10 },
            { location: 'IT Helpdesk', description: 'Device handover', estimatedTime: 10 },
            { location: 'Engineering Floor', description: 'Meet the team', estimatedTime: 25 },
          ],
        },
      },

      MeetYourTeam: {
        input: {
          department: 'Engineering',
          directManager: {
            empId: 2001,
            nameAr: 'خالد العتيبي',
            nameEn: 'Khalid Alotaibi',
            position: 'Engineering Manager',
            email: 'khalid@tetco.sa',
            mobile: '+966500000010',
            bio: 'Focused on product impact, quality, and mentorship.',
          },
          teamMembers: [
            {
              empId: 2002,
              nameAr: 'لمى صالح',
              nameEn: 'Lama Saleh',
              position: 'Frontend Engineer',
              email: 'lama@tetco.sa',
              role: 'UI Platform',
              expertise: ['React', 'Design Systems'],
            },
            {
              empId: 2003,
              nameAr: 'نواف محمد',
              nameEn: 'Nawaf Mohammed',
              position: 'Backend Engineer',
              email: 'nawaf@tetco.sa',
              role: 'APIs & Integrations',
              expertise: ['NestJS', 'Postgres'],
            },
          ],
          relatedDepartments: [
            { name: 'HR', contactPerson: 'Sara', relationship: 'Policies & Benefits' },
            { name: 'IT', contactPerson: 'Omar', relationship: 'Accounts & Devices' },
          ],
        },
      },

      OrientationWorkshop: {
        input: {
          title: { en: 'New Joiner Orientation', ar: 'ورشة تعريف الموظفين الجدد' },
          description: {
            en: 'An introduction to company culture, systems, and policies.',
            ar: 'مقدمة عن ثقافة الشركة والأنظمة والسياسات.',
          },
          workshopType: 'company_introduction',
          date: '2026-01-15',
          startTime: '09:00',
          endTime: '11:00',
          location: 'HQ - Training Room 2',
          facilitator: 'HR Team',
          maxAttendees: 30,
          currentAttendees: 18,
          isRequired: true,
          targetAudience: 'all_new_employees',
          registrationStatus: 'open',
          employeeRegistered: false,
        },
      },

      ItAccessRequest: {
        input: {
          systems: [
            { systemName: 'Jira', accessLevel: 'standard', justification: 'Project tracking' },
            { systemName: 'GitHub', accessLevel: 'power_user', justification: 'Source control and reviews' },
          ],
          urgency: 'high',
          status: 'pending_it_review',
          requestedDate: '2026-01-13',
          managerApproval: { approved: true, approverName: 'Khalid', approvalDate: '2026-01-13' },
        },
      },

      InternalContactDirectory: {
        input: {
          searchQuery: 'IT',
          category: 'it',
          contacts: [
            {
              departmentAr: 'تقنية المعلومات',
              departmentEn: 'IT Support',
              serviceType: 'Account & Device Setup',
              contactPerson: 'Omar',
              email: 'it.support@tetco.sa',
              phone: '+966112222222',
              extension: '1234',
              location: 'HQ - 1st Floor',
              availability: 'Sun–Thu, 8:30–17:00',
            },
          ],
        },
      },

      BenefitsOverview: {
        input: {
          salary: {
            basicSalary: 12000,
            allowances: [
              { type: 'Housing', amount: 4000 },
              { type: 'Transport', amount: 800 },
            ],
            totalPackage: 16800,
          },
          medicalInsurance: {
            provider: 'Bupa',
            policyNumber: 'BUPA-2026-0001',
            coverage: 'employee_and_dependents',
            dependentsCount: 2,
            startDate: '2026-01-13',
            endDate: '2027-01-12',
            cardIssued: false,
          },
          leaveEntitlements: [
            { leaveType: 'Annual Leave', annualAllocation: 21, used: 2, remaining: 19 },
            { leaveType: 'Sick Leave', annualAllocation: 30, used: 0, remaining: 30 },
          ],
          additionalBenefits: [
            { benefitName: 'Learning Budget', description: 'Annual budget for courses and certifications.', eligibility: 'After probation' },
          ],
          performanceReview: { cycle: 'Annual', nextReviewDate: '2026-12-15' },
        },
      },

      ProbationTracker: {
        input: {
          startDate: '2026-01-13',
          endDate: '2026-04-13',
          duration: 90,
          currentDay: 12,
          progressPercentage: 13,
          status: 'active',
          nextEvaluationDate: '2026-02-12',
          milestones: [
            { name: 'Complete onboarding checklist', dueDate: '2026-01-20', completed: false, notes: 'Coordinate with HR and IT.' },
            { name: 'First project kickoff', dueDate: '2026-01-22', completed: true, completedDate: '2026-01-21' },
          ],
          evaluations: [
            { evaluationType: '30_day', scheduledDate: '2026-02-12', evaluator: 'Khalid' },
            { evaluationType: '60_day', scheduledDate: '2026-03-14', evaluator: 'Khalid' },
          ],
        },
      },

      FeedbackSurvey: {
        input: {
          surveyType: 'onboarding_satisfaction',
          isAnonymous: true,
          status: 'draft',
          overallRating: 4,
          additionalComments: 'Everything is smooth so far. Great support from IT.',
          questions: [
            { questionId: 'q1', questionText: 'How was your first day experience?', questionType: 'rating', answer: 4 },
            { questionId: 'q2', questionText: 'Did you receive your laptop on time?', questionType: 'yes_no', answer: true },
            {
              questionId: 'q3',
              questionText: 'Which systems do you still need access to?',
              questionType: 'multiple_choice',
              answer: ['VPN', 'Confluence'],
            },
            { questionId: 'q4', questionText: 'Any suggestions?', questionType: 'text', answer: 'More office tour signage.' },
          ],
        },
      },
    }
  }, [])

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-12 pb-12">
        <div className="border-b border-slate-200 pb-6 dark:border-slate-800">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#002855] dark:text-white">Component Library</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Interactive playground for testing all UI components with mock data.
          </p>
        </div>

        <Section title="WelcomeOnboarding" subtitle="Static component (no tool props)">
          <WelcomeOnboarding />
        </Section>

        <Section title="EmployeeDirectory">
          <EmployeeDirectory toolName="EmployeeDirectory" toolCallId="demo_employee_directory" input={sample.EmployeeDirectory.input as InputOf<typeof EmployeeDirectory>} addToolResult={addToolResult} />
        </Section>

        <Section title="DepartmentBrowser">
          <DepartmentBrowser toolName="DepartmentBrowser" toolCallId="demo_department_browser" input={sample.DepartmentBrowser.input as InputOf<typeof DepartmentBrowser>} addToolResult={addToolResult} />
        </Section>

        <Section title="CafeteriaMenu">
          <CafeteriaMenu toolName="CafeteriaMenu" toolCallId="demo_cafeteria_menu" input={sample.CafeteriaMenu.input as InputOf<typeof CafeteriaMenu>} addToolResult={addToolResult} />
        </Section>

        <Section title="CompanyCalendar">
          <CompanyCalendar toolName="CompanyCalendar" toolCallId="demo_company_calendar" input={sample.CompanyCalendar.input as InputOf<typeof CompanyCalendar>} addToolResult={addToolResult} />
        </Section>

        <Section title="AttendanceTracker">
          <AttendanceTracker toolName="AttendanceTracker" toolCallId="demo_attendance_tracker" input={sample.AttendanceTracker.input as InputOf<typeof AttendanceTracker>} addToolResult={addToolResult} />
        </Section>

        <Section title="OnboardingTaskTracker">
          <OnboardingTaskTracker toolName="OnboardingTaskTracker" toolCallId="demo_onboarding_tasks" input={sample.OnboardingTaskTracker.input as InputOf<typeof OnboardingTaskTracker>} addToolResult={addToolResult} />
        </Section>

        <Section title="DocumentRequest">
          <DocumentRequest toolName="DocumentRequest" toolCallId="demo_document_request" input={sample.DocumentRequest.input as InputOf<typeof DocumentRequest>} addToolResult={addToolResult} />
        </Section>

        <Section title="LeaveRequest">
          <LeaveRequest toolName="LeaveRequest" toolCallId="demo_leave_request" input={sample.LeaveRequest.input as InputOf<typeof LeaveRequest>} addToolResult={addToolResult} />
        </Section>

        <Section title="EquipmentRequest">
          <EquipmentRequest toolName="EquipmentRequest" toolCallId="demo_equipment_request" input={sample.EquipmentRequest.input as InputOf<typeof EquipmentRequest>} addToolResult={addToolResult} />
        </Section>

        <Section title="ParkingRequest">
          <ParkingRequest toolName="ParkingRequest" toolCallId="demo_parking_request" input={sample.ParkingRequest.input as InputOf<typeof ParkingRequest>} addToolResult={addToolResult} />
        </Section>

        <Section title="IdBadgeStatus">
          <IdBadgeStatus toolName="IdBadgeStatus" toolCallId="demo_id_badge" input={sample.IdBadgeStatus.input as InputOf<typeof IdBadgeStatus>} addToolResult={addToolResult} />
        </Section>

        <Section title="EmailSetupStatus">
          <EmailSetupStatus toolName="EmailSetupStatus" toolCallId="demo_email_setup" input={sample.EmailSetupStatus.input as InputOf<typeof EmailSetupStatus>} addToolResult={addToolResult} />
        </Section>

        <Section title="BuildingTourScheduler">
          <BuildingTourScheduler toolName="BuildingTourScheduler" toolCallId="demo_building_tour" input={sample.BuildingTourScheduler.input as InputOf<typeof BuildingTourScheduler>} addToolResult={addToolResult} />
        </Section>

        <Section title="MeetYourTeam">
          <MeetYourTeam toolName="MeetYourTeam" toolCallId="demo_meet_team" input={sample.MeetYourTeam.input as InputOf<typeof MeetYourTeam>} addToolResult={addToolResult} />
        </Section>

        <Section title="OrientationWorkshop">
          <OrientationWorkshop toolName="OrientationWorkshop" toolCallId="demo_workshop" input={sample.OrientationWorkshop.input as InputOf<typeof OrientationWorkshop>} addToolResult={addToolResult} />
        </Section>

        <Section title="ItAccessRequest">
          <ItAccessRequest toolName="ItAccessRequest" toolCallId="demo_it_access" input={sample.ItAccessRequest.input as InputOf<typeof ItAccessRequest>} addToolResult={addToolResult} />
        </Section>

        <Section title="InternalContactDirectory">
          <InternalContactDirectory toolName="InternalContactDirectory" toolCallId="demo_internal_contacts" input={sample.InternalContactDirectory.input as InputOf<typeof InternalContactDirectory>} addToolResult={addToolResult} />
        </Section>

        <Section title="BenefitsOverview">
          <BenefitsOverview toolName="BenefitsOverview" toolCallId="demo_benefits" input={sample.BenefitsOverview.input as InputOf<typeof BenefitsOverview>} addToolResult={addToolResult} />
        </Section>

        <Section title="ProbationTracker">
          <ProbationTracker toolName="ProbationTracker" toolCallId="demo_probation" input={sample.ProbationTracker.input as InputOf<typeof ProbationTracker>} addToolResult={addToolResult} />
        </Section>

        <Section title="FeedbackSurvey">
          <FeedbackSurvey toolName="FeedbackSurvey" toolCallId="demo_survey" input={sample.FeedbackSurvey.input as InputOf<typeof FeedbackSurvey>} addToolResult={addToolResult} />
        </Section>
      </div>

      <aside className="sticky top-24 h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-white/10">
        <h3 className="font-bold text-[#002855] dark:text-white">Tool Results</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Latest results from components calling <span className="font-semibold">addToolResult</span>.
        </p>

        <div className="mt-4 max-h-[70vh] space-y-3 overflow-auto pr-1">
          {toolResults.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#002855]/20 bg-slate-50/50 p-4 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-950/25 dark:text-slate-400">
              No results yet.
            </div>
          ) : (
            toolResults.map((r, idx) => (
              <pre
                key={idx}
                className="overflow-auto rounded-xl border border-[#002855]/10 bg-slate-50 p-3 text-xs text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-200"
              >
                {JSON.stringify(r, null, 2)}
              </pre>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}

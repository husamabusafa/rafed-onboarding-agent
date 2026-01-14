import { HsafaProvider, HsafaChat } from '@hsafa/ui-sdk'
import { WelcomeOnboarding } from './components/WelcomeOnboarding'
import { EmployeeDirectory } from './components/EmployeeDirectory'
import { DepartmentBrowser } from './components/DepartmentBrowser'
import { CafeteriaMenu } from './components/CafeteriaMenu'
import { CompanyCalendar } from './components/CompanyCalendar'
import { AttendanceTracker } from './components/AttendanceTracker'
import { OnboardingTaskTracker } from './components/OnboardingTaskTracker'
import { DocumentRequest } from './components/DocumentRequest'
import { LeaveRequest } from './components/LeaveRequest'
import { EquipmentRequest } from './components/EquipmentRequest'
import { ParkingRequest } from './components/ParkingRequest'
import { IdBadgeStatus } from './components/IdBadgeStatus'
import { EmailSetupStatus } from './components/EmailSetupStatus'
import { BuildingTourScheduler } from './components/BuildingTourScheduler'
import { MeetYourTeam } from './components/MeetYourTeam'
import { OrientationWorkshop } from './components/OrientationWorkshop'
import { ItAccessRequest } from './components/ItAccessRequest'
import { InternalContactDirectory } from './components/InternalContactDirectory'
import { BenefitsOverview } from './components/BenefitsOverview'
import { ProbationTracker } from './components/ProbationTracker'
import { FeedbackSurvey } from './components/FeedbackSurvey'

const INITIAL_TIMESTAMP = new Date('2026-01-13T08:33:00+03:00').getTime()

const uiComponents = {
  WelcomeOnboarding,
  EmployeeDirectory,
  DepartmentBrowser,
  CafeteriaMenu,
  CompanyCalendar,
  AttendanceTracker,
  OnboardingTaskTracker,
  DocumentRequest,
  LeaveRequest,
  EquipmentRequest,
  ParkingRequest,
  IdBadgeStatus,
  EmailSetupStatus,
  BuildingTourScheduler,
  MeetYourTeam,
  OrientationWorkshop,
  ItAccessRequest,
  InternalContactDirectory,
  BenefitsOverview,
  ProbationTracker,
  FeedbackSurvey,
}

function App() {
  const initialMessages = [
    // {
    //   id: "welcome_message",
    //   role: "assistant",
    //   parts: [
    //     {
    //       type: "tool-WelcomeOnboarding",
    //       toolName: "WelcomeOnboarding",
    //       toolCallId: "welcome_1",
    //       input: {},
    //       output: {
    //         "status": "completed"
    //       }
    //     },
    //   ],
    //   createdAt: INITIAL_TIMESTAMP,
    // },
  ]

  return (
    <HsafaProvider baseUrl="https://server.hsafa.com">
      <HsafaChat 
        agentId="cmkc0f4gi000ppc0k703h6zgn" 
        theme="dark"
      
        HsafaUI={uiComponents}
        alwaysOpen
        fullPageChat
        initialMessages={initialMessages}
      />
    </HsafaProvider>
  )
}

export default App

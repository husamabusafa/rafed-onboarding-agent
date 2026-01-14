import { HsafaProvider } from '@hsafa/ui-sdk'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
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
import { ChatPage } from './pages/ChatPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SystemLayout } from './pages/SystemLayout'
import { TestComponentsPage } from './pages/TestComponentsPage'

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

type ThemeMode = 'light' | 'dark'

function getInitialTheme(): ThemeMode {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

const initialMessages = [
  {
    id: 'welcome_message',
    role: 'assistant',
    parts: [
      {
        type: 'tool-WelcomeOnboarding',
        toolName: 'WelcomeOnboarding',
        toolCallId: 'welcome_1',
        input: {},
        output: {
          status: 'completed',
        },
        state: 'output-available',
        status: 'output-available',
        startDate: Date.now(),
        endDate: Date.now(),
      },
    ],
  },
]

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeMode === 'dark')
    localStorage.setItem('theme', themeMode)
  }, [themeMode])

  return (
    <HsafaProvider baseUrl="https://server.hsafa.com">
      <Routes>
        <Route path="/" element={<SystemLayout themeMode={themeMode} onThemeToggle={() => setThemeMode((t) => (t === 'dark' ? 'light' : 'dark'))} />}>
          <Route index element={<HomePage />} />
          <Route
            path="employees"
            element={<h1 className="text-3xl font-bold tracking-tight text-[#002855] dark:text-white md:text-4xl">Employees</h1>}
          />
          <Route
            path="calendar"
            element={<h1 className="text-3xl font-bold tracking-tight text-[#002855] dark:text-white md:text-4xl">Calendar</h1>}
          />
          <Route
            path="settings"
            element={<h1 className="text-3xl font-bold tracking-tight text-[#002855] dark:text-white md:text-4xl">Settings</h1>}
          />
          <Route
            path="*"
            element={<h1 className="text-3xl font-bold tracking-tight text-[#002855] dark:text-white md:text-4xl">Coming Soon</h1>}
          />
        </Route>
        <Route
          path="chat"
          element={<ChatPage themeMode={themeMode} uiComponents={uiComponents} initialMessages={initialMessages} />}
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="test-components" element={<TestComponentsPage />} />
      </Routes>
    </HsafaProvider>
  )
}

export default App

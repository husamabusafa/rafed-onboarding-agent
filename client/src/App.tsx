import { HsafaProvider } from '@hsafa/ui-sdk'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { I18nProvider } from './i18n/i18n'
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
import { PageTitle } from './components/PageTitle'
import { ChatPage } from './pages/ChatPage'
import { ActionDetailPage } from './pages/ActionDetailPage'
import { ActionsPage } from './pages/ActionsPage'
import { BuddyTeamPage } from './pages/BuddyTeamPage'
import { BuddyTeamMemberPage } from './pages/BuddyTeamMemberPage'
import { CalendarPage } from './pages/CalendarPage'
import { CafeteriaOrderPage } from './pages/CafeteriaOrderPage'
import { CompanyEventsPage } from './pages/CompanyEventsPage'
import { ExperienceHubPage } from './pages/ExperienceHubPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { MeetingRoomsPage } from './pages/MeetingRoomsPage'
import { NewsPage } from './pages/NewsPage'
import { EmployeesPage } from './pages/EmployeesPage'
import { JourneyPage } from './pages/JourneyPage'
import { LeaderDetailPage } from './pages/LeaderDetailPage'
import { LeadershipPage } from './pages/LeadershipPage'
import { LoginPage } from './pages/LoginPage'
import { OnboardingJourneyPage } from './pages/OnboardingJourneyPage'
import { ResourcesDocumentsPage } from './pages/ResourcesDocumentsPage'
import { SettingsPage } from './pages/SettingsPage'
import { SystemLayout } from './pages/SystemLayout'
import { TestComponentsPage } from './pages/TestComponentsPage'
import { ToolsFacilitiesPage } from './pages/ToolsFacilitiesPage'

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
    <I18nProvider>
      <HsafaProvider baseUrl="https://server.hsafa.com">
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SystemLayout themeMode={themeMode} onThemeToggle={() => setThemeMode((t) => (t === 'dark' ? 'light' : 'dark'))} />}>
              <Route index element={<HomePage />} />
              <Route path="onboarding" element={<OnboardingJourneyPage />} />
              <Route path="journey" element={<JourneyPage />} />
              <Route path="resources" element={<ResourcesDocumentsPage />} />
              <Route path="experience" element={<ExperienceHubPage />} />
              <Route path="experience/cafeteria" element={<CafeteriaOrderPage />} />
              <Route path="experience/rooms" element={<MeetingRoomsPage />} />
              <Route path="experience/events" element={<CompanyEventsPage />} />
              <Route path="experience/news" element={<NewsPage />} />
              <Route path="experience/gallery" element={<GalleryPage />} />
              <Route path="leadership" element={<LeadershipPage />} />
              <Route path="leadership/:leaderId" element={<LeaderDetailPage />} />
              <Route path="buddy-team" element={<BuddyTeamPage />} />
              <Route path="buddy-team/:memberId" element={<BuddyTeamMemberPage />} />
              <Route path="tools" element={<ToolsFacilitiesPage />} />
              <Route path="actions" element={<ActionsPage />} />
              <Route path="actions/:actionId" element={<ActionDetailPage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="settings" element={<SettingsPage themeMode={themeMode} onThemeToggle={() => setThemeMode((t) => (t === 'dark' ? 'light' : 'dark'))} />} />
              <Route
                path="*"
                element={<PageTitle labelKey="nav.comingSoon" />}
              />
            </Route>
            <Route
              path="chat"
              element={<ChatPage themeMode={themeMode} uiComponents={uiComponents} initialMessages={initialMessages} />}
            />
            <Route path="test-components" element={<TestComponentsPage />} />
          </Route>
        </Routes>
      </HsafaProvider>
    </I18nProvider>
  )
}

export default App

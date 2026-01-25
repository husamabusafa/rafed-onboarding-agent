import type { LocalizedString } from './localization'
import { ls } from './localization'

export type OnboardingPolicy = {
  id: string
  name: LocalizedString
  version: string
  owner: string
  status: 'pending' | 'acknowledged' | 'overdue'
  dueDate?: string
}

export type TrainingModule = {
  id: string
  title: LocalizedString
  provider: string
  stage: 'pre_joining' | 'first_day' | 'post_joining'
  durationMinutes: number
  status: 'not_started' | 'in_progress' | 'completed'
}

export type CheckIn = {
  id: string
  type: 'buddy' | 'manager' | 'hr' | 'it'
  date: string
  owner: string
  notes: LocalizedString
}

export type OnboardingMilestone = {
  id: string
  title: LocalizedString
  dueDate: string
  status: 'pending' | 'completed'
}

export type OnboardingTimelineItem = {
  id: string
  stage: 'pre_joining' | 'first_day' | 'post_joining'
  title: LocalizedString
  date: string
  owner: string
}

export const onboardingJourney = {
  profile: {
    employeeName: 'Mohammed Al-Otaibi',
    role: ls('Accounting Manager', 'مدير المحاسبة'),
    startDate: '2026-01-13',
    buddy: 'Bejad Al Muraibadh',
    manager: 'Mohammed Al-Otaibi',
  },
  timeline: [
    {
      id: 'tl-1',
      stage: 'pre_joining',
      title: ls('Submit required documents', 'تسليم المستندات المطلوبة'),
      date: '2026-01-06',
      owner: 'New Employee',
    },
    {
      id: 'tl-2',
      stage: 'first_day',
      title: ls('Welcome session and office tour', 'جلسة ترحيب وجولة تعريفية'),
      date: '2026-01-13',
      owner: 'HR',
    },
    {
      id: 'tl-3',
      stage: 'post_joining',
      title: ls('30-day check-in', 'متابعة بعد 30 يومًا'),
      date: '2026-02-12',
      owner: 'Manager',
    },
  ] as OnboardingTimelineItem[],
  policies: [
    {
      id: 'policy-1',
      name: ls('Code of Conduct', 'مدونة السلوك'),
      version: 'v2.1',
      owner: 'HR',
      status: 'pending',
      dueDate: '2026-01-20',
    },
    {
      id: 'policy-2',
      name: ls('Cybersecurity Essentials', 'أساسيات الأمن السيبراني'),
      version: 'v1.4',
      owner: 'IT',
      status: 'acknowledged',
    },
  ] as OnboardingPolicy[],
  training: [
    {
      id: 'train-1',
      title: ls('HR Systems Overview', 'تعريف بنظام الموارد البشرية'),
      provider: 'HR Team',
      stage: 'first_day',
      durationMinutes: 60,
      status: 'completed',
    },
    {
      id: 'train-2',
      title: ls('Cybersecurity Basics', 'أساسيات الأمن السيبراني'),
      provider: 'Cybersecurity Office',
      stage: 'post_joining',
      durationMinutes: 45,
      status: 'in_progress',
    },
  ] as TrainingModule[],
  checkIns: [
    {
      id: 'checkin-1',
      type: 'buddy',
      date: '2026-01-16',
      owner: 'Bejad Al Muraibadh',
      notes: ls('First week check-in completed.', 'تمت متابعة الأسبوع الأول.'),
    },
    {
      id: 'checkin-2',
      type: 'manager',
      date: '2026-01-20',
      owner: 'Mohammed Al-Otaibi',
      notes: ls('Discussed role expectations and 30-day goals.', 'تمت مناقشة التوقعات وأهداف أول 30 يومًا.'),
    },
  ] as CheckIn[],
  milestones: [
    {
      id: 'mile-1',
      title: ls('Complete core training', 'إكمال التدريب الأساسي'),
      dueDate: '2026-01-27',
      status: 'pending',
    },
    {
      id: 'mile-2',
      title: ls('First performance review', 'مراجعة الأداء الأولى'),
      dueDate: '2026-02-12',
      status: 'pending',
    },
  ] as OnboardingMilestone[],
} as const

export type JourneyItemStatus = 'done' | 'in_progress' | 'pending'

export type JourneyItem = {
  id: string
  title: LocalizedString
  status: JourneyItemStatus
}

export type JourneyPhase = {
  id: string
  title: LocalizedString
  subtitle: LocalizedString
  items: JourneyItem[]
}

export const onboardingJourneyPhases: JourneyPhase[] = [
  {
    id: 'phase-1',
    title: ls('Phase 1: Pre-Joining Phase', 'المرحلة الأولى: ما قبل المباشرة'),
    subtitle: ls("Let's get you ready for day one.", 'لنجهّزك لليوم الأول.'),
    items: [
      { id: 'doc:nda', title: ls('Submit documents & signatures', 'تسليم المستندات والتواقيع'), status: 'in_progress' },
      { id: 'action:fingerprint-registration', title: ls('Fingerprint registration', 'تسجيل البصمة'), status: 'pending' },
      { id: 'doc:code-of-ethics', title: ls('Review Code of Ethics', 'مراجعة مدوّنة أخلاقيات العمل'), status: 'pending' },
    ],
  },
]

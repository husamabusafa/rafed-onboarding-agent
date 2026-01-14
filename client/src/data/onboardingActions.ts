export type OnboardingAction = {
  id: string
  title: string
  description: string
  category: 'IT' | 'HR' | 'Facilities' | 'Learning'
  owner?: string
  sessionDate?: string
  steps: string[]
}

export const onboardingActions: OnboardingAction[] = [
  {
    id: 'fingerprint-registration',
    title: 'Fingerprint Registration',
    description: 'Register your fingerprint for office attendance access and time tracking.',
    category: 'Facilities',
    sessionDate: 'Within 48 hours of receiving the Operations email',
    steps: [
      'Wait for the notification email from the Operations team.',
      'Meet the representative in the office to complete the registration.',
      'Confirm the registration is finalized within 48 hours.',
    ],
  },
  {
    id: 'hr-system-access',
    title: 'HR System (ERP / OFOQ) Access',
    description: 'Sign in to the HR system to manage requests and view HR information.',
    category: 'HR',
    steps: [
      'Open the sign-in page using the application link provided by the company.',
      'Enter your user ID and password.',
      'Click Sign In and verify you can access the home page.',
    ],
  },
  {
    id: 'internal-portal',
    title: 'Internal Portal Setup',
    description: 'Get familiar with the internal portal to access information and services.',
    category: 'HR',
    steps: [
      'Sign in to the internal portal using your company credentials.',
      'Review your sector overview and available services.',
      'Check internal mobility (Step), news, and announcements.',
    ],
  },
  {
    id: 'wala-plus',
    title: 'Wala Plus Discounts',
    description: 'Activate your employee discounts and offers through Wala Plus.',
    category: 'HR',
    steps: [
      'On day 1, Operations will register you in Wala Plus.',
      'Check your email for the notification and user guide.',
      'Follow the guide to activate access and start browsing offers.',
    ],
  },
  {
    id: 'cybersecurity-basics',
    title: 'Cybersecurity Basics',
    description: 'Follow the essential cybersecurity practices for safe work.',
    category: 'IT',
    steps: [
      'Use strong and unique passwords and change them regularly (every 90 days).',
      'Avoid opening unknown links/attachments and verify senders.',
      'Do not install software without IT approval and report suspicious activity.',
    ],
  },
]

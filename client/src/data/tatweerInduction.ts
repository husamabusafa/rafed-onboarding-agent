export type Person = {
  name: string
  title?: string
  team?: string
}

export const tatweerInduction = {
  governanceAndLeadership: {
    thcGroupCeo: 'Eng. Metab Al Shahrani',
    groupCeos: [
      'Eng. Metab Al Shahrani',
      'Mr. Mohammed AlHizam',
      'Eng. Fahad Al Solaie',
      'Eng. Omar Al Suwaiyan',
      'Eng. Mohamed Al Mehiemeed',
    ],
    tatweersLeaders: [
      { name: 'Adel Al Obailan', title: 'Corporate Communication Executive Director' },
      { name: 'Talal Al Rumayaan', title: 'Legal Affairs VP' },
      { name: 'Ehab Mufti', title: 'Chief Shared Services Officer' },
      { name: 'Anwar Al Khuraimi', title: 'Chief Internal Audit Officer' },
      { name: 'Amro Al Tamimi', title: 'Group Chief Finance Officer' },
      { name: 'Bandar Subaih', title: 'GRC Vice President' },
      { name: 'Abdulrahman Al Sebaiheen', title: 'Chief Corporate Strategy and Transformation Officer' },
      {
        name: 'Hamad Al Jarboou',
        title: 'Chief Business Development, Portfolio Management, and Investment Officer',
      },
      { name: 'Sultan AlTamimi', title: 'Chief Human Capital Officer' },
    ] satisfies Person[],
    talentAcquisitionAndOnboardingTeam: [
      { name: 'Omar Al Ekresh', title: 'Talent Acquisition Director' },
      { name: 'Ghaida Al Fawaz', title: 'Sr. Talent Acquisition Specialist' },
      { name: 'Modhi Al. Mousa', title: 'Talent Acquisition Associate Expert' },
    ] satisfies Person[],
  },
  buddyProgram: {
    objective:
      'Ensure new hires have a smooth transition and feel supported during onboarding by providing a knowledgeable and approachable buddy.',
    buddyRole: [
      'First point of contact for new hire questions or guidance.',
      'Help new hire understand company culture, policies, and work environment.',
      'Introduce new employees to team members and key stakeholders.',
      'Support navigation of internal systems, tools, and resources.',
      'Encourage engagement and participation in activities and meetings.',
      'Share tips and best practices related to day-to-day work.',
    ],
    responsibilities: {
      preJoining: [
        'Coordinate with HR to understand start date and basic details (buddy is copied in the onboarding email).',
        'Prepare a welcome plan (e.g., coffee chats, first-day lunch if possible).',
      ],
      firstWeek: [
        'Meet with the new hire and offer a workplace tour.',
        'Help set up basic tools (emails, systems access) and guide through onboarding tasks.',
        'Introduce the new hire to team members and key departments.',
      ],
      firstMonth: [
        'Schedule regular informal check-ins (e.g., weekly coffee chats or brief catch-ups).',
        'Be available to answer questions, clarify expectations, and assist with challenges.',
        'Provide insights into department practices and performance expectations.',
      ],
      afterFirstMonth: [
        'Continue to offer support and guidance as needed.',
        'Encourage the new hire’s independence while remaining approachable.',
        'Share feedback with HR if any concerns or suggestions arise.',
      ],
    },
    assignedBuddyTeam: [
      { name: 'Bejad Al Muraibadh', team: 'GRC' },
      { name: 'Abdulmajid Al Othman', team: 'LEGAL' },
      { name: 'Ghaida Al Fawaz', team: 'HC' },
      { name: 'Najd Al Otaibi', team: 'Corporate Communication' },
      { name: 'Mohammed Al Sharari', team: 'Shared Services' },
      { name: 'Fahd Al Owardhi', team: 'Internal Audit' },
    ] satisfies Person[],
    unassignedTeams: ['BD', 'Strategy', 'Finance'],
  },
  newMemberInformation: {
    attendanceAndLeaves: {
      workingHours: {
        hoursPerDay: 8,
        flexTimeWindow: 'From 7:00 until 8:30',
      },
      permissionPolicy: {
        hoursPerMonth: 8,
        maxHoursPerDay: 4,
      },
      publicHolidays: ['Eid Al Hajj', 'Eid AlFetr', 'Foundation Day', 'National Day'],
    },
  },
  toolsAndFacilities: {
    hrSystem: {
      name: 'ERP or OFOQ (Oracle Applications Cloud shown)',
      purpose: 'Integration between departments and links data and procedures of support departments.',
      signInSteps: [
        'Use the application link your company gave you to open the sign-in page.',
        'Enter your user ID and password.',
        'Click Sign In to land on the home page.',
      ],
    },
    internalPortal: {
      description:
        "Internal portal for employees to facilitate access to necessary information of all company's departments.",
      whatToFind: ['Brief overview and detailed description of the sector.', 'Internal mobility “Step”.', 'News and advertisements.'],
    },
    fingerprintRegistration: {
      when: 'Once you receive a notification email from Operation team; registration is finalized in the office within 48 hours maximum.',
    },
    walaPlus: {
      programName: 'Discount & Offer Program “Wala Plus”',
      description:
        'Partnership with loyalty program Wala Plus offering employees and families unlimited access to 1000+ discounts and offers.',
      onboardingNote: 'Operation team registers you on day 1 and sends an email notification with an attached user guide.',
    },
    shuttleService: {
      description: 'Shuttle transfer point from Al-Murooj Train Station.',
    },
    uberService: {
      description:
        'Partnership agreement with Uber Business to provide transportation services for employees of Tatweer companies without additional costs.',
      coverage:
        'Movement between Tatweer companies (Holding, Talemia, Rafd, TBC, TETCO) and the headquarters of the Ministry of Education.',
      criteria: 'All THC employee',
    },
  },
} as const

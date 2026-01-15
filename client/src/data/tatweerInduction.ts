import type { LocalizedString } from './localization'
import { ls } from './localization'

export type Person = {
  name: string
  title?: LocalizedString
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
      { name: 'Adel Al Obailan', title: ls('Corporate Communication Executive Director', 'المدير التنفيذي للاتصال المؤسسي') },
      { name: 'Talal Al Rumayaan', title: ls('Legal Affairs VP', 'نائب الرئيس للشؤون القانونية') },
      { name: 'Ehab Mufti', title: ls('Chief Shared Services Officer', 'الرئيس التنفيذي للخدمات المشتركة') },
      { name: 'Anwar Al Khuraimi', title: ls('Chief Internal Audit Officer', 'الرئيس التنفيذي للتدقيق الداخلي') },
      { name: 'Amro Al Tamimi', title: ls('Group Chief Finance Officer', 'الرئيس التنفيذي المالي للمجموعة') },
      { name: 'Bandar Subaih', title: ls('GRC Vice President', 'نائب الرئيس للحوكمة والمخاطر والالتزام') },
      {
        name: 'Abdulrahman Al Sebaiheen',
        title: ls('Chief Corporate Strategy and Transformation Officer', 'الرئيس التنفيذي لاستراتيجية الشركة والتحول'),
      },
      {
        name: 'Hamad Al Jarboou',
        title: ls(
          'Chief Business Development, Portfolio Management, and Investment Officer',
          'الرئيس التنفيذي لتطوير الأعمال وإدارة المحافظ والاستثمار',
        ),
      },
      { name: 'Sultan AlTamimi', title: ls('Chief Human Capital Officer', 'الرئيس التنفيذي لرأس المال البشري') },
    ] satisfies Person[],
    talentAcquisitionAndOnboardingTeam: [
      { name: 'Omar Al Ekresh', title: ls('Talent Acquisition Director', 'مدير استقطاب المواهب') },
      { name: 'Ghaida Al Fawaz', title: ls('Sr. Talent Acquisition Specialist', 'أخصائي أول استقطاب المواهب') },
      { name: 'Modhi Al. Mousa', title: ls('Talent Acquisition Associate Expert', 'خبير مشارك استقطاب المواهب') },
    ] satisfies Person[],
  },
  buddyProgram: {
    objective: ls(
      'Ensure new hires have a smooth transition and feel supported during onboarding by providing a knowledgeable and approachable buddy.',
      'ضمان انتقال سلس للموظفين الجدد وشعورهم بالدعم خلال فترة التهيئة عبر توفير زميل داعم لديه المعرفة وسهل التواصل.',
    ),
    buddyRole: [
      ls('First point of contact for new hire questions or guidance.', 'نقطة الاتصال الأولى لاستفسارات الموظف الجديد أو تقديم الإرشاد.'),
      ls('Help new hire understand company culture, policies, and work environment.', 'مساعدة الموظف الجديد على فهم ثقافة الشركة وسياساتها وبيئة العمل.'),
      ls('Introduce new employees to team members and key stakeholders.', 'تعريف الموظف الجديد بأعضاء الفريق وأصحاب المصلحة الرئيسيين.'),
      ls('Support navigation of internal systems, tools, and resources.', 'المساعدة في استخدام الأنظمة الداخلية والأدوات والموارد.'),
      ls('Encourage engagement and participation in activities and meetings.', 'تشجيع التفاعل والمشاركة في الأنشطة والاجتماعات.'),
      ls('Share tips and best practices related to day-to-day work.', 'مشاركة النصائح وأفضل الممارسات المتعلقة بالعمل اليومي.'),
    ],
    responsibilities: {
      preJoining: [
        ls(
          'Coordinate with HR to understand start date and basic details (buddy is copied in the onboarding email).',
          'التنسيق مع الموارد البشرية لمعرفة تاريخ المباشرة والتفاصيل الأساسية (يتم تضمين الزميل في بريد التهيئة).',
        ),
        ls('Prepare a welcome plan (e.g., coffee chats, first-day lunch if possible).', 'إعداد خطة ترحيبية (مثل لقاءات قهوة أو غداء اليوم الأول إن أمكن).'),
      ],
      firstWeek: [
        ls('Meet with the new hire and offer a workplace tour.', 'الالتقاء بالموظف الجديد وتقديم جولة تعريفية بمكان العمل.'),
        ls(
          'Help set up basic tools (emails, systems access) and guide through onboarding tasks.',
          'المساعدة في إعداد الأدوات الأساسية (البريد الإلكتروني، صلاحيات الأنظمة) والإرشاد خلال مهام التهيئة.',
        ),
        ls('Introduce the new hire to team members and key departments.', 'تعريف الموظف الجديد بأعضاء الفريق والإدارات الرئيسية.'),
      ],
      firstMonth: [
        ls(
          'Schedule regular informal check-ins (e.g., weekly coffee chats or brief catch-ups).',
          'تنظيم لقاءات متابعة غير رسمية بشكل منتظم (مثل لقاء قهوة أسبوعي أو تواصل سريع).',
        ),
        ls(
          'Be available to answer questions, clarify expectations, and assist with challenges.',
          'التواجد للإجابة على الأسئلة وتوضيح التوقعات والمساعدة في التحديات.',
        ),
        ls('Provide insights into department practices and performance expectations.', 'مشاركة معلومات عن أساليب العمل بالقسم وتوقعات الأداء.'),
      ],
      afterFirstMonth: [
        ls('Continue to offer support and guidance as needed.', 'الاستمرار بتقديم الدعم والإرشاد عند الحاجة.'),
        ls('Encourage the new hire’s independence while remaining approachable.', 'تشجيع استقلالية الموظف الجديد مع الاستمرار في سهولة الوصول والتواصل.'),
        ls('Share feedback with HR if any concerns or suggestions arise.', 'مشاركة الملاحظات مع الموارد البشرية عند وجود أي ملاحظات أو اقتراحات.'),
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
        flexTimeWindow: ls('From 7:00 until 8:30', 'من 7:00 حتى 8:30'),
      },
      permissionPolicy: {
        hoursPerMonth: 8,
        maxHoursPerDay: 4,
      },
      publicHolidays: [
        ls('Eid Al Hajj', 'عيد الأضحى'),
        ls('Eid AlFetr', 'عيد الفطر'),
        ls('Foundation Day', 'يوم التأسيس'),
        ls('National Day', 'اليوم الوطني'),
      ],
    },
  },
  toolsAndFacilities: {
    hrSystem: {
      name: ls('ERP or OFOQ (Oracle Applications Cloud shown)', 'نظام الموارد البشرية ERP أو OFOQ (تطبيقات Oracle السحابية)'),
      purpose: ls(
        'Integration between departments and links data and procedures of support departments.',
        'تكامل بين الإدارات وربط البيانات والإجراءات الخاصة بإدارات الدعم.',
      ),
      signInSteps: [
        ls('Use the application link your company gave you to open the sign-in page.', 'استخدم رابط التطبيق الذي وفرته الشركة لفتح صفحة تسجيل الدخول.'),
        ls('Enter your user ID and password.', 'أدخل اسم المستخدم وكلمة المرور.'),
        ls('Click Sign In to land on the home page.', 'اضغط تسجيل الدخول للوصول إلى الصفحة الرئيسية.'),
      ],
    },
    internalPortal: {
      description: ls(
        "Internal portal for employees to facilitate access to necessary information of all company's departments.",
        'بوابة داخلية للموظفين لتسهيل الوصول إلى المعلومات اللازمة لجميع إدارات الشركة.',
      ),
      whatToFind: [
        ls('Brief overview and detailed description of the sector.', 'نبذة مختصرة ووصف تفصيلي للقطاع.'),
        ls('Internal mobility “Step”.', 'التنقل الداخلي «Step». '),
        ls('News and advertisements.', 'الأخبار والإعلانات.'),
      ],
    },
    fingerprintRegistration: {
      when: ls(
        'Once you receive a notification email from Operation team; registration is finalized in the office within 48 hours maximum.',
        'عند استلام بريد إشعار من فريق العمليات؛ يتم إنهاء التسجيل في المكتب خلال 48 ساعة كحد أقصى.',
      ),
    },
    walaPlus: {
      programName: ls('Discount & Offer Program “Wala Plus”', 'برنامج الخصومات والعروض «ولاء بلس»'),
      description: ls(
        'Partnership with loyalty program Wala Plus offering employees and families unlimited access to 1000+ discounts and offers.',
        'شراكة مع برنامج ولاء بلس تتيح للموظفين وعائلاتهم الوصول إلى أكثر من 1000 خصم وعرض.',
      ),
      onboardingNote: ls(
        'Operation team registers you on day 1 and sends an email notification with an attached user guide.',
        'يقوم فريق العمليات بتسجيلك في اليوم الأول وإرسال إشعار عبر البريد مع دليل المستخدم مرفقاً.',
      ),
    },
    shuttleService: {
      description: ls('Shuttle transfer point from Al-Murooj Train Station.', 'نقطة نقل بالحافلة من محطة قطار المروج.'),
    },
    uberService: {
      description: ls(
        'Partnership agreement with Uber Business to provide transportation services for employees of Tatweer companies without additional costs.',
        'اتفاقية شراكة مع Uber Business لتقديم خدمات النقل لموظفي شركات تطوير دون تكاليف إضافية.',
      ),
      coverage: ls(
        'Movement between Tatweer companies (Holding, Talemia, Rafd, TBC, TETCO) and the headquarters of the Ministry of Education.',
        'التنقل بين شركات تطوير (القابضة، تاليميا، رافد، TBC، TETCO) ومقر وزارة التعليم.',
      ),
      criteria: ls('All THC employee', 'جميع موظفي THC'),
    },
  },
} as const

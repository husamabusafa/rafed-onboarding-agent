import type { LocalizedString } from './localization'
import { ls } from './localization'

export type Person = {
  id?: string
  name: string
  title?: LocalizedString
  team?: string
  email?: string
  phone?: string
  bio?: LocalizedString
  message?: LocalizedString
  actions?: BuddyAction[]
}

export type BuddyAction = {
  id: string
  title: LocalizedString
  description: LocalizedString
  messageTemplate: LocalizedString
}

export const tatweerInduction = {
  governanceAndLeadership: {
    thcGroupCeo: {
      id: 'eng-metab-al-shahrani',
      name: 'Eng. Metab Al Shahrani',
      title: ls('THC Group CEO', 'الرئيس التنفيذي لمجموعة THC'),
      bio: ls(
        'Group CEO leading Tatweer’s vision and strategic direction across the group.',
        'الرئيس التنفيذي للمجموعة، يقود رؤية تطوير والاتجاه الاستراتيجي على مستوى المجموعة.',
      ),
      message: ls(
        'Together, we enhance education, empower a globally competitive generation, and build a lasting impact.\n\nWelcome to the Tatweer family — we look forward to seeing you thrive from day one.',
        'معًا نعمل على تطوير التعليم وتمكين جيل منافس عالميًا وصناعة أثر مستدام.\n\nمرحبًا بك ضمن فريق تطوير — نتطلع لرحلة مميزة معك من اليوم الأول.',
      ),
    } satisfies Person,
    groupCeos: [
      {
        id: 'eng-metab-al-shahrani',
        name: 'Eng. Metab Al Shahrani',
        title: ls('Group CEO', 'الرئيس التنفيذي'),
        bio: ls('Group executive leadership.', 'قيادة تنفيذية على مستوى المجموعة.'),
      },
      {
        id: 'mr-mohammed-alhizam',
        name: 'Mr. Mohammed AlHizam',
        title: ls('Group CEO', 'الرئيس التنفيذي'),
        bio: ls('Group executive leadership.', 'قيادة تنفيذية على مستوى المجموعة.'),
      },
      {
        id: 'eng-fahad-al-solaie',
        name: 'Eng. Fahad Al Solaie',
        title: ls('Group CEO', 'الرئيس التنفيذي'),
        bio: ls('Group executive leadership.', 'قيادة تنفيذية على مستوى المجموعة.'),
      },
      {
        id: 'eng-omar-al-suwaiyan',
        name: 'Eng. Omar Al Suwaiyan',
        title: ls('Group CEO', 'الرئيس التنفيذي'),
        bio: ls('Group executive leadership.', 'قيادة تنفيذية على مستوى المجموعة.'),
      },
      {
        id: 'eng-mohamed-al-mehiemeed',
        name: 'Eng. Mohamed Al Mehiemeed',
        title: ls('Group CEO', 'الرئيس التنفيذي'),
        bio: ls('Group executive leadership.', 'قيادة تنفيذية على مستوى المجموعة.'),
      },
    ] satisfies Person[],
    tatweersLeaders: [
      {
        id: 'adel-al-obailan',
        name: 'Adel Al Obailan',
        title: ls('Corporate Communication Executive Director', 'المدير التنفيذي للاتصال المؤسسي'),
        bio: ls('Leads corporate communications and internal engagement.', 'يقود الاتصال المؤسسي والتواصل الداخلي وبناء الصورة المؤسسية.'),
      },
      {
        id: 'talal-al-rumayaan',
        name: 'Talal Al Rumayaan',
        title: ls('Legal Affairs VP', 'نائب الرئيس للشؤون القانونية'),
        bio: ls('Oversees legal affairs and governance support.', 'يشرف على الشؤون القانونية ودعم الحوكمة.'),
      },
      {
        id: 'ehab-mufti',
        name: 'Ehab Mufti',
        title: ls('Chief Shared Services Officer', 'الرئيس التنفيذي للخدمات المشتركة'),
        bio: ls('Leads shared services enabling day-to-day operations.', 'يقود الخدمات المشتركة الداعمة لتشغيل الأعمال اليومية.'),
      },
      {
        id: 'anwar-al-khuraimi',
        name: 'Anwar Al Khuraimi',
        title: ls('Chief Internal Audit Officer', 'الرئيس التنفيذي للتدقيق الداخلي'),
        bio: ls('Leads internal audit and assurance activities.', 'يقود أنشطة التدقيق الداخلي والتأكد والالتزام.'),
      },
      {
        id: 'amro-al-tamimi',
        name: 'Amro Al Tamimi',
        title: ls('Group Chief Finance Officer', 'الرئيس التنفيذي المالي للمجموعة'),
        bio: ls('Oversees group finance and financial planning.', 'يشرف على المالية والتخطيط المالي على مستوى المجموعة.'),
      },
      {
        id: 'bandar-subaih',
        name: 'Bandar Subaih',
        title: ls('GRC Vice President', 'نائب الرئيس للحوكمة والمخاطر والالتزام'),
        bio: ls('Leads governance, risk, and compliance programs.', 'يقود برامج الحوكمة وإدارة المخاطر والالتزام.'),
      },
      {
        id: 'abdulrahman-al-sebaiheen',
        name: 'Abdulrahman Al Sebaiheen',
        title: ls('Chief Corporate Strategy and Transformation Officer', 'الرئيس التنفيذي لاستراتيجية الشركة والتحول'),
        bio: ls('Leads strategy and transformation initiatives.', 'يقود مبادرات الاستراتيجية والتحول.'),
      },
      {
        id: 'hamad-al-jarboou',
        name: 'Hamad Al Jarboou',
        title: ls(
          'Chief Business Development, Portfolio Management, and Investment Officer',
          'الرئيس التنفيذي لتطوير الأعمال وإدارة المحافظ والاستثمار',
        ),
        bio: ls('Leads business development, portfolio and investments.', 'يقود تطوير الأعمال وإدارة المحافظ والاستثمار.'),
      },
      {
        id: 'sultan-altamimi',
        name: 'Sultan AlTamimi',
        title: ls('Chief Human Capital Officer', 'الرئيس التنفيذي لرأس المال البشري'),
        bio: ls('Leads human capital and people experience.', 'يقود رأس المال البشري وتجربة الموظف.'),
      },
    ] satisfies Person[],
    talentAcquisitionAndOnboardingTeam: [
      {
        id: 'omar-al-ekresh',
        name: 'Omar Al Ekresh',
        title: ls('Talent Acquisition Director', 'مدير استقطاب المواهب'),
        bio: ls('Your contact for talent acquisition and onboarding guidance.', 'جهة تواصلك لاستقطاب المواهب ودعم التهيئة.'),
      },
      {
        id: 'ghaida-al-fawaz-ta',
        name: 'Ghaida Al Fawaz',
        title: ls('Sr. Talent Acquisition Specialist', 'أخصائي أول استقطاب المواهب'),
        bio: ls('Supports onboarding coordination and new hire readiness.', 'تدعم تنسيق التهيئة وجاهزية الموظف الجديد.'),
      },
      {
        id: 'modhi-al-mousa',
        name: 'Modhi Al. Mousa',
        title: ls('Talent Acquisition Associate Expert', 'خبير مشارك استقطاب المواهب'),
        bio: ls('Supports talent acquisition operations and onboarding requests.', 'تدعم عمليات استقطاب المواهب وطلبات التهيئة.'),
      },
    ] satisfies Person[],
  },
  buddyProgram: {
    objective: ls(
      'Ensure new hires have a smooth transition and feel supported during onboarding by providing a knowledgeable and approachable buddy.',
      'ضمان انتقال سلس للموظفين الجدد وشعورهم بالدعم خلال فترة التهيئة، عبر توفير زميل مساند يمتلك المعرفة وسهل التواصل.',
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
      {
        id: 'bejad-al-muraibadh',
        name: 'Bejad Al Muraibadh',
        team: 'GRC',
        email: 'bejad.al-muraibadh@tetco.sa',
        phone: '+966500000101',
        bio: ls(
          'GRC buddy helping you navigate policies, approvals, and onboarding compliance.',
          'زميلك من إدارة الحوكمة والمخاطر والالتزام لمساعدتك في السياسات والموافقات ومتطلبات الالتزام خلال التهيئة.',
        ),
        actions: [
          {
            id: 'nda-ethics',
            title: ls('NDA & Code of Ethics', 'اتفاقية عدم الإفصاح ومدوّنة أخلاقيات العمل'),
            description: ls(
              'Get help completing and confirming the required documents.',
              'مساعدتك في استكمال المستندات المطلوبة والتأكد من اكتمالها.',
            ),
            messageTemplate: ls(
              'Hi Bejad, could you please help me with the required documents (NDA & Code of Ethics) and confirm the next steps?',
              'مرحبًا بجاد، ممكن تساعدني في المستندات المطلوبة (اتفاقية عدم الإفصاح ومدوّنة أخلاقيات العمل) وتوضيح الخطوات التالية؟',
            ),
          },
          {
            id: 'compliance-qa',
            title: ls('Compliance Q&A', 'استفسارات الالتزام'),
            description: ls(
              'Ask questions about policies, approvals, and compliance expectations.',
              'الإجابة عن استفسارات السياسات والموافقات ومتطلبات الالتزام.',
            ),
            messageTemplate: ls(
              'Hi Bejad, I have a quick question about onboarding compliance and required approvals. When would be a good time to discuss?',
              'مرحبًا بجاد، لدي استفسار سريع حول متطلبات الالتزام والموافقات خلال التهيئة. متى يكون مناسبًا للحديث؟',
            ),
          },
        ],
      },
      {
        id: 'abdulmajid-al-othman',
        name: 'Abdulmajid Al Othman',
        team: 'LEGAL',
        email: 'abdulmajid.al-othman@tetco.sa',
        phone: '+966500000102',
        bio: ls(
          'Legal buddy helping with agreements and policy clarifications.',
          'زميلك من الإدارة القانونية لمساعدتك في الاتفاقيات وتوضيح السياسات ذات العلاقة.',
        ),
        actions: [
          {
            id: 'nda-review',
            title: ls('Review NDA questions', 'مراجعة استفسارات اتفاقية عدم الإفصاح'),
            description: ls('Clarify any NDA-related questions before signing.', 'توضيح أي استفسارات تخص اتفاقية عدم الإفصاح قبل التوقيع.'),
            messageTemplate: ls(
              'Hi Abdulmajid, I have a few questions about the NDA before signing. Can we review them together?',
              'مرحبًا عبدالمجيد، لدي بعض الاستفسارات حول اتفاقية عدم الإفصاح قبل التوقيع. هل يمكن مراجعتها معًا؟',
            ),
          },
          {
            id: 'policy-clarification',
            title: ls('Policy clarification', 'توضيح سياسات'),
            description: ls('Get a quick explanation of policy wording and expectations.', 'الحصول على توضيح سريع لصياغة السياسات وما المتوقع.'),
            messageTemplate: ls(
              'Hi Abdulmajid, could you clarify a policy item for me? I want to make sure I understand it correctly.',
              'مرحبًا عبدالمجيد، هل يمكن توضيح بند في إحدى السياسات؟ أود التأكد من فهمه بالشكل الصحيح.',
            ),
          },
        ],
      },
      {
        id: 'ghaida-al-fawaz',
        name: 'Ghaida Al Fawaz',
        team: 'HC',
        email: 'ghaida.al-fawaz@tetco.sa',
        phone: '+966500000103',
        bio: ls(
          'Human Capital buddy helping with onboarding steps, HR systems, and benefits guidance.',
          'زميلتك من رأس المال البشري لمساعدتك في خطوات التهيئة وأنظمة الموارد البشرية وإرشادات المزايا.',
        ),
        actions: [
          {
            id: 'hr-system',
            title: ls('HR system access', 'الدخول إلى نظام الموارد البشرية'),
            description: ls('Get support signing in and locating key HR services.', 'مساعدتك في تسجيل الدخول والوصول إلى الخدمات الأساسية.'),
            messageTemplate: ls(
              'Hi Ghaida, could you help me with HR system access and where to find the key onboarding services?',
              'مرحبًا غيداء، ممكن تساعديني في الدخول إلى نظام الموارد البشرية وأين أجد خدمات التهيئة الأساسية؟',
            ),
          },
          {
            id: 'benefits',
            title: ls('Benefits & leaves', 'المزايا والإجازات'),
            description: ls('Ask about benefits, leaves, and HR policies.', 'الاستفسار عن المزايا والإجازات وسياسات الموارد البشرية.'),
            messageTemplate: ls(
              'Hi Ghaida, I have a question about benefits and leave policies. Could you guide me to the right place?',
              'مرحبًا غيداء، لدي استفسار حول المزايا وسياسات الإجازات. هل يمكنك إرشادي إلى المكان المناسب؟',
            ),
          },
        ],
      },
      {
        id: 'najd-al-otaibi',
        name: 'Najd Al Otaibi',
        team: 'Corporate Communication',
        email: 'najd.al-otaibi@tetco.sa',
        phone: '+966500000104',
        bio: ls(
          'Corporate communications buddy helping you understand culture, channels, and internal announcements.',
          'زميلتك في الاتصال المؤسسي لمساعدتك على فهم الثقافة والقنوات الداخلية وآلية الإعلانات.',
        ),
        actions: [
          {
            id: 'channels',
            title: ls('Communication channels', 'قنوات التواصل'),
            description: ls('Learn the main internal channels and how to stay updated.', 'التعرّف على قنوات التواصل الداخلية وكيف تتابع المستجدات.'),
            messageTemplate: ls(
              'Hi Najd, could you share the main internal communication channels and how I can follow announcements?',
              'مرحبًا نجد، هل يمكنك مشاركة أهم قنوات التواصل الداخلية وكيف يمكنني متابعة الإعلانات والمستجدات؟',
            ),
          },
          {
            id: 'culture',
            title: ls('Culture & etiquette', 'الثقافة وآداب العمل'),
            description: ls('Ask about culture, meeting etiquette, and best practices.', 'الاستفسار عن الثقافة وآداب الاجتماعات وأفضل الممارسات.'),
            messageTemplate: ls(
              'Hi Najd, I’d love a quick overview of company culture and meeting etiquette. When can we chat?',
              'مرحبًا نجد، أود لمحة سريعة عن ثقافة الشركة وآداب الاجتماعات. متى يمكننا الحديث؟',
            ),
          },
        ],
      },
      {
        id: 'mohammed-al-sharari',
        name: 'Mohammed Al Sharari',
        team: 'Shared Services',
        email: 'mohammed.al-sharari@tetco.sa',
        phone: '+966500000105',
        bio: ls(
          'Shared services buddy helping with facilities, access, and day-to-day admin requests.',
          'زميلك في الخدمات المشتركة لمساعدتك في المرافق وتصاريح الوصول والطلبات الإدارية اليومية.',
        ),
        actions: [
          {
            id: 'access-badge',
            title: ls('Access & badge setup', 'تصاريح الدخول والبطاقة'),
            description: ls('Get help with access permissions and badge-related requests.', 'مساعدتك في تصاريح الدخول وما يتعلق بالبطاقة.'),
            messageTemplate: ls(
              'Hi Mohammed, could you help me with access permissions / badge related steps for onboarding?',
              'مرحبًا محمد، ممكن تساعدني في خطوات تصاريح الدخول/البطاقة ضمن التهيئة؟',
            ),
          },
          {
            id: 'facilities',
            title: ls('Facilities support', 'دعم المرافق'),
            description: ls('Ask about office facilities and available services.', 'الاستفسار عن مرافق المكتب والخدمات المتاحة.'),
            messageTemplate: ls(
              'Hi Mohammed, could you guide me on office facilities and how to request support if needed?',
              'مرحبًا محمد، هل يمكنك إرشادي حول مرافق المكتب وكيف أطلب الدعم عند الحاجة؟',
            ),
          },
        ],
      },
      {
        id: 'fahd-al-owardhi',
        name: 'Fahd Al Owardhi',
        team: 'Internal Audit',
        email: 'fahd.al-owardhi@tetco.sa',
        phone: '+966500000106',
        bio: ls(
          'Internal audit buddy helping you understand governance, controls, and how processes work.',
          'زميلك في التدقيق الداخلي لمساعدتك في فهم الحوكمة والضوابط وكيفية سير الإجراءات.',
        ),
        actions: [
          {
            id: 'processes',
            title: ls('Process walkthrough', 'شرح الإجراءات'),
            description: ls('Walk through how internal processes and controls are applied.', 'شرح كيفية تطبيق الإجراءات والضوابط الداخلية.'),
            messageTemplate: ls(
              'Hi Fahd, could you walk me through the key processes/controls I should be aware of in my first weeks?',
              'مرحبًا فهد، هل يمكن شرح أهم الإجراءات/الضوابط التي يجدر بي معرفتها خلال الأسابيع الأولى؟',
            ),
          },
          {
            id: 'best-practices',
            title: ls('Best practices', 'أفضل الممارسات'),
            description: ls('Share best practices for documentation and compliance.', 'مشاركة أفضل الممارسات في التوثيق والالتزام.'),
            messageTemplate: ls(
              'Hi Fahd, do you have best practices for documentation and compliance that you recommend for new hires?',
              'مرحبًا فهد، هل لديك أفضل ممارسات للتوثيق والالتزام تنصح بها للموظفين الجدد؟',
            ),
          },
        ],
      },
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
        ls('Internal mobility “Step”.', 'التنقّل الداخلي (Step).'),
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

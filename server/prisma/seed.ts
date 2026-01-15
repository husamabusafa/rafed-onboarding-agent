import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Regions
  const regions = await Promise.all([
    prisma.region.create({ data: { code: 'HO', nameAr: 'المقر الرئيسي', nameEn: 'Head Office' } }),
    prisma.region.create({ data: { code: 'RYD', nameAr: 'الرياض', nameEn: 'Riyadh' } }),
    prisma.region.create({ data: { code: 'MKH', nameAr: 'مكة', nameEn: 'Makkah' } }),
    prisma.region.create({ data: { code: 'MDN', nameAr: 'المدينة', nameEn: 'Madinah' } }),
    prisma.region.create({ data: { code: 'EST', nameAr: 'الشرقية', nameEn: 'Eastern' } }),
  ]);
  console.log('✅ Regions created');

  // Create Divisions
  const divisions = await Promise.all([
    prisma.division.create({ data: { nameAr: 'تقنية المعلومات', nameEn: 'Information Technology' } }),
    prisma.division.create({ data: { nameAr: 'الموارد البشرية', nameEn: 'Human Resources' } }),
    prisma.division.create({ data: { nameAr: 'المالية', nameEn: 'Finance' } }),
    prisma.division.create({ data: { nameAr: 'العمليات', nameEn: 'Operations' } }),
  ]);
  console.log('✅ Divisions created');

  // Create Departments
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        nameAr: 'تطوير البرمجيات',
        nameEn: 'Software Development',
        headCount: 25,
        manager: 'Ahmed Al-Salem',
        divisionId: divisions[0].id,
        regionId: regions[0].id,
      },
    }),
    prisma.department.create({
      data: {
        nameAr: 'التوظيف والتطوير',
        nameEn: 'Recruitment & Development',
        headCount: 15,
        manager: 'Fatima Al-Harbi',
        divisionId: divisions[1].id,
        regionId: regions[0].id,
      },
    }),
    prisma.department.create({
      data: {
        nameAr: 'المحاسبة',
        nameEn: 'Accounting',
        headCount: 12,
        manager: 'Mohammed Al-Otaibi',
        divisionId: divisions[2].id,
        regionId: regions[0].id,
      },
    }),
  ]);
  console.log('✅ Departments created');

  // Create Employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        empId: 1001,
        nameAr: 'أحمد محمد السالم',
        nameEn: 'Ahmed Mohammed Al-Salem',
        positionAr: 'مدير تطوير البرمجيات',
        positionEn: 'Software Development Manager',
        email: 'ahmed.salem@company.sa',
        mobile: '+966501234567',
        departmentId: departments[0].id,
        divisionId: divisions[0].id,
        regionId: regions[0].id,
        employeeLevel: 'EXECUTIVE_14_19',
        jobFamily: 'Technology',
        location: 'Head Office',
        onboardingStage: 'POST_JOINING',
        probationStart: new Date('2024-01-15'),
        probationEnd: new Date('2024-04-15'),
      },
    }),
    prisma.employee.create({
      data: {
        empId: 1002,
        nameAr: 'فاطمة عبدالله الحربي',
        nameEn: 'Fatima Abdullah Al-Harbi',
        positionAr: 'مديرة التوظيف والتطوير',
        positionEn: 'Recruitment & Development Manager',
        email: 'fatima.harbi@company.sa',
        mobile: '+966502345678',
        departmentId: departments[1].id,
        divisionId: divisions[1].id,
        regionId: regions[0].id,
        employeeLevel: 'EXECUTIVE_14_19',
        jobFamily: 'Human Capital',
        location: 'Head Office',
        onboardingStage: 'POST_JOINING',
      },
    }),
    prisma.employee.create({
      data: {
        empId: 1003,
        nameAr: 'محمد سعد العتيبي',
        nameEn: 'Mohammed Saad Al-Otaibi',
        positionAr: 'مدير المحاسبة',
        positionEn: 'Accounting Manager',
        email: 'mohammed.otaibi@company.sa',
        mobile: '+966503456789',
        departmentId: departments[2].id,
        divisionId: divisions[2].id,
        regionId: regions[0].id,
        employeeLevel: 'EXECUTIVE_14_19',
        jobFamily: 'Finance',
        location: 'Head Office',
        onboardingStage: 'FIRST_DAY',
        probationStart: new Date(),
        probationEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.employee.create({
      data: {
        empId: 1004,
        nameAr: 'سارة خالد القحطاني',
        nameEn: 'Sarah Khaled Al-Qahtani',
        positionAr: 'مطورة برمجيات',
        positionEn: 'Software Developer',
        email: 'sarah.qahtani@company.sa',
        mobile: '+966504567890',
        departmentId: departments[0].id,
        divisionId: divisions[0].id,
        regionId: regions[1].id,
        employeeLevel: 'STAFF_1_13',
        jobFamily: 'Technology',
        location: 'Riyadh Office',
        onboardingStage: 'PRE_JOINING',
        joiningDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.employee.create({
      data: {
        empId: 1005,
        nameAr: 'عبدالرحمن علي الشهري',
        nameEn: 'Abdulrahman Ali Al-Shehri',
        positionAr: 'محلل موارد بشرية',
        positionEn: 'HR Analyst',
        email: 'abdulrahman.shehri@company.sa',
        mobile: '+966505678901',
        departmentId: departments[1].id,
        divisionId: divisions[1].id,
        regionId: regions[0].id,
        employeeLevel: 'STAFF_1_13',
        jobFamily: 'Human Capital',
        location: 'Head Office',
        onboardingStage: 'POST_JOINING',
        probationStart: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        probationEnd: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);
  console.log('✅ Employees created');

  const onboardingPlanTemplate = await prisma.onboardingPlanTemplate.create({
    data: {
      nameAr: 'خطة تهيئة الموظف الجديد',
      nameEn: 'New Hire Onboarding Plan',
      descriptionAr: 'خطة تهيئة شاملة للانضمام والعمل خلال أول 90 يوماً.',
      descriptionEn: 'Comprehensive onboarding plan for the first 90 days.',
      targetAudience: 'ALL_NEW_EMPLOYEES',
      defaultDurationDays: 90,
      tasks: {
        create: [
          {
            stage: 'PRE_JOINING',
            taskAr: 'إرسال الوثائق المطلوبة',
            taskEn: 'Submit required documents',
            ownerType: 'EMPLOYEE',
            slaDays: 7,
            priority: 'HIGH',
          },
          {
            stage: 'FIRST_DAY',
            taskAr: 'إعداد البريد الإلكتروني',
            taskEn: 'Email setup',
            ownerType: 'IT',
            slaDays: 1,
            priority: 'HIGH',
          },
          {
            stage: 'FIRST_DAY',
            taskAr: 'استلام بطاقة الهوية',
            taskEn: 'Receive ID badge',
            ownerType: 'HR',
            slaDays: 1,
            priority: 'HIGH',
          },
          {
            stage: 'POST_JOINING',
            taskAr: 'حضور ورشة التوجيه',
            taskEn: 'Attend orientation workshop',
            ownerType: 'HR',
            slaDays: 14,
            priority: 'MEDIUM',
          },
        ],
      },
    },
  });
  console.log('✅ Onboarding plan template created');

  const onboardingPlan = await prisma.onboardingPlan.create({
    data: {
      employeeId: employees[2].id,
      templateId: onboardingPlanTemplate.id,
      status: 'ACTIVE',
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  });
  console.log('✅ Onboarding plan assigned');

  await prisma.policyAcknowledgment.createMany({
    data: [
      {
        employeeId: employees[2].id,
        policyName: 'Code of Conduct',
        policyVersion: 'v2.1',
        policyGroup: 'HR',
        status: 'PENDING',
        requiredBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        employeeId: employees[2].id,
        policyName: 'Cybersecurity Essentials',
        policyVersion: 'v1.4',
        policyGroup: 'IT',
        status: 'ACKNOWLEDGED',
        acknowledgedAt: new Date(),
      },
    ],
  });
  console.log('✅ Policy acknowledgments created');

  const trainingModules = await prisma.trainingModule.createMany({
    data: [
      {
        code: 'HR-INTRO-001',
        titleAr: 'تعريف بنظام الموارد البشرية',
        titleEn: 'HR Systems Overview',
        descriptionAr: 'مقدمة حول الأنظمة والبوابات الأساسية.',
        descriptionEn: 'Overview of core HR systems and portals.',
        durationMinutes: 60,
        stage: 'FIRST_DAY',
        required: true,
        targetAudience: 'ALL_NEW_EMPLOYEES',
        provider: 'HR Team',
      },
      {
        code: 'SEC-ONB-101',
        titleAr: 'أساسيات الأمن السيبراني',
        titleEn: 'Cybersecurity Basics',
        descriptionAr: 'أفضل الممارسات للأمان الرقمي.',
        descriptionEn: 'Best practices for digital security.',
        durationMinutes: 45,
        stage: 'POST_JOINING',
        required: true,
        targetAudience: 'ALL_NEW_EMPLOYEES',
        provider: 'Cybersecurity Office',
      },
    ],
  });
  console.log('✅ Training modules created');

  const hrModule = await prisma.trainingModule.findUnique({ where: { code: 'HR-INTRO-001' } });
  if (hrModule) {
    await prisma.trainingCompletion.create({
      data: {
        employeeId: employees[2].id,
        moduleId: hrModule.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        score: 95,
      },
    });
  }
  console.log('✅ Training completions created');

  await prisma.checkIn.createMany({
    data: [
      {
        employeeId: employees[2].id,
        checkInType: 'BUDDY',
        conductedBy: 'Bejad Al Muraibadh',
        notes: 'First week check-in completed.',
        completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        employeeId: employees[2].id,
        checkInType: 'MANAGER',
        conductedBy: 'Mohammed Al-Otaibi',
        notes: 'Discussed role expectations and 30-day goals.',
        completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
  });
  console.log('✅ Check-ins created');

  await prisma.onboardingEvent.createMany({
    data: [
      {
        employeeId: employees[2].id,
        eventType: 'PLAN_ASSIGNED',
        stage: 'PRE_JOINING',
        payload: { planId: onboardingPlan.id },
      },
      {
        employeeId: employees[2].id,
        eventType: 'TRAINING_COMPLETED',
        stage: 'FIRST_DAY',
        payload: { moduleCode: 'HR-INTRO-001' },
      },
    ],
  });
  console.log('✅ Onboarding events created');

  // Create Menu Categories and Items
  const teaCategory = await prisma.menuCategory.create({
    data: {
      nameAr: 'الشاي والأعشاب',
      nameEn: 'Teas & Herbal Infusions',
      items: {
        create: [
          {
            nameAr: 'شاي أخضر',
            nameEn: 'Green Tea',
            descriptionAr: 'شاي أخضر عضوي منعش',
            descriptionEn: 'Refreshing organic green tea',
            caffeineLevel: 'MEDIUM',
            type: 'HOT',
          },
          {
            nameAr: 'شاي بالنعناع',
            nameEn: 'Mint Tea',
            descriptionAr: 'شاي بالنعناع الطازج',
            descriptionEn: 'Fresh mint tea',
            caffeineLevel: 'LOW',
            type: 'HOT',
          },
          {
            nameAr: 'شاي بالزنجبيل',
            nameEn: 'Ginger Tea',
            descriptionAr: 'شاي بالزنجبيل المنعش',
            descriptionEn: 'Refreshing ginger tea',
            caffeineLevel: 'NONE',
            type: 'HOT',
          },
          {
            nameAr: 'شاي باليانسون',
            nameEn: 'Anise Tea',
            descriptionAr: 'شاي باليانسون الدافئ',
            descriptionEn: 'Warm anise tea',
            caffeineLevel: 'NONE',
            type: 'HOT',
          },
        ],
      },
    },
  });

  const coffeeCategory = await prisma.menuCategory.create({
    data: {
      nameAr: 'القهوة',
      nameEn: 'Coffee',
      items: {
        create: [
          {
            nameAr: 'قهوة عربية',
            nameEn: 'Arabic Coffee',
            descriptionAr: 'قهوة عربية تقليدية',
            descriptionEn: 'Traditional Arabic coffee',
            caffeineLevel: 'MEDIUM',
            type: 'HOT',
          },
          {
            nameAr: 'كابتشينو',
            nameEn: 'Cappuccino',
            descriptionAr: 'كابتشينو إيطالي كلاسيكي',
            descriptionEn: 'Classic Italian cappuccino',
            caffeineLevel: 'HIGH',
            type: 'HOT',
          },
          {
            nameAr: 'لاتيه',
            nameEn: 'Latte',
            descriptionAr: 'لاتيه بالحليب',
            descriptionEn: 'Smooth milk latte',
            caffeineLevel: 'MEDIUM',
            type: 'HOT',
          },
          {
            nameAr: 'إسبريسو',
            nameEn: 'Espresso',
            descriptionAr: 'إسبريسو مركز',
            descriptionEn: 'Strong espresso shot',
            caffeineLevel: 'HIGH',
            type: 'HOT',
          },
        ],
      },
    },
  });

  const juiceCategory = await prisma.menuCategory.create({
    data: {
      nameAr: 'العصائر والمشروبات الباردة',
      nameEn: 'Juices & Cold Drinks',
      items: {
        create: [
          {
            nameAr: 'عصير برتقال طازج',
            nameEn: 'Fresh Orange Juice',
            descriptionAr: 'عصير برتقال طبيعي 100%',
            descriptionEn: '100% natural orange juice',
            caffeineLevel: 'NONE',
            type: 'COLD',
          },
          {
            nameAr: 'عصير المانجو',
            nameEn: 'Mango Juice',
            descriptionAr: 'عصير مانجو استوائي',
            descriptionEn: 'Tropical mango juice',
            caffeineLevel: 'NONE',
            type: 'COLD',
          },
          {
            nameAr: 'ليمون بالنعناع',
            nameEn: 'Lemon Mint',
            descriptionAr: 'ليمون بالنعناع المنعش',
            descriptionEn: 'Refreshing lemon mint drink',
            caffeineLevel: 'NONE',
            type: 'COLD',
          },
          {
            nameAr: 'قهوة باردة',
            nameEn: 'Iced Coffee',
            descriptionAr: 'قهوة باردة مع الحليب',
            descriptionEn: 'Cold coffee with milk',
            caffeineLevel: 'HIGH',
            type: 'COLD',
          },
        ],
      },
    },
  });
  console.log('✅ Cafeteria menu created');

  // Create Holidays
  const holidays = await prisma.holiday.createMany({
    data: [
      {
        date: new Date('2026-02-22'),
        nameEn: 'Founding Day',
        nameAr: 'يوم التأسيس',
        month: 2,
        year: 2026,
      },
      {
        startDate: new Date('2026-03-31'),
        endDate: new Date('2026-04-03'),
        nameEn: 'Eid Al-Fitr',
        nameAr: 'عيد الفطر',
        month: 3,
        year: 2026,
      },
      {
        date: new Date('2026-09-23'),
        nameEn: 'National Day',
        nameAr: 'اليوم الوطني',
        month: 9,
        year: 2026,
      },
      {
        startDate: new Date('2026-06-08'),
        endDate: new Date('2026-06-11'),
        nameEn: 'Eid Al-Adha',
        nameAr: 'عيد الأضحى',
        month: 6,
        year: 2026,
      },
      {
        date: new Date('2026-01-01'),
        nameEn: 'New Year',
        nameAr: 'رأس السنة',
        month: 1,
        year: 2026,
      },
    ],
  });
  console.log('✅ Holidays created');

  // Create Attendance Records
  await prisma.attendanceRecord.create({
    data: {
      employeeId: employees[0].id,
      date: new Date(),
      checkInTime: new Date(new Date().setHours(8, 30, 0, 0)),
      checkOutTime: new Date(new Date().setHours(17, 0, 0, 0)),
      status: 'PRESENT',
      location: 'Main Office',
      biometricVerified: true,
      hoursWorked: 8.5,
    },
  });
  console.log('✅ Attendance records created');

  // Create Onboarding Tasks
  await prisma.onboardingTask.createMany({
    data: [
      {
        employeeId: employees[2].id,
        stage: 'FIRST_DAY',
        taskAr: 'استلام بطاقة الهوية',
        taskEn: 'Receive ID Badge',
        responsibleParty: 'HR',
        ownerType: 'HR',
        planId: onboardingPlan.id,
        status: 'COMPLETED',
        priority: 'HIGH',
        completedDate: new Date(),
      },
      {
        employeeId: employees[2].id,
        stage: 'FIRST_DAY',
        taskAr: 'إعداد البريد الإلكتروني',
        taskEn: 'Email Setup',
        responsibleParty: 'IT',
        ownerType: 'IT',
        planId: onboardingPlan.id,
        status: 'IN_PROGRESS',
        priority: 'HIGH',
      },
      {
        employeeId: employees[2].id,
        stage: 'POST_JOINING',
        taskAr: 'حضور ورشة التوجيه',
        taskEn: 'Attend Orientation Workshop',
        responsibleParty: 'HR',
        ownerType: 'HR',
        planId: onboardingPlan.id,
        status: 'PENDING',
        priority: 'MEDIUM',
      },
      {
        employeeId: employees[3].id,
        stage: 'PRE_JOINING',
        taskAr: 'إرسال الوثائق المطلوبة',
        taskEn: 'Submit Required Documents',
        responsibleParty: 'New Employee',
        ownerType: 'EMPLOYEE',
        status: 'PENDING',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
      {
        employeeId: employees[3].id,
        stage: 'PRE_JOINING',
        taskAr: 'إكمال الفحص الطبي',
        taskEn: 'Complete Medical Examination',
        responsibleParty: 'New Employee',
        ownerType: 'EMPLOYEE',
        status: 'PENDING',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        employeeId: employees[4].id,
        stage: 'POST_JOINING',
        taskAr: 'إعداد خطة التطوير',
        taskEn: 'Set Up Development Plan',
        responsibleParty: 'Manager',
        ownerType: 'MANAGER',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
      },
    ],
  });
  console.log('✅ Onboarding tasks created');

  // Create Internal Contacts
  await prisma.internalContact.createMany({
    data: [
      {
        departmentAr: 'تقنية المعلومات',
        departmentEn: 'IT Support',
        serviceType: 'Technical Support',
        contactPerson: 'IT Help Desk',
        email: 'itsupport@company.sa',
        phone: '+966112345678',
        extension: '1234',
        location: 'Building A, Floor 3',
        availability: '8:00 AM - 5:00 PM',
        category: 'IT',
      },
      {
        departmentAr: 'الموارد البشرية',
        departmentEn: 'Human Resources',
        serviceType: 'Employee Relations',
        contactPerson: 'HR Department',
        email: 'hr@company.sa',
        phone: '+966112345679',
        extension: '1235',
        location: 'Building A, Floor 2',
        availability: '8:00 AM - 4:00 PM',
        category: 'HR',
      },
    ],
  });
  console.log('✅ Internal contacts created');

  // Create ID Badge for new employee
  await prisma.idBadge.create({
    data: {
      employeeId: employees[2].id,
      status: 'IN_PRODUCTION',
      photoSubmitted: true,
      productionDate: new Date(),
      pickupLocation: 'HR Department',
      accessLevels: ['Building A', 'Floor 1-3', 'Cafeteria'],
    },
  });
  console.log('✅ ID Badge created');

  // Create Email Setup
  await prisma.emailSetup.create({
    data: {
      employeeId: employees[2].id,
      emailAddress: 'mohammed.otaibi@company.sa',
      status: 'CREATED',
      accountType: 'STANDARD',
      creationDate: new Date(),
      accessGroups: ['All Employees', 'Finance Team'],
      mobileDeviceConfigured: false,
      setupInstructions: 'Check your email for setup instructions',
    },
  });
  console.log('✅ Email setup created');

  // Create Orientation Workshop
  const workshop = await prisma.orientationWorkshop.create({
    data: {
      titleAr: 'التوجيه للموظفين الجدد',
      titleEn: 'New Employee Orientation',
      descriptionAr: 'ورشة عمل شاملة للموظفين الجدد',
      descriptionEn: 'Comprehensive workshop for new employees',
      workshopType: 'COMPANY_INTRODUCTION',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      startTime: '09:00',
      endTime: '12:00',
      location: 'Training Room A',
      facilitator: 'HR Team',
      maxAttendees: 20,
      currentAttendees: 5,
      isRequired: true,
      targetAudience: 'ALL_NEW_EMPLOYEES',
      registrationStatus: 'OPEN',
    },
  });
  console.log('✅ Orientation workshop created');

  // Create Benefits
  await prisma.benefits.create({
    data: {
      employeeId: employees[2].id,
      basicSalary: 15000,
      totalPackage: 18000,
      allowances: {
        housing: 2000,
        transportation: 1000,
      },
      insuranceProvider: 'Saudi Insurance Company',
      insurancePolicyNumber: 'POL-2026-001',
      insuranceCoverage: 'EMPLOYEE_ONLY',
      dependentsCount: 0,
      insuranceStartDate: new Date(),
      insuranceEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      insuranceCardIssued: false,
      leaveEntitlements: {
        annual: { total: 21, used: 0, remaining: 21 },
        sick: { total: 10, used: 0, remaining: 10 },
      },
      reviewCycle: 'Annual',
      nextReviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });
  console.log('✅ Benefits created');

  // Create Probation Evaluation
  await prisma.probationEvaluation.create({
    data: {
      employeeId: employees[2].id,
      evaluationType: 'DAY_30',
      scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      evaluator: 'Mohammed Al-Otaibi',
    },
  });
  console.log('✅ Probation evaluation created');

  // Create Probation Milestones
  await prisma.probationMilestone.createMany({
    data: [
      {
        employeeId: employees[2].id,
        nameAr: 'إكمال التدريب الأساسي',
        nameEn: 'Complete Basic Training',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        employeeId: employees[2].id,
        nameAr: 'مراجعة الأداء الأولى',
        nameEn: 'First Performance Review',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        employeeId: employees[2].id,
        nameAr: 'إنجاز المشروع التدريبي',
        nameEn: 'Complete Training Project',
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        completed: false,
      },
      {
        employeeId: employees[4].id,
        nameAr: 'فهم العمليات الرئيسية',
        nameEn: 'Understand Core Processes',
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        completed: false,
      },
    ],
  });
  console.log('✅ Probation milestones created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

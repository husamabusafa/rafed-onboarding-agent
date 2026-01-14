# AI Agent Components for Onboarding System

This document defines 20 interactive components that AI agents can present to employees during onboarding and daily operations at RAFED/Tatweer Education.

---

## 1. Employee Directory

**Description**: Display searchable employee information including name, position, department, region, email, and contact details.

**Use Case**: Help new employees find colleagues, managers, or department contacts.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const EmployeeDirectorySchema = z.object({
  searchQuery: z.string().optional(),
  filters: z.object({
    department: z.string().optional(),
    region: z.enum(['HO', 'Riyadh', 'Makkah', 'Madinah', 'Eastern', 'Southern', 'Northern', 'Qassim']).optional(),
    division: z.string().optional(),
  }).optional(),
  employees: z.array(z.object({
    empId: z.number(),
    nameAr: z.string(),
    nameEn: z.string(),
    positionAr: z.string(),
    positionEn: z.string(),
    department: z.string(),
    division: z.string(),
    region: z.string(),
    email: z.string().email(),
    mobile: z.string(),
  })),
});
```

---

## 2. Department Browser

**Description**: Browse organizational structure showing all departments, divisions, and their team members.

**Use Case**: Help new employees understand the company structure and find relevant departments.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const DepartmentBrowserSchema = z.object({
  selectedDivision: z.string().optional(),
  divisions: z.array(z.object({
    nameAr: z.string(),
    nameEn: z.string(),
    departments: z.array(z.object({
      nameAr: z.string(),
      nameEn: z.string(),
      headCount: z.number(),
      manager: z.string().optional(),
      region: z.string(),
    })),
  })),
});
```

---

## 3. Cafeteria Menu Viewer

**Description**: Display the company cafeteria menu with drinks, categories, and detailed descriptions.

**Use Case**: Show new employees available beverages and help them order.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const CafeteriaMenuSchema = z.object({
  selectedCategory: z.string().optional(),
  categories: z.array(z.object({
    nameAr: z.string(),
    nameEn: z.string(),
    items: z.array(z.object({
      nameAr: z.string(),
      nameEn: z.string(),
      descriptionAr: z.string(),
      descriptionEn: z.string(),
      caffeineLevel: z.enum(['None', 'Low', 'Medium', 'High']),
      type: z.enum(['Hot', 'Cold']),
    })),
  })),
});
```

---

## 4. Company Calendar

**Description**: Display company calendar with holidays, important dates, and Hijri/Gregorian mappings.

**Use Case**: Help employees plan their work and understand official holidays.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const CompanyCalendarSchema = z.object({
  year: z.number(),
  selectedMonth: z.number().min(1).max(12).optional(),
  months: z.array(z.object({
    monthNumber: z.number(),
    nameEn: z.string(),
    nameAr: z.string(),
    hijriRangeEn: z.string(),
    hijriRangeAr: z.string(),
    totalDays: z.number(),
    startsOn: z.string(),
    holidays: z.array(z.object({
      date: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      nameEn: z.string(),
      nameAr: z.string(),
    })),
  })),
  weekendDays: z.array(z.string()),
});
```

---

## 5. Check-In / Attendance Tracker

**Description**: Allow employees to check in/out and view their attendance history.

**Use Case**: Track employee presence and working hours.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const AttendanceTrackerSchema = z.object({
  employeeId: z.number(),
  date: z.string(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  status: z.enum(['present', 'absent', 'late', 'on_leave', 'remote']),
  location: z.string().optional(),
  biometricVerified: z.boolean(),
  recentHistory: z.array(z.object({
    date: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    hoursWorked: z.number(),
    status: z.string(),
  })),
});
```

---

## 6. Onboarding Task Tracker

**Description**: Display and track completion of onboarding tasks assigned to the new employee.

**Use Case**: Guide new employees through their onboarding checklist.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const OnboardingTaskTrackerSchema = z.object({
  employeeId: z.number(),
  onboardingStage: z.enum(['pre_joining', 'first_day', 'post_joining']),
  tasks: z.array(z.object({
    taskId: z.number(),
    stage: z.string(),
    taskAr: z.string(),
    taskEn: z.string(),
    responsibleParty: z.string(),
    status: z.enum(['pending', 'in_progress', 'completed', 'blocked']),
    dueDate: z.string().optional(),
    completedDate: z.string().optional(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
  progressPercentage: z.number().min(0).max(100),
});
```

---

## 7. Document Request Form

**Description**: Form to request company documents (contracts, certificates, letters, etc.).

**Use Case**: Allow employees to request official documents from HR.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const DocumentRequestSchema = z.object({
  requestId: z.string().uuid().optional(),
  employeeId: z.number(),
  documentType: z.enum([
    'employment_certificate',
    'salary_certificate',
    'contract_copy',
    'id_letter',
    'experience_letter',
    'other'
  ]),
  purpose: z.string(),
  deliveryMethod: z.enum(['email', 'printed', 'both']),
  urgency: z.enum(['normal', 'urgent']),
  additionalNotes: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'in_review', 'approved', 'rejected', 'completed']).default('draft'),
  submittedDate: z.string().optional(),
});
```

---

## 8. Leave Request Form

**Description**: Form to request various types of leave (annual, sick, emergency, etc.).

**Use Case**: Enable employees to apply for time off.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const LeaveRequestSchema = z.object({
  requestId: z.string().uuid().optional(),
  employeeId: z.number(),
  leaveType: z.enum([
    'annual',
    'sick',
    'emergency',
    'unpaid',
    'hajj',
    'maternity',
    'paternity',
    'bereavement',
    'study'
  ]),
  startDate: z.string(),
  endDate: z.string(),
  totalDays: z.number().positive(),
  reason: z.string(),
  contactDuringLeave: z.string().optional(),
  remainingBalance: z.number().optional(),
  status: z.enum(['draft', 'submitted', 'pending_approval', 'approved', 'rejected']).default('draft'),
  approverComments: z.string().optional(),
});
```

---

## 9. Equipment Request Form

**Description**: Form to request office equipment, devices, or supplies.

**Use Case**: Allow employees to request laptops, phones, stationery, or other equipment.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const EquipmentRequestSchema = z.object({
  requestId: z.string().uuid().optional(),
  employeeId: z.number(),
  equipmentType: z.enum([
    'laptop',
    'desktop',
    'mobile_phone',
    'tablet',
    'monitor',
    'keyboard',
    'mouse',
    'headset',
    'office_supplies',
    'other'
  ]),
  quantity: z.number().positive().default(1),
  specifications: z.string().optional(),
  justification: z.string(),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
  preferredDeliveryDate: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'pending_approval', 'approved', 'ordered', 'delivered', 'rejected']).default('draft'),
  approvalChain: z.array(z.object({
    approver: z.string(),
    status: z.string(),
    date: z.string().optional(),
  })).optional(),
});
```

---

## 10. Parking Spot Request

**Description**: Request a parking spot at the office.

**Use Case**: Help employees secure parking at company facilities.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const ParkingRequestSchema = z.object({
  requestId: z.string().uuid().optional(),
  employeeId: z.number(),
  vehicleType: z.enum(['car', 'motorcycle', 'bicycle']),
  licensePlate: z.string(),
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  vehicleColor: z.string(),
  preferredLocation: z.string().optional(),
  disabilityAccommodation: z.boolean().default(false),
  startDate: z.string(),
  status: z.enum(['pending', 'approved', 'assigned', 'rejected']).default('pending'),
  assignedSpotNumber: z.string().optional(),
});
```

---

## 11. ID Badge Status

**Description**: Display the status of employee ID badge creation and issuance.

**Use Case**: Track ID badge production for new employees.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const IdBadgeStatusSchema = z.object({
  employeeId: z.number(),
  badgeNumber: z.string().optional(),
  status: z.enum([
    'photo_pending',
    'in_production',
    'ready_for_pickup',
    'issued',
    'replacement_requested',
    'lost_reported'
  ]),
  photoSubmitted: z.boolean(),
  productionDate: z.string().optional(),
  issuedDate: z.string().optional(),
  pickupLocation: z.string().optional(),
  accessLevels: z.array(z.string()).optional(),
  expiryDate: z.string().optional(),
});
```

---

## 12. Email Setup Status

**Description**: Track the status of email account creation and configuration.

**Use Case**: Monitor IT account setup for new employees.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const EmailSetupStatusSchema = z.object({
  employeeId: z.number(),
  emailAddress: z.string().email().optional(),
  status: z.enum([
    'requested',
    'in_progress',
    'created',
    'credentials_sent',
    'activated',
    'failed'
  ]),
  accountType: z.enum(['standard', 'admin', 'service']).default('standard'),
  requestDate: z.string(),
  creationDate: z.string().optional(),
  activationDate: z.string().optional(),
  accessGroups: z.array(z.string()).optional(),
  mobileDeviceConfigured: z.boolean().default(false),
  initialPassword: z.string().optional(),
  setupInstructions: z.string().optional(),
});
```

---

## 13. Building Tour Scheduler

**Description**: Schedule orientation tours of company facilities.

**Use Case**: Help new employees book guided tours of the office building.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const BuildingTourSchedulerSchema = z.object({
  tourId: z.string().uuid().optional(),
  employeeId: z.number(),
  employeeLevel: z.enum(['executive_14_19', 'staff_1_13']),
  tourDate: z.string(),
  tourTime: z.string(),
  duration: z.number().default(60),
  tourType: z.enum(['full_building', 'department_only', 'facilities_only', 'executive']),
  meetingPoint: z.string(),
  tourGuide: z.string().optional(),
  status: z.enum(['scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled']).default('scheduled'),
  stops: z.array(z.object({
    location: z.string(),
    description: z.string(),
    estimatedTime: z.number(),
  })).optional(),
});
```

---

## 14. Meet Your Team

**Description**: Display team members, their roles, and introductory information.

**Use Case**: Introduce new employees to their immediate team and colleagues.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const MeetYourTeamSchema = z.object({
  newEmployeeId: z.number(),
  department: z.string(),
  directManager: z.object({
    empId: z.number(),
    nameAr: z.string(),
    nameEn: z.string(),
    position: z.string(),
    email: z.string().email(),
    mobile: z.string(),
    bio: z.string().optional(),
    photo: z.string().optional(),
  }),
  teamMembers: z.array(z.object({
    empId: z.number(),
    nameAr: z.string(),
    nameEn: z.string(),
    position: z.string(),
    email: z.string().email(),
    role: z.string(),
    joinedDate: z.string().optional(),
    expertise: z.array(z.string()).optional(),
    photo: z.string().optional(),
  })),
  relatedDepartments: z.array(z.object({
    name: z.string(),
    contactPerson: z.string(),
    relationship: z.string(),
  })).optional(),
});
```

---

## 15. Orientation Workshop Registration

**Description**: Register for onboarding workshops and training sessions.

**Use Case**: Enable new employees to sign up for required orientation sessions.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const OrientationWorkshopSchema = z.object({
  workshopId: z.string().uuid(),
  title: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  description: z.object({
    ar: z.string(),
    en: z.string(),
  }),
  workshopType: z.enum([
    'company_introduction',
    'policies_procedures',
    'cybersecurity',
    'hr_systems',
    'department_specific',
    'leadership_orientation'
  ]),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  facilitator: z.string(),
  maxAttendees: z.number(),
  currentAttendees: z.number(),
  isRequired: z.boolean(),
  targetAudience: z.enum(['all_new_employees', 'executives', 'staff', 'specific_department']),
  registrationStatus: z.enum(['open', 'full', 'closed']),
  employeeRegistered: z.boolean().default(false),
});
```

---

## 16. IT Access Request

**Description**: Request access to IT systems, applications, and platforms.

**Use Case**: Enable employees to request access to necessary tools and systems.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const ItAccessRequestSchema = z.object({
  requestId: z.string().uuid().optional(),
  employeeId: z.number(),
  systems: z.array(z.object({
    systemName: z.string(),
    accessLevel: z.enum(['read_only', 'standard', 'power_user', 'admin']),
    justification: z.string(),
  })),
  urgency: z.enum(['standard', 'high', 'critical']),
  managerApproval: z.object({
    approved: z.boolean().optional(),
    approverName: z.string().optional(),
    approvalDate: z.string().optional(),
    comments: z.string().optional(),
  }).optional(),
  status: z.enum([
    'draft',
    'pending_manager_approval',
    'pending_it_review',
    'in_progress',
    'completed',
    'rejected'
  ]).default('draft'),
  requestedDate: z.string(),
  completionDate: z.string().optional(),
});
```

---

## 17. Internal Contact Directory

**Description**: Searchable directory of key contacts, departments, and services.

**Use Case**: Help employees find who to contact for various services and issues.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const InternalContactDirectorySchema = z.object({
  searchQuery: z.string().optional(),
  category: z.enum([
    'hr',
    'it',
    'finance',
    'administration',
    'operations',
    'safety_security',
    'communications',
    'legal',
    'facilities'
  ]).optional(),
  contacts: z.array(z.object({
    departmentAr: z.string(),
    departmentEn: z.string(),
    serviceType: z.string(),
    contactPerson: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    extension: z.string().optional(),
    location: z.string().optional(),
    availability: z.string().optional(),
  })),
});
```

---

## 18. Benefits Overview

**Description**: Display employee benefits, compensation details, and insurance information.

**Use Case**: Inform employees about their benefits package and entitlements.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const BenefitsOverviewSchema = z.object({
  employeeId: z.number(),
  salary: z.object({
    basicSalary: z.number(),
    allowances: z.array(z.object({
      type: z.string(),
      amount: z.number(),
    })),
    totalPackage: z.number(),
  }).optional(),
  medicalInsurance: z.object({
    provider: z.string(),
    policyNumber: z.string().optional(),
    coverage: z.enum(['employee_only', 'employee_and_dependents']),
    dependentsCount: z.number().default(0),
    startDate: z.string(),
    endDate: z.string(),
    cardIssued: z.boolean(),
  }).optional(),
  leaveEntitlements: z.array(z.object({
    leaveType: z.string(),
    annualAllocation: z.number(),
    used: z.number(),
    remaining: z.number(),
  })),
  additionalBenefits: z.array(z.object({
    benefitName: z.string(),
    description: z.string(),
    eligibility: z.string().optional(),
  })).optional(),
  performanceReview: z.object({
    cycle: z.string(),
    nextReviewDate: z.string().optional(),
  }).optional(),
});
```

---

## 19. Probation Period Tracker

**Description**: Track probation period progress, milestones, and evaluation dates.

**Use Case**: Help new employees and managers monitor probation period requirements.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const ProbationTrackerSchema = z.object({
  employeeId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  duration: z.number(),
  currentDay: z.number(),
  progressPercentage: z.number().min(0).max(100),
  status: z.enum(['active', 'extended', 'completed', 'terminated']),
  milestones: z.array(z.object({
    name: z.string(),
    dueDate: z.string(),
    completed: z.boolean(),
    completedDate: z.string().optional(),
    notes: z.string().optional(),
  })),
  evaluations: z.array(z.object({
    evaluationType: z.enum(['30_day', '60_day', '90_day', 'final']),
    scheduledDate: z.string(),
    completedDate: z.string().optional(),
    evaluator: z.string(),
    rating: z.number().min(1).max(5).optional(),
    comments: z.string().optional(),
  })),
  nextEvaluationDate: z.string().optional(),
});
```

---

## 20. Feedback & Survey Form

**Description**: Submit feedback about the onboarding experience or workplace satisfaction.

**Use Case**: Collect employee feedback to improve onboarding and work environment.

**Zod Schema**:
```typescript
import { z } from 'zod';

export const FeedbackSurveySchema = z.object({
  surveyId: z.string().uuid().optional(),
  employeeId: z.number(),
  surveyType: z.enum([
    'onboarding_satisfaction',
    'workplace_environment',
    'manager_feedback',
    'facilities_feedback',
    'it_services',
    'hr_services',
    'general_suggestion'
  ]),
  isAnonymous: z.boolean().default(false),
  questions: z.array(z.object({
    questionId: z.string(),
    questionText: z.string(),
    questionType: z.enum(['rating', 'multiple_choice', 'text', 'yes_no']),
    answer: z.union([
      z.number(),
      z.string(),
      z.boolean(),
      z.array(z.string())
    ]),
  })),
  overallRating: z.number().min(1).max(5).optional(),
  additionalComments: z.string().optional(),
  submittedDate: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'reviewed']).default('draft'),
});
```

---

## Usage Guidelines

### For AI Agents

1. **Context Awareness**: Use employee context (ID, department, onboarding stage) to determine which components to show
2. **Progressive Disclosure**: Show components based on the employee's journey stage (pre-joining, first day, post-joining)
3. **Multilingual Support**: All components support both Arabic and English
4. **Validation**: Always validate data against the Zod schemas before submission
5. **State Management**: Track component state and user interactions
6. **Accessibility**: Ensure all components are accessible and user-friendly

### Component Selection Logic

- **Pre-Joining Stage**: Components 6, 7, 10, 13, 15
- **First Day**: Components 1, 2, 3, 4, 5, 11, 12, 14
- **Post-Joining**: Components 8, 9, 16, 17, 18, 19, 20

### Integration Points

All components should integrate with:
- Employee database (emp.json)
- Onboarding task matrix (Onboarding Talemia.json)
- Company calendar (calender.json)
- Internal systems (email, HR, IT)

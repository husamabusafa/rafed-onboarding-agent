-- CreateEnum
CREATE TYPE "OnboardingStage" AS ENUM ('PRE_JOINING', 'FIRST_DAY', 'POST_JOINING');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'ON_LEAVE', 'REMOTE');

-- CreateEnum
CREATE TYPE "CaffeineLevel" AS ENUM ('NONE', 'LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "DrinkType" AS ENUM ('HOT', 'COLD');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('EMPLOYMENT_CERTIFICATE', 'SALARY_CERTIFICATE', 'CONTRACT_COPY', 'ID_LETTER', 'EXPERIENCE_LETTER', 'OTHER');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('EMAIL', 'PRINTED', 'BOTH');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('NORMAL', 'URGENT', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'IN_REVIEW', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('ANNUAL', 'SICK', 'EMERGENCY', 'UNPAID', 'HAJJ', 'MATERNITY', 'PATERNITY', 'BEREAVEMENT', 'STUDY');

-- CreateEnum
CREATE TYPE "EquipmentType" AS ENUM ('LAPTOP', 'DESKTOP', 'MOBILE_PHONE', 'TABLET', 'MONITOR', 'KEYBOARD', 'MOUSE', 'HEADSET', 'OFFICE_SUPPLIES', 'OTHER');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'ORDERED', 'DELIVERED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE', 'BICYCLE');

-- CreateEnum
CREATE TYPE "ParkingStatus" AS ENUM ('PENDING', 'APPROVED', 'ASSIGNED', 'REJECTED');

-- CreateEnum
CREATE TYPE "BadgeStatus" AS ENUM ('PHOTO_PENDING', 'IN_PRODUCTION', 'READY_FOR_PICKUP', 'ISSUED', 'REPLACEMENT_REQUESTED', 'LOST_REPORTED');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('REQUESTED', 'IN_PROGRESS', 'CREATED', 'CREDENTIALS_SENT', 'ACTIVATED', 'FAILED');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('STANDARD', 'ADMIN', 'SERVICE');

-- CreateEnum
CREATE TYPE "EmployeeLevel" AS ENUM ('EXECUTIVE_14_19', 'STAFF_1_13');

-- CreateEnum
CREATE TYPE "TourType" AS ENUM ('FULL_BUILDING', 'DEPARTMENT_ONLY', 'FACILITIES_ONLY', 'EXECUTIVE');

-- CreateEnum
CREATE TYPE "TourStatus" AS ENUM ('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED');

-- CreateEnum
CREATE TYPE "WorkshopType" AS ENUM ('COMPANY_INTRODUCTION', 'POLICIES_PROCEDURES', 'CYBERSECURITY', 'HR_SYSTEMS', 'DEPARTMENT_SPECIFIC', 'LEADERSHIP_ORIENTATION');

-- CreateEnum
CREATE TYPE "TargetAudience" AS ENUM ('ALL_NEW_EMPLOYEES', 'EXECUTIVES', 'STAFF', 'SPECIFIC_DEPARTMENT');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('OPEN', 'FULL', 'CLOSED');

-- CreateEnum
CREATE TYPE "ITAccessStatus" AS ENUM ('DRAFT', 'PENDING_MANAGER_APPROVAL', 'PENDING_IT_REVIEW', 'IN_PROGRESS', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ContactCategory" AS ENUM ('HR', 'IT', 'FINANCE', 'ADMINISTRATION', 'OPERATIONS', 'SAFETY_SECURITY', 'COMMUNICATIONS', 'LEGAL', 'FACILITIES');

-- CreateEnum
CREATE TYPE "InsuranceCoverage" AS ENUM ('EMPLOYEE_ONLY', 'EMPLOYEE_AND_DEPENDENTS');

-- CreateEnum
CREATE TYPE "EvaluationType" AS ENUM ('DAY_30', 'DAY_60', 'DAY_90', 'FINAL');

-- CreateEnum
CREATE TYPE "SurveyType" AS ENUM ('ONBOARDING_SATISFACTION', 'WORKPLACE_ENVIRONMENT', 'MANAGER_FEEDBACK', 'FACILITIES_FEEDBACK', 'IT_SERVICES', 'HR_SERVICES', 'GENERAL_SUGGESTION');

-- CreateEnum
CREATE TYPE "SurveyStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'REVIEWED');

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "empId" INTEGER NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "positionAr" TEXT NOT NULL,
    "positionEn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departmentId" INTEGER NOT NULL,
    "divisionId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "onboardingStage" "OnboardingStage" NOT NULL DEFAULT 'PRE_JOINING',
    "probationStart" TIMESTAMP(3),
    "probationEnd" TIMESTAMP(3),
    "managerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "divisions" (
    "id" SERIAL NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "headCount" INTEGER NOT NULL DEFAULT 0,
    "manager" TEXT,
    "divisionId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_categories" (
    "id" SERIAL NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" SERIAL NOT NULL,
    "nameAr" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "caffeineLevel" "CaffeineLevel" NOT NULL,
    "type" "DrinkType" NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_records" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "checkInTime" TIMESTAMP(3),
    "checkOutTime" TIMESTAMP(3),
    "status" "AttendanceStatus" NOT NULL,
    "location" TEXT,
    "biometricVerified" BOOLEAN NOT NULL DEFAULT false,
    "hoursWorked" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_tasks" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "stage" "OnboardingStage" NOT NULL,
    "taskAr" TEXT NOT NULL,
    "taskEn" TEXT NOT NULL,
    "responsibleParty" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "onboarding_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_requests" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "purpose" TEXT NOT NULL,
    "deliveryMethod" "DeliveryMethod" NOT NULL,
    "urgency" "Urgency" NOT NULL DEFAULT 'NORMAL',
    "additionalNotes" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leave_requests" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "leaveType" "LeaveType" NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "contactDuringLeave" TEXT,
    "remainingBalance" INTEGER,
    "status" "RequestStatus" NOT NULL DEFAULT 'DRAFT',
    "approverComments" TEXT,
    "approvedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leave_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_requests" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "equipmentType" "EquipmentType" NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "specifications" TEXT,
    "justification" TEXT NOT NULL,
    "urgency" "Urgency" NOT NULL DEFAULT 'NORMAL',
    "preferredDeliveryDate" TIMESTAMP(3),
    "status" "EquipmentStatus" NOT NULL DEFAULT 'DRAFT',
    "approvalChain" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking_requests" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "vehicleType" "VehicleType" NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "vehicleMake" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "vehicleColor" TEXT NOT NULL,
    "preferredLocation" TEXT,
    "disabilityAccommodation" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATE NOT NULL,
    "status" "ParkingStatus" NOT NULL DEFAULT 'PENDING',
    "assignedSpotNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parking_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "id_badges" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "badgeNumber" TEXT,
    "status" "BadgeStatus" NOT NULL,
    "photoSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "productionDate" TIMESTAMP(3),
    "issuedDate" TIMESTAMP(3),
    "pickupLocation" TEXT,
    "accessLevels" TEXT[],
    "expiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "id_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_setups" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "emailAddress" TEXT,
    "status" "EmailStatus" NOT NULL,
    "accountType" "AccountType" NOT NULL DEFAULT 'STANDARD',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creationDate" TIMESTAMP(3),
    "activationDate" TIMESTAMP(3),
    "accessGroups" TEXT[],
    "mobileDeviceConfigured" BOOLEAN NOT NULL DEFAULT false,
    "initialPassword" TEXT,
    "setupInstructions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_setups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "building_tours" (
    "id" SERIAL NOT NULL,
    "tourId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "employeeLevel" "EmployeeLevel" NOT NULL,
    "tourDate" DATE NOT NULL,
    "tourTime" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 60,
    "tourType" "TourType" NOT NULL,
    "meetingPoint" TEXT NOT NULL,
    "tourGuide" TEXT,
    "status" "TourStatus" NOT NULL DEFAULT 'SCHEDULED',
    "stops" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "building_tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orientation_workshops" (
    "id" SERIAL NOT NULL,
    "workshopId" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "workshopType" "WorkshopType" NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "facilitator" TEXT NOT NULL,
    "maxAttendees" INTEGER NOT NULL,
    "currentAttendees" INTEGER NOT NULL DEFAULT 0,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "targetAudience" "TargetAudience" NOT NULL,
    "registrationStatus" "RegistrationStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orientation_workshops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workshop_registrations" (
    "id" SERIAL NOT NULL,
    "workshopId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "registered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workshop_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "it_access_requests" (
    "id" SERIAL NOT NULL,
    "requestId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "systems" JSONB NOT NULL,
    "urgency" "Urgency" NOT NULL DEFAULT 'NORMAL',
    "managerApproval" JSONB,
    "status" "ITAccessStatus" NOT NULL DEFAULT 'DRAFT',
    "requestedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completionDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "it_access_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "internal_contacts" (
    "id" SERIAL NOT NULL,
    "departmentAr" TEXT NOT NULL,
    "departmentEn" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "contactPerson" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "extension" TEXT,
    "location" TEXT,
    "availability" TEXT,
    "category" "ContactCategory" NOT NULL,
    "departmentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "internal_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "benefits" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "basicSalary" DOUBLE PRECISION NOT NULL,
    "allowances" JSONB,
    "totalPackage" DOUBLE PRECISION NOT NULL,
    "insuranceProvider" TEXT,
    "insurancePolicyNumber" TEXT,
    "insuranceCoverage" "InsuranceCoverage" NOT NULL,
    "dependentsCount" INTEGER NOT NULL DEFAULT 0,
    "insuranceStartDate" TIMESTAMP(3),
    "insuranceEndDate" TIMESTAMP(3),
    "insuranceCardIssued" BOOLEAN NOT NULL DEFAULT false,
    "leaveEntitlements" JSONB,
    "additionalBenefits" JSONB,
    "reviewCycle" TEXT,
    "nextReviewDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "benefits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "probation_evaluations" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "evaluationType" "EvaluationType" NOT NULL,
    "scheduledDate" DATE NOT NULL,
    "completedDate" TIMESTAMP(3),
    "evaluator" TEXT NOT NULL,
    "rating" INTEGER,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "probation_evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "probation_milestones" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" DATE NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "probation_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_surveys" (
    "id" SERIAL NOT NULL,
    "surveyId" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "surveyType" "SurveyType" NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "questions" JSONB NOT NULL,
    "overallRating" INTEGER,
    "additionalComments" TEXT,
    "submittedDate" TIMESTAMP(3),
    "status" "SurveyStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_surveys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_empId_key" ON "Employee"("empId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE INDEX "Employee_departmentId_idx" ON "Employee"("departmentId");

-- CreateIndex
CREATE INDEX "Employee_divisionId_idx" ON "Employee"("divisionId");

-- CreateIndex
CREATE INDEX "Employee_regionId_idx" ON "Employee"("regionId");

-- CreateIndex
CREATE INDEX "Employee_email_idx" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "regions_code_key" ON "regions"("code");

-- CreateIndex
CREATE INDEX "departments_divisionId_idx" ON "departments"("divisionId");

-- CreateIndex
CREATE INDEX "departments_regionId_idx" ON "departments"("regionId");

-- CreateIndex
CREATE INDEX "menu_items_categoryId_idx" ON "menu_items"("categoryId");

-- CreateIndex
CREATE INDEX "holidays_year_month_idx" ON "holidays"("year", "month");

-- CreateIndex
CREATE INDEX "attendance_records_employeeId_idx" ON "attendance_records"("employeeId");

-- CreateIndex
CREATE INDEX "attendance_records_date_idx" ON "attendance_records"("date");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_records_employeeId_date_key" ON "attendance_records"("employeeId", "date");

-- CreateIndex
CREATE INDEX "onboarding_tasks_employeeId_idx" ON "onboarding_tasks"("employeeId");

-- CreateIndex
CREATE INDEX "onboarding_tasks_status_idx" ON "onboarding_tasks"("status");

-- CreateIndex
CREATE UNIQUE INDEX "document_requests_requestId_key" ON "document_requests"("requestId");

-- CreateIndex
CREATE INDEX "document_requests_employeeId_idx" ON "document_requests"("employeeId");

-- CreateIndex
CREATE INDEX "document_requests_status_idx" ON "document_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "leave_requests_requestId_key" ON "leave_requests"("requestId");

-- CreateIndex
CREATE INDEX "leave_requests_employeeId_idx" ON "leave_requests"("employeeId");

-- CreateIndex
CREATE INDEX "leave_requests_status_idx" ON "leave_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_requests_requestId_key" ON "equipment_requests"("requestId");

-- CreateIndex
CREATE INDEX "equipment_requests_employeeId_idx" ON "equipment_requests"("employeeId");

-- CreateIndex
CREATE INDEX "equipment_requests_status_idx" ON "equipment_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "parking_requests_requestId_key" ON "parking_requests"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "parking_requests_employeeId_key" ON "parking_requests"("employeeId");

-- CreateIndex
CREATE INDEX "parking_requests_employeeId_idx" ON "parking_requests"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "id_badges_employeeId_key" ON "id_badges"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "id_badges_badgeNumber_key" ON "id_badges"("badgeNumber");

-- CreateIndex
CREATE INDEX "id_badges_employeeId_idx" ON "id_badges"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "email_setups_employeeId_key" ON "email_setups"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "email_setups_emailAddress_key" ON "email_setups"("emailAddress");

-- CreateIndex
CREATE INDEX "email_setups_employeeId_idx" ON "email_setups"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "building_tours_tourId_key" ON "building_tours"("tourId");

-- CreateIndex
CREATE INDEX "building_tours_employeeId_idx" ON "building_tours"("employeeId");

-- CreateIndex
CREATE INDEX "building_tours_tourDate_idx" ON "building_tours"("tourDate");

-- CreateIndex
CREATE UNIQUE INDEX "orientation_workshops_workshopId_key" ON "orientation_workshops"("workshopId");

-- CreateIndex
CREATE INDEX "orientation_workshops_date_idx" ON "orientation_workshops"("date");

-- CreateIndex
CREATE INDEX "workshop_registrations_employeeId_idx" ON "workshop_registrations"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "workshop_registrations_workshopId_employeeId_key" ON "workshop_registrations"("workshopId", "employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "it_access_requests_requestId_key" ON "it_access_requests"("requestId");

-- CreateIndex
CREATE INDEX "it_access_requests_employeeId_idx" ON "it_access_requests"("employeeId");

-- CreateIndex
CREATE INDEX "it_access_requests_status_idx" ON "it_access_requests"("status");

-- CreateIndex
CREATE INDEX "internal_contacts_category_idx" ON "internal_contacts"("category");

-- CreateIndex
CREATE INDEX "internal_contacts_departmentId_idx" ON "internal_contacts"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "benefits_employeeId_key" ON "benefits"("employeeId");

-- CreateIndex
CREATE INDEX "benefits_employeeId_idx" ON "benefits"("employeeId");

-- CreateIndex
CREATE INDEX "probation_evaluations_employeeId_idx" ON "probation_evaluations"("employeeId");

-- CreateIndex
CREATE INDEX "probation_evaluations_scheduledDate_idx" ON "probation_evaluations"("scheduledDate");

-- CreateIndex
CREATE INDEX "probation_milestones_employeeId_idx" ON "probation_milestones"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "feedback_surveys_surveyId_key" ON "feedback_surveys"("surveyId");

-- CreateIndex
CREATE INDEX "feedback_surveys_employeeId_idx" ON "feedback_surveys"("employeeId");

-- CreateIndex
CREATE INDEX "feedback_surveys_surveyType_idx" ON "feedback_surveys"("surveyType");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "menu_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_tasks" ADD CONSTRAINT "onboarding_tasks_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_requests" ADD CONSTRAINT "document_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_requests" ADD CONSTRAINT "equipment_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_requests" ADD CONSTRAINT "parking_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "id_badges" ADD CONSTRAINT "id_badges_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_setups" ADD CONSTRAINT "email_setups_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "building_tours" ADD CONSTRAINT "building_tours_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workshop_registrations" ADD CONSTRAINT "workshop_registrations_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "orientation_workshops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "it_access_requests" ADD CONSTRAINT "it_access_requests_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "internal_contacts" ADD CONSTRAINT "internal_contacts_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefits" ADD CONSTRAINT "benefits_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "probation_evaluations" ADD CONSTRAINT "probation_evaluations_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_surveys" ADD CONSTRAINT "feedback_surveys_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

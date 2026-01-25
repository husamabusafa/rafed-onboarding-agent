-- Create new enums
CREATE TYPE "TaskOwnerType" AS ENUM ('EMPLOYEE', 'MANAGER', 'HR', 'IT', 'FACILITIES', 'BUDDY', 'OTHER');
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED');
CREATE TYPE "PolicyStatus" AS ENUM ('PENDING', 'ACKNOWLEDGED', 'OVERDUE');
CREATE TYPE "TrainingStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');
CREATE TYPE "CheckInType" AS ENUM ('BUDDY', 'MANAGER', 'HR', 'IT', 'FACILITIES', 'OTHER');
CREATE TYPE "OnboardingEventType" AS ENUM (
  'PLAN_ASSIGNED',
  'TASK_CREATED',
  'TASK_COMPLETED',
  'TASK_BLOCKED',
  'POLICY_ACKNOWLEDGED',
  'TRAINING_STARTED',
  'TRAINING_COMPLETED',
  'CHECK_IN_COMPLETED',
  'SURVEY_SUBMITTED'
);

-- Extend employees
ALTER TABLE "employees"
  ADD COLUMN "employeeLevel" "EmployeeLevel",
  ADD COLUMN "jobFamily" TEXT,
  ADD COLUMN "location" TEXT;

-- Extend onboarding tasks
ALTER TABLE "onboarding_tasks"
  ADD COLUMN "ownerType" "TaskOwnerType" NOT NULL DEFAULT 'OTHER',
  ADD COLUMN "ownerEmployeeId" INTEGER,
  ADD COLUMN "slaDays" INTEGER,
  ADD COLUMN "sourceTemplateId" INTEGER,
  ADD COLUMN "planId" INTEGER;

-- Onboarding plan templates
CREATE TABLE "onboarding_plan_templates" (
  "id" SERIAL PRIMARY KEY,
  "nameAr" TEXT NOT NULL,
  "nameEn" TEXT NOT NULL,
  "descriptionAr" TEXT,
  "descriptionEn" TEXT,
  "targetAudience" "TargetAudience",
  "defaultDurationDays" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Onboarding plans
CREATE TABLE "onboarding_plans" (
  "id" SERIAL PRIMARY KEY,
  "employeeId" INTEGER NOT NULL UNIQUE,
  "templateId" INTEGER,
  "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',
  "startDate" DATE,
  "endDate" DATE,
  "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "onboarding_plans_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "onboarding_plans_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "onboarding_plan_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Onboarding task templates
CREATE TABLE "onboarding_task_templates" (
  "id" SERIAL PRIMARY KEY,
  "planTemplateId" INTEGER NOT NULL,
  "stage" "OnboardingStage" NOT NULL,
  "taskAr" TEXT NOT NULL,
  "taskEn" TEXT NOT NULL,
  "ownerType" "TaskOwnerType" NOT NULL DEFAULT 'OTHER',
  "slaDays" INTEGER,
  "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
  "dependencyTemplateIds" INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "onboarding_task_templates_planTemplateId_fkey" FOREIGN KEY ("planTemplateId") REFERENCES "onboarding_plan_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Task dependencies
CREATE TABLE "task_dependencies" (
  "id" SERIAL PRIMARY KEY,
  "taskId" INTEGER NOT NULL,
  "dependsOnTaskId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "task_dependencies_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "onboarding_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "task_dependencies_dependsOnTaskId_fkey" FOREIGN KEY ("dependsOnTaskId") REFERENCES "onboarding_tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Policy acknowledgments
CREATE TABLE "policy_acknowledgments" (
  "id" SERIAL PRIMARY KEY,
  "employeeId" INTEGER NOT NULL,
  "policyName" TEXT NOT NULL,
  "policyVersion" TEXT NOT NULL,
  "policyGroup" TEXT,
  "status" "PolicyStatus" NOT NULL DEFAULT 'PENDING',
  "requiredBy" DATE,
  "acknowledgedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "policy_acknowledgments_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Training modules
CREATE TABLE "training_modules" (
  "id" SERIAL PRIMARY KEY,
  "code" TEXT NOT NULL UNIQUE,
  "titleAr" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "descriptionAr" TEXT,
  "descriptionEn" TEXT,
  "durationMinutes" INTEGER,
  "stage" "OnboardingStage",
  "required" BOOLEAN NOT NULL DEFAULT false,
  "targetAudience" "TargetAudience",
  "provider" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Training completions
CREATE TABLE "training_completions" (
  "id" SERIAL PRIMARY KEY,
  "employeeId" INTEGER NOT NULL,
  "moduleId" INTEGER NOT NULL,
  "status" "TrainingStatus" NOT NULL DEFAULT 'NOT_STARTED',
  "startedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "score" INTEGER,
  "evidenceUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "training_completions_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "training_completions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "training_modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Onboarding events
CREATE TABLE "onboarding_events" (
  "id" SERIAL PRIMARY KEY,
  "employeeId" INTEGER NOT NULL,
  "eventType" "OnboardingEventType" NOT NULL,
  "stage" "OnboardingStage",
  "payload" JSONB,
  "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "onboarding_events_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Check-ins
CREATE TABLE "check_ins" (
  "id" SERIAL PRIMARY KEY,
  "employeeId" INTEGER NOT NULL,
  "checkInType" "CheckInType" NOT NULL,
  "conductedBy" TEXT,
  "notes" TEXT,
  "scheduledAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "check_ins_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Add onboarding stage to feedback surveys
ALTER TABLE "feedback_surveys"
  ADD COLUMN "onboardingStage" "OnboardingStage";

-- Update foreign keys for onboarding tasks
ALTER TABLE "onboarding_tasks"
  ADD CONSTRAINT "onboarding_tasks_ownerEmployeeId_fkey" FOREIGN KEY ("ownerEmployeeId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "onboarding_tasks_sourceTemplateId_fkey" FOREIGN KEY ("sourceTemplateId") REFERENCES "onboarding_task_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT "onboarding_tasks_planId_fkey" FOREIGN KEY ("planId") REFERENCES "onboarding_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Indexes
CREATE INDEX "onboarding_plans_templateId_idx" ON "onboarding_plans"("templateId");
CREATE INDEX "onboarding_task_templates_planTemplateId_idx" ON "onboarding_task_templates"("planTemplateId");
CREATE UNIQUE INDEX "task_dependencies_taskId_dependsOnTaskId_key" ON "task_dependencies"("taskId", "dependsOnTaskId");
CREATE INDEX "task_dependencies_taskId_idx" ON "task_dependencies"("taskId");
CREATE INDEX "task_dependencies_dependsOnTaskId_idx" ON "task_dependencies"("dependsOnTaskId");
CREATE INDEX "policy_acknowledgments_employeeId_idx" ON "policy_acknowledgments"("employeeId");
CREATE UNIQUE INDEX "training_completions_employeeId_moduleId_key" ON "training_completions"("employeeId", "moduleId");
CREATE INDEX "training_completions_employeeId_idx" ON "training_completions"("employeeId");
CREATE INDEX "training_completions_moduleId_idx" ON "training_completions"("moduleId");
CREATE INDEX "onboarding_events_employeeId_idx" ON "onboarding_events"("employeeId");
CREATE INDEX "onboarding_events_eventType_idx" ON "onboarding_events"("eventType");
CREATE INDEX "check_ins_employeeId_idx" ON "check_ins"("employeeId");

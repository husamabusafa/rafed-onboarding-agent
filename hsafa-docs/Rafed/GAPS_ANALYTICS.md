 # Rafed Onboarding System - Gaps Analytics
 
 ## Purpose
 Identify gaps between Rafed onboarding source material and the current client/server implementation, then define analytics needed to make onboarding comprehensive, measurable, and actionable.
 
 ## Sources Reviewed
 - `hsafa-docs/Rafed/Onboarding Talemia.json` (onboarding phases, RACI, tours)
 - `hsafa-docs/Rafed/rafed-booklet.json` (company overview, culture, structure)
 - `hsafa-docs/Rafed/rafed-structure.json` (organizational hierarchy)
 - Client UI: `client/src/pages/*`, `client/src/components/*`, `client/src/data/*`
 - Server API + schema: `server/src/onboarding/*`, `server/prisma/schema.prisma`, `server/prisma/seed.ts`
 
 ## Current Coverage Snapshot
 **Client (user experience)**
 - Home, leadership, buddy program, tools/facilities, actions listing, action details.
 - Task tracker, attendance, employee directory components available.
 - Static onboarding action content in `client/src/data/onboardingActions.ts`.
 - Induction content in `client/src/data/tatweerInduction.ts`.
 
 **Server (data model + APIs)**
 - Employees, onboarding tasks, attendance, benefits, probation evaluations/milestones, ID badge, email setup, building tours, workshops, feedback surveys.
 - Endpoints: tasks, ID badge, email setup, building tours, workshops, benefits, probation, feedback.
 
 **Rafed onboarding program**
 - Explicit pre-joining / first-day / post-joining phases.
 - RACI matrix for onboarding tasks.
 - Two onboarding tour tracks (grades 14-19, 1-13).
 
 ## Gaps by Phase
 **Pre-joining**
 - No intake checklist for documents (requests exist but not linked to onboarding tasks).
 - No automated scheduling for start date, welcome emails, or buddy assignment workflow.
 - No capturing of dependencies (IT, facilities, HR) before start.
 
 **Day 1**
 - No orchestrated first-day runbook (sequence/timing) tied to the RACI plan.
 - No tracking of orientation tour path (grade-based track selection).
 - No sign-off checkpoints for HR/IT/facilities completion.
 
 **Post-joining (Weeks 1-12)**
 - No structured 30/60/90 day plan or milestone templates by role/grade.
 - Probation milestones exist, but not connected to tasks, surveys, or manager actions.
 - No continuous learning/training plan, certifications, or policy acknowledgments.
 
 ## Gaps by Capability
 **Process**
 - Missing onboarding plan templates (by role, grade, location, department).
 - RACI defined in docs but not mapped to tasks or approvals in product.
 - No escalation workflow for blocked items.
 
 **Data Model**
 - No task templates, task dependencies, or task ownership rules.
 - No policy acknowledgments (code of conduct, safety, cybersecurity).
 - No equipment provisioning tracking beyond equipment requests.
 - No training curriculum tracking or completion evidence.
 - No role-based checklists (executive vs staff).
 
 **Experience**
 - Limited personalization (start date, manager, buddy, role, site).
 - No onboarding timeline visualization by phase.
 - No unified "My onboarding" view aggregating tasks, surveys, training, and milestones.
 
 **Analytics**
 - No onboarding KPIs, time-to-complete, time-to-productivity, or drop-off analysis.
 - Feedback exists but is not tied to stage or outcomes.
 - No manager/team-level visibility into bottlenecks.
 
 **Integrations**
 - No integration points for HRIS, ITSM, badge systems, or LMS.
 - No messaging hooks (email, SMS, chat) for reminders or status updates.
 
 ## Analytics Framework (What to Measure)
 **Core KPIs**
 - Time-to-onboarding-complete (by role/grade/department).
 - First-day completion rate (by cohort).
 - Task SLA adherence (% on time, % overdue).
 - Time-to-productivity proxy (manager rating + milestone completion).
 - Probation success rate and early attrition rate.
 - Survey response rate and NPS/CSAT by stage.
 
 **Operational Metrics**
 - Task backlog by owner (HR/IT/Facilities/Manager/New Hire).
 - Blocker frequency and average resolution time.
 - Task dependency delays (IT access, badge, equipment).
 - Workshop attendance vs capacity.
 - Policy acknowledgment completion.
 
 **Experience Metrics**
 - Buddy touchpoint frequency and satisfaction.
 - New hire confidence score (self-reported).
 - Manager satisfaction with readiness.
 
 ## Required Data to Enable Analytics
 **Entities to add or extend**
 - `OnboardingPlan` (template and assignment per employee).
 - `OnboardingTaskTemplate` (phase, owner, dependencies, SLA).
 - `TaskDependency` (task-to-task).
 - `PolicyAcknowledgment` (policy, version, acceptedDate).
 - `TrainingModule` + `TrainingCompletion`.
 - `OnboardingEvent` (audit trail for analytics).
 - `CheckIn` (buddy/manager check-ins with notes).
 
 **Minimum fields**
 - Task `ownerId`, `slaDays`, `dependencyIds`, `sourceTemplateId`.
 - Employee `grade`, `location`, `jobFamily`, `managerId`.
 - Survey `stage`, `score`, `submittedDate`.
 - Workshop `attendanceStatus` per employee.
 
 ## Reporting Views (Recommended)
 - **Cohort dashboard**: progress by start month, completion rates, survey outcomes.
 - **Owner dashboard**: HR/IT/facilities workload, overdue tasks.
 - **Manager dashboard**: team onboarding status, action items.
 - **Employee view**: unified timeline with tasks, sessions, surveys, milestones.
 
 ## Implementation Backlog (High Impact)
 **Phase 1: Foundations**
 - Add onboarding plan templates and assign to employees.
 - Map RACI owners to tasks; add SLAs and dependencies.
 - Build unified "My Onboarding" view in client.
 
 **Phase 2: Learning + Compliance**
 - Add policy acknowledgments and training modules.
 - Tie probation milestones to tasks and manager check-ins.
 - Add survey scheduling per stage (day 1, week 2, day 30, day 60, day 90).
 
 **Phase 3: Analytics + Automation**
 - Create onboarding event stream for analytics.
 - Build dashboards for HR/IT/Managers.
 - Add reminder notifications and escalation flow for blocked tasks.
 

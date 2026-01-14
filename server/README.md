# Onboarding System Backend API

NestJS + Prisma + PostgreSQL backend for the onboarding system.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
npm install
```

### Database Setup

1. Configure your database connection in `.env`:
```
DATABASE_URL="postgres://user:password@host:port/database"
PORT=3001
```

2. Run migrations:
```bash
npm run prisma:migrate
```

3. Seed the database with sample data:
```bash
npm run prisma:seed
```

### Running the Server

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server will run on `http://localhost:3001`

## 📚 API Endpoints

### Employees
- `GET /employees` - Get all employees (with filters)
- `GET /employees/:id` - Get employee by ID
- `GET /employees/:id/team` - Get employee's team
- `GET /employees/departments` - Get all departments
- `GET /employees/divisions` - Get all divisions
- `GET /employees/contacts` - Get internal contacts

### Menu
- `GET /menu` - Get cafeteria menu with all categories

### Calendar
- `GET /calendar?year=2026` - Get company calendar with holidays

### Attendance
- `GET /attendance/:employeeId` - Get attendance for employee
- `POST /attendance/:employeeId/check-in` - Check in
- `POST /attendance/:employeeId/check-out` - Check out

### Onboarding
- `GET /onboarding/tasks/:employeeId` - Get onboarding tasks
- `GET /onboarding/id-badge/:employeeId` - Get ID badge status
- `GET /onboarding/email-setup/:employeeId` - Get email setup status
- `GET /onboarding/building-tours/:employeeId` - Get building tours
- `GET /onboarding/workshops` - Get orientation workshops
- `GET /onboarding/benefits/:employeeId` - Get benefits overview
- `GET /onboarding/probation/:employeeId` - Get probation status
- `GET /onboarding/feedback/:employeeId` - Get feedback surveys
- `POST /onboarding/feedback/:employeeId` - Submit feedback

### Requests
- `GET /requests/documents/:employeeId` - Get document requests
- `POST /requests/documents/:employeeId` - Create document request
- `GET /requests/leave/:employeeId` - Get leave requests
- `POST /requests/leave/:employeeId` - Create leave request
- `GET /requests/equipment/:employeeId` - Get equipment requests
- `POST /requests/equipment/:employeeId` - Create equipment request
- `GET /requests/parking/:employeeId` - Get parking request
- `POST /requests/parking/:employeeId` - Create parking request
- `GET /requests/it-access/:employeeId` - Get IT access requests
- `POST /requests/it-access/:employeeId` - Create IT access request

## 🗄️ Database Schema

The database includes:
- **Employees** - Employee information and relationships
- **Regions, Divisions, Departments** - Organizational structure
- **Menu Categories & Items** - Cafeteria menu
- **Holidays** - Company calendar
- **Attendance Records** - Check-in/out tracking
- **Onboarding Tasks** - Task tracking for new employees
- **Requests** - Document, leave, equipment, parking, IT access
- **ID Badges & Email Setup** - Setup status tracking
- **Building Tours & Workshops** - Orientation activities
- **Benefits** - Compensation and insurance
- **Probation** - Tracking and evaluations
- **Feedback Surveys** - Employee feedback

## 🔧 Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# View database in Prisma Studio
npm run prisma:studio

# Seed database
npm run prisma:seed
```

## 📦 Tech Stack

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **TypeScript** - Type-safe development
- **Class Validator** - DTO validation

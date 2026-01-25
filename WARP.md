# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an AI-powered employee onboarding system for RAFED/Tatweer Education built as a **monorepo** with:
- **Client**: React + TypeScript + Vite frontend with custom UI components
- **Server**: NestJS + Prisma + PostgreSQL backend API
- **Integration**: Uses `@hsafa/ui-sdk` for AI agent chat interface and component rendering

The system provides 20 interactive UI components (defined in `client/AI_AGENT_COMPONENTS.md`) that AI agents can dynamically present to guide new employees through onboarding stages: pre-joining, first day, and post-joining.

## Development Commands

### Running the Application

```bash
# Root - Run both client and server concurrently
npm run dev

# Client only (port 5173)
npm run dev:client

# Server only (port 3001)
npm run dev:server
```

### Database Operations

```bash
# Navigate to server directory first
cd server

# Generate Prisma Client after schema changes
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

### Building

```bash
# Client: Build for production
cd client && npm run build

# Client: Preview production build
cd client && npm run preview

# Server: Build NestJS application
cd server && npm run build

# Server: Run production build
cd server && npm run start:prod
```

### Code Quality

```bash
# Client: Lint TypeScript/React code
cd client && npm run lint

# Server: Format code
cd server && npm run format
```

### Testing

This codebase does not currently have automated tests configured. When adding tests, follow NestJS testing conventions (Jest) for the server and consider Vitest for the client.

## Architecture

### Monorepo Structure

```
rafed-onboarding-agent/
├── client/          # React frontend (Vite)
├── server/          # NestJS backend
├── public/          # Employee photos
├── hsafa-docs/      # Documentation for @hsafa/ui-sdk
└── src/             # Shared root-level source (if any)
```

### Client Architecture

**Stack**: React 19 + TypeScript + Vite + TailwindCSS 4 + React Router 6

**Key Patterns**:
- All 20 onboarding UI components live in `client/src/components/` and are **self-contained functional components**
- Each component accepts `ToolResultProps` from `shared-types.ts` for integration with the AI agent chat
- Components are registered in `component-registrations.json` with Zod schemas defining their data contracts
- Components must be added to the `uiComponents` object in `App.tsx` to be available to the chat interface
- The chat interface is powered by `@hsafa/ui-sdk` - see `hsafa-docs/hsafa-sdk/docs/` for detailed SDK documentation

**Component Categories**:
- **Information Display**: Employee Directory, Department Browser, Cafeteria Menu, Company Calendar
- **Tracking**: Attendance Tracker, Onboarding Task Tracker, Probation Tracker
- **Request Forms**: Document Request, Leave Request, Equipment Request, Parking Request, IT Access Request
- **Setup Status**: ID Badge Status, Email Setup Status
- **Onboarding Activities**: Building Tour Scheduler, Meet Your Team, Orientation Workshop
- **Resources**: Internal Contact Directory, Benefits Overview, Feedback Survey

**Routing**:
- Main app routes use `SystemLayout` wrapper
- `/chat` route provides the AI agent chat interface where UI components are dynamically rendered
- `/login`, `/test-components` are standalone routes

### Server Architecture

**Stack**: NestJS + Prisma ORM + PostgreSQL + TypeScript

**Module Structure** (Domain-Driven):
```
src/
├── prisma/         # PrismaService + module
├── employees/      # Employee CRUD, department/division/region queries
├── menu/           # Cafeteria menu API
├── calendar/       # Company calendar with holidays
├── attendance/     # Check-in/out, attendance records
├── onboarding/     # Onboarding tasks, ID badge, email setup, tours, workshops, benefits, probation, feedback
└── requests/       # Document, leave, equipment, parking, IT access requests
```

Each module follows NestJS conventions:
- `*.controller.ts` - REST endpoints
- `*.service.ts` - Business logic
- `*.module.ts` - Module definition

**Database Design**:
- Comprehensive Prisma schema in `server/prisma/schema.prisma`
- Tracks employees, organizational hierarchy (regions, divisions, departments), onboarding lifecycle, and all request types
- Uses PostgreSQL with relations, indexes, and enums for type safety
- Seed file: `server/prisma/seed.ts`

**API Patterns**:
- RESTful endpoints (see `server/README.md` for full API documentation)
- Validation using `class-validator` DTOs
- CORS enabled for localhost:5173 (Vite dev) and localhost:3000

### Data Flow

1. **AI Agent Chat** (powered by @hsafa/ui-sdk) interprets user intent
2. **Agent calls custom UI component tools** (defined in component-registrations.json)
3. **Components fetch data** from NestJS backend API
4. **Backend queries PostgreSQL** via Prisma ORM
5. **Data rendered** in React components using Zod-validated schemas

### Key Integration Points

- **@hsafa/ui-sdk**: The `HsafaProvider` wraps the app and provides chat + agent context. Components are passed to `ChatPage` via the `uiComponents` prop.
- **Component Registration**: When adding new components:
  1. Create the component in `client/src/components/`
  2. Define its Zod schema in `client/AI_AGENT_COMPONENTS.md`
  3. Add entry to `client/component-registrations.json`
  4. Export from `App.tsx` uiComponents object
- **Backend API**: Client components make direct HTTP calls to `http://localhost:3001` (or configured backend URL)

### Environment Configuration

**Client**:
- Uses environment variables for backend URL (if configured)
- Dark/light theme persisted to localStorage
- HsafaProvider connects to `https://server.hsafa.com` (AI agent backend)

**Server**:
- Requires `.env` file with:
  ```
  DATABASE_URL="postgresql://user:password@host:port/database"
  PORT=3001
  ```
- Must run database migrations before first start

## Important Context

### Bilingual Support (Arabic/English)
- All data models support both Arabic (`nameAr`, `taskAr`) and English (`nameEn`, `taskEn`)
- Components should display both or allow language toggle where appropriate

### Onboarding Stages
The system tracks three stages (`OnboardingStage` enum):
- `PRE_JOINING` - Before employee's first day
- `FIRST_DAY` - Employee's first day at work
- `POST_JOINING` - Ongoing onboarding after first day

Components intelligently show content based on the employee's current stage (see component selection logic in `AI_AGENT_COMPONENTS.md`).

### Regional Structure
RAFED operates across multiple Saudi regions: HO (Headquarters), Riyadh, Makkah, Madinah, Eastern, Southern, Northern, Qassim. This affects employee assignment, department location, and tour scheduling.

### hsafa-docs Directory
Contains comprehensive documentation for the `@hsafa/ui-sdk` including:
- SDK API reference
- Usage guides (headless, chat UI, custom components)
- Migration guides
- Examples and recipes

**When working with the chat interface or custom components, consult these docs first.**

## Common Workflows

### Adding a New UI Component

1. Define the component schema in `client/AI_AGENT_COMPONENTS.md`
2. Create the React component in `client/src/components/ComponentName.tsx`
3. Implement data fetching from the backend API
4. Add component to `component-registrations.json` with toolName, description, and Zod schema
5. Export component in `client/src/App.tsx` uiComponents object
6. If needed, create backend endpoint in appropriate module (e.g., `onboarding`, `requests`)

### Adding a New Backend API Endpoint

1. Identify the appropriate module or create a new one
2. Add method to the service class (`*.service.ts`)
3. Implement Prisma query logic
4. Create controller endpoint (`*.controller.ts`) with proper HTTP method
5. Add DTO for validation if accepting request body
6. Update module imports if creating new module
7. Test using Prisma Studio or direct HTTP calls

### Database Schema Changes

1. Edit `server/prisma/schema.prisma`
2. Run `npm run prisma:migrate` to create and apply migration
3. Run `npm run prisma:generate` to update Prisma Client types
4. Update seed file (`server/prisma/seed.ts`) if needed
5. Restart the dev server to pick up new types

### Running Tests

Currently no test suite exists. When implementing:
- Server: Use NestJS testing utilities with Jest
- Client: Consider Vitest (Vite's test runner) with React Testing Library
- Focus on testing services, controllers, and critical UI component logic

## Design Patterns and Conventions

- **Component Props**: All custom UI components should accept `ToolResultProps` for agent integration
- **API Responses**: Return plain JSON objects; NestJS automatically serializes
- **Error Handling**: Use NestJS built-in exception filters (NotFoundException, BadRequestException, etc.)
- **Styling**: TailwindCSS utility classes, dark mode via `dark:` prefix
- **File Naming**: 
  - React components: PascalCase (e.g., `EmployeeDirectory.tsx`)
  - Services/Controllers: kebab-case with suffix (e.g., `onboarding.service.ts`)
  - Modules: kebab-case directories

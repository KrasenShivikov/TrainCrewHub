# TrainCrewHub

**English** | [Български](README.bg.md)

TrainCrewHub is a platform for managing train crew schedules, assignments, and supporting reference data: duties, schedule keys, planning/actual duty assignments, trains, employees, absences, and documents. The frontend is a SPA (Vanilla JS + Bootstrap) and the backend is Supabase (PostgreSQL + Auth + Storage + Row Level Security).

## Features (high level)

- Supabase Auth: sign in/register, forgot password, reset password.
- Roles & access control (RLS + UI permission guards).
- Schedule keys: CRUD and view duties linked to a schedule key.
- Duties: manage duties, duty profile, duplicate, attach/manage trains for a duty.
- Duty types: reference data management.
- Trains: manage trains + upload and attach timetable files (Storage).
- Trains for duties: list/add/edit/detach trains linked to a specific duty.
- Employees: employee profiles, position/status, files (e.g. photos) via Storage.
- Absences: manage employee absences.
- Planned & actual duties: assign employees/roles to duties by date.
- Plan schedule & schedule: screens for planning and actual assignments.
- Documents: documents by category + preview/open.
- User profiles: view/edit (and admin-only actions when permitted).

## Tech stack

- Frontend: Vanilla JS (ES modules), Bootstrap 5 (CDN), Bootstrap Icons (CDN)
- Build: Vite
- Backend: Supabase (PostgreSQL, Supabase Auth, Storage, RLS policies)
- Hosting: Netlify

## Local development

### 1) Requirements

- Node.js `>= 20` (Netlify builds use Node 20)

### 2) Install

```bash
npm install
```

### 3) Environment variables

Create a `.env.local` file in the project root:

```bash
VITE_SUPABASE_URL="https://YOUR_PROJECT_REF.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_KEY"
# alternative (backward compatible):
# VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
```

The client is in `src/services/supabaseClient.js` and will throw if required env vars are missing.

### 4) Run

```bash
npm run dev
```

Vite runs on `http://localhost:5173`.

## Supabase (DB, Auth, Storage)

### Migrations

SQL migrations live in `supabase/migrations/`.

- Do not edit migrations that have already been applied.
- For schema changes, add a new migration file.

How you apply migrations depends on your workflow (Supabase CLI vs MCP/Studio). At minimum: create a Supabase project and apply the SQL files from `supabase/migrations/` in order.

### Storage

The project uses Supabase Storage for files (e.g. train timetables, employee photos, documents). Make sure the required buckets and policies from the migrations exist in your Supabase project.

## Database schema (overview)

The authoritative schema is the migrations in `supabase/migrations/`. Below is a high-level overview of the main entities and relationships.

### ER diagram (Mermaid)

```mermaid
erDiagram
   POSITIONS {
      uuid id PK
      text title
   }
   EMPLOYEES {
      uuid id PK
      uuid position_id FK
   }
   ABSENCE_REASONS {
      uuid id PK
   }
   EMPLOYEE_ABSENCES {
      uuid id PK
      uuid employee_id FK
      uuid reason_id FK
   }
   SCHEDULE_KEYS {
      uuid id PK
   }
   DUTY_TYPES {
      uuid id PK
   }
   DUTIES {
      uuid id PK
      uuid schedule_key_id FK
      uuid duty_type_id FK
   }
   SCHEDULE_KEY_DUTIES {
      uuid schedule_key_id PK
      uuid duty_id PK
   }
   TRAINS {
      uuid id PK
   }
   DUTY_TRAINS {
      uuid duty_id PK
      uuid train_id PK
   }
   PLANNED_DUTIES {
      uuid id PK
      uuid employee_id FK
      uuid duty_id FK
   }
   ACTUAL_DUTIES {
      uuid id PK
      uuid employee_id FK
      uuid duty_id FK
   }
   DOCUMENT_CATEGORIES {
      uuid id PK
   }
   DOCUMENTS {
      uuid id PK
      uuid category_id FK
   }
   AUTH_USERS {
      uuid id PK
   }
   USER_PROFILES {
      uuid id PK
      uuid employee_id FK
   }
   USER_ROLES {
      uuid id PK
      uuid user_id FK
      text role FK
   }
   ROLES {
      text name PK
   }
   ROLE_PERMISSIONS {
      uuid id PK
      text role FK
   }
   USER_ROLE_AUDIT_LOGS {
      uuid id PK
      uuid actor_user_id FK
      uuid target_user_id FK
   }
   SCHEDULE_PUBLICATIONS {
      date schedule_date PK
   }
   SCHEDULE_CHANGE_EVENTS {
      bigint id PK
      uuid actual_duty_id
   }

   POSITIONS ||--o{ EMPLOYEES : has
   ABSENCE_REASONS ||--o{ EMPLOYEE_ABSENCES : reason
   EMPLOYEES ||--o{ EMPLOYEE_ABSENCES : has

   SCHEDULE_KEYS ||--o{ DUTIES : default_key
   DUTY_TYPES ||--o{ DUTIES : type
   SCHEDULE_KEYS ||--o{ SCHEDULE_KEY_DUTIES : maps
   DUTIES ||--o{ SCHEDULE_KEY_DUTIES : maps

   DUTIES ||--o{ DUTY_TRAINS : includes
   TRAINS ||--o{ DUTY_TRAINS : includes

   EMPLOYEES ||--o{ PLANNED_DUTIES : assigned
   DUTIES ||--o{ PLANNED_DUTIES : planned

   EMPLOYEES ||--o{ ACTUAL_DUTIES : assigned
   DUTIES ||--o{ ACTUAL_DUTIES : actual
   ACTUAL_DUTIES ||--o{ SCHEDULE_CHANGE_EVENTS : logs

   DOCUMENT_CATEGORIES ||--o{ DOCUMENTS : contains

   AUTH_USERS ||--|| USER_PROFILES : profile
   EMPLOYEES ||--o{ USER_PROFILES : linked_employee

   AUTH_USERS ||--o{ USER_ROLES : has
   ROLES ||--o{ USER_ROLES : role
   ROLES ||--o{ ROLE_PERMISSIONS : permissions

   AUTH_USERS ||--o{ USER_ROLE_AUDIT_LOGS : actor
   AUTH_USERS ||--o{ USER_ROLE_AUDIT_LOGS : target
```

Notes:
- The diagram is intentionally simplified (not every column/index/constraint is shown).
- `AUTH_USERS` represents `auth.users` in Supabase.

### Reference & people

- `positions` (job titles)
- `employees` → `positions` (`employees.position_id`)
- `absence_reasons`
- `employee_absences` → `employees`, `absence_reasons`

### Scheduling

- `schedule_keys` (date ranges + type)
- `duty_types`
- `duties` → `schedule_keys` (`duties.schedule_key_id`, optional) and → `duty_types` (`duties.duty_type_id`)
- `schedule_key_duties` (many-to-many) → `schedule_keys` + `duties`

### Trains

- `trains` (includes `timetable_url` / timetable file references)
- `duty_trains` (many-to-many) → `duties` + `trains` + `sequence_order`

### Assignments

- `planned_duties` → `employees` + `duties` (by `date`, includes `assignment_role`)
- `actual_duties` → `employees` + `duties` (by `date`, includes `assignment_role` and time overrides)

### Documents

- `document_categories`
- `documents` → `document_categories`

### Auth & permissions

- Supabase Auth users live in `auth.users`
- `user_profiles` is 1:1 with `auth.users` and can link to `employees` (`user_profiles.employee_id`)
- `user_roles` assigns app roles to users (FK to `auth.users`)
- `roles` is a roles catalog used by `user_roles` / `role_permissions`
- `role_permissions` stores per-role permissions by resource
- `user_role_audit_logs` records role changes

### Schedule audit / publishing

- `schedule_publications` stores per-date confirmation state
- `schedule_change_events` logs changes in `actual_duties`

## Deployment (Netlify)

Configuration is in `netlify.toml`:

- Build command: `npm run build`
- Publish: `dist`
- Redirect: `/* -> /index.html` (SPA routing)

In Netlify, set environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY` (or `VITE_SUPABASE_ANON_KEY`)

## Project structure

Main folders and responsibilities:

```text
.
├─ index.html                # Bootstrap + Bootstrap Icons (CDN) + entry to src/main.js
├─ src/
│  ├─ main.js                 # app bootstrap (page shell + router)
│  ├─ router.js               # SPA routing + access guards (session/role/permissions)
│  ├─ styles.css              # global styles + design tokens
│  ├─ components/             # shared UI components (header/footer/toast/page shell)
│  ├─ pages/                  # pages (one folder per page)
│  │  └─ <page>/
│  │     ├─ <page>.html
│  │     └─ js/                # page orchestrator + modules (state/helpers/table/...)
│  ├─ services/               # external services (Supabase client)
│  └─ utils/                  # shared utilities (auth, permissions, pagination, ...)
└─ supabase/
   ├─ migrations/             # DB/RLS/Storage migrations (append-only)
   └─ functions/              # Edge Functions (if present)
```

Pages follow this convention:

```text
src/pages/<page>/<page>.html
src/pages/<page>/js/<page>.js
src/pages/<page>/js/helpers.js
src/pages/<page>/js/state.js
src/pages/<page>/js/table.js   # when the page has a table/listing
```

This keeps each page's state/render/handlers isolated and avoids cross-page coupling.

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview the build

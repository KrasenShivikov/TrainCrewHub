-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Enums and Reference Data
-- Roles enum as requested
create type app_role as enum (
    'admin', 
    'head_of_transport', -- Head of Transport Service
    'instructor',        -- Instructor
    'user'               -- User/Crew Member
);

-- Schedule keys types
create type schedule_type as enum ('seasonal', 'ad-hoc', 'temporary');

-- 2. Positions (Позиции)
create table positions (
    id uuid primary key default uuid_generate_v4(),
    title text not null, -- Title / Name (Наименование)
    created_at timestamptz default now(),
    created_from text -- User who created the record
);

-- 3. Employees (Служители)
create table employees (
    id uuid primary key default uuid_generate_v4(),
    first_name text not null,
    last_name text not null,
    photo_url text, -- Photo (Снимка) - stored in Supabase Storage
    position_id uuid references positions(id),
    is_active boolean default true, -- Is Active?
    psychological_assessment_expiry date,
    medical_certificate_expiry date,
    license_expiry date, -- License Expiry
    other_certificates jsonb, -- Other Certificates (store as structured data)
    created_at timestamptz default now(),
    created_from text, -- User who created the record
    updated_at timestamptz default now()
);

-- 4. Reasons for Absence (Причини за отсъствие)
create table absence_reasons (
    id uuid primary key default uuid_generate_v4(),
    name text not null, -- Name
    description text, -- Description
    created_at timestamptz default now(),
    created_from text -- User who created the record
);

-- 5. Absent Employees (Отсъстващи служители)
create table employee_absences (
    id uuid primary key default uuid_generate_v4(),
    employee_id uuid references employees(id) not null,
    reason_id uuid references absence_reasons(id) not null,
    start_date date not null, -- From Date
    end_date date not null, -- To Date
    notes text,
    created_at timestamptz default now(),
    created_from text -- User who created the record
);

-- 6. Schedule Keys (КлючГрафик)
create table schedule_keys (
    id uuid primary key default uuid_generate_v4(),
    name text not null, -- Name
    is_active boolean default true, -- Active
    type schedule_type default 'seasonal', -- Type
    valid_from date not null, -- From Date
    valid_to date not null, -- To Date
    created_at timestamptz default now(),
    created_from text -- User who created the record
);

-- 7. Duties (Повески)
create table duties (
    id uuid primary key default uuid_generate_v4(),
    schedule_key_id uuid references schedule_keys(id), -- Link to Schedule Key
    name text not null, -- Name / Designation
    start_time time not null, -- Start (Time portion)
    end_time time not null, -- End (Time portion)
    duration interval generated always as (
        case when end_time >= start_time 
            then end_time - start_time
            else (end_time - start_time) + interval '24 hours'
        end
    ) stored, -- Calculated Duration
    created_at timestamptz default now(),
    created_from text -- User who created the record
);

-- 8. Trains (Влак)
create table trains (
    id uuid primary key default uuid_generate_v4(),
    number text not null, -- Number
    origin_station text not null, -- Origin
    destination_station text not null, -- Destination
    departure_time time not null, -- Departure
    arrival_time time not null, -- Arrival
    timetable_url text, -- Timetable / Attached file (Storage URL)
    created_at timestamptz default now(),
    created_from text -- User who created the record
);

-- 9. Duty Trains (Junction for "Train List" in Duty)
create table duty_trains (
    duty_id uuid references duties(id) on delete cascade,
    train_id uuid references trains(id) on delete cascade,
    sequence_order int not null default 1, -- To order trains within a duty
    primary key (duty_id, train_id)
);

-- 10. Planned Employees by Duty (Планирани служители по повески)
create table planned_duties (
    id uuid primary key default uuid_generate_v4(),
    date date not null, -- Date
    employee_id uuid references employees(id),
    duty_id uuid references duties(id),
    created_at timestamptz default now(),
    created_from text, -- User who created the record
    unique(date, employee_id, duty_id)
);

-- 11. Employees by Duty - Actual (Служители по повески - реално изпълнение)
create table actual_duties (
    id uuid primary key default uuid_generate_v4(),
    date date not null, -- Date
    employee_id uuid references employees(id),
    duty_id uuid references duties(id),
    reported_at timestamptz default now(),
    unique(date, employee_id, duty_id)
);

-- 12. User Roles & Users (Handling Supabase Auth integration)
-- Note: 'Users' are managed by Supabase Auth (auth.users table).
-- We create a profile table to link Auth Users to Application Employees/Roles.

create table user_roles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) not null,
    role app_role not null, -- Enum: admin, head_of_transport, instructor, user
    created_at timestamptz default now(),
    created_from text, -- User who created the record
    unique(user_id, role)
);

create table user_profiles (
    id uuid references auth.users(id) primary key, -- 1:1 with auth.users
    username text unique,
    employee_id uuid references employees(id), -- Employee Reference
    created_at timestamptz default now(),
    created_from text, -- User who created the record
    updated_at timestamptz default now()
);

-- Add RLS (Row Level Security) basics - can be expanded later
alter table employees enable row level security;
alter table duties enable row level security;
alter table planned_duties enable row level security;
alter table actual_duties enable row level security;

-- Simple policy: authenticated users can read.
create policy "Public read access" on employees for select using (auth.role() = 'authenticated');
create policy "Public read access" on duties for select using (auth.role() = 'authenticated');

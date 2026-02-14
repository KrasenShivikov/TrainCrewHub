alter table if exists public.schedule_keys enable row level security;
alter table if exists public.positions enable row level security;
alter table if exists public.absence_reasons enable row level security;
alter table if exists public.employee_absences enable row level security;
alter table if exists public.trains enable row level security;
alter table if exists public.duty_trains enable row level security;
alter table if exists public.user_roles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_keys'
      and policyname = 'Authenticated users can read schedule keys'
  ) then
    create policy "Authenticated users can read schedule keys"
    on public.schedule_keys
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'positions'
      and policyname = 'Authenticated users can read positions'
  ) then
    create policy "Authenticated users can read positions"
    on public.positions
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'absence_reasons'
      and policyname = 'Authenticated users can read absence reasons'
  ) then
    create policy "Authenticated users can read absence reasons"
    on public.absence_reasons
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_absences'
      and policyname = 'Authenticated users can read employee absences'
  ) then
    create policy "Authenticated users can read employee absences"
    on public.employee_absences
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'trains'
      and policyname = 'Authenticated users can read trains'
  ) then
    create policy "Authenticated users can read trains"
    on public.trains
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_trains'
      and policyname = 'Authenticated users can read duty trains'
  ) then
    create policy "Authenticated users can read duty trains"
    on public.duty_trains
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Authenticated users can read user roles'
  ) then
    create policy "Authenticated users can read user roles"
    on public.user_roles
    for select
    using (auth.role() = 'authenticated');
  end if;
end $$;

create index if not exists idx_actual_duties_employee_id on public.actual_duties (employee_id);
create index if not exists idx_actual_duties_duty_id on public.actual_duties (duty_id);
create index if not exists idx_planned_duties_employee_id on public.planned_duties (employee_id);
create index if not exists idx_planned_duties_duty_id on public.planned_duties (duty_id);

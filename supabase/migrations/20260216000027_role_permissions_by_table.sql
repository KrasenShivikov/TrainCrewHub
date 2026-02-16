create table if not exists public.role_permissions (
  id uuid primary key default uuid_generate_v4(),
  role app_role not null,
  resource text not null,
  can_view_screen boolean not null default false,
  can_view_records boolean not null default false,
  can_edit_records boolean not null default false,
  can_delete_records boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(role, resource)
);

alter table if exists public.role_permissions enable row level security;

insert into public.role_permissions (role, resource, can_view_screen, can_view_records, can_edit_records, can_delete_records)
select
  r.role,
  t.table_name,
  true as can_view_screen,
  true as can_view_records,
  (r.role = 'admin'::app_role) as can_edit_records,
  (r.role = 'admin'::app_role) as can_delete_records
from (
  select unnest(enum_range(null::app_role)) as role
) r
cross join (
  select table_name
  from information_schema.tables
  where table_schema = 'public'
    and table_type = 'BASE TABLE'
) t
on conflict (role, resource) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'role_permissions'
      and policyname = 'Authenticated users can read role permissions'
  ) then
    create policy "Authenticated users can read role permissions"
    on public.role_permissions
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'role_permissions'
      and policyname = 'Admins can insert role permissions'
  ) then
    create policy "Admins can insert role permissions"
    on public.role_permissions
    for insert
    with check (public.is_current_user_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'role_permissions'
      and policyname = 'Admins can update role permissions'
  ) then
    create policy "Admins can update role permissions"
    on public.role_permissions
    for update
    using (public.is_current_user_admin())
    with check (public.is_current_user_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'role_permissions'
      and policyname = 'Admins can delete role permissions'
  ) then
    create policy "Admins can delete role permissions"
    on public.role_permissions
    for delete
    using (public.is_current_user_admin());
  end if;
end $$;

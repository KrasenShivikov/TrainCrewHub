create table if not exists public.schedule_publications (
  schedule_date date primary key,
  is_confirmed boolean not null default false,
  source text not null default 'timetable',
  confirmed_at timestamptz,
  confirmed_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_from text
);

create index if not exists idx_schedule_publications_confirmed_date
  on public.schedule_publications (is_confirmed, schedule_date);

alter table if exists public.schedule_publications enable row level security;

drop policy if exists "Authenticated users can read schedule publications" on public.schedule_publications;
create policy "Authenticated users can read schedule publications"
  on public.schedule_publications
  for select
  to public
  using ((select auth.role()) = 'authenticated');

drop policy if exists "Users with actual duties edit access can insert schedule publications" on public.schedule_publications;
create policy "Users with actual duties edit access can insert schedule publications"
  on public.schedule_publications
  for insert
  to public
  with check (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'edit_records', null, null)
  );

drop policy if exists "Users with actual duties edit access can update schedule publications" on public.schedule_publications;
create policy "Users with actual duties edit access can update schedule publications"
  on public.schedule_publications
  for update
  to public
  using (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'edit_records', null, null)
  )
  with check (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'edit_records', null, null)
  );

drop policy if exists "Admins can delete schedule publications" on public.schedule_publications;
create policy "Admins can delete schedule publications"
  on public.schedule_publications
  for delete
  to public
  using (public.is_current_user_admin());

insert into public.role_permissions (
  role,
  resource,
  display_name_bg,
  view_screen_scope,
  view_records_scope,
  edit_records_scope,
  delete_records_scope
)
select
  role,
  'schedule_publications'::text,
  'Потвърдени разписания'::text,
  'none'::public.access_scope,
  case when role = 'admin' then 'all'::public.access_scope else 'none'::public.access_scope end,
  case when role = 'admin' then 'all'::public.access_scope else 'none'::public.access_scope end,
  case when role = 'admin' then 'all'::public.access_scope else 'none'::public.access_scope end
from (
  select distinct ur.role::text as role
  from public.user_roles ur
  where ur.role is not null
) roles
where not exists (
  select 1
  from public.role_permissions rp
  where rp.role = roles.role
    and rp.resource = 'schedule_publications'
);

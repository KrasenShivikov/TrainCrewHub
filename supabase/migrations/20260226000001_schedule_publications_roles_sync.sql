-- Sync schedule_publications RLS to use its own resource scope (not actual_duties).
-- Also ensure role_permissions rows exist for schedule_publications for all roles.

-- =========================================
-- 1) Update role_permissions for all roles
-- =========================================

insert into public.role_permissions (role, resource, view_screen_scope, view_records_scope, create_records_scope, edit_records_scope, delete_records_scope)
values
  ('admin',          'schedule_publications', 'all',  'all',  'none', 'all',  'all'),
  ('head_of_transport', 'schedule_publications', 'all', 'all', 'all',  'all',  'all'),
  ('crew',           'schedule_publications', 'none', 'all',  'none', 'none', 'none'),
  ('instructor',     'schedule_publications', 'none', 'all',  'none', 'none', 'none')
on conflict (role, resource) do update set
  view_screen_scope    = excluded.view_screen_scope,
  view_records_scope   = excluded.view_records_scope,
  create_records_scope = excluded.create_records_scope,
  edit_records_scope   = excluded.edit_records_scope,
  delete_records_scope = excluded.delete_records_scope,
  updated_at           = now();

-- =====================================================
-- 2) Replace policies to use schedule_publications scope
-- =====================================================

drop policy if exists "Users with actual duties view access can read schedule publications" on public.schedule_publications;
drop policy if exists "Users with schedule publications view access can read schedule publications" on public.schedule_publications;
create policy "Users with schedule publications view access can read schedule publications"
  on public.schedule_publications
  for select
  to authenticated
  using (
    public.is_current_user_admin()
    or public.can_access_resource('schedule_publications', 'view_records', null, null)
  );

drop policy if exists "Users with actual duties create access can insert schedule publications" on public.schedule_publications;
drop policy if exists "Users with schedule publications create access can insert schedule publications" on public.schedule_publications;
create policy "Users with schedule publications create access can insert schedule publications"
  on public.schedule_publications
  for insert
  to authenticated
  with check (
    public.is_current_user_admin()
    or public.can_access_resource('schedule_publications', 'create_records', null, null)
  );

drop policy if exists "Users with actual duties edit access can update schedule publications" on public.schedule_publications;
drop policy if exists "Users with schedule publications edit access can update schedule publications" on public.schedule_publications;
create policy "Users with schedule publications edit access can update schedule publications"
  on public.schedule_publications
  for update
  to authenticated
  using (
    public.is_current_user_admin()
    or public.can_access_resource('schedule_publications', 'edit_records', null, null)
  )
  with check (
    public.is_current_user_admin()
    or public.can_access_resource('schedule_publications', 'edit_records', null, null)
  );

-- Sync user_profiles RLS with role_permissions scopes.
--
-- Prior behavior was effectively: user can access own profile; admin can access all.
-- This migration keeps that as the default via role_permissions scopes, but enforces it through
-- can_access_resource('user_profiles', ...) so the Admin panel becomes the single source of truth.

-- -------------------------
-- 1) Default scopes (safe)
-- -------------------------

-- Ensure non-admin roles do not accidentally gain "all" access due to earlier defaults.
update public.role_permissions
set
  view_screen_scope = 'all'::public.access_scope,
  view_records_scope = 'own'::public.access_scope,
  create_records_scope = 'own'::public.access_scope,
  edit_records_scope = 'own'::public.access_scope,
  delete_records_scope = 'none'::public.access_scope,
  updated_at = now()
where resource = 'user_profiles'
  and role::text <> 'admin';

update public.role_permissions
set
  view_screen_scope = 'all'::public.access_scope,
  view_records_scope = 'all'::public.access_scope,
  create_records_scope = 'all'::public.access_scope,
  edit_records_scope = 'all'::public.access_scope,
  delete_records_scope = 'all'::public.access_scope,
  updated_at = now()
where resource = 'user_profiles'
  and role::text = 'admin';


-- ------------------------------------------
-- 2) Replace bespoke policies with baseline
-- ------------------------------------------

drop policy if exists "Users and admins can insert user profiles" on public.user_profiles;
drop policy if exists "Users and admins can read user profiles" on public.user_profiles;
drop policy if exists "Users and admins can update user profiles" on public.user_profiles;

drop policy if exists "Authenticated users can read user profiles" on public.user_profiles;
create policy "Authenticated users can read user profiles"
  on public.user_profiles
  for select
  to authenticated
  using ((select auth.role()) = 'authenticated');

drop policy if exists "Authenticated users can insert user profiles" on public.user_profiles;
create policy "Authenticated users can insert user profiles"
  on public.user_profiles
  for insert
  to authenticated
  with check ((select auth.role()) = 'authenticated');

drop policy if exists "Authenticated users can update user profiles" on public.user_profiles;
create policy "Authenticated users can update user profiles"
  on public.user_profiles
  for update
  to authenticated
  using ((select auth.role()) = 'authenticated')
  with check ((select auth.role()) = 'authenticated');

drop policy if exists "Authenticated users can delete user profiles" on public.user_profiles;
create policy "Authenticated users can delete user profiles"
  on public.user_profiles
  for delete
  to authenticated
  using ((select auth.role()) = 'authenticated');


-- --------------------------------
-- 3) Enforce role_permissions scopes
-- --------------------------------
-- Use employee_id for scope checks (when present) and id::text to support "own" even when employee_id is null.

drop policy if exists "Scope select user_profiles" on public.user_profiles;
drop policy if exists "Scope insert user_profiles" on public.user_profiles;
drop policy if exists "Scope update user_profiles" on public.user_profiles;
drop policy if exists "Scope delete user_profiles" on public.user_profiles;

create policy "Scope select user_profiles"
  on public.user_profiles
  as restrictive
  for select
  to authenticated
  using (
    public.can_access_resource('user_profiles', 'view_records', employee_id, id::text)
  );

create policy "Scope insert user_profiles"
  on public.user_profiles
  as restrictive
  for insert
  to authenticated
  with check (
    public.can_access_resource('user_profiles', 'create_records', employee_id, id::text)
  );

create policy "Scope update user_profiles"
  on public.user_profiles
  as restrictive
  for update
  to authenticated
  using (
    public.can_access_resource('user_profiles', 'edit_records', employee_id, id::text)
  )
  with check (
    public.can_access_resource('user_profiles', 'edit_records', employee_id, id::text)
  );

create policy "Scope delete user_profiles"
  on public.user_profiles
  as restrictive
  for delete
  to authenticated
  using (
    public.can_access_resource('user_profiles', 'delete_records', employee_id, id::text)
  );

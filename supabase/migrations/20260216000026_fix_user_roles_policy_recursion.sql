create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'admin'::app_role
  );
$$;

revoke all on function public.is_current_user_admin() from public;
grant execute on function public.is_current_user_admin() to authenticated;

do $$
begin
  if exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins can insert user roles'
  ) then
    drop policy "Admins can insert user roles" on public.user_roles;
  end if;

  if exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins can update user roles'
  ) then
    drop policy "Admins can update user roles" on public.user_roles;
  end if;

  if exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins can delete user roles'
  ) then
    drop policy "Admins can delete user roles" on public.user_roles;
  end if;

  create policy "Admins can insert user roles"
  on public.user_roles
  for insert
  with check (public.is_current_user_admin());

  create policy "Admins can update user roles"
  on public.user_roles
  for update
  using (public.is_current_user_admin())
  with check (public.is_current_user_admin());

  create policy "Admins can delete user roles"
  on public.user_roles
  for delete
  using (public.is_current_user_admin());

  if exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_profiles'
      and policyname = 'Admins can insert all user profiles'
  ) then
    drop policy "Admins can insert all user profiles" on public.user_profiles;
  end if;

  create policy "Admins can insert all user profiles"
  on public.user_profiles
  for insert
  with check (public.is_current_user_admin());
end $$;

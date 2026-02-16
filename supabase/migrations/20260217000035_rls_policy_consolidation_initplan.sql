drop policy if exists "Admins can insert all user profiles" on public.user_profiles;
drop policy if exists "Users can insert own profile" on public.user_profiles;
drop policy if exists "Admins can read all user profiles" on public.user_profiles;
drop policy if exists "Users can read own profile" on public.user_profiles;
drop policy if exists "Admins can update all user profiles" on public.user_profiles;
drop policy if exists "Users can update own profile" on public.user_profiles;

create policy "Users and admins can insert user profiles"
on public.user_profiles
for insert
to public
with check (
  ((select auth.uid()) = id)
  or public.is_current_user_admin()
);

create policy "Users and admins can read user profiles"
on public.user_profiles
for select
to public
using (
  ((select auth.uid()) = id)
  or public.is_current_user_admin()
);

create policy "Users and admins can update user profiles"
on public.user_profiles
for update
to public
using (
  ((select auth.uid()) = id)
  or public.is_current_user_admin()
)
with check (
  ((select auth.uid()) = id)
  or public.is_current_user_admin()
);

alter policy "Authenticated users can read role permissions"
on public.role_permissions
using ((select auth.role()) = 'authenticated');

alter policy "Authenticated users can read roles"
on public.roles
using ((select auth.role()) = 'authenticated');

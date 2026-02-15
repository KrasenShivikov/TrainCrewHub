alter policy "Admins can read all user profiles"
on public.user_profiles
using (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = (select auth.uid())
      and user_roles.role = 'admin'::app_role
  )
);

alter policy "Admins can update all user profiles"
on public.user_profiles
using (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = (select auth.uid())
      and user_roles.role = 'admin'::app_role
  )
)
with check (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = (select auth.uid())
      and user_roles.role = 'admin'::app_role
  )
);

alter policy "Users can insert own profile"
on public.user_profiles
with check ((select auth.uid()) = id);

alter policy "Users can read own profile"
on public.user_profiles
using ((select auth.uid()) = id);

alter policy "Users can update own profile"
on public.user_profiles
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

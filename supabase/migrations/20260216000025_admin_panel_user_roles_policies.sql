do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins can insert user roles'
  ) then
    create policy "Admins can insert user roles"
    on public.user_roles
    for insert
    with check (
      exists (
        select 1
        from public.user_roles as ur
        where ur.user_id = (select auth.uid())
          and ur.role = 'admin'::app_role
      )
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins can update user roles'
  ) then
    create policy "Admins can update user roles"
    on public.user_roles
    for update
    using (
      exists (
        select 1
        from public.user_roles as ur
        where ur.user_id = (select auth.uid())
          and ur.role = 'admin'::app_role
      )
    )
    with check (
      exists (
        select 1
        from public.user_roles as ur
        where ur.user_id = (select auth.uid())
          and ur.role = 'admin'::app_role
      )
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_roles'
      and policyname = 'Admins can delete user roles'
  ) then
    create policy "Admins can delete user roles"
    on public.user_roles
    for delete
    using (
      exists (
        select 1
        from public.user_roles as ur
        where ur.user_id = (select auth.uid())
          and ur.role = 'admin'::app_role
      )
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_profiles'
      and policyname = 'Admins can insert all user profiles'
  ) then
    create policy "Admins can insert all user profiles"
    on public.user_profiles
    for insert
    with check (
      exists (
        select 1
        from public.user_roles as ur
        where ur.user_id = (select auth.uid())
          and ur.role = 'admin'::app_role
      )
    );
  end if;
end $$;

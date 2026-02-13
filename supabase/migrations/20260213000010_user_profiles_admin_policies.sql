do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_profiles'
      and policyname = 'Admins can read all user profiles'
  ) then
    create policy "Admins can read all user profiles"
    on user_profiles
    for select
    using (
      exists (
        select 1
        from user_roles
        where user_roles.user_id = auth.uid()
          and user_roles.role = 'admin'
      )
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_profiles'
      and policyname = 'Admins can update all user profiles'
  ) then
    create policy "Admins can update all user profiles"
    on user_profiles
    for update
    using (
      exists (
        select 1
        from user_roles
        where user_roles.user_id = auth.uid()
          and user_roles.role = 'admin'
      )
    )
    with check (
      exists (
        select 1
        from user_roles
        where user_roles.user_id = auth.uid()
          and user_roles.role = 'admin'
      )
    );
  end if;
end $$;

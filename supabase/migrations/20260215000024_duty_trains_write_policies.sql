do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_trains'
      and policyname = 'Authenticated users can insert duty trains'
  ) then
    create policy "Authenticated users can insert duty trains"
    on duty_trains
    for insert
    with check ((select auth.role()) = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_trains'
      and policyname = 'Authenticated users can update duty trains'
  ) then
    create policy "Authenticated users can update duty trains"
    on duty_trains
    for update
    using ((select auth.role()) = 'authenticated')
    with check ((select auth.role()) = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_trains'
      and policyname = 'Authenticated users can delete duty trains'
  ) then
    create policy "Authenticated users can delete duty trains"
    on duty_trains
    for delete
    using ((select auth.role()) = 'authenticated');
  end if;
end $$;

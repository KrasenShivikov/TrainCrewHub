do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'trains'
      and policyname = 'Authenticated users can insert trains'
  ) then
    create policy "Authenticated users can insert trains"
    on trains
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'trains'
      and policyname = 'Authenticated users can update trains'
  ) then
    create policy "Authenticated users can update trains"
    on trains
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'trains'
      and policyname = 'Authenticated users can delete trains'
  ) then
    create policy "Authenticated users can delete trains"
    on trains
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

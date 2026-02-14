do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'actual_duties'
      and policyname = 'Authenticated users can read actual duties'
  ) then
    create policy "Authenticated users can read actual duties"
    on actual_duties
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'actual_duties'
      and policyname = 'Authenticated users can insert actual duties'
  ) then
    create policy "Authenticated users can insert actual duties"
    on actual_duties
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'actual_duties'
      and policyname = 'Authenticated users can update actual duties'
  ) then
    create policy "Authenticated users can update actual duties"
    on actual_duties
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'actual_duties'
      and policyname = 'Authenticated users can delete actual duties'
  ) then
    create policy "Authenticated users can delete actual duties"
    on actual_duties
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

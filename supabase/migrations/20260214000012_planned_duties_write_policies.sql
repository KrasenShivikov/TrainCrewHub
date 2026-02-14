do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planned_duties'
      and policyname = 'Authenticated users can read planned duties'
  ) then
    create policy "Authenticated users can read planned duties"
    on planned_duties
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planned_duties'
      and policyname = 'Authenticated users can insert planned duties'
  ) then
    create policy "Authenticated users can insert planned duties"
    on planned_duties
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planned_duties'
      and policyname = 'Authenticated users can update planned duties'
  ) then
    create policy "Authenticated users can update planned duties"
    on planned_duties
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'planned_duties'
      and policyname = 'Authenticated users can delete planned duties'
  ) then
    create policy "Authenticated users can delete planned duties"
    on planned_duties
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

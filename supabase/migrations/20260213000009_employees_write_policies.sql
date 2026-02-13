do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'Authenticated users can insert employees'
  ) then
    create policy "Authenticated users can insert employees"
    on employees
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'Authenticated users can update employees'
  ) then
    create policy "Authenticated users can update employees"
    on employees
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employees'
      and policyname = 'Authenticated users can delete employees'
  ) then
    create policy "Authenticated users can delete employees"
    on employees
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

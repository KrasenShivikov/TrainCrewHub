do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_absences'
      and policyname = 'Authenticated users can insert employee absences'
  ) then
    create policy "Authenticated users can insert employee absences"
    on public.employee_absences
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_absences'
      and policyname = 'Authenticated users can update employee absences'
  ) then
    create policy "Authenticated users can update employee absences"
    on public.employee_absences
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'employee_absences'
      and policyname = 'Authenticated users can delete employee absences'
  ) then
    create policy "Authenticated users can delete employee absences"
    on public.employee_absences
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

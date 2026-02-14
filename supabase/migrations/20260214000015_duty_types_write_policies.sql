do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_types'
      and policyname = 'Authenticated users can insert duty types'
  ) then
    create policy "Authenticated users can insert duty types"
    on duty_types
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_types'
      and policyname = 'Authenticated users can update duty types'
  ) then
    create policy "Authenticated users can update duty types"
    on duty_types
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_types'
      and policyname = 'Authenticated users can delete duty types'
  ) then
    create policy "Authenticated users can delete duty types"
    on duty_types
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

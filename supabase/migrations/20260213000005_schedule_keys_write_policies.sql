do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_keys'
      and policyname = 'Authenticated users can insert schedule keys'
  ) then
    create policy "Authenticated users can insert schedule keys"
    on schedule_keys
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_keys'
      and policyname = 'Authenticated users can update schedule keys'
  ) then
    create policy "Authenticated users can update schedule keys"
    on schedule_keys
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_keys'
      and policyname = 'Authenticated users can delete schedule keys'
  ) then
    create policy "Authenticated users can delete schedule keys"
    on schedule_keys
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

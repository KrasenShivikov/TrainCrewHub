do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duties'
      and policyname = 'Authenticated users can insert duties'
  ) then
    create policy "Authenticated users can insert duties"
    on duties
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duties'
      and policyname = 'Authenticated users can update duties'
  ) then
    create policy "Authenticated users can update duties"
    on duties
    for update
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duties'
      and policyname = 'Authenticated users can delete duties'
  ) then
    create policy "Authenticated users can delete duties"
    on duties
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

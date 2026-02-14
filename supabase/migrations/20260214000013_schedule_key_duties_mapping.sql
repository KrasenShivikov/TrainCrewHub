do $$
begin
  if to_regclass('public.schedule_key_duties') is null then
    create table schedule_key_duties (
      schedule_key_id uuid not null references schedule_keys(id) on delete cascade,
      duty_id uuid not null references duties(id) on delete cascade,
      created_at timestamptz default now(),
      created_from text,
      primary key (schedule_key_id, duty_id)
    );
  end if;

  insert into schedule_key_duties (schedule_key_id, duty_id)
  select distinct d.schedule_key_id, d.id
  from duties d
  where d.schedule_key_id is not null
  on conflict do nothing;

  alter table schedule_key_duties enable row level security;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_key_duties'
      and policyname = 'Authenticated users can read schedule key duties'
  ) then
    create policy "Authenticated users can read schedule key duties"
    on schedule_key_duties
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_key_duties'
      and policyname = 'Authenticated users can insert schedule key duties'
  ) then
    create policy "Authenticated users can insert schedule key duties"
    on schedule_key_duties
    for insert
    with check (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'schedule_key_duties'
      and policyname = 'Authenticated users can delete schedule key duties'
  ) then
    create policy "Authenticated users can delete schedule key duties"
    on schedule_key_duties
    for delete
    using (auth.role() = 'authenticated');
  end if;
end $$;

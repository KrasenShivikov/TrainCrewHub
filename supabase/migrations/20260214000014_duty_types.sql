do $$
begin
  if to_regclass('public.duty_types') is null then
    create table duty_types (
      id uuid primary key default uuid_generate_v4(),
      name text not null unique,
      created_at timestamptz default now(),
      created_from text
    );
  end if;

  insert into duty_types (name, created_from)
  values
    ('Маневрена', 'system_migration'),
    ('Пътническа', 'system_migration'),
    ('Товарна', 'system_migration'),
    ('Резерв', 'system_migration')
  on conflict (name) do nothing;

  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'duties'
      and column_name = 'duty_type_id'
  ) then
    alter table duties add column duty_type_id uuid references duty_types(id);
  end if;

  update duties
  set duty_type_id = (
    select id from duty_types where name = 'Маневрена' limit 1
  )
  where duty_type_id is null;

  alter table duties alter column duty_type_id set not null;

  alter table duty_types enable row level security;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'duty_types'
      and policyname = 'Authenticated users can read duty types'
  ) then
    create policy "Authenticated users can read duty types"
    on duty_types
    for select
    using (auth.role() = 'authenticated');
  end if;
end $$;

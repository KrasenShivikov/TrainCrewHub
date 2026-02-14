alter table public.duties
add column if not exists second_day boolean not null default false;

alter table public.schedule_keys
add column if not exists crew_role text;

update public.schedule_keys
set crew_role = 'кондуктор'
where crew_role is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'schedule_keys_crew_role_check'
  ) then
    alter table public.schedule_keys
      add constraint schedule_keys_crew_role_check
      check (crew_role in ('началник влак', 'кондуктор'));
  end if;
end $$;

alter table public.schedule_keys
  alter column crew_role set default 'кондуктор',
  alter column crew_role set not null;

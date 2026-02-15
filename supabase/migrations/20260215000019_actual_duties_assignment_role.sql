alter table public.actual_duties
add column if not exists assignment_role text;

update public.actual_duties ad
set assignment_role = case
  when p.title ilike '%началник%влак%' then 'chief'
  when p.title ilike '%кондуктор%' then 'conductor'
  else 'conductor'
end
from public.employees e
left join public.positions p on p.id = e.position_id
where ad.employee_id = e.id
  and ad.assignment_role is null;

update public.actual_duties
set assignment_role = 'conductor'
where assignment_role is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'actual_duties_assignment_role_check'
  ) then
    alter table public.actual_duties
      add constraint actual_duties_assignment_role_check
      check (assignment_role in ('chief', 'conductor'));
  end if;
end $$;

alter table public.actual_duties
  alter column assignment_role set default 'conductor',
  alter column assignment_role set not null;

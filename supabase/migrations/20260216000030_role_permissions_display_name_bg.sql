alter table public.role_permissions
  add column if not exists display_name_bg text;

update public.role_permissions
set display_name_bg = case resource
  when 'schedule_keys' then 'Ключ-Графици'
  when 'duties' then 'Повески'
  when 'duty_types' then 'Типове повески'
  when 'trains' then 'Влакове'
  when 'employees' then 'Служители'
  when 'employee_absences' then 'Отсъствия'
  when 'planned_duties' then 'Планирани повески'
  when 'actual_duties' then 'Реални повески'
  when 'user_roles' then 'Роли на потребители'
  when 'user_profiles' then 'Потребителски профили'
  when 'role_permissions' then 'Права по роли'
  when 'schedule_key_duties' then 'Повески към ключ-график'
  when 'positions' then 'Позиции'
  when 'absence_reasons' then 'Причини за отсъствие'
  when 'duty_trains' then 'Влакове към повески'
  else display_name_bg
end
where coalesce(display_name_bg, '') = '';

insert into public.role_permissions (
  role,
  resource,
  display_name_bg,
  can_view_screen,
  can_view_records,
  can_edit_records,
  can_delete_records,
  view_screen_scope,
  view_records_scope,
  edit_records_scope,
  delete_records_scope
)
select
  r.role,
  t.table_name,
  case t.table_name
    when 'schedule_keys' then 'Ключ-Графици'
    when 'duties' then 'Повески'
    when 'duty_types' then 'Типове повески'
    when 'trains' then 'Влакове'
    when 'employees' then 'Служители'
    when 'employee_absences' then 'Отсъствия'
    when 'planned_duties' then 'Планирани повески'
    when 'actual_duties' then 'Реални повески'
    when 'user_roles' then 'Роли на потребители'
    when 'user_profiles' then 'Потребителски профили'
    when 'role_permissions' then 'Права по роли'
    when 'schedule_key_duties' then 'Повески към ключ-график'
    when 'positions' then 'Позиции'
    when 'absence_reasons' then 'Причини за отсъствие'
    when 'duty_trains' then 'Влакове към повески'
    else t.table_name
  end as display_name_bg,
  true,
  true,
  (r.role = 'admin'::app_role),
  (r.role = 'admin'::app_role),
  'all'::public.access_scope,
  'all'::public.access_scope,
  case when r.role = 'admin'::app_role then 'all'::public.access_scope else 'none'::public.access_scope end,
  case when r.role = 'admin'::app_role then 'all'::public.access_scope else 'none'::public.access_scope end
from (
  select unnest(enum_range(null::app_role)) as role
) r
cross join (
  select table_name
  from information_schema.tables
  where table_schema = 'public'
    and table_type = 'BASE TABLE'
) t
on conflict (role, resource) do update
set display_name_bg = excluded.display_name_bg;
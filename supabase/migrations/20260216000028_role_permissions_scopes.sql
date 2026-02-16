do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'access_scope'
  ) then
    create type public.access_scope as enum ('none', 'all', 'own', 'role_attached_employees');
  end if;
end $$;

alter table public.role_permissions
  add column if not exists view_screen_scope public.access_scope,
  add column if not exists view_records_scope public.access_scope,
  add column if not exists edit_records_scope public.access_scope,
  add column if not exists delete_records_scope public.access_scope;

update public.role_permissions
set
  view_screen_scope = coalesce(
    view_screen_scope,
    case when coalesce(can_view_screen, false) then 'all'::public.access_scope else 'none'::public.access_scope end
  ),
  view_records_scope = coalesce(
    view_records_scope,
    case when coalesce(can_view_records, false) then 'all'::public.access_scope else 'none'::public.access_scope end
  ),
  edit_records_scope = coalesce(
    edit_records_scope,
    case when coalesce(can_edit_records, false) then 'all'::public.access_scope else 'none'::public.access_scope end
  ),
  delete_records_scope = coalesce(
    delete_records_scope,
    case when coalesce(can_delete_records, false) then 'all'::public.access_scope else 'none'::public.access_scope end
  );

alter table public.role_permissions
  alter column view_screen_scope set default 'none'::public.access_scope,
  alter column view_records_scope set default 'none'::public.access_scope,
  alter column edit_records_scope set default 'none'::public.access_scope,
  alter column delete_records_scope set default 'none'::public.access_scope;

alter table public.role_permissions
  alter column view_screen_scope set not null,
  alter column view_records_scope set not null,
  alter column edit_records_scope set not null,
  alter column delete_records_scope set not null;

insert into public.role_permissions (
  role,
  resource,
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
on conflict (role, resource) do nothing;

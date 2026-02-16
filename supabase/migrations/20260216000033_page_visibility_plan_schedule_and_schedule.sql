insert into public.role_permissions (
  role,
  resource,
  display_name_bg,
  view_screen_scope,
  view_records_scope,
  edit_records_scope,
  delete_records_scope
)
select
  r.name as role,
  page_res.resource,
  page_res.display_name_bg,
  'all'::public.access_scope,
  'none'::public.access_scope,
  'none'::public.access_scope,
  'none'::public.access_scope
from public.roles r
cross join (
  values
    ('page_plan_schedule', 'Страница План-График'),
    ('page_schedule', 'Страница График')
) as page_res(resource, display_name_bg)
on conflict (role, resource) do nothing;

-- Grant head_of_transport access to confirm schedule from timetable on the Schedule page.
-- UI guard for the button uses `actual_duties` create scope; RLS for schedule_publications requires `actual_duties` edit scope.

insert into public.role_permissions (
  role,
  resource,
  can_view_screen,
  can_view_records,
  can_edit_records,
  can_delete_records,
  view_screen_scope,
  view_records_scope,
  create_records_scope,
  edit_records_scope,
  delete_records_scope
)
values (
  'head_of_transport'::public.app_role,
  'actual_duties'::text,
  true,
  true,
  true,
  false,
  'all'::public.access_scope,
  'all'::public.access_scope,
  'all'::public.access_scope,
  'all'::public.access_scope,
  'none'::public.access_scope
)
on conflict (role, resource)
do update set
  can_view_screen = excluded.can_view_screen,
  can_view_records = excluded.can_view_records,
  can_edit_records = excluded.can_edit_records,
  can_delete_records = excluded.can_delete_records,
  view_screen_scope = excluded.view_screen_scope,
  view_records_scope = excluded.view_records_scope,
  create_records_scope = excluded.create_records_scope,
  edit_records_scope = excluded.edit_records_scope,
  delete_records_scope = excluded.delete_records_scope,
  updated_at = now();

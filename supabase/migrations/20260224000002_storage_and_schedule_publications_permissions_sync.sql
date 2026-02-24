-- Sync Storage bucket policies with role_permissions scopes.
-- Also align schedule_publications RLS with actual_duties scopes so admin panel settings are enforced by RLS.

-- ==========================
-- schedule_publications (RLS)
-- ==========================

drop policy if exists "Authenticated users can read schedule publications" on public.schedule_publications;
create policy "Users with actual duties view access can read schedule publications"
  on public.schedule_publications
  for select
  to authenticated
  using (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'view_records', null, created_from)
  );

drop policy if exists "Users with actual duties edit access can insert schedule publications" on public.schedule_publications;
create policy "Users with actual duties create access can insert schedule publications"
  on public.schedule_publications
  for insert
  to authenticated
  with check (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'create_records', null, created_from)
  );

drop policy if exists "Users with actual duties edit access can update schedule publications" on public.schedule_publications;
create policy "Users with actual duties edit access can update schedule publications"
  on public.schedule_publications
  for update
  to authenticated
  using (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'edit_records', null, created_from)
  )
  with check (
    public.is_current_user_admin()
    or public.can_access_resource('actual_duties', 'edit_records', null, created_from)
  );


-- =============================
-- Storage: duty-files (duties)
-- =============================

drop policy if exists "Authenticated users can read duty files" on storage.objects;
drop policy if exists "Users with duties view access can read duty files" on storage.objects;
create policy "Users with duties view access can read duty files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'duty-files'
    and public.can_access_resource('duties', 'view_records', null, owner::text)
  );

drop policy if exists "Authenticated users can upload duty files" on storage.objects;
drop policy if exists "Users with duties create or edit access can upload duty files" on storage.objects;
create policy "Users with duties create or edit access can upload duty files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'duty-files'
    and (
      public.can_access_resource('duties', 'create_records', null, auth.uid()::text)
      or public.can_access_resource('duties', 'edit_records', null, auth.uid()::text)
    )
  );

drop policy if exists "Authenticated users can update duty files" on storage.objects;
drop policy if exists "Users with duties edit access can update duty files" on storage.objects;
create policy "Users with duties edit access can update duty files"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'duty-files'
    and public.can_access_resource('duties', 'edit_records', null, owner::text)
  )
  with check (
    bucket_id = 'duty-files'
    and public.can_access_resource('duties', 'edit_records', null, owner::text)
  );

drop policy if exists "Authenticated users can delete duty files" on storage.objects;
drop policy if exists "Users with duties delete access can delete duty files" on storage.objects;
create policy "Users with duties delete access can delete duty files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'duty-files'
    and public.can_access_resource('duties', 'delete_records', null, owner::text)
  );


-- ==================================
-- Storage: employee-photos (employees)
-- ==================================

drop policy if exists "Authenticated users can read employee photos" on storage.objects;
drop policy if exists "Users with employees view access can read employee photos" on storage.objects;
create policy "Users with employees view access can read employee photos"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'employee-photos'
    and public.can_access_resource('employees', 'view_records', null, owner::text)
  );

drop policy if exists "Authenticated users can upload employee photos" on storage.objects;
drop policy if exists "Users with employees create or edit access can upload employee photos" on storage.objects;
create policy "Users with employees create or edit access can upload employee photos"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'employee-photos'
    and (
      public.can_access_resource('employees', 'create_records', null, auth.uid()::text)
      or public.can_access_resource('employees', 'edit_records', null, auth.uid()::text)
    )
  );

drop policy if exists "Authenticated users can update employee photos" on storage.objects;
drop policy if exists "Users with employees edit access can update employee photos" on storage.objects;
create policy "Users with employees edit access can update employee photos"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'employee-photos'
    and public.can_access_resource('employees', 'edit_records', null, owner::text)
  )
  with check (
    bucket_id = 'employee-photos'
    and public.can_access_resource('employees', 'edit_records', null, owner::text)
  );

drop policy if exists "Authenticated users can delete employee photos" on storage.objects;
drop policy if exists "Users with employees delete access can delete employee photos" on storage.objects;
create policy "Users with employees delete access can delete employee photos"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'employee-photos'
    and public.can_access_resource('employees', 'delete_records', null, owner::text)
  );


-- =================================
-- Storage: train-timetables (trains)
-- =================================

drop policy if exists "Authenticated users can read train timetables" on storage.objects;
drop policy if exists "Users with trains view access can read train timetables" on storage.objects;
create policy "Users with trains view access can read train timetables"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'train-timetables'
    and public.can_access_resource('trains', 'view_records', null, owner::text)
  );

drop policy if exists "Authenticated users can upload train timetables" on storage.objects;
drop policy if exists "Users with trains create or edit access can upload train timetables" on storage.objects;
create policy "Users with trains create or edit access can upload train timetables"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'train-timetables'
    and (
      public.can_access_resource('trains', 'create_records', null, auth.uid()::text)
      or public.can_access_resource('trains', 'edit_records', null, auth.uid()::text)
    )
  );

drop policy if exists "Authenticated users can update train timetables" on storage.objects;
drop policy if exists "Users with trains edit access can update train timetables" on storage.objects;
create policy "Users with trains edit access can update train timetables"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'train-timetables'
    and public.can_access_resource('trains', 'edit_records', null, owner::text)
  )
  with check (
    bucket_id = 'train-timetables'
    and public.can_access_resource('trains', 'edit_records', null, owner::text)
  );

drop policy if exists "Authenticated users can delete train timetables" on storage.objects;
drop policy if exists "Users with trains delete access can delete train timetables" on storage.objects;
create policy "Users with trains delete access can delete train timetables"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'train-timetables'
    and public.can_access_resource('trains', 'delete_records', null, owner::text)
  );

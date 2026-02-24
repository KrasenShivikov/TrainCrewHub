-- Sync Documents permissions between admin panel role_permissions scopes and RLS/Storage enforcement.
--
-- Key changes:
-- - INSERT for documents + document_categories uses create_records (not edit_records)
-- - SELECT/UPDATE/DELETE for documents + categories pass created_from into can_access_resource()
--   so scopes like 'own' can be enforced consistently.
-- - Storage bucket policies for 'documents-files' are restricted by the same permission checks
--   (instead of allowing any authenticated user).

-- =========================
-- RLS: document_categories
-- =========================

drop policy if exists "Authenticated users can read document_categories" on public.document_categories;
create policy "Authenticated users can read document_categories"
  on public.document_categories
  for select
  to authenticated
  using (
    public.can_access_resource('documents', 'view_records', null, created_from)
  );

drop policy if exists "Users with documents edit access can insert document_categories" on public.document_categories;
drop policy if exists "Users with documents create access can insert document_categories" on public.document_categories;
create policy "Users with documents create access can insert document_categories"
  on public.document_categories
  for insert
  to authenticated
  with check (
    public.can_access_resource('documents', 'create_records', null, created_from)
  );

drop policy if exists "Users with documents edit access can update document_categories" on public.document_categories;
create policy "Users with documents edit access can update document_categories"
  on public.document_categories
  for update
  to authenticated
  using (
    public.can_access_resource('documents', 'edit_records', null, created_from)
  )
  with check (
    public.can_access_resource('documents', 'edit_records', null, created_from)
  );

drop policy if exists "Users with documents delete access can delete document_categories" on public.document_categories;
create policy "Users with documents delete access can delete document_categories"
  on public.document_categories
  for delete
  to authenticated
  using (
    public.can_access_resource('documents', 'delete_records', null, created_from)
  );


-- =================
-- RLS: documents
-- =================

drop policy if exists "Authenticated users can read documents" on public.documents;
create policy "Authenticated users can read documents"
  on public.documents
  for select
  to authenticated
  using (
    public.can_access_resource('documents', 'view_records', null, created_from)
  );

drop policy if exists "Users with documents edit access can insert documents" on public.documents;
drop policy if exists "Users with documents create access can insert documents" on public.documents;
create policy "Users with documents create access can insert documents"
  on public.documents
  for insert
  to authenticated
  with check (
    public.can_access_resource('documents', 'create_records', null, created_from)
  );

drop policy if exists "Users with documents edit access can update documents" on public.documents;
create policy "Users with documents edit access can update documents"
  on public.documents
  for update
  to authenticated
  using (
    public.can_access_resource('documents', 'edit_records', null, created_from)
  )
  with check (
    public.can_access_resource('documents', 'edit_records', null, created_from)
  );

drop policy if exists "Users with documents delete access can delete documents" on public.documents;
create policy "Users with documents delete access can delete documents"
  on public.documents
  for delete
  to authenticated
  using (
    public.can_access_resource('documents', 'delete_records', null, created_from)
  );


-- ==============================
-- Storage: documents-files bucket
-- ==============================
-- NOTE: The bucket is currently public; these policies control authenticated operations (write/delete) and
-- object listing/reads via the Storage API, not public URL access.

drop policy if exists "Authenticated users can read documents files" on storage.objects;
drop policy if exists "Users with documents view access can read documents files" on storage.objects;
create policy "Users with documents view access can read documents files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'documents-files'
    and public.can_access_resource('documents', 'view_records', null, owner::text)
  );

drop policy if exists "Authenticated users can upload documents files" on storage.objects;
drop policy if exists "Users with documents create or edit access can upload documents files" on storage.objects;
create policy "Users with documents create or edit access can upload documents files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'documents-files'
    and (
      public.can_access_resource('documents', 'create_records', null, auth.uid()::text)
      or public.can_access_resource('documents', 'edit_records', null, auth.uid()::text)
    )
  );

drop policy if exists "Authenticated users can update documents files" on storage.objects;
drop policy if exists "Users with documents edit access can update documents files" on storage.objects;
create policy "Users with documents edit access can update documents files"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'documents-files'
    and public.can_access_resource('documents', 'edit_records', null, owner::text)
  )
  with check (
    bucket_id = 'documents-files'
    and public.can_access_resource('documents', 'edit_records', null, owner::text)
  );

drop policy if exists "Authenticated users can delete documents files" on storage.objects;
drop policy if exists "Users with documents delete or edit access can delete documents files" on storage.objects;
drop policy if exists "Users with documents delete access can delete documents files" on storage.objects;
create policy "Users with documents delete access can delete documents files"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'documents-files'
    and public.can_access_resource('documents', 'delete_records', null, owner::text)
  );

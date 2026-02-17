alter table public.documents
  add column if not exists storage_path text;

do $$
begin
  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  select
    'documents-files',
    'documents-files',
    true,
    20971520,
    array[
      'application/pdf',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
  where not exists (
    select 1
    from storage.buckets
    where id = 'documents-files'
  );

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can read documents files'
  ) then
    create policy "Authenticated users can read documents files"
    on storage.objects
    for select
    using (
      bucket_id = 'documents-files'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload documents files'
  ) then
    create policy "Authenticated users can upload documents files"
    on storage.objects
    for insert
    with check (
      bucket_id = 'documents-files'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can update documents files'
  ) then
    create policy "Authenticated users can update documents files"
    on storage.objects
    for update
    using (
      bucket_id = 'documents-files'
      and auth.role() = 'authenticated'
    )
    with check (
      bucket_id = 'documents-files'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can delete documents files'
  ) then
    create policy "Authenticated users can delete documents files"
    on storage.objects
    for delete
    using (
      bucket_id = 'documents-files'
      and auth.role() = 'authenticated'
    );
  end if;
end $$;

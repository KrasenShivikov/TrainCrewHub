alter table public.duties
  add column if not exists duty_files text;

do $$
begin
  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  select
    'duty-files',
    'duty-files',
    true,
    15728640,
    array[
      'application/pdf',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/json',
      'image/jpeg',
      'image/png',
      'image/webp'
    ]
  where not exists (
    select 1
    from storage.buckets
    where id = 'duty-files'
  );

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can read duty files'
  ) then
    create policy "Authenticated users can read duty files"
    on storage.objects
    for select
    using (
      bucket_id = 'duty-files'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload duty files'
  ) then
    create policy "Authenticated users can upload duty files"
    on storage.objects
    for insert
    with check (
      bucket_id = 'duty-files'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can update duty files'
  ) then
    create policy "Authenticated users can update duty files"
    on storage.objects
    for update
    using (
      bucket_id = 'duty-files'
      and auth.role() = 'authenticated'
    )
    with check (
      bucket_id = 'duty-files'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can delete duty files'
  ) then
    create policy "Authenticated users can delete duty files"
    on storage.objects
    for delete
    using (
      bucket_id = 'duty-files'
      and auth.role() = 'authenticated'
    );
  end if;
end $$;

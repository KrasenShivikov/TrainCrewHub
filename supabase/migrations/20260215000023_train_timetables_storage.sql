do $$
begin
  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  select
    'train-timetables',
    'train-timetables',
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
      'image/jpeg',
      'image/png',
      'image/webp'
    ]
  where not exists (
    select 1
    from storage.buckets
    where id = 'train-timetables'
  );

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can read train timetables'
  ) then
    create policy "Authenticated users can read train timetables"
    on storage.objects
    for select
    using (
      bucket_id = 'train-timetables'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload train timetables'
  ) then
    create policy "Authenticated users can upload train timetables"
    on storage.objects
    for insert
    with check (
      bucket_id = 'train-timetables'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can update train timetables'
  ) then
    create policy "Authenticated users can update train timetables"
    on storage.objects
    for update
    using (
      bucket_id = 'train-timetables'
      and auth.role() = 'authenticated'
    )
    with check (
      bucket_id = 'train-timetables'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can delete train timetables'
  ) then
    create policy "Authenticated users can delete train timetables"
    on storage.objects
    for delete
    using (
      bucket_id = 'train-timetables'
      and auth.role() = 'authenticated'
    );
  end if;
end $$;

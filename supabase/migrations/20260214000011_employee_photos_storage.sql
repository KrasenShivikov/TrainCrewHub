do $$
begin
  insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  select
    'employee-photos',
    'employee-photos',
    true,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  where not exists (
    select 1
    from storage.buckets
    where id = 'employee-photos'
  );

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can read employee photos'
  ) then
    create policy "Authenticated users can read employee photos"
    on storage.objects
    for select
    using (
      bucket_id = 'employee-photos'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload employee photos'
  ) then
    create policy "Authenticated users can upload employee photos"
    on storage.objects
    for insert
    with check (
      bucket_id = 'employee-photos'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can update employee photos'
  ) then
    create policy "Authenticated users can update employee photos"
    on storage.objects
    for update
    using (
      bucket_id = 'employee-photos'
      and auth.role() = 'authenticated'
    )
    with check (
      bucket_id = 'employee-photos'
      and auth.role() = 'authenticated'
    );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can delete employee photos'
  ) then
    create policy "Authenticated users can delete employee photos"
    on storage.objects
    for delete
    using (
      bucket_id = 'employee-photos'
      and auth.role() = 'authenticated'
    );
  end if;
end $$;

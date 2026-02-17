create table if not exists public.document_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_from text not null default 'web_app',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.document_categories(id),
  title text not null,
  document_url text not null,
  notes text,
  created_from text not null default 'web_app',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_documents_category_id on public.documents(category_id);
create index if not exists idx_documents_title on public.documents(title);

alter table public.document_categories enable row level security;
alter table public.documents enable row level security;

drop policy if exists "Authenticated users can read document_categories" on public.document_categories;
create policy "Authenticated users can read document_categories"
  on public.document_categories
  for select
  to authenticated
  using (
    public.can_access_resource('documents', 'view_records', null, null)
  );

drop policy if exists "Users with documents edit access can insert document_categories" on public.document_categories;
create policy "Users with documents edit access can insert document_categories"
  on public.document_categories
  for insert
  to authenticated
  with check (
    public.can_access_resource('documents', 'edit_records', null, null)
  );

drop policy if exists "Users with documents edit access can update document_categories" on public.document_categories;
create policy "Users with documents edit access can update document_categories"
  on public.document_categories
  for update
  to authenticated
  using (
    public.can_access_resource('documents', 'edit_records', null, null)
  )
  with check (
    public.can_access_resource('documents', 'edit_records', null, null)
  );

drop policy if exists "Users with documents delete access can delete document_categories" on public.document_categories;
create policy "Users with documents delete access can delete document_categories"
  on public.document_categories
  for delete
  to authenticated
  using (
    public.can_access_resource('documents', 'delete_records', null, null)
  );

drop policy if exists "Authenticated users can read documents" on public.documents;
create policy "Authenticated users can read documents"
  on public.documents
  for select
  to authenticated
  using (
    public.can_access_resource('documents', 'view_records', null, null)
  );

drop policy if exists "Users with documents edit access can insert documents" on public.documents;
create policy "Users with documents edit access can insert documents"
  on public.documents
  for insert
  to authenticated
  with check (
    public.can_access_resource('documents', 'edit_records', null, null)
  );

drop policy if exists "Users with documents edit access can update documents" on public.documents;
create policy "Users with documents edit access can update documents"
  on public.documents
  for update
  to authenticated
  using (
    public.can_access_resource('documents', 'edit_records', null, null)
  )
  with check (
    public.can_access_resource('documents', 'edit_records', null, null)
  );

drop policy if exists "Users with documents delete access can delete documents" on public.documents;
create policy "Users with documents delete access can delete documents"
  on public.documents
  for delete
  to authenticated
  using (
    public.can_access_resource('documents', 'delete_records', null, null)
  );

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
  'documents'::text,
  'Документи'::text,
  true,
  true,
  (r.role::text in ('admin', 'head_of_transport', 'instructor', 'crew_manager')),
  (r.role::text in ('admin', 'head_of_transport', 'instructor', 'crew_manager')),
  'all'::public.access_scope,
  'all'::public.access_scope,
  case
    when r.role::text in ('admin', 'head_of_transport', 'instructor', 'crew_manager')
      then 'all'::public.access_scope
    else 'none'::public.access_scope
  end,
  case
    when r.role::text in ('admin', 'head_of_transport', 'instructor', 'crew_manager')
      then 'all'::public.access_scope
    else 'none'::public.access_scope
  end
from (
  select unnest(enum_range(null::app_role)) as role
) r
on conflict (role, resource) do update
set
  display_name_bg = excluded.display_name_bg,
  can_view_screen = excluded.can_view_screen,
  can_view_records = excluded.can_view_records,
  can_edit_records = excluded.can_edit_records,
  can_delete_records = excluded.can_delete_records,
  view_screen_scope = excluded.view_screen_scope,
  view_records_scope = excluded.view_records_scope,
  edit_records_scope = excluded.edit_records_scope,
  delete_records_scope = excluded.delete_records_scope;

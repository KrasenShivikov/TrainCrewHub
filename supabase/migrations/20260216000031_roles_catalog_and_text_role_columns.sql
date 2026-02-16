create table if not exists public.roles (
  name text primary key,
  display_name_bg text,
  created_at timestamptz not null default now(),
  created_from text
);

alter table if exists public.roles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'roles'
      and policyname = 'Authenticated users can read roles'
  ) then
    create policy "Authenticated users can read roles"
    on public.roles
    for select
    using (auth.role() = 'authenticated');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'roles'
      and policyname = 'Admins can insert roles'
  ) then
    create policy "Admins can insert roles"
    on public.roles
    for insert
    with check (public.is_current_user_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'roles'
      and policyname = 'Admins can update roles'
  ) then
    create policy "Admins can update roles"
    on public.roles
    for update
    using (public.is_current_user_admin())
    with check (public.is_current_user_admin());
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'roles'
      and policyname = 'Admins can delete roles'
  ) then
    create policy "Admins can delete roles"
    on public.roles
    for delete
    using (public.is_current_user_admin());
  end if;
end $$;

insert into public.roles (name, display_name_bg)
values
  ('admin', 'Администратор'),
  ('head_of_transport', 'Ръководител транспорт'),
  ('instructor', 'Инструктор'),
  ('crew', 'Екипаж'),
  ('user', 'Потребител')
on conflict (name) do nothing;

insert into public.roles (name, display_name_bg)
select distinct role::text as name, role::text as display_name_bg
from public.user_roles
where role is not null
on conflict (name) do nothing;

insert into public.roles (name, display_name_bg)
select distinct role::text as name, role::text as display_name_bg
from public.role_permissions
where role is not null
on conflict (name) do nothing;

alter table public.user_roles
  alter column role type text using role::text;

alter table public.role_permissions
  alter column role type text using role::text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'user_roles_role_fk'
      and conrelid = 'public.user_roles'::regclass
  ) then
    alter table public.user_roles
      add constraint user_roles_role_fk
      foreign key (role)
      references public.roles(name)
      on update cascade;
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'role_permissions_role_fk'
      and conrelid = 'public.role_permissions'::regclass
  ) then
    alter table public.role_permissions
      add constraint role_permissions_role_fk
      foreign key (role)
      references public.roles(name)
      on update cascade;
  end if;
end $$;

create or replace function public.is_current_user_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = auth.uid()
      and ur.role = 'admin'
  );
$$;

alter policy "Admins can read all user profiles"
on public.user_profiles
using (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = (select auth.uid())
      and user_roles.role = 'admin'
  )
);

alter policy "Admins can update all user profiles"
on public.user_profiles
using (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = (select auth.uid())
      and user_roles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.user_roles
    where user_roles.user_id = (select auth.uid())
      and user_roles.role = 'admin'
  )
);

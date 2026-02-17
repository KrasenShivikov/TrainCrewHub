alter table public.user_profiles
  add column if not exists is_active boolean not null default true;

update public.user_profiles
set is_active = true
where is_active is null;

create index if not exists idx_user_profiles_is_active
  on public.user_profiles (is_active);

create or replace function public.prevent_last_active_admin_deactivation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_is_admin boolean;
  active_admin_count integer;
begin
  if tg_op = 'UPDATE'
     and old.is_active is distinct from new.is_active
     and old.is_active = true
     and new.is_active = false then
    select exists(
      select 1
      from public.user_roles ur
      where ur.user_id = old.id
        and lower(ur.role::text) = 'admin'
    )
    into target_is_admin;

    if target_is_admin then
      select count(*)
      into active_admin_count
      from public.user_roles ur
      join public.user_profiles up on up.id = ur.user_id
      where lower(ur.role::text) = 'admin'
        and coalesce(up.is_active, true) = true;

      if active_admin_count <= 1 then
        raise exception 'Cannot deactivate the last active admin.';
      end if;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_prevent_last_active_admin_deactivation
  on public.user_profiles;

create trigger trg_prevent_last_active_admin_deactivation
before update of is_active on public.user_profiles
for each row
execute function public.prevent_last_active_admin_deactivation();

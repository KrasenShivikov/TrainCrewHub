alter table public.user_roles
  add column if not exists granted_by_user_id uuid references auth.users(id);

create index if not exists user_roles_granted_by_user_id_idx
  on public.user_roles (granted_by_user_id);

update public.user_roles
set granted_by_user_id = user_id
where role::text = 'admin'
  and granted_by_user_id is null;

create or replace function public.set_user_role_grantor_default()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.granted_by_user_id is null then
    new.granted_by_user_id := auth.uid();
  end if;

  return new;
end;
$$;

drop trigger if exists trg_set_user_role_grantor_default on public.user_roles;

create trigger trg_set_user_role_grantor_default
before insert on public.user_roles
for each row
execute function public.set_user_role_grantor_default();

create or replace function public.prevent_admin_grantor_revocation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_user_id uuid;
  actor_admin_grantor_id uuid;
  old_role text;
  new_role text;
begin
  actor_user_id := auth.uid();
  if actor_user_id is null then
    if tg_op = 'DELETE' then
      return old;
    end if;

    return new;
  end if;

  select ur.granted_by_user_id
    into actor_admin_grantor_id
  from public.user_roles ur
  where ur.user_id = actor_user_id
    and lower(btrim(coalesce(ur.role::text, ''))) = 'admin'
  order by ur.created_at desc
  limit 1;

  if actor_admin_grantor_id is null then
    if tg_op = 'DELETE' then
      return old;
    end if;

    return new;
  end if;

  old_role := lower(btrim(coalesce(old.role::text, '')));
  new_role := lower(btrim(coalesce(new.role::text, '')));

  if tg_op = 'DELETE'
     and old_role = 'admin'
     and old.user_id = actor_admin_grantor_id then
    raise exception 'Cannot revoke admin role from your grantor.';
  end if;

  if tg_op = 'UPDATE'
     and old_role = 'admin'
     and old.user_id = actor_admin_grantor_id
     and (new_role <> 'admin' or new.user_id <> old.user_id) then
    raise exception 'Cannot revoke admin role from your grantor.';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_prevent_admin_grantor_revocation on public.user_roles;

create trigger trg_prevent_admin_grantor_revocation
before delete or update on public.user_roles
for each row
execute function public.prevent_admin_grantor_revocation();

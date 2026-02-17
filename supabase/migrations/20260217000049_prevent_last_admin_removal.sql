create or replace function public.prevent_last_admin_role_removal()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_roles_count bigint;
  old_role text;
  new_role text;
begin
  old_role := lower(btrim(coalesce(old.role::text, '')));
  new_role := lower(btrim(coalesce(new.role::text, '')));

  if tg_op = 'DELETE' and old_role = 'admin' then
    select count(*)
      into admin_roles_count
    from public.user_roles
    where lower(btrim(coalesce(role::text, ''))) = 'admin';

    if admin_roles_count <= 1 then
      raise exception 'Cannot remove the last admin role.';
    end if;

    return old;
  end if;

  if tg_op = 'UPDATE' and old_role = 'admin' and new_role <> 'admin' then
    select count(*)
      into admin_roles_count
    from public.user_roles
    where lower(btrim(coalesce(role::text, ''))) = 'admin';

    if admin_roles_count <= 1 then
      raise exception 'Cannot remove the last admin role.';
    end if;

    return new;
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_prevent_last_admin_role_removal on public.user_roles;

create trigger trg_prevent_last_admin_role_removal
before delete or update of role on public.user_roles
for each row
execute function public.prevent_last_admin_role_removal();

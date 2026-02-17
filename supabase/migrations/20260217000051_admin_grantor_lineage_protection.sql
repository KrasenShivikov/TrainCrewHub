create or replace function public.prevent_admin_grantor_revocation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_user_id uuid;
  old_role text;
  new_role text;
  is_protected_target boolean;
begin
  actor_user_id := auth.uid();
  if actor_user_id is null then
    if tg_op = 'DELETE' then
      return old;
    end if;

    return new;
  end if;

  old_role := lower(btrim(coalesce(old.role::text, '')));
  new_role := lower(btrim(coalesce(new.role::text, '')));

  if tg_op = 'DELETE' and old_role <> 'admin' then
    return old;
  end if;

  if tg_op = 'UPDATE' and old_role <> 'admin' then
    return new;
  end if;

  if tg_op = 'UPDATE' and old_role = 'admin' and new_role = 'admin' and new.user_id = old.user_id then
    return new;
  end if;

  with recursive admin_lineage as (
    select
      ur.granted_by_user_id as ancestor_user_id,
      array[ur.user_id]::uuid[] as visited_path
    from public.user_roles ur
    where ur.user_id = actor_user_id
      and lower(btrim(coalesce(ur.role::text, ''))) = 'admin'
      and ur.granted_by_user_id is not null

    union all

    select
      parent.granted_by_user_id as ancestor_user_id,
      admin_lineage.visited_path || parent.user_id
    from admin_lineage
    join public.user_roles parent
      on parent.user_id = admin_lineage.ancestor_user_id
     and lower(btrim(coalesce(parent.role::text, ''))) = 'admin'
    where parent.granted_by_user_id is not null
      and parent.granted_by_user_id <> parent.user_id
      and not (parent.user_id = any(admin_lineage.visited_path))
  )
  select exists (
    select 1
    from admin_lineage
    where ancestor_user_id = old.user_id
  )
  into is_protected_target;

  if is_protected_target then
    raise exception 'Cannot revoke admin role from your grantor lineage.';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;

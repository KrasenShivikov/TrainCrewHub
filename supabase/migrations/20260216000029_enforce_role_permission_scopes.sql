create or replace function public.access_scope_rank(scope_value public.access_scope)
returns integer
language sql
immutable
as $$
  select case scope_value
    when 'none'::public.access_scope then 0
    when 'own'::public.access_scope then 1
    when 'role_attached_employees'::public.access_scope then 2
    when 'all'::public.access_scope then 3
    else 0
  end;
$$;

create or replace function public.get_effective_scope(p_resource text, p_action text)
returns public.access_scope
language sql
stable
security definer
set search_path = public
as $$
  with role_scopes as (
    select case p_action
      when 'view_screen' then rp.view_screen_scope
      when 'view_records' then rp.view_records_scope
      when 'edit_records' then rp.edit_records_scope
      when 'delete_records' then rp.delete_records_scope
      else 'none'::public.access_scope
    end as scope_value
    from public.user_roles ur
    join public.role_permissions rp
      on rp.role = ur.role
    where ur.user_id = auth.uid()
      and rp.resource = p_resource
  )
  select coalesce(
    (
      select scope_value
      from role_scopes
      order by public.access_scope_rank(scope_value) desc
      limit 1
    ),
    'none'::public.access_scope
  );
$$;

create or replace function public.is_own_employee(p_employee_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_profiles up
    where up.id = auth.uid()
      and up.employee_id = p_employee_id
  );
$$;

create or replace function public.is_role_attached_employee(p_employee_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  with current_roles as (
    select ur.role
    from public.user_roles ur
    where ur.user_id = auth.uid()
  )
  select exists (
    select 1
    from public.user_profiles up
    join public.user_roles ur_target
      on ur_target.user_id = up.id
    where up.employee_id = p_employee_id
      and ur_target.role in (select role from current_roles)
  );
$$;

create or replace function public.can_access_resource(
  p_resource text,
  p_action text,
  p_employee_id uuid default null,
  p_created_from text default null
)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  effective_scope public.access_scope;
  current_user_email text;
begin
  effective_scope := public.get_effective_scope(p_resource, p_action);
  current_user_email := lower(coalesce(auth.jwt() ->> 'email', ''));

  if effective_scope = 'all'::public.access_scope then
    return true;
  end if;

  if effective_scope = 'none'::public.access_scope then
    return false;
  end if;

  if effective_scope = 'own'::public.access_scope then
    if p_employee_id is not null and public.is_own_employee(p_employee_id) then
      return true;
    end if;

    if p_created_from is not null then
      if p_created_from = auth.uid()::text then
        return true;
      end if;

      if current_user_email <> '' and lower(p_created_from) = current_user_email then
        return true;
      end if;
    end if;

    return false;
  end if;

  if effective_scope = 'role_attached_employees'::public.access_scope then
    if p_employee_id is null then
      return false;
    end if;

    return public.is_role_attached_employee(p_employee_id);
  end if;

  return false;
end;
$$;

revoke all on function public.get_effective_scope(text, text) from public;
revoke all on function public.is_own_employee(uuid) from public;
revoke all on function public.is_role_attached_employee(uuid) from public;
revoke all on function public.can_access_resource(text, text, uuid, text) from public;

grant execute on function public.get_effective_scope(text, text) to authenticated;
grant execute on function public.is_own_employee(uuid) to authenticated;
grant execute on function public.is_role_attached_employee(uuid) to authenticated;
grant execute on function public.can_access_resource(text, text, uuid, text) to authenticated;

do $$
declare
  rec record;
  employee_expr text;
  created_expr text;
  view_condition text;
  edit_condition text;
  delete_condition text;
begin
  for rec in
    select * from (
      values
        ('positions', null, 'created_from'),
        ('employees', 'id', 'created_from'),
        ('absence_reasons', null, 'created_from'),
        ('employee_absences', 'employee_id', 'created_from'),
        ('schedule_keys', null, 'created_from'),
        ('duties', null, 'created_from'),
        ('trains', null, 'created_from'),
        ('duty_trains', null, null),
        ('planned_duties', 'employee_id', 'created_from'),
        ('actual_duties', 'employee_id', null),
        ('schedule_key_duties', null, null),
        ('duty_types', null, null)
    ) as t(table_name, employee_column, created_from_column)
  loop
    employee_expr := case
      when rec.employee_column is null then 'NULL::uuid'
      else format('%I', rec.employee_column)
    end;

    created_expr := case
      when rec.created_from_column is null then 'NULL::text'
      else format('%I', rec.created_from_column)
    end;

    view_condition := format(
      'public.can_access_resource(%L, %L, %s, %s)',
      rec.table_name,
      'view_records',
      employee_expr,
      created_expr
    );

    edit_condition := format(
      'public.can_access_resource(%L, %L, %s, %s)',
      rec.table_name,
      'edit_records',
      employee_expr,
      created_expr
    );

    delete_condition := format(
      'public.can_access_resource(%L, %L, %s, %s)',
      rec.table_name,
      'delete_records',
      employee_expr,
      created_expr
    );

    execute format('drop policy if exists %I on public.%I', 'Scope select ' || rec.table_name, rec.table_name);
    execute format('drop policy if exists %I on public.%I', 'Scope insert ' || rec.table_name, rec.table_name);
    execute format('drop policy if exists %I on public.%I', 'Scope update ' || rec.table_name, rec.table_name);
    execute format('drop policy if exists %I on public.%I', 'Scope delete ' || rec.table_name, rec.table_name);

    execute format(
      'create policy %I on public.%I as restrictive for select using (%s)',
      'Scope select ' || rec.table_name,
      rec.table_name,
      view_condition
    );

    execute format(
      'create policy %I on public.%I as restrictive for insert with check (%s)',
      'Scope insert ' || rec.table_name,
      rec.table_name,
      edit_condition
    );

    execute format(
      'create policy %I on public.%I as restrictive for update using (%s) with check (%s)',
      'Scope update ' || rec.table_name,
      rec.table_name,
      edit_condition,
      edit_condition
    );

    execute format(
      'create policy %I on public.%I as restrictive for delete using (%s)',
      'Scope delete ' || rec.table_name,
      rec.table_name,
      delete_condition
    );
  end loop;
end $$;

alter table public.role_permissions
  add column if not exists create_records_scope public.access_scope;

update public.role_permissions
set create_records_scope = coalesce(
  create_records_scope,
  case
    when coalesce(can_edit_records, false) then 'all'::public.access_scope
    else 'none'::public.access_scope
  end
);

alter table public.role_permissions
  alter column create_records_scope set default 'none'::public.access_scope,
  alter column create_records_scope set not null;

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
      when 'create_records' then rp.create_records_scope
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

do $$
declare
  rec record;
  employee_expr text;
  created_expr text;
  create_condition text;
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

    create_condition := format(
      'public.can_access_resource(%L, %L, %s, %s)',
      rec.table_name,
      'create_records',
      employee_expr,
      created_expr
    );

    execute format('drop policy if exists %I on public.%I', 'Scope insert ' || rec.table_name, rec.table_name);

    execute format(
      'create policy %I on public.%I as restrictive for insert with check (%s)',
      'Scope insert ' || rec.table_name,
      rec.table_name,
      create_condition
    );
  end loop;
end $$;

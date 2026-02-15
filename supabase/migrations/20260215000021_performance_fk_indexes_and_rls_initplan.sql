create index if not exists idx_duties_schedule_key_id on public.duties (schedule_key_id);
create index if not exists idx_duties_duty_type_id on public.duties (duty_type_id);
create index if not exists idx_duty_trains_train_id on public.duty_trains (train_id);
create index if not exists idx_employee_absences_employee_id on public.employee_absences (employee_id);
create index if not exists idx_employee_absences_reason_id on public.employee_absences (reason_id);
create index if not exists idx_employees_position_id on public.employees (position_id);
create index if not exists idx_schedule_key_duties_duty_id on public.schedule_key_duties (duty_id);
create index if not exists idx_user_profiles_employee_id on public.user_profiles (employee_id);

do $$
declare
  policy_row record;
  normalized_qual text;
  normalized_check text;
begin
  for policy_row in
    select schemaname, tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and (
        coalesce(qual, '') like '%auth.role()%'
        or coalesce(with_check, '') like '%auth.role()%'
      )
  loop
    normalized_qual := case
      when policy_row.qual is null then null
      else replace(policy_row.qual, 'auth.role()', '(select auth.role())')
    end;

    normalized_check := case
      when policy_row.with_check is null then null
      else replace(policy_row.with_check, 'auth.role()', '(select auth.role())')
    end;

    if normalized_qual is not null and normalized_check is not null then
      execute format(
        'alter policy %I on %I.%I using (%s) with check (%s)',
        policy_row.policyname,
        policy_row.schemaname,
        policy_row.tablename,
        normalized_qual,
        normalized_check
      );
    elsif normalized_qual is not null then
      execute format(
        'alter policy %I on %I.%I using (%s)',
        policy_row.policyname,
        policy_row.schemaname,
        policy_row.tablename,
        normalized_qual
      );
    elsif normalized_check is not null then
      execute format(
        'alter policy %I on %I.%I with check (%s)',
        policy_row.policyname,
        policy_row.schemaname,
        policy_row.tablename,
        normalized_check
      );
    end if;
  end loop;
end $$;

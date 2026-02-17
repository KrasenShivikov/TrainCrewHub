drop policy if exists "Users can read own schedule change events" on public.schedule_change_events;
create policy "Authenticated users can read schedule change events"
  on public.schedule_change_events
  for select
  to public
  using ((select auth.role()) = 'authenticated');

create or replace function public.log_schedule_change_event_on_actual_duty_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.schedule_change_events (
      schedule_date,
      actual_duty_id,
      action,
      new_duty_id,
      new_employee_id,
      new_assignment_role,
      changed_by
    )
    values (
      new.date,
      new.id,
      'insert',
      new.duty_id,
      new.employee_id,
      new.assignment_role,
      auth.uid()
    );

    return new;
  end if;

  if tg_op = 'UPDATE' then
    if new.date is distinct from old.date
      or new.duty_id is distinct from old.duty_id
      or new.employee_id is distinct from old.employee_id
      or new.assignment_role is distinct from old.assignment_role then
      insert into public.schedule_change_events (
        schedule_date,
        actual_duty_id,
        action,
        old_duty_id,
        new_duty_id,
        old_employee_id,
        new_employee_id,
        old_assignment_role,
        new_assignment_role,
        changed_by
      )
      values (
        old.date,
        new.id,
        'update',
        old.duty_id,
        new.duty_id,
        old.employee_id,
        new.employee_id,
        old.assignment_role,
        new.assignment_role,
        auth.uid()
      );

      if new.date is distinct from old.date then
        insert into public.schedule_change_events (
          schedule_date,
          actual_duty_id,
          action,
          old_duty_id,
          new_duty_id,
          old_employee_id,
          new_employee_id,
          old_assignment_role,
          new_assignment_role,
          changed_by
        )
        values (
          new.date,
          new.id,
          'update',
          old.duty_id,
          new.duty_id,
          old.employee_id,
          new.employee_id,
          old.assignment_role,
          new.assignment_role,
          auth.uid()
        );
      end if;
    end if;

    return new;
  end if;

  if tg_op = 'DELETE' then
    insert into public.schedule_change_events (
      schedule_date,
      actual_duty_id,
      action,
      old_duty_id,
      old_employee_id,
      old_assignment_role,
      changed_by
    )
    values (
      old.date,
      old.id,
      'delete',
      old.duty_id,
      old.employee_id,
      old.assignment_role,
      auth.uid()
    );

    return old;
  end if;

  return null;
end;
$$;

revoke all on function public.log_schedule_change_event_on_actual_duty_change() from public;
grant execute on function public.log_schedule_change_event_on_actual_duty_change() to authenticated;

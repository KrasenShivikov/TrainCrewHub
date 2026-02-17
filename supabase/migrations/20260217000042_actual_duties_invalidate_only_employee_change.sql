create or replace function public.invalidate_schedule_publication_on_actual_duty_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op <> 'UPDATE' then
    return coalesce(new, old);
  end if;

  if new.employee_id is distinct from old.employee_id then
    perform public.invalidate_schedule_publication_for_date(old.date);

    if new.date is distinct from old.date then
      perform public.invalidate_schedule_publication_for_date(new.date);
    end if;
  end if;

  return new;
end;
$$;

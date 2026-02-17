create or replace function public.invalidate_schedule_publication_for_date(target_date date)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if target_date is null then
    return;
  end if;

  insert into public.schedule_publications (
    schedule_date,
    is_confirmed,
    source,
    confirmed_at,
    confirmed_by,
    updated_at
  )
  values (
    target_date,
    false,
    'timetable',
    null,
    null,
    now()
  )
  on conflict (schedule_date)
  do update set
    is_confirmed = false,
    confirmed_at = null,
    confirmed_by = null,
    updated_at = now();
end;
$$;

create or replace function public.invalidate_schedule_publication_on_actual_duty_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    perform public.invalidate_schedule_publication_for_date(new.date);
    return new;
  end if;

  if tg_op = 'UPDATE' then
    perform public.invalidate_schedule_publication_for_date(old.date);

    if new.date is distinct from old.date then
      perform public.invalidate_schedule_publication_for_date(new.date);
    end if;

    return new;
  end if;

  if tg_op = 'DELETE' then
    perform public.invalidate_schedule_publication_for_date(old.date);
    return old;
  end if;

  return null;
end;
$$;

drop trigger if exists trg_actual_duties_invalidate_schedule_publication on public.actual_duties;
create trigger trg_actual_duties_invalidate_schedule_publication
after insert or update or delete on public.actual_duties
for each row
execute function public.invalidate_schedule_publication_on_actual_duty_change();

grant execute on function public.invalidate_schedule_publication_for_date(date) to authenticated;
grant execute on function public.invalidate_schedule_publication_on_actual_duty_change() to authenticated;

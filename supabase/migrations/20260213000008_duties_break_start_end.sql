-- Replace break_duration with break start/end times and generated break_duration_interval
alter table public.duties
  add column if not exists break_start_time time not null default time '00:00',
  add column if not exists break_end_time time not null default time '00:00';

-- Backfill from existing break_duration when present
-- (best effort: break starts at duty start and ends after break duration)
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'duties'
      and column_name = 'break_duration'
  ) then
    update public.duties
    set break_start_time = start_time,
        break_end_time = (start_time + break_duration)::time
    where break_duration is not null;
  end if;
end $$;

-- Recreate generated columns with new formula
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'duties' and column_name = 'duration_interval'
  ) then
    alter table public.duties drop column duration_interval;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'duties' and column_name = 'break_duration_interval'
  ) then
    alter table public.duties drop column break_duration_interval;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'duties' and column_name = 'break_duration'
  ) then
    alter table public.duties drop column break_duration;
  end if;

  alter table public.duties
    add column break_duration_interval interval generated always as (
      case
        when break_end_time >= break_start_time
          then break_end_time - break_start_time
        else (break_end_time - break_start_time) + interval '24 hours'
      end
    ) stored;

  alter table public.duties
    add column duration_interval interval generated always as (
      greatest(
        (
          case
            when end_time >= start_time
              then end_time - start_time
            else (end_time - start_time) + interval '24 hours'
          end
        ) -
        (
          case
            when break_end_time >= break_start_time
              then break_end_time - break_start_time
            else (break_end_time - break_start_time) + interval '24 hours'
          end
        ),
        interval '0 minutes'
      )
    ) stored;
end $$;

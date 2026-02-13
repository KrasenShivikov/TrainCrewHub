-- Add break duration and switch to duration_interval calculation
alter table public.duties
  add column if not exists break_duration interval not null default interval '0 minutes';

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'duties'
      and column_name = 'duration'
  ) then
    alter table public.duties drop column duration;
  end if;

  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'duties'
      and column_name = 'duration_interval'
  ) then
    alter table public.duties
      add column duration_interval interval generated always as (
        greatest(
          case
            when end_time >= start_time
              then end_time - start_time
            else (end_time - start_time) + interval '24 hours'
          end - break_duration,
          interval '0 minutes'
        )
      ) stored;
  end if;
end $$;

alter table public.actual_duties
  add column if not exists start_time_override time without time zone,
  add column if not exists end_time_override time without time zone,
  add column if not exists break_start_time_override time without time zone,
  add column if not exists break_end_time_override time without time zone;

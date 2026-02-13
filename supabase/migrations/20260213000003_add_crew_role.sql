do $$
begin
  if not exists (
    select 1
    from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'app_role'
      and e.enumlabel = 'crew'
  ) then
    alter type app_role add value 'crew';
  end if;
end $$;

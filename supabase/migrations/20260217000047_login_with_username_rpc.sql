create or replace function public.resolve_login_email(input_username text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  result_email text;
begin
  if input_username is null or btrim(input_username) = '' then
    return null;
  end if;

  select up.email
    into result_email
  from public.user_profiles up
  where lower(up.username) = lower(btrim(input_username))
    and up.email is not null
  limit 1;

  return result_email;
end;
$$;

grant execute on function public.resolve_login_email(text) to anon, authenticated;

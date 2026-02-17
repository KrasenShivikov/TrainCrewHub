alter table public.user_profiles
  add column if not exists email text,
  add column if not exists first_name text,
  add column if not exists last_name text;

create unique index if not exists user_profiles_email_key
  on public.user_profiles (lower(email))
  where email is not null;

update public.user_profiles up
set email = au.email
from auth.users au
where up.id = au.id
  and (up.email is null or btrim(up.email) = '');

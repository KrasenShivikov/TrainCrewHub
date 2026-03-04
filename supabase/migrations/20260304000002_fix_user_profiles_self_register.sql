-- Fix user_profiles INSERT scope policy to allow new users to register their own profile.
--
-- The Scope insert policy was calling can_access_resource() which returns 'none' for users
-- with no role yet (new registrants), blocking self-registration.
-- Adding `id = auth.uid()` as an explicit bypass allows a user to always insert their own row.

drop policy if exists "Scope insert user_profiles" on public.user_profiles;
create policy "Scope insert user_profiles"
  on public.user_profiles
  for insert
  to authenticated
  with check (
    (id = auth.uid())
    or can_access_resource('user_profiles'::text, 'create_records'::text, employee_id, (id)::text)
  );

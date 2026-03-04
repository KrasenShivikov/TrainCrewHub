-- Allow users to always update their own profile row (same bypass as INSERT).
DROP POLICY IF EXISTS "Scope update user_profiles" ON public.user_profiles;
CREATE POLICY "Scope update user_profiles"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (
    (id = auth.uid())
    OR can_access_resource('user_profiles'::text, 'edit_records'::text, employee_id, (id)::text)
  )
  WITH CHECK (
    (id = auth.uid())
    OR can_access_resource('user_profiles'::text, 'edit_records'::text, employee_id, (id)::text)
  );

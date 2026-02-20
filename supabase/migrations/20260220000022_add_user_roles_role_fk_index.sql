-- Add missing index on user_roles.role column (FK to roles.name)
-- Fixes: Supabase performance advisor "Unindexed foreign keys" warning
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles (role);

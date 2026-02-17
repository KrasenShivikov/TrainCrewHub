create table if not exists public.user_role_audit_logs (
  id uuid primary key default uuid_generate_v4(),
  action text not null check (action in ('grant', 'revoke', 'update')),
  role text not null,
  actor_user_id uuid references auth.users(id),
  target_user_id uuid references auth.users(id) not null,
  occurred_at timestamptz not null default now()
);

create index if not exists user_role_audit_logs_occurred_at_idx
  on public.user_role_audit_logs (occurred_at desc);

create index if not exists user_role_audit_logs_actor_user_id_idx
  on public.user_role_audit_logs (actor_user_id);

create index if not exists user_role_audit_logs_target_user_id_idx
  on public.user_role_audit_logs (target_user_id);

alter table public.user_role_audit_logs enable row level security;

drop policy if exists "Admins can read user role audit logs" on public.user_role_audit_logs;
create policy "Admins can read user role audit logs"
on public.user_role_audit_logs
for select
using (public.is_current_user_admin());

create or replace function public.log_user_role_changes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.user_role_audit_logs (action, role, actor_user_id, target_user_id, occurred_at)
    values ('grant', coalesce(new.role::text, ''), auth.uid(), new.user_id, now());
    return new;
  end if;

  if tg_op = 'DELETE' then
    insert into public.user_role_audit_logs (action, role, actor_user_id, target_user_id, occurred_at)
    values ('revoke', coalesce(old.role::text, ''), auth.uid(), old.user_id, now());
    return old;
  end if;

  if tg_op = 'UPDATE' and (
    coalesce(new.role::text, '') <> coalesce(old.role::text, '')
    or coalesce(new.user_id::text, '') <> coalesce(old.user_id::text, '')
  ) then
    insert into public.user_role_audit_logs (action, role, actor_user_id, target_user_id, occurred_at)
    values ('update', coalesce(new.role::text, old.role::text, ''), auth.uid(), coalesce(new.user_id, old.user_id), now());
  end if;

  return new;
end;
$$;

drop trigger if exists trg_log_user_role_changes on public.user_roles;
create trigger trg_log_user_role_changes
after insert or update or delete on public.user_roles
for each row
execute function public.log_user_role_changes();

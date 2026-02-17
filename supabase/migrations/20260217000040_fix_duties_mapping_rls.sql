drop policy if exists "Scope select duty_trains" on public.duty_trains;
drop policy if exists "Scope insert duty_trains" on public.duty_trains;
drop policy if exists "Scope update duty_trains" on public.duty_trains;
drop policy if exists "Scope delete duty_trains" on public.duty_trains;

drop policy if exists "Scope select schedule_key_duties" on public.schedule_key_duties;
drop policy if exists "Scope insert schedule_key_duties" on public.schedule_key_duties;
drop policy if exists "Scope update schedule_key_duties" on public.schedule_key_duties;
drop policy if exists "Scope delete schedule_key_duties" on public.schedule_key_duties;

create policy "Scope select duty_trains"
on public.duty_trains
as restrictive
for select
using (
  exists (
    select 1
    from public.duties d
    where d.id = duty_trains.duty_id
      and public.can_access_resource('duties', 'view_records', null, d.created_from)
  )
);

create policy "Scope insert duty_trains"
on public.duty_trains
as restrictive
for insert
with check (
  exists (
    select 1
    from public.duties d
    where d.id = duty_trains.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
);

create policy "Scope update duty_trains"
on public.duty_trains
as restrictive
for update
using (
  exists (
    select 1
    from public.duties d
    where d.id = duty_trains.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
)
with check (
  exists (
    select 1
    from public.duties d
    where d.id = duty_trains.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
);

create policy "Scope delete duty_trains"
on public.duty_trains
as restrictive
for delete
using (
  exists (
    select 1
    from public.duties d
    where d.id = duty_trains.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
);

create policy "Scope select schedule_key_duties"
on public.schedule_key_duties
as restrictive
for select
using (
  exists (
    select 1
    from public.duties d
    where d.id = schedule_key_duties.duty_id
      and public.can_access_resource('duties', 'view_records', null, d.created_from)
  )
);

create policy "Scope insert schedule_key_duties"
on public.schedule_key_duties
as restrictive
for insert
with check (
  exists (
    select 1
    from public.duties d
    where d.id = schedule_key_duties.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
);

create policy "Scope update schedule_key_duties"
on public.schedule_key_duties
as restrictive
for update
using (
  exists (
    select 1
    from public.duties d
    where d.id = schedule_key_duties.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
)
with check (
  exists (
    select 1
    from public.duties d
    where d.id = schedule_key_duties.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
);

create policy "Scope delete schedule_key_duties"
on public.schedule_key_duties
as restrictive
for delete
using (
  exists (
    select 1
    from public.duties d
    where d.id = schedule_key_duties.duty_id
      and public.can_access_resource('duties', 'edit_records', null, d.created_from)
  )
);

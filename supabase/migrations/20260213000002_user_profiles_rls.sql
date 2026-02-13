alter table user_profiles enable row level security;

create policy "Users can read own profile"
on user_profiles
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on user_profiles
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on user_profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

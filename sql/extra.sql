create policy "groups_admins_only" on groups
  for all
  using (exists (select 1 from profiles where id = auth.uid() and is_admin))
  with check (exists (select 1 from profiles where id = auth.uid() and is_admin));

create table if not exists download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  document_id uuid references documents,
  downloaded_at timestamptz default now()
);

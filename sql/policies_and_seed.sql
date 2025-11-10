-- seed groups
insert into groups (id, name, description)
values
  (gen_random_uuid(), 'Grupo A', 'Grupo principal A'),
  (gen_random_uuid(), 'Grupo B', 'Grupo B secundarios');

-- enable RLS
alter table profiles enable row level security;
alter table documents enable row level security;

-- profiles policy
create policy "profiles_is_owner_or_admin" on profiles
  for all
  using (
    auth.uid() = id
    or exists (select 1 from profiles p2 where p2.id = auth.uid() and p2.is_admin)
  );

-- documents select policy
create policy "documents_select_for_group_or_public" on documents
  for select
  using (
    group_id is null
    or group_id in ( select group_id from profiles where id = auth.uid() )
    or exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin)
  );

-- insert policy (admins only)
create policy "documents_insert_admins_only" on documents
  for insert
  with check (
    exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin)
  );

create policy "documents_modify_admins_only" on documents
  for update, delete
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin))
  with check (exists (select 1 from profiles p where p.id = auth.uid() and p.is_admin));

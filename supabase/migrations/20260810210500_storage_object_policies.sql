drop policy if exists "project file owners upload" on storage.objects;
create policy "project file owners upload" on storage.objects
for insert to authenticated
with check (bucket_id = 'project-files' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "project file participants read" on storage.objects;
create policy "project file participants read" on storage.objects
for select to authenticated
using (
  bucket_id = 'project-files' and exists (
    select 1 from public.project_files pf
    join public.projects p on p.id = pf.project_id
    where pf.storage_path = name
      and (p.customer_id = (select auth.uid()) or p.selected_professional_id = (select auth.uid()))
  )
);

drop policy if exists "project file owners delete" on storage.objects;
create policy "project file owners delete" on storage.objects
for delete to authenticated
using (bucket_id = 'project-files' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "portfolio owner upload" on storage.objects;
create policy "portfolio owner upload" on storage.objects
for insert to authenticated
with check (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "portfolio public read" on storage.objects;
create policy "portfolio public read" on storage.objects
for select to anon, authenticated
using (bucket_id = 'portfolio-media');

drop policy if exists "portfolio owner delete" on storage.objects;
create policy "portfolio owner delete" on storage.objects
for delete to authenticated
using (bucket_id = 'portfolio-media' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "verification owner upload" on storage.objects;
create policy "verification owner upload" on storage.objects
for insert to authenticated
with check (bucket_id = 'verification-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "verification owner read" on storage.objects;
create policy "verification owner read" on storage.objects
for select to authenticated
using (bucket_id = 'verification-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "verification owner delete" on storage.objects;
create policy "verification owner delete" on storage.objects
for delete to authenticated
using (bucket_id = 'verification-documents' and (storage.foldername(name))[1] = (select auth.uid())::text);

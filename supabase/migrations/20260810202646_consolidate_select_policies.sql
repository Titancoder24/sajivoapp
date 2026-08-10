drop policy if exists "profiles self read" on public.profiles;
drop policy if exists "profiles public professionals" on public.profiles;
create policy "profiles visible to requester" on public.profiles for select to anon, authenticated using (
  (select auth.uid()) = id
  or (account_status = 'active' and primary_role in ('designer', 'contractor'))
);

drop policy if exists "projects owner full access" on public.projects;
drop policy if exists "projects professional discover" on public.projects;
drop policy if exists "projects assigned professional read" on public.projects;
create policy "projects visible to participants" on public.projects for select to authenticated using (
  (select auth.uid()) = customer_id
  or (select auth.uid()) = selected_professional_id
  or status in ('published', 'receiving_proposals', 'matching')
);
create policy "projects owner insert" on public.projects for insert to authenticated with check ((select auth.uid()) = customer_id);
create policy "projects owner update" on public.projects for update to authenticated using ((select auth.uid()) = customer_id) with check ((select auth.uid()) = customer_id);
create policy "projects owner delete" on public.projects for delete to authenticated using ((select auth.uid()) = customer_id);

drop policy if exists "portfolio public read" on public.portfolio_projects;
drop policy if exists "portfolio owner full access" on public.portfolio_projects;
create policy "portfolio visible to requester" on public.portfolio_projects for select to anon, authenticated using (
  professional_id = (select auth.uid())
  or exists (
    select 1 from public.profiles p
    where p.id = professional_id
      and p.account_status = 'active'
      and p.primary_role in ('designer', 'contractor')
  )
);
create policy "portfolio owner insert" on public.portfolio_projects for insert to authenticated with check (professional_id = (select auth.uid()));
create policy "portfolio owner update" on public.portfolio_projects for update to authenticated using (professional_id = (select auth.uid())) with check (professional_id = (select auth.uid()));
create policy "portfolio owner delete" on public.portfolio_projects for delete to authenticated using (professional_id = (select auth.uid()));

drop policy if exists "portfolio media public read" on public.portfolio_media;
drop policy if exists "portfolio media owner full access" on public.portfolio_media;
create policy "portfolio media visible" on public.portfolio_media for select to anon, authenticated using (true);
create policy "portfolio media owner insert" on public.portfolio_media for insert to authenticated with check (professional_id = (select auth.uid()));
create policy "portfolio media owner update" on public.portfolio_media for update to authenticated using (professional_id = (select auth.uid())) with check (professional_id = (select auth.uid()));
create policy "portfolio media owner delete" on public.portfolio_media for delete to authenticated using (professional_id = (select auth.uid()));

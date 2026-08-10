revoke execute on function public.rls_auto_enable() from public, anon, authenticated;

create index if not exists projects_selected_professional_idx on public.projects(selected_professional_id) where selected_professional_id is not null;
create index if not exists project_files_uploaded_by_idx on public.project_files(uploaded_by);
create index if not exists proposals_customer_idx on public.proposals(customer_id, created_at desc);
create index if not exists workspace_messages_sender_idx on public.workspace_messages(sender_id);
create index if not exists project_activity_actor_idx on public.project_activity(actor_id) where actor_id is not null;
create index if not exists notifications_project_idx on public.notifications(project_id) where project_id is not null;
create index if not exists portfolio_media_project_idx on public.portfolio_media(portfolio_project_id) where portfolio_project_id is not null;
create index if not exists portfolio_media_professional_idx on public.portfolio_media(professional_id);
create index if not exists professional_verifications_reviewer_idx on public.professional_verifications(reviewer_id) where reviewer_id is not null;
create index if not exists verification_documents_verification_idx on public.verification_documents(verification_id) where verification_id is not null;
create index if not exists verification_documents_professional_idx on public.verification_documents(professional_id);
create index if not exists reviews_customer_idx on public.reviews(customer_id, created_at desc);
create index if not exists reviews_proposal_idx on public.reviews(proposal_id) where proposal_id is not null;
create index if not exists vendor_enquiries_project_idx on public.vendor_enquiries(project_id) where project_id is not null;
create index if not exists vendor_orders_enquiry_idx on public.vendor_orders(enquiry_id) where enquiry_id is not null;

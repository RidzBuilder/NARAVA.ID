-- Deterministic non-production seed identifiers only.
insert into organizations(id,name) values ('org-demo','NARAVA Demo Organization') on conflict do nothing;
insert into users(id,name,email) values ('user-admin','NARAVA Admin','admin@example.invalid') on conflict do nothing;
insert into users(id,name,email) values ('user-reseller','Demo Reseller','reseller@example.invalid') on conflict do nothing;
insert into memberships(user_id,organization_id,role) values ('user-admin','org-demo','ADMIN') on conflict do nothing;
insert into memberships(user_id,organization_id,role) values ('user-reseller','org-demo','RESELLER') on conflict do nothing;

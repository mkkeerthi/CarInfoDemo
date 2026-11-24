-- Car Info Demo — write access for the CRUD API layer
-- Paste this whole file into the Supabase SQL Editor and run it after
-- 20260101000000_init_schema.sql.
--
-- WARNING: this opens insert/update/delete to the public anon key. That is fine
-- for a demo, but replace these policies with auth-scoped rules before shipping
-- anything real.

-- ---------- write policies ----------
drop policy if exists "public insert" on brands;
create policy "public insert" on brands for insert to anon, authenticated with check (true);
drop policy if exists "public update" on brands;
create policy "public update" on brands for update to anon, authenticated using (true) with check (true);
drop policy if exists "public delete" on brands;
create policy "public delete" on brands for delete to anon, authenticated using (true);

drop policy if exists "public insert" on car_models;
create policy "public insert" on car_models for insert to anon, authenticated with check (true);
drop policy if exists "public update" on car_models;
create policy "public update" on car_models for update to anon, authenticated using (true) with check (true);
drop policy if exists "public delete" on car_models;
create policy "public delete" on car_models for delete to anon, authenticated using (true);

drop policy if exists "public insert" on car_variants;
create policy "public insert" on car_variants for insert to anon, authenticated with check (true);
drop policy if exists "public update" on car_variants;
create policy "public update" on car_variants for update to anon, authenticated using (true) with check (true);
drop policy if exists "public delete" on car_variants;
create policy "public delete" on car_variants for delete to anon, authenticated using (true);

drop policy if exists "public insert" on feature_groups;
create policy "public insert" on feature_groups for insert to anon, authenticated with check (true);
drop policy if exists "public update" on feature_groups;
create policy "public update" on feature_groups for update to anon, authenticated using (true) with check (true);
drop policy if exists "public delete" on feature_groups;
create policy "public delete" on feature_groups for delete to anon, authenticated using (true);

drop policy if exists "public insert" on features;
create policy "public insert" on features for insert to anon, authenticated with check (true);
drop policy if exists "public update" on features;
create policy "public update" on features for update to anon, authenticated using (true) with check (true);
drop policy if exists "public delete" on features;
create policy "public delete" on features for delete to anon, authenticated using (true);

drop policy if exists "public insert" on car_variant_features;
create policy "public insert" on car_variant_features for insert to anon, authenticated with check (true);
drop policy if exists "public update" on car_variant_features;
create policy "public update" on car_variant_features for update to anon, authenticated using (true) with check (true);
drop policy if exists "public delete" on car_variant_features;
create policy "public delete" on car_variant_features for delete to anon, authenticated using (true);

-- ---------- grants ----------
-- init_schema.sql granted select only.
grant insert, update, delete on
  brands, car_models, car_variants, feature_groups, features, car_variant_features
  to anon, authenticated;

-- required so identity-generated id columns can be produced on insert
grant usage, select on all sequences in schema public to anon, authenticated;

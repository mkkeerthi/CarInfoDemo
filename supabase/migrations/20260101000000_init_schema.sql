-- Car Info Demo — normalized schema
-- Paste this whole file into the Supabase SQL Editor and run it.
--
-- WARNING: the drop block below makes this script re-runnable and will delete
-- existing car data. Safe for the demo; remove the drops for real migrations.

drop view if exists v_car_catalog;
drop table if exists car_variant_features, features, feature_groups,
  car_variants, car_models, brands cascade;
drop type if exists fuel_type, transmission;

create extension if not exists pgcrypto;

create type fuel_type as enum ('Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid');
create type transmission as enum ('Manual', 'Automatic');

-- ---------- brands ----------
create table brands (
  id          bigint generated always as identity primary key,
  name        text not null unique,
  origin      text not null,
  logo_text   text not null,
  created_at  timestamptz not null default now()
);

-- ---------- models ----------
create table car_models (
  id             bigint generated always as identity primary key,
  brand_id       bigint not null references brands(id) on delete restrict,
  name           text not null,
  body_type      text not null check (body_type in ('Hatchback', 'Sedan', 'SUV', 'MUV')),
  safety_rating  smallint not null check (safety_rating between 0 and 5),
  colors         text not null default '',
  created_at     timestamptz not null default now(),
  unique (brand_id, name)
);
create index car_models_brand_id_idx on car_models (brand_id);
create index car_models_body_type_idx on car_models (body_type);

-- ---------- variants ----------
create table car_variants (
  id            bigint generated always as identity primary key,
  model_id      bigint not null references car_models(id) on delete cascade,
  trim_name     text not null,
  price_lakh    numeric(7,2) not null check (price_lakh >= 0),
  fuel_type     fuel_type not null,
  transmission  transmission not null,
  seats         smallint not null check (seats between 1 and 12),
  engine_cc     integer not null default 0 check (engine_cc >= 0),
  power_bhp     integer not null check (power_bhp >= 0),
  mileage_kmpl  numeric(5,1) not null default 0 check (mileage_kmpl >= 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (model_id, trim_name)
);
create index car_variants_model_id_idx on car_variants (model_id);
create index car_variants_fuel_type_idx on car_variants (fuel_type);
create index car_variants_transmission_idx on car_variants (transmission);

-- ---------- features ----------
create table feature_groups (
  id          bigint generated always as identity primary key,
  label       text not null unique,
  sort_order  smallint not null default 0
);

create table features (
  id          bigint generated always as identity primary key,
  group_id    bigint not null references feature_groups(id) on delete cascade,
  label       text not null,
  sort_order  smallint not null default 0,
  unique (group_id, label)
);
create index features_group_id_idx on features (group_id);

create table car_variant_features (
  id           bigint generated always as identity primary key,
  variant_id   bigint not null references car_variants(id) on delete cascade,
  feature_id   bigint not null references features(id) on delete cascade,
  is_standard  boolean not null default true,
  unique (variant_id, feature_id)
);
create index car_variant_features_variant_id_idx on car_variant_features (variant_id);
create index car_variant_features_feature_id_idx on car_variant_features (feature_id);

-- ---------- updated_at trigger ----------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger car_variants_set_updated_at
before update on car_variants
for each row execute function set_updated_at();

-- ---------- read model ----------
create view v_car_catalog with (security_invoker = true) as
select v.id,
       v.trim_name as variant,
       v.price_lakh,
       v.fuel_type::text as fuel_type,
       v.transmission::text as transmission,
       v.seats,
       v.engine_cc,
       v.power_bhp,
       v.mileage_kmpl,
       m.id as model_id,
       m.name as model,
       m.body_type,
       m.safety_rating,
       m.colors,
       b.id as brand_id,
       b.name as brand_name,
       b.origin,
       b.logo_text
from car_variants v
join car_models m on m.id = v.model_id
join brands b on b.id = m.brand_id;

-- ---------- RLS: public read-only ----------
alter table brands               enable row level security;
alter table car_models           enable row level security;
alter table car_variants         enable row level security;
alter table feature_groups       enable row level security;
alter table features             enable row level security;
alter table car_variant_features enable row level security;

create policy "public read" on brands               for select to anon, authenticated using (true);
create policy "public read" on car_models           for select to anon, authenticated using (true);
create policy "public read" on car_variants         for select to anon, authenticated using (true);
create policy "public read" on feature_groups       for select to anon, authenticated using (true);
create policy "public read" on features             for select to anon, authenticated using (true);
create policy "public read" on car_variant_features for select to anon, authenticated using (true);

grant usage on schema public to anon, authenticated;
grant select on brands, car_models, car_variants, feature_groups, features,
  car_variant_features, v_car_catalog to anon, authenticated;

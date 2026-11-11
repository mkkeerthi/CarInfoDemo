import { supabase } from '../lib/supabase';
import { buildCatalog } from './catalog';
import type { Catalog } from './catalog';
import type {
  BrandRow,
  CarModelRow,
  CarVariantFeatureRow,
  CarVariantRow,
  CatalogRows,
  FeatureGroupRow,
  FeatureRow,
} from '../types/database';

function assertNoError(result: { error: { message: string } | null }) {
  if (result.error) {
    throw new Error(result.error.message);
  }
}

export async function loadCatalogFromSupabase(): Promise<Catalog> {
  if (!supabase) {
    throw new Error('Supabase is not configured');
  }

  const [brands, models, variants, groups, features, links] = await Promise.all([
    supabase
      .from('brands')
      .select('id, name, origin, logoText:logo_text')
      .order('id'),
    supabase
      .from('car_models')
      .select('id, brandId:brand_id, name, bodyType:body_type, safetyRating:safety_rating, colors')
      .order('id'),
    supabase
      .from('car_variants')
      .select(
        'id, modelId:model_id, trimName:trim_name, priceLakh:price_lakh, fuelType:fuel_type, transmission, seats, engineCc:engine_cc, powerBhp:power_bhp, mileageKmpl:mileage_kmpl',
      )
      .order('id'),
    supabase.from('feature_groups').select('id, label, sortOrder:sort_order').order('sort_order'),
    supabase.from('features').select('id, groupId:group_id, label, sortOrder:sort_order').order('sort_order'),
    supabase
      .from('car_variant_features')
      .select('id, variantId:variant_id, featureId:feature_id, isStandard:is_standard')
      .order('id'),
  ]);

  assertNoError(brands);
  assertNoError(models);
  assertNoError(variants);
  assertNoError(groups);
  assertNoError(features);
  assertNoError(links);

  const rows: CatalogRows = {
    brands: (brands.data ?? []) as BrandRow[],
    models: (models.data ?? []) as CarModelRow[],
    variants: (variants.data ?? []) as CarVariantRow[],
    featureGroups: (groups.data ?? []) as FeatureGroupRow[],
    features: (features.data ?? []) as FeatureRow[],
    carVariantFeatures: (links.data ?? []) as CarVariantFeatureRow[],
  };

  return buildCatalog(rows);
}

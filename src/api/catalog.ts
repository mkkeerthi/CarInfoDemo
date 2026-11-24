import type { CatalogRows } from '../types/database';
import { brandsApi } from './brands';
import { carModelsApi } from './carModels';
import { carVariantsApi } from './carVariants';
import { carVariantFeaturesApi } from './carVariantFeatures';
import { featureGroupsApi } from './featureGroups';
import { featuresApi } from './features';

/** Loads the six base tables in parallel, shaped for buildCatalog(). */
export async function fetchCatalogRows(): Promise<CatalogRows> {
  const [brands, models, variants, featureGroups, features, carVariantFeatures] = await Promise.all([
    brandsApi.list(),
    carModelsApi.list(),
    carVariantsApi.list(),
    featureGroupsApi.list(),
    featuresApi.list(),
    carVariantFeaturesApi.list(),
  ]);

  return {
    brands,
    models,
    variants,
    featureGroups,
    features,
    carVariantFeatures,
  };
}

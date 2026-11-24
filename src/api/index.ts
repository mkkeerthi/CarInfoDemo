export * from './types';
export type { Filters, ListQuery, TableSpec } from './core';
export { assertNoError, getClient } from './core';

export { brandsApi } from './brands';
export { carModelsApi } from './carModels';
export { carVariantsApi } from './carVariants';
export { featureGroupsApi } from './featureGroups';
export { featuresApi } from './features';
export { carVariantFeaturesApi } from './carVariantFeatures';
export { carCatalogApi } from './carCatalog';
export { fetchCatalogRows } from './catalog';

import { brandsApi } from './brands';
import { carModelsApi } from './carModels';
import { carVariantsApi } from './carVariants';
import { featureGroupsApi } from './featureGroups';
import { featuresApi } from './features';
import { carVariantFeaturesApi } from './carVariantFeatures';
import { carCatalogApi } from './carCatalog';

/** Every table group behind one namespace: `api.brands.list()`, `api.carCatalog.search()`, ... */
export const api = {
  brands: brandsApi,
  carModels: carModelsApi,
  carVariants: carVariantsApi,
  featureGroups: featureGroupsApi,
  features: featuresApi,
  carVariantFeatures: carVariantFeaturesApi,
  carCatalog: carCatalogApi,
};

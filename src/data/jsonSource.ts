import brandsJson from './brands.json';
import modelsJson from './carModels.json';
import variantsJson from './carVariants.json';
import groupsJson from './featureGroups.json';
import featuresJson from './features.json';
import variantFeaturesJson from './carVariantFeatures.json';
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

const rows: CatalogRows = {
  brands: brandsJson as BrandRow[],
  models: modelsJson as CarModelRow[],
  variants: variantsJson as CarVariantRow[],
  featureGroups: groupsJson as FeatureGroupRow[],
  features: featuresJson as FeatureRow[],
  carVariantFeatures: variantFeaturesJson as CarVariantFeatureRow[],
};

export const localCatalog: Catalog = buildCatalog(rows);

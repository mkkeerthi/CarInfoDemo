import type { BodyType, FuelType, Transmission } from './car';

export interface BrandRow {
  id: number;
  name: string;
  origin: string;
  logoText: string;
}

export interface CarModelRow {
  id: number;
  brandId: number;
  name: string;
  bodyType: BodyType;
  safetyRating: number;
  colors: string;
}

export interface CarVariantRow {
  id: number;
  modelId: number;
  trimName: string;
  priceLakh: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  engineCc: number;
  powerBhp: number;
  mileageKmpl: number;
}

export interface FeatureGroupRow {
  id: number;
  label: string;
  sortOrder: number;
}

export interface FeatureRow {
  id: number;
  groupId: number;
  label: string;
  sortOrder: number;
}

export interface CarVariantFeatureRow {
  id: number;
  variantId: number;
  featureId: number;
  isStandard: boolean;
}

export interface CatalogRows {
  brands: BrandRow[];
  models: CarModelRow[];
  variants: CarVariantRow[];
  featureGroups: FeatureGroupRow[];
  features: FeatureRow[];
  carVariantFeatures: CarVariantFeatureRow[];
}

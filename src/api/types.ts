import type { BodyType, FuelType, Transmission } from '../types/car';

export type { BodyType, FuelType, Transmission };

export const FUEL_TYPES = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'] as const;
export const TRANSMISSIONS = ['Manual', 'Automatic'] as const;
export const BODY_TYPES = ['Hatchback', 'Sedan', 'SUV', 'MUV'] as const;

/** brands */
export interface BrandRecord {
  id: number;
  name: string;
  origin: string;
  logoText: string;
  createdAt: string;
}

export interface BrandInsert {
  name: string;
  origin: string;
  logoText: string;
}

export type BrandUpdate = Partial<BrandInsert>;

/** car_models */
export interface CarModelRecord {
  id: number;
  brandId: number;
  name: string;
  bodyType: BodyType;
  safetyRating: number;
  colors: string;
  createdAt: string;
}

export interface CarModelInsert {
  brandId: number;
  name: string;
  bodyType: BodyType;
  safetyRating: number;
  colors?: string;
}

export type CarModelUpdate = Partial<CarModelInsert>;

/** car_variants */
export interface CarVariantRecord {
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
  createdAt: string;
  updatedAt: string;
}

export interface CarVariantInsert {
  modelId: number;
  trimName: string;
  priceLakh: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  engineCc?: number;
  powerBhp: number;
  mileageKmpl?: number;
}

export type CarVariantUpdate = Partial<CarVariantInsert>;

/** feature_groups */
export interface FeatureGroupRecord {
  id: number;
  label: string;
  sortOrder: number;
}

export interface FeatureGroupInsert {
  label: string;
  sortOrder?: number;
}

export type FeatureGroupUpdate = Partial<FeatureGroupInsert>;

/** features */
export interface FeatureRecord {
  id: number;
  groupId: number;
  label: string;
  sortOrder: number;
}

export interface FeatureInsert {
  groupId: number;
  label: string;
  sortOrder?: number;
}

export type FeatureUpdate = Partial<FeatureInsert>;

/** car_variant_features */
export interface CarVariantFeatureRecord {
  id: number;
  variantId: number;
  featureId: number;
  isStandard: boolean;
}

export interface CarVariantFeatureInsert {
  variantId: number;
  featureId: number;
  isStandard?: boolean;
}

export type CarVariantFeatureUpdate = Partial<CarVariantFeatureInsert>;

/** v_car_catalog (read-only view) */
export interface CarCatalogRecord {
  id: number;
  variant: string;
  priceLakh: number;
  fuelType: FuelType;
  transmission: Transmission;
  seats: number;
  engineCc: number;
  powerBhp: number;
  mileageKmpl: number;
  modelId: number;
  model: string;
  bodyType: BodyType;
  safetyRating: number;
  colors: string;
  brandId: number;
  brandName: string;
  origin: string;
  logoText: string;
}

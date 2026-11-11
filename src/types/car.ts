export type BodyType = 'Hatchback' | 'Sedan' | 'SUV' | 'MUV';
export type FuelType = 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid';
export type Transmission = 'Manual' | 'Automatic';

export interface Car {
  id: number;
  make: string;
  model: string;
  variant: string;
  priceLakh: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  seats: number;
  engineCC: number;
  powerBhp: number;
  mileageKmpl: number;
  safetyRating: number;
  features: string[];
  colors: string[];
}

export interface Brand {
  id: number;
  name: string;
  origin: string;
  logoText: string;
}

export interface FeatureGroup {
  id: number;
  label: string;
  features: FeatureNode[];
}

export interface FeatureNode {
  id: number;
  label: string;
  children?: FeatureNode[];
}

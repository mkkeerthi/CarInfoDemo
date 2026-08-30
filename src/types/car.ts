export interface Car {
  id: string;
  make: string;
  model: string;
  variant: string;
  priceLakh: number;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  bodyType: 'Hatchback' | 'Sedan' | 'SUV' | 'MUV';
  seats: number;
  engineCC: number;
  powerBhp: number;
  mileageKmpl: number;
  safetyRating: number;
  features: string[];
  colors: string[];
}

export interface Brand {
  id: string;
  name: string;
  origin: string;
  logoText: string;
}

export interface CarCategory {
  id: string;
  name: string;
  description: string;
  bodyTypes: string[];
}

export interface FeatureGroup {
  id: string;
  label: string;
  features: FeatureNode[];
}

export interface FeatureNode {
  id: string;
  label: string;
  children?: FeatureNode[];
}

import {
  countRows,
  getClient,
  runSelect,
  selectById,
  selectList,
  type Filters,
  type ListQuery,
  type TableSpec,
} from './core';
import type { BodyType, CarCatalogRecord, FuelType, Transmission } from './types';

export const carCatalogSpec: TableSpec = {
  table: 'v_car_catalog',
  select:
    'id, variant, priceLakh:price_lakh, fuelType:fuel_type, transmission, seats, engineCc:engine_cc, powerBhp:power_bhp, mileageKmpl:mileage_kmpl, modelId:model_id, model, bodyType:body_type, safetyRating:safety_rating, colors, brandId:brand_id, brandName:brand_name, origin, logoText:logo_text',
  // Read-only view: these entries exist so filters and ordering can resolve
  // camelCase field names. There is no write path for this spec.
  columns: {
    id: 'id',
    variant: 'variant',
    priceLakh: 'price_lakh',
    fuelType: 'fuel_type',
    transmission: 'transmission',
    seats: 'seats',
    engineCc: 'engine_cc',
    powerBhp: 'power_bhp',
    mileageKmpl: 'mileage_kmpl',
    modelId: 'model_id',
    model: 'model',
    bodyType: 'body_type',
    safetyRating: 'safety_rating',
    colors: 'colors',
    brandId: 'brand_id',
    brandName: 'brand_name',
    origin: 'origin',
    logoText: 'logo_text',
  },
  idColumn: 'id',
  defaultOrder: { column: 'id' },
};

function dedupe<T>(values: T[]): T[] {
  return [...new Set(values)];
}

/** Read-only access to the denormalized v_car_catalog view. */
export const carCatalogApi = {
  list(options?: ListQuery<CarCatalogRecord>): Promise<CarCatalogRecord[]> {
    return selectList<CarCatalogRecord>(carCatalogSpec, options);
  },

  getById(variantId: number): Promise<CarCatalogRecord | null> {
    return selectById<CarCatalogRecord>(carCatalogSpec, variantId);
  },

  listByBrand(brandId: number): Promise<CarCatalogRecord[]> {
    return selectList<CarCatalogRecord>(carCatalogSpec, { filters: { brandId } });
  },

  listByModel(modelId: number): Promise<CarCatalogRecord[]> {
    return selectList<CarCatalogRecord>(carCatalogSpec, { filters: { modelId } });
  },

  listByBodyType(bodyType: BodyType): Promise<CarCatalogRecord[]> {
    return selectList<CarCatalogRecord>(carCatalogSpec, { filters: { bodyType } });
  },

  listByFuelType(fuelType: FuelType): Promise<CarCatalogRecord[]> {
    return selectList<CarCatalogRecord>(carCatalogSpec, { filters: { fuelType } });
  },

  listByTransmission(transmission: Transmission): Promise<CarCatalogRecord[]> {
    return selectList<CarCatalogRecord>(carCatalogSpec, { filters: { transmission } });
  },

  async listByPriceRange(minLakh: number, maxLakh: number): Promise<CarCatalogRecord[]> {
    return runSelect<CarCatalogRecord>(
      getClient()
        .from(carCatalogSpec.table)
        .select(carCatalogSpec.select)
        .gte('price_lakh', minLakh)
        .lte('price_lakh', maxLakh)
        .order('price_lakh', { ascending: true }),
    );
  },

  async search(term: string): Promise<CarCatalogRecord[]> {
    const clean = term.trim().replace(/[,()%]/g, '');
    if (!clean) return [];
    return runSelect<CarCatalogRecord>(
      getClient()
        .from(carCatalogSpec.table)
        .select(carCatalogSpec.select)
        .or(`model.ilike.%${clean}%,brand_name.ilike.%${clean}%`)
        .order('id', { ascending: true }),
    );
  },

  async listDistinctBrands(): Promise<string[]> {
    const rows = await selectList<CarCatalogRecord>(carCatalogSpec, {
      orderBy: 'brandName',
    });
    return dedupe(rows.map((row) => row.brandName));
  },

  async listDistinctBodyTypes(): Promise<BodyType[]> {
    const rows = await selectList<CarCatalogRecord>(carCatalogSpec, {
      orderBy: 'bodyType',
    });
    return dedupe(rows.map((row) => row.bodyType));
  },

  count(filters?: Filters<CarCatalogRecord>): Promise<number> {
    return countRows<CarCatalogRecord>(carCatalogSpec, filters);
  },
};

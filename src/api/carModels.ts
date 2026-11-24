import {
  countRows,
  deleteById,
  deleteWhere,
  insertRow,
  insertRows,
  selectById,
  selectList,
  selectOne,
  updateById,
  updateWhere,
  upsertRows,
  type Filters,
  type ListQuery,
  type TableSpec,
} from './core';
import type { BodyType } from './types';
import type { CarModelInsert, CarModelRecord, CarModelUpdate } from './types';

export const carModelsSpec: TableSpec = {
  table: 'car_models',
  select:
    'id, brandId:brand_id, name, bodyType:body_type, safetyRating:safety_rating, colors, createdAt:created_at',
  columns: {
    brandId: 'brand_id',
    name: 'name',
    bodyType: 'body_type',
    safetyRating: 'safety_rating',
    colors: 'colors',
  },
  idColumn: 'id',
  defaultOrder: { column: 'id' },
};

export const carModelsApi = {
  list(options?: ListQuery<CarModelRecord>): Promise<CarModelRecord[]> {
    return selectList<CarModelRecord>(carModelsSpec, options);
  },

  getById(id: number): Promise<CarModelRecord | null> {
    return selectById<CarModelRecord>(carModelsSpec, id);
  },

  getByBrandAndName(brandId: number, name: string): Promise<CarModelRecord | null> {
    return selectOne<CarModelRecord>(carModelsSpec, { brandId, name });
  },

  listByBrand(brandId: number): Promise<CarModelRecord[]> {
    return selectList<CarModelRecord>(carModelsSpec, { filters: { brandId } });
  },

  listByBodyType(bodyType: BodyType): Promise<CarModelRecord[]> {
    return selectList<CarModelRecord>(carModelsSpec, { filters: { bodyType } });
  },

  create(input: CarModelInsert): Promise<CarModelRecord> {
    return insertRow<CarModelRecord>(carModelsSpec, input);
  },

  createMany(inputs: CarModelInsert[]): Promise<CarModelRecord[]> {
    return insertRows<CarModelRecord>(carModelsSpec, inputs);
  },

  update(id: number, patch: CarModelUpdate): Promise<CarModelRecord> {
    return updateById<CarModelRecord>(carModelsSpec, id, patch);
  },

  updateWhere(filters: Filters<CarModelRecord>, patch: CarModelUpdate): Promise<CarModelRecord[]> {
    return updateWhere<CarModelRecord>(carModelsSpec, filters, patch);
  },

  upsertMany(inputs: CarModelInsert[]): Promise<CarModelRecord[]> {
    return upsertRows<CarModelRecord>(carModelsSpec, inputs, 'brand_id,name');
  },

  remove(id: number): Promise<void> {
    return deleteById(carModelsSpec, id);
  },

  removeByBrand(brandId: number): Promise<number> {
    return deleteWhere<CarModelRecord>(carModelsSpec, { brandId });
  },

  removeWhere(filters: Filters<CarModelRecord>): Promise<number> {
    return deleteWhere<CarModelRecord>(carModelsSpec, filters);
  },

  count(filters?: Filters<CarModelRecord>): Promise<number> {
    return countRows<CarModelRecord>(carModelsSpec, filters);
  },
};

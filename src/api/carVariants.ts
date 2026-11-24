import {
  countRows,
  deleteById,
  deleteWhere,
  getClient,
  insertRow,
  insertRows,
  runSelect,
  selectById,
  selectList,
  selectOne,
  updateById,
  updateWhere,
  upsertRow,
  upsertRows,
  type Filters,
  type ListQuery,
  type TableSpec,
} from './core';
import type { CarVariantInsert, CarVariantRecord, CarVariantUpdate, FuelType, Transmission } from './types';

export const carVariantsSpec: TableSpec = {
  table: 'car_variants',
  select:
    'id, modelId:model_id, trimName:trim_name, priceLakh:price_lakh, fuelType:fuel_type, transmission, seats, engineCc:engine_cc, powerBhp:power_bhp, mileageKmpl:mileage_kmpl, createdAt:created_at, updatedAt:updated_at',
  columns: {
    modelId: 'model_id',
    trimName: 'trim_name',
    priceLakh: 'price_lakh',
    fuelType: 'fuel_type',
    transmission: 'transmission',
    seats: 'seats',
    engineCc: 'engine_cc',
    powerBhp: 'power_bhp',
    mileageKmpl: 'mileage_kmpl',
  },
  idColumn: 'id',
  defaultOrder: { column: 'id' },
};

export const carVariantsApi = {
  list(options?: ListQuery<CarVariantRecord>): Promise<CarVariantRecord[]> {
    return selectList<CarVariantRecord>(carVariantsSpec, options);
  },

  getById(id: number): Promise<CarVariantRecord | null> {
    return selectById<CarVariantRecord>(carVariantsSpec, id);
  },

  getByModelAndTrim(modelId: number, trimName: string): Promise<CarVariantRecord | null> {
    return selectOne<CarVariantRecord>(carVariantsSpec, { modelId, trimName });
  },

  listByModel(modelId: number): Promise<CarVariantRecord[]> {
    return selectList<CarVariantRecord>(carVariantsSpec, { filters: { modelId } });
  },

  listByFuelType(fuelType: FuelType): Promise<CarVariantRecord[]> {
    return selectList<CarVariantRecord>(carVariantsSpec, { filters: { fuelType } });
  },

  listByTransmission(transmission: Transmission): Promise<CarVariantRecord[]> {
    return selectList<CarVariantRecord>(carVariantsSpec, { filters: { transmission } });
  },

  async listByPriceRange(minLakh: number, maxLakh: number): Promise<CarVariantRecord[]> {
    return runSelect<CarVariantRecord>(
      getClient()
        .from(carVariantsSpec.table)
        .select(carVariantsSpec.select)
        .gte('price_lakh', minLakh)
        .lte('price_lakh', maxLakh)
        .order('price_lakh', { ascending: true }),
    );
  },

  listBySeats(seats: number): Promise<CarVariantRecord[]> {
    return selectList<CarVariantRecord>(carVariantsSpec, { filters: { seats } });
  },

  create(input: CarVariantInsert): Promise<CarVariantRecord> {
    return insertRow<CarVariantRecord>(carVariantsSpec, input);
  },

  createMany(inputs: CarVariantInsert[]): Promise<CarVariantRecord[]> {
    return insertRows<CarVariantRecord>(carVariantsSpec, inputs);
  },

  update(id: number, patch: CarVariantUpdate): Promise<CarVariantRecord> {
    return updateById<CarVariantRecord>(carVariantsSpec, id, patch);
  },

  updateWhere(filters: Filters<CarVariantRecord>, patch: CarVariantUpdate): Promise<CarVariantRecord[]> {
    return updateWhere<CarVariantRecord>(carVariantsSpec, filters, patch);
  },

  upsertByModelAndTrim(input: CarVariantInsert): Promise<CarVariantRecord> {
    return upsertRow<CarVariantRecord>(carVariantsSpec, input, 'model_id,trim_name');
  },

  upsertMany(inputs: CarVariantInsert[]): Promise<CarVariantRecord[]> {
    return upsertRows<CarVariantRecord>(carVariantsSpec, inputs, 'model_id,trim_name');
  },

  remove(id: number): Promise<void> {
    return deleteById(carVariantsSpec, id);
  },

  removeByModel(modelId: number): Promise<number> {
    return deleteWhere<CarVariantRecord>(carVariantsSpec, { modelId });
  },

  removeWhere(filters: Filters<CarVariantRecord>): Promise<number> {
    return deleteWhere<CarVariantRecord>(carVariantsSpec, filters);
  },

  count(filters?: Filters<CarVariantRecord>): Promise<number> {
    return countRows<CarVariantRecord>(carVariantsSpec, filters);
  },
};

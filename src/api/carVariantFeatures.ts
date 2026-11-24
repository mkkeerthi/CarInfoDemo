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
  upsertRow,
  upsertRows,
  type Filters,
  type ListQuery,
  type TableSpec,
} from './core';
import type {
  CarVariantFeatureInsert,
  CarVariantFeatureRecord,
  CarVariantFeatureUpdate,
} from './types';

export const carVariantFeaturesSpec: TableSpec = {
  table: 'car_variant_features',
  select: 'id, variantId:variant_id, featureId:feature_id, isStandard:is_standard',
  columns: {
    variantId: 'variant_id',
    featureId: 'feature_id',
    isStandard: 'is_standard',
  },
  idColumn: 'id',
  defaultOrder: { column: 'id' },
};

export const carVariantFeaturesApi = {
  list(options?: ListQuery<CarVariantFeatureRecord>): Promise<CarVariantFeatureRecord[]> {
    return selectList<CarVariantFeatureRecord>(carVariantFeaturesSpec, options);
  },

  getById(id: number): Promise<CarVariantFeatureRecord | null> {
    return selectById<CarVariantFeatureRecord>(carVariantFeaturesSpec, id);
  },

  getByPair(variantId: number, featureId: number): Promise<CarVariantFeatureRecord | null> {
    return selectOne<CarVariantFeatureRecord>(carVariantFeaturesSpec, { variantId, featureId });
  },

  listByVariant(variantId: number): Promise<CarVariantFeatureRecord[]> {
    return selectList<CarVariantFeatureRecord>(carVariantFeaturesSpec, {
      filters: { variantId },
    });
  },

  listByFeature(featureId: number): Promise<CarVariantFeatureRecord[]> {
    return selectList<CarVariantFeatureRecord>(carVariantFeaturesSpec, {
      filters: { featureId },
    });
  },

  create(input: CarVariantFeatureInsert): Promise<CarVariantFeatureRecord> {
    return insertRow<CarVariantFeatureRecord>(carVariantFeaturesSpec, input);
  },

  createMany(inputs: CarVariantFeatureInsert[]): Promise<CarVariantFeatureRecord[]> {
    return insertRows<CarVariantFeatureRecord>(carVariantFeaturesSpec, inputs);
  },

  update(id: number, patch: CarVariantFeatureUpdate): Promise<CarVariantFeatureRecord> {
    return updateById<CarVariantFeatureRecord>(carVariantFeaturesSpec, id, patch);
  },

  updateWhere(
    filters: Filters<CarVariantFeatureRecord>,
    patch: CarVariantFeatureUpdate,
  ): Promise<CarVariantFeatureRecord[]> {
    return updateWhere<CarVariantFeatureRecord>(carVariantFeaturesSpec, filters, patch);
  },

  setStandard(
    variantId: number,
    featureId: number,
    isStandard: boolean,
  ): Promise<CarVariantFeatureRecord> {
    return upsertRow<CarVariantFeatureRecord>(
      carVariantFeaturesSpec,
      { variantId, featureId, isStandard },
      'variant_id,feature_id',
    );
  },

  upsertMany(
    inputs: CarVariantFeatureInsert[],
  ): Promise<CarVariantFeatureRecord[]> {
    return upsertRows<CarVariantFeatureRecord>(
      carVariantFeaturesSpec,
      inputs,
      'variant_id,feature_id',
    );
  },

  /** Attaches an explicit feature list to a variant, replacing the previous set. */
  async assignFeatures(
    variantId: number,
    featureIds: number[],
  ): Promise<CarVariantFeatureRecord[]> {
    await deleteWhere<CarVariantFeatureRecord>(carVariantFeaturesSpec, { variantId });
    const unique = [...new Set(featureIds)];
    return insertRows<CarVariantFeatureRecord>(
      carVariantFeaturesSpec,
      unique.map((featureId) => ({ variantId, featureId })),
    );
  },

  remove(id: number): Promise<void> {
    return deleteById(carVariantFeaturesSpec, id);
  },

  removeByVariant(variantId: number): Promise<number> {
    return deleteWhere<CarVariantFeatureRecord>(carVariantFeaturesSpec, { variantId });
  },

  removeByFeature(featureId: number): Promise<number> {
    return deleteWhere<CarVariantFeatureRecord>(carVariantFeaturesSpec, { featureId });
  },

  removeWhere(filters: Filters<CarVariantFeatureRecord>): Promise<number> {
    return deleteWhere<CarVariantFeatureRecord>(carVariantFeaturesSpec, filters);
  },

  count(filters?: Filters<CarVariantFeatureRecord>): Promise<number> {
    return countRows<CarVariantFeatureRecord>(carVariantFeaturesSpec, filters);
  },
};

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
import type { FeatureGroupInsert, FeatureGroupRecord, FeatureGroupUpdate } from './types';

export const featureGroupsSpec: TableSpec = {
  table: 'feature_groups',
  select: 'id, label, sortOrder:sort_order',
  columns: {
    label: 'label',
    sortOrder: 'sort_order',
  },
  idColumn: 'id',
  defaultOrder: { column: 'sort_order' },
};

export const featureGroupsApi = {
  list(options?: ListQuery<FeatureGroupRecord>): Promise<FeatureGroupRecord[]> {
    return selectList<FeatureGroupRecord>(featureGroupsSpec, options);
  },

  getById(id: number): Promise<FeatureGroupRecord | null> {
    return selectById<FeatureGroupRecord>(featureGroupsSpec, id);
  },

  getByLabel(label: string): Promise<FeatureGroupRecord | null> {
    return selectOne<FeatureGroupRecord>(featureGroupsSpec, { label });
  },

  create(input: FeatureGroupInsert): Promise<FeatureGroupRecord> {
    return insertRow<FeatureGroupRecord>(featureGroupsSpec, input);
  },

  createMany(inputs: FeatureGroupInsert[]): Promise<FeatureGroupRecord[]> {
    return insertRows<FeatureGroupRecord>(featureGroupsSpec, inputs);
  },

  update(id: number, patch: FeatureGroupUpdate): Promise<FeatureGroupRecord> {
    return updateById<FeatureGroupRecord>(featureGroupsSpec, id, patch);
  },

  updateWhere(
    filters: Filters<FeatureGroupRecord>,
    patch: FeatureGroupUpdate,
  ): Promise<FeatureGroupRecord[]> {
    return updateWhere<FeatureGroupRecord>(featureGroupsSpec, filters, patch);
  },

  reorder(id: number, sortOrder: number): Promise<FeatureGroupRecord> {
    return updateById<FeatureGroupRecord>(featureGroupsSpec, id, { sortOrder });
  },

  upsertMany(inputs: FeatureGroupInsert[]): Promise<FeatureGroupRecord[]> {
    return upsertRows<FeatureGroupRecord>(featureGroupsSpec, inputs, 'label');
  },

  remove(id: number): Promise<void> {
    return deleteById(featureGroupsSpec, id);
  },

  removeByLabel(label: string): Promise<number> {
    return deleteWhere<FeatureGroupRecord>(featureGroupsSpec, { label });
  },

  removeWhere(filters: Filters<FeatureGroupRecord>): Promise<number> {
    return deleteWhere<FeatureGroupRecord>(featureGroupsSpec, filters);
  },

  count(filters?: Filters<FeatureGroupRecord>): Promise<number> {
    return countRows<FeatureGroupRecord>(featureGroupsSpec, filters);
  },
};

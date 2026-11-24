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
import type { FeatureInsert, FeatureRecord, FeatureUpdate } from './types';

export const featuresSpec: TableSpec = {
  table: 'features',
  select: 'id, groupId:group_id, label, sortOrder:sort_order',
  columns: {
    groupId: 'group_id',
    label: 'label',
    sortOrder: 'sort_order',
  },
  idColumn: 'id',
  defaultOrder: { column: 'sort_order' },
};

export const featuresApi = {
  list(options?: ListQuery<FeatureRecord>): Promise<FeatureRecord[]> {
    return selectList<FeatureRecord>(featuresSpec, options);
  },

  getById(id: number): Promise<FeatureRecord | null> {
    return selectById<FeatureRecord>(featuresSpec, id);
  },

  getByGroupAndLabel(groupId: number, label: string): Promise<FeatureRecord | null> {
    return selectOne<FeatureRecord>(featuresSpec, { groupId, label });
  },

  listByGroup(groupId: number): Promise<FeatureRecord[]> {
    return selectList<FeatureRecord>(featuresSpec, { filters: { groupId } });
  },

  create(input: FeatureInsert): Promise<FeatureRecord> {
    return insertRow<FeatureRecord>(featuresSpec, input);
  },

  createMany(inputs: FeatureInsert[]): Promise<FeatureRecord[]> {
    return insertRows<FeatureRecord>(featuresSpec, inputs);
  },

  update(id: number, patch: FeatureUpdate): Promise<FeatureRecord> {
    return updateById<FeatureRecord>(featuresSpec, id, patch);
  },

  updateWhere(filters: Filters<FeatureRecord>, patch: FeatureUpdate): Promise<FeatureRecord[]> {
    return updateWhere<FeatureRecord>(featuresSpec, filters, patch);
  },

  reorder(id: number, sortOrder: number): Promise<FeatureRecord> {
    return updateById<FeatureRecord>(featuresSpec, id, { sortOrder });
  },

  upsertMany(inputs: FeatureInsert[]): Promise<FeatureRecord[]> {
    return upsertRows<FeatureRecord>(featuresSpec, inputs, 'group_id,label');
  },

  remove(id: number): Promise<void> {
    return deleteById(featuresSpec, id);
  },

  removeByGroup(groupId: number): Promise<number> {
    return deleteWhere<FeatureRecord>(featuresSpec, { groupId });
  },

  removeWhere(filters: Filters<FeatureRecord>): Promise<number> {
    return deleteWhere<FeatureRecord>(featuresSpec, filters);
  },

  count(filters?: Filters<FeatureRecord>): Promise<number> {
    return countRows<FeatureRecord>(featuresSpec, filters);
  },
};

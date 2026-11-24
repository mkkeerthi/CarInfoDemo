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
import type { BrandInsert, BrandRecord, BrandUpdate } from './types';

export const brandsSpec: TableSpec = {
  table: 'brands',
  select: 'id, name, origin, logoText:logo_text, createdAt:created_at',
  columns: {
    name: 'name',
    origin: 'origin',
    logoText: 'logo_text',
  },
  idColumn: 'id',
  defaultOrder: { column: 'id' },
};

export const brandsApi = {
  list(options?: ListQuery<BrandRecord>): Promise<BrandRecord[]> {
    return selectList<BrandRecord>(brandsSpec, options);
  },

  getById(id: number): Promise<BrandRecord | null> {
    return selectById<BrandRecord>(brandsSpec, id);
  },

  getByName(name: string): Promise<BrandRecord | null> {
    return selectOne<BrandRecord>(brandsSpec, { name });
  },

  create(input: BrandInsert): Promise<BrandRecord> {
    return insertRow<BrandRecord>(brandsSpec, input);
  },

  createMany(inputs: BrandInsert[]): Promise<BrandRecord[]> {
    return insertRows<BrandRecord>(brandsSpec, inputs);
  },

  update(id: number, patch: BrandUpdate): Promise<BrandRecord> {
    return updateById<BrandRecord>(brandsSpec, id, patch);
  },

  updateByName(name: string, patch: BrandUpdate): Promise<BrandRecord[]> {
    return updateWhere<BrandRecord>(brandsSpec, { name }, patch);
  },

  upsertMany(inputs: BrandInsert[]): Promise<BrandRecord[]> {
    return upsertRows<BrandRecord>(brandsSpec, inputs, 'name');
  },

  remove(id: number): Promise<void> {
    return deleteById(brandsSpec, id);
  },

  removeByName(name: string): Promise<number> {
    return deleteWhere<BrandRecord>(brandsSpec, { name });
  },

  removeWhere(filters: Filters<BrandRecord>): Promise<number> {
    return deleteWhere<BrandRecord>(brandsSpec, filters);
  },

  count(filters?: Filters<BrandRecord>): Promise<number> {
    return countRows<BrandRecord>(brandsSpec, filters);
  },
};

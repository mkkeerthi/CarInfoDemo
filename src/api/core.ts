import { supabase } from '../lib/supabase';

export const NOT_CONFIGURED_MESSAGE = 'Supabase is not configured';

export interface TableSpec {
  /** PostgREST table or view name. */
  table: string;
  /** Aliased select list so rows come back in camelCase. */
  select: string;
  /** camelCase field -> snake_case column. Only writable columns belong here. */
  columns: Readonly<Record<string, string>>;
  /** Primary key column, used by the *ById helpers. */
  idColumn: string;
  /** Ordering applied to list() when the caller does not pass orderBy. */
  defaultOrder?: { column: string; ascending?: boolean };
}

export type FilterValue = string | number | boolean | null;

export type Filters<TRecord> = Partial<Record<keyof TRecord & string, FilterValue>>;

export interface ListQuery<TRecord> {
  filters?: Filters<TRecord>;
  orderBy?: keyof TRecord & string;
  ascending?: boolean;
  limit?: number;
  offset?: number;
}

export type Row = Record<string, unknown>;

export function getClient() {
  if (!supabase) {
    throw new Error(NOT_CONFIGURED_MESSAGE);
  }
  return supabase;
}

export function assertNoError(result: { error: { message: string } | null }) {
  if (result.error) {
    throw new Error(result.error.message);
  }
}

function columnFor(spec: TableSpec, field: string): string {
  const column = spec.columns[field];
  if (!column) {
    throw new Error(`Unknown column "${field}" on table "${spec.table}"`);
  }
  return column;
}

/** Translates a camelCase payload into snake_case columns, dropping undefined values. */
export function mapValues(spec: TableSpec, payload: object): Row {
  const row: Row = {};
  for (const [field, value] of Object.entries(payload)) {
    if (value === undefined) continue;
    row[columnFor(spec, field)] = value;
  }
  return row;
}

function mapFilters(spec: TableSpec, filters: Partial<Record<string, FilterValue>> | undefined): Row {
  const mapped: Row = {};
  if (!filters) return mapped;
  for (const [field, value] of Object.entries(filters)) {
    if (value === undefined) continue;
    mapped[columnFor(spec, field)] = value;
  }
  return mapped;
}

function requireFilters(spec: TableSpec, filters: Row, operation: string): void {
  if (Object.keys(filters).length === 0) {
    throw new Error(`${operation} on "${spec.table}" requires at least one filter`);
  }
}

function requirePayload(spec: TableSpec, payload: Row, operation: string): void {
  if (Object.keys(payload).length === 0) {
    throw new Error(`${operation} on "${spec.table}" requires at least one column`);
  }
}

// The client in src/lib/supabase.ts is created without a generated Database
// generic, so query results are untyped. These helpers centralise the cast.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyQuery = any;

/** PostgREST has no "unbounded" range, so an offset-only query is capped here. */
const MAX_UNBOUNDED_ROWS = 10_000;

function applyListOptions(
  query: AnyQuery,
  spec: TableSpec,
  options: ListQuery<never> | undefined,
): AnyQuery {
  let next = query;
  const filters = mapFilters(spec, options?.filters as Partial<Record<string, FilterValue>> | undefined);
  if (Object.keys(filters).length > 0) {
    next = next.match(filters);
  }

  const orderBy = options?.orderBy as string | undefined;
  if (orderBy) {
    next = next.order(columnFor(spec, orderBy), {
      ascending: options?.ascending ?? true,
    });
  } else if (spec.defaultOrder) {
    next = next.order(spec.defaultOrder.column, {
      ascending: spec.defaultOrder.ascending ?? true,
    });
  }

  const from = options?.offset ?? 0;
  if (options?.limit !== undefined) {
    next = next.range(from, from + options.limit - 1);
  } else if (from > 0) {
    next = next.range(from, from + MAX_UNBOUNDED_ROWS - 1);
  }

  return next;
}

/**
 * Awaits a select built by a caller (for queries the generic engine cannot
 * express, e.g. range or OR filters) and returns typed rows.
 */
export async function runSelect<TRecord>(
  query: PromiseLike<{ data: unknown; error: { message: string } | null }>,
): Promise<TRecord[]> {
  const result = await query;
  assertNoError(result);
  return (result.data ?? []) as TRecord[];
}

export async function selectList<TRecord>(
  spec: TableSpec,
  options?: ListQuery<TRecord>,
): Promise<TRecord[]> {
  const query = applyListOptions(
    getClient().from(spec.table).select(spec.select),
    spec,
    options as ListQuery<never> | undefined,
  );
  const result = await query;
  assertNoError(result);
  return (result.data ?? []) as TRecord[];
}

export async function selectById<TRecord>(
  spec: TableSpec,
  id: number | string,
): Promise<TRecord | null> {
  const result = await getClient()
    .from(spec.table)
    .select(spec.select)
    .eq(spec.idColumn, id)
    .maybeSingle();
  assertNoError(result);
  return (result.data ?? null) as TRecord | null;
}

export async function selectOne<TRecord>(
  spec: TableSpec,
  filters: Filters<TRecord>,
): Promise<TRecord | null> {
  const mapped = mapFilters(spec, filters as Partial<Record<string, FilterValue>>);
  requireFilters(spec, mapped, 'selectOne');
  const result = await getClient()
    .from(spec.table)
    .select(spec.select)
    .match(mapped)
    .maybeSingle();
  assertNoError(result);
  return (result.data ?? null) as TRecord | null;
}

export async function insertRow<TRecord>(spec: TableSpec, input: object): Promise<TRecord> {
  const result = await getClient()
    .from(spec.table)
    .insert(mapValues(spec, input))
    .select(spec.select)
    .maybeSingle();
  assertNoError(result);
  if (!result.data) {
    throw new Error(`Insert into "${spec.table}" returned no row`);
  }
  return result.data as TRecord;
}

export async function insertRows<TRecord>(spec: TableSpec, inputs: object[]): Promise<TRecord[]> {
  if (inputs.length === 0) return [];
  const result = await getClient()
    .from(spec.table)
    .insert(inputs.map((input) => mapValues(spec, input)))
    .select(spec.select);
  assertNoError(result);
  return (result.data ?? []) as TRecord[];
}

export async function updateById<TRecord>(
  spec: TableSpec,
  id: number | string,
  patch: object,
): Promise<TRecord> {
  const mapped = mapValues(spec, patch);
  requirePayload(spec, mapped, 'update');
  const result = await getClient()
    .from(spec.table)
    .update(mapped)
    .eq(spec.idColumn, id)
    .select(spec.select)
    .maybeSingle();
  assertNoError(result);
  if (!result.data) {
    throw new Error(
      `No row in "${spec.table}" with ${spec.idColumn}=${String(id)} was updated`,
    );
  }
  return result.data as TRecord;
}

export async function updateWhere<TRecord>(
  spec: TableSpec,
  filters: Filters<TRecord>,
  patch: object,
): Promise<TRecord[]> {
  const mappedFilters = mapFilters(spec, filters as Partial<Record<string, FilterValue>>);
  requireFilters(spec, mappedFilters, 'updateWhere');
  const mapped = mapValues(spec, patch);
  requirePayload(spec, mapped, 'updateWhere');
  const result = await getClient()
    .from(spec.table)
    .update(mapped)
    .match(mappedFilters)
    .select(spec.select);
  assertNoError(result);
  return (result.data ?? []) as TRecord[];
}

export async function upsertRow<TRecord>(
  spec: TableSpec,
  input: object,
  onConflict?: string,
): Promise<TRecord> {
  const result = await getClient()
    .from(spec.table)
    .upsert(mapValues(spec, input), onConflict ? { onConflict } : undefined)
    .select(spec.select)
    .maybeSingle();
  assertNoError(result);
  if (!result.data) {
    throw new Error(`Upsert into "${spec.table}" returned no row`);
  }
  return result.data as TRecord;
}

export async function upsertRows<TRecord>(
  spec: TableSpec,
  inputs: object[],
  onConflict?: string,
): Promise<TRecord[]> {
  if (inputs.length === 0) return [];
  const result = await getClient()
    .from(spec.table)
    .upsert(
      inputs.map((input) => mapValues(spec, input)),
      onConflict ? { onConflict } : undefined,
    )
    .select(spec.select);
  assertNoError(result);
  return (result.data ?? []) as TRecord[];
}

export async function deleteById(spec: TableSpec, id: number | string): Promise<void> {
  const result = await getClient().from(spec.table).delete().eq(spec.idColumn, id);
  assertNoError(result);
}

export async function deleteWhere<TRecord>(
  spec: TableSpec,
  filters: Filters<TRecord>,
): Promise<number> {
  const mapped = mapFilters(spec, filters as Partial<Record<string, FilterValue>>);
  requireFilters(spec, mapped, 'deleteWhere');
  const result = await getClient()
    .from(spec.table)
    .delete({ count: 'exact' })
    .match(mapped);
  assertNoError(result);
  return result.count ?? 0;
}

export async function countRows<TRecord>(
  spec: TableSpec,
  filters?: Filters<TRecord>,
): Promise<number> {
  const mapped = mapFilters(spec, filters as Partial<Record<string, FilterValue>>);
  let query = getClient()
    .from(spec.table)
    .select(spec.idColumn, { count: 'exact', head: true });
  if (Object.keys(mapped).length > 0) {
    query = query.match(mapped);
  }
  const result = await query;
  assertNoError(result);
  return result.count ?? 0;
}

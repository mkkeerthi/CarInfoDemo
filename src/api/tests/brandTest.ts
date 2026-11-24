import { brandsApi } from '../brands';
import type { Filters } from '../core';
import type { BrandInsert, BrandRecord, BrandUpdate } from '../types';

/**
 * End-to-end checks for every method on `brandsApi`.
 *
 * With no flags a test provisions its own uniquely-named rows and removes them
 * again, so the suite never depends on the current contents of the `brands`
 * table. Passing values switches that test to operating on the row you name.
 *
 * Run every test:
 *   node scripts/run-brand-tests.mjs
 * Run a single test:
 *   node scripts/run-brand-tests.mjs create
 *
 * Supply values (one example per method):
 *   node scripts/run-brand-tests.mjs list         --origin "India" --limit 5
 *   node scripts/run-brand-tests.mjs getById      --id 12
 *   node scripts/run-brand-tests.mjs getByName    --name "Maruti Suzuki"
 *   node scripts/run-brand-tests.mjs create       --name "Tesla" --origin "USA" --logo-text "T" --keep
 *   node scripts/run-brand-tests.mjs createMany   --names "Tesla,Lucid" --origin "USA" --keep
 *   node scripts/run-brand-tests.mjs update       --id 12 --new-origin "United States"
 *   node scripts/run-brand-tests.mjs updateByName --name "Tesla" --new-origin "USA"
 *   node scripts/run-brand-tests.mjs upsertMany   --names "Tesla,Lucid" --origin "USA"
 *   node scripts/run-brand-tests.mjs remove       --id 12
 *   node scripts/run-brand-tests.mjs removeByName --name "Tesla"
 *   node scripts/run-brand-tests.mjs removeWhere  --origin "USA"
 *   node scripts/run-brand-tests.mjs count        --origin "India"
 * 
 * Flags: --name, --names (comma separated), --origin, --new-origin, --logo-text, --id, --limit, --offset, --keep.

Verified output (seeded two rows, then exercised each)

update --id 75 --new-origin "United States"
  before: {"id":75,...,"origin":"USA-Demo","logoText":"DM"}
  after:  {"id":75,...,"origin":"United States","logoText":"UP"}

upsertMany --names "ZZ Demo Tesla,ZZ Demo Rivian" --origin "USA-Demo"
  upserted 2 row(s) on conflict "name" (upsert always persists)
  {"id":75,"name":"ZZ Demo Tesla",...}      <- updated in place, same id
  {"id":78,"name":"ZZ Demo Rivian",...}     <- inserted

  Behaviour worth knowing:

--keep only applies to create / createMany, since those are the only ones that add new rows. Without it they print the row and delete it.
update / updateByName require --new-origin or --logo-text; with neither they fail with a clear message rather than doing nothing.
getById / update / remove accept --name too — they resolve the name to its id first and log resolved "X" to id=N.
removeWhere and count fall back to --origin if --name is absent; removeWhere prints the match count before deleting.
Bad input fails loudly: unknown flags, non-numeric --id, and missing values are all rejected before touching the database.
 */

const TEST_PREFIX = 'ZZ API Test';

let nameCounter = 0;

/** Unique brand name so repeated runs never collide with existing rows. */
function uniqueName(label: string): string {
  nameCounter += 1;
  return `${TEST_PREFIX} ${label} ${Date.now()}-${nameCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Fresh origin marker used to find exactly the rows a test created. */
function uniqueOrigin(label: string): string {
  nameCounter += 1;
  return `${TEST_PREFIX} Origin ${label} ${Date.now()}-${nameCounter}`;
}

function sample(name: string, origin: string): BrandInsert {
  return { name, origin, logoText: name.slice(0, 2).toUpperCase() };
}

/** Payload built from supplied values; logoText falls back to the name prefix. */
function inputFrom(options: RunOptions, name: string, origin: string): BrandInsert {
  const input = sample(name, origin);
  if (options.logoText !== undefined) {
    input.logoText = options.logoText;
  }
  return input;
}

/** Filters built from whichever of --name / --origin was supplied. */
function filtersFrom(options: RunOptions): Filters<BrandRecord> {
  const filters: Filters<BrandRecord> = {};
  if (options.name !== undefined) filters.name = options.name;
  if (options.origin !== undefined) filters.origin = options.origin;
  return filters;
}

/** Patch built from whichever of --new-origin / --logo-text was supplied. */
function patchFrom(options: RunOptions): BrandUpdate {
  const patch: BrandUpdate = {};
  if (options.newOrigin !== undefined) patch.origin = options.newOrigin;
  if (options.logoText !== undefined) patch.logoText = options.logoText;
  return patch;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${String(expected)}, got ${String(actual)}`);
  }
}

function log(message: string): void {
  console.log(`      ${message}`);
}

function logRow(row: BrandRecord): void {
  log(JSON.stringify(row));
}

/** Best-effort cleanup so a failed assertion does not leave rows behind. */
async function cleanup(names: string[]): Promise<void> {
  for (const name of names) {
    try {
      await brandsApi.removeByName(name);
    } catch {
      // The test may have already deleted the row; cleanup is not the assertion.
    }
  }
}

/** Resolves a real row by id, failing with a readable message when it is absent. */
async function requireById(id: number): Promise<BrandRecord> {
  const row = await brandsApi.getById(id);
  assert(row !== null, `No brand with id=${id} exists in the table`);
  return row;
}

/** Resolves a real row by name, failing with a readable message when it is absent. */
async function requireByName(name: string): Promise<BrandRecord> {
  const row = await brandsApi.getByName(name);
  assert(row !== null, `No brand named "${name}" exists in the table`);
  return row;
}

/** Names supplied via --names (comma separated) or --name. */
function namesFrom(options: RunOptions): string[] {
  if (options.names !== undefined) return options.names;
  return options.name !== undefined ? [options.name] : [];
}

/** Values supplied on the command line, e.g. `create --name Tesla --origin USA`. */
export interface RunOptions {
  /** Brand name (create/getByName/update/removeByName, or one entry of a batch). */
  name?: string;
  /** Comma separated brand names for createMany/upsertMany. */
  names?: string[];
  /** Brand origin (also used as the filter for list/removeWhere/count). */
  origin?: string;
  /** Replacement origin applied by update/updateByName. */
  newOrigin?: string;
  logoText?: string;
  /** Row id for getById/update/remove. */
  id?: number;
  /** list() paging. */
  limit?: number;
  offset?: number;
  /** Leave created rows in the database instead of deleting them. */
  keep?: boolean;
}

export async function testList(options: RunOptions = {}): Promise<void> {
  const hasSelection =
    options.name !== undefined ||
    options.origin !== undefined ||
    options.limit !== undefined ||
    options.offset !== undefined;

  if (hasSelection) {
    const filters = filtersFrom(options);
    const rows = await brandsApi.list({
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      limit: options.limit,
      offset: options.offset,
    });
    assert(Array.isArray(rows), 'list() must resolve to an array');
    log(`list() returned ${rows.length} row(s)`);
    for (const row of rows) logRow(row);
    return;
  }

  const all = await brandsApi.list();
  assert(Array.isArray(all), 'list() must resolve to an array');

  const origin = uniqueOrigin('list');
  const names = [uniqueName('list-a'), uniqueName('list-b'), uniqueName('list-c')];
  try {
    await brandsApi.createMany(names.map((name) => sample(name, origin)));

    const filtered = await brandsApi.list({ filters: { origin } });
    assertEqual(filtered.length, 3, 'list({ filters }) did not return all matching rows');
    for (const row of filtered) {
      assert(typeof row.id === 'number', 'list() rows must carry a numeric id');
      assert(typeof row.name === 'string' && row.name.length > 0, 'list() rows must carry a name');
      assert(typeof row.logoText === 'string', 'list() rows must carry logoText');
      assert(typeof row.createdAt === 'string', 'list() rows must carry createdAt');
      assertEqual(row.origin, origin, 'list({ filters }) returned a row with a different origin');
    }

    const ascending = await brandsApi.list({ filters: { origin }, orderBy: 'name' });
    assertEqual(ascending.length, 3, 'list({ orderBy: "name" }) dropped a matching row');
    assert(
      ascending[0].name <= ascending[1].name && ascending[1].name <= ascending[2].name,
      'list({ orderBy: "name" }) is not sorted ascending',
    );

    const descending = await brandsApi.list({
      filters: { origin },
      orderBy: 'name',
      ascending: false,
    });
    assert(
      descending[0].name >= descending[1].name,
      'list({ ascending: false }) is not sorted descending',
    );

    const limited = await brandsApi.list({ filters: { origin }, orderBy: 'name', limit: 2 });
    assertEqual(limited.length, 2, 'list({ limit: 2 }) did not return exactly two rows');

    const paged = await brandsApi.list({ filters: { origin }, orderBy: 'name', limit: 1, offset: 2 });
    assertEqual(paged.length, 1, 'list({ limit: 1, offset: 2 }) did not return one row');
    assertEqual(
      paged[0].name,
      ascending[2].name,
      'list({ offset: 2 }) did not return the third row in order',
    );
  } finally {
    await cleanup(names);
  }
}

export async function testGetById(options: RunOptions = {}): Promise<void> {
  if (options.id !== undefined || options.name !== undefined) {
    const id = options.id ?? (await requireByName(options.name as string)).id;
    if (options.id === undefined) {
      log(`resolved "${options.name}" to id=${id}`);
    }
    const found = await brandsApi.getById(id);
    log(found === null ? `getById(${id}) -> null` : `getById(${id}) -> ${JSON.stringify(found)}`);
    assert(found !== null, `getById(${id}) returned null for an existing row`);
    return;
  }

  const name = uniqueName('getById');
  try {
    const created = await brandsApi.create(sample(name, uniqueOrigin('getById')));
    const found = await brandsApi.getById(created.id);
    assert(found !== null, `getById(${created.id}) returned null for an existing row`);
    assertEqual(found.id, created.id, 'getById() returned a different id');
    assertEqual(found.name, name, 'getById() returned a different name');

    const missing = await brandsApi.getById(9_000_000_000);
    assert(missing === null, 'getById() must return null for an id that does not exist');
  } finally {
    await cleanup([name]);
  }
}

export async function testGetByName(options: RunOptions = {}): Promise<void> {
  if (options.name !== undefined) {
    const found = await brandsApi.getByName(options.name);
    log(
      found === null
        ? `getByName("${options.name}") -> null`
        : `getByName("${options.name}") -> ${JSON.stringify(found)}`,
    );
    assert(found !== null, `getByName("${options.name}") returned null for an existing name`);
    return;
  }

  const name = uniqueName('getByName');
  try {
    await brandsApi.create(sample(name, uniqueOrigin('getByName')));
    const found = await brandsApi.getByName(name);
    assert(found !== null, 'getByName() returned null for an existing name');
    assertEqual(found.name, name, 'getByName() returned a different name');

    const missing = await brandsApi.getByName(`${name} missing`);
    assert(missing === null, 'getByName() must return null for a name that does not exist');
  } finally {
    await cleanup([name]);
  }
}

export async function testCreate(options: RunOptions = {}): Promise<void> {
  const name = options.name ?? uniqueName('create');
  const origin = options.origin ?? uniqueOrigin('create');
  const input = inputFrom(options, name, origin);

  // Supplying your own name means a real insert; --keep leaves it behind.
  if (options.name !== undefined) {
    const created = await brandsApi.create(input);
    assert(created.id > 0, 'create() must return the generated id');
    log(`inserted: ${JSON.stringify(created)}`);
    if (options.keep) {
      log(`kept row id=${created.id} (name="${created.name}")`);
    } else {
      await cleanup([created.name]);
      log('deleted again (pass --keep to leave the row in the table)');
    }
    return;
  }

  try {
    const created = await brandsApi.create(input);
    assert(created.id > 0, 'create() must return the generated id');
    assertEqual(created.name, name, 'create() did not persist the name');
    assertEqual(created.origin, origin, 'create() did not persist the origin');
    assert(created.createdAt.length > 0, 'create() did not return createdAt');

    let duplicateRejected = false;
    try {
      await brandsApi.create(input);
    } catch (error) {
      duplicateRejected = /duplicate|unique/i.test((error as Error).message);
    }
    assert(duplicateRejected, 'create() must reject a duplicate brand name');
  } finally {
    await cleanup([name]);
  }
}

export async function testCreateMany(options: RunOptions = {}): Promise<void> {
  const names = namesFrom(options);

  if (names.length > 0) {
    const origin = options.origin ?? uniqueOrigin('createMany');
    const created = await brandsApi.createMany(
      names.map((name) => inputFrom(options, name, origin)),
    );
    assertEqual(created.length, names.length, 'createMany() did not insert every supplied name');
    log(`inserted ${created.length} row(s)`);
    for (const row of created) logRow(row);

    if (options.keep) {
      log('kept the inserted rows');
    } else {
      await cleanup(created.map((row) => row.name));
      log('deleted them again (pass --keep to leave them in the table)');
    }
    return;
  }

  const fixtureNames = [uniqueName('createMany'), uniqueName('createMany')];
  const fixtureOrigin = uniqueOrigin('createMany');
  try {
    const empty = await brandsApi.createMany([]);
    assertEqual(empty.length, 0, 'createMany([]) must resolve to an empty array');

    const created = await brandsApi.createMany(
      fixtureNames.map((name) => sample(name, fixtureOrigin)),
    );
    assertEqual(created.length, 2, 'createMany() did not insert two rows');
    assertEqual(
      created.map((row) => row.name).sort().join('|'),
      [...fixtureNames].sort().join('|'),
      'createMany() returned different names than the input',
    );
  } finally {
    await cleanup(fixtureNames);
  }
}

export async function testUpdate(options: RunOptions = {}): Promise<void> {
  if (options.id !== undefined || options.name !== undefined) {
    const patch = patchFrom(options);
    assert(
      Object.keys(patch).length > 0,
      'update needs --new-origin and/or --logo-text to know what to change',
    );

    const target =
      options.id !== undefined
        ? await requireById(options.id)
        : await requireByName(options.name as string);

    log(`before: ${JSON.stringify(target)}`);
    const updated = await brandsApi.update(target.id, patch);
    log(`after:  ${JSON.stringify(updated)}`);
    return;
  }

  const name = uniqueName('update');
  const newOrigin = uniqueOrigin('update-new');
  try {
    const created = await brandsApi.create(sample(name, uniqueOrigin('update-old')));
    const updated = await brandsApi.update(created.id, {
      origin: newOrigin,
      logoText: 'UP',
    });
    assertEqual(updated.id, created.id, 'update() returned a different id');
    assertEqual(updated.origin, newOrigin, 'update() did not persist the origin');
    assertEqual(updated.logoText, 'UP', 'update() did not persist logoText');
    assertEqual(updated.name, name, 'update() changed the name unexpectedly');

    const stored = await brandsApi.getById(created.id);
    assert(stored !== null, 'updated row could not be read back');
    assertEqual(stored.origin, newOrigin, 'update() was not persisted to the database');

    let missingRejected = false;
    try {
      await brandsApi.update(9_000_000_000, { origin: 'nowhere' });
    } catch {
      missingRejected = true;
    }
    assert(missingRejected, 'update() must throw when the id does not exist');
  } finally {
    await cleanup([name]);
  }
}

export async function testUpdateByName(options: RunOptions = {}): Promise<void> {
  if (options.name !== undefined) {
    const patch = patchFrom(options);
    assert(
      Object.keys(patch).length > 0,
      'updateByName needs --new-origin and/or --logo-text to know what to change',
    );

    const updated = await brandsApi.updateByName(options.name, patch);
    log(`updateByName("${options.name}") updated ${updated.length} row(s)`);
    for (const row of updated) logRow(row);
    assert(updated.length > 0, `updateByName("${options.name}") matched no rows`);
    return;
  }

  const name = uniqueName('updateByName');
  const newOrigin = uniqueOrigin('updateByName-new');
  try {
    await brandsApi.create(sample(name, uniqueOrigin('updateByName-old')));
    const updated = await brandsApi.updateByName(name, { origin: newOrigin });
    assertEqual(updated.length, 1, 'updateByName() should update exactly one row');
    assertEqual(updated[0].origin, newOrigin, 'updateByName() did not persist the origin');

    const missing = await brandsApi.updateByName(`${name} missing`, { origin: newOrigin });
    assertEqual(missing.length, 0, 'updateByName() must resolve to [] when nothing matches');
  } finally {
    await cleanup([name]);
  }
}

export async function testUpsertMany(options: RunOptions = {}): Promise<void> {
  const names = namesFrom(options);

  if (names.length > 0) {
    const origin = options.origin ?? uniqueOrigin('upsertMany');
    const rows = await brandsApi.upsertMany(
      names.map((name) => inputFrom(options, name, origin)),
    );
    assertEqual(rows.length, names.length, 'upsertMany() did not write every supplied name');
    log(`upserted ${rows.length} row(s) on conflict "name" (upsert always persists)`);
    for (const row of rows) logRow(row);
    return;
  }

  const name = uniqueName('upsertMany');
  const firstOrigin = uniqueOrigin('upsertMany-first');
  const secondOrigin = uniqueOrigin('upsertMany-second');
  try {
    const inserted = await brandsApi.upsertMany([sample(name, firstOrigin)]);
    assertEqual(inserted.length, 1, 'upsertMany() did not insert a new brand');
    assertEqual(inserted[0].origin, firstOrigin, 'upsertMany() inserted a different origin');

    const updated = await brandsApi.upsertMany([sample(name, secondOrigin)]);
    assertEqual(updated.length, 1, 'upsertMany() did not resolve to one row');
    assertEqual(updated[0].id, inserted[0].id, 'upsertMany() created a new row instead of updating');
    assertEqual(updated[0].origin, secondOrigin, 'upsertMany() did not update the origin');

    const matching = await brandsApi.count({ name });
    assertEqual(matching, 1, 'upsertMany() left more than one row for the same name');
  } finally {
    await cleanup([name]);
  }
}

export async function testRemove(options: RunOptions = {}): Promise<void> {
  if (options.id !== undefined || options.name !== undefined) {
    const target =
      options.id !== undefined
        ? await requireById(options.id)
        : await requireByName(options.name as string);

    log(`deleting: ${JSON.stringify(target)}`);
    await brandsApi.remove(target.id);

    const found = await brandsApi.getById(target.id);
    assert(found === null, `remove(${target.id}) did not delete the row`);
    log(`remove(${target.id}) deleted it`);
    return;
  }

  const name = uniqueName('remove');
  try {
    const created = await brandsApi.create(sample(name, uniqueOrigin('remove')));
    await brandsApi.remove(created.id);

    const found = await brandsApi.getById(created.id);
    assert(found === null, 'remove(id) did not delete the row');

    await brandsApi.remove(created.id);
  } finally {
    await cleanup([name]);
  }
}

export async function testRemoveByName(options: RunOptions = {}): Promise<void> {
  if (options.name !== undefined) {
    const target = await requireByName(options.name);
    log(`deleting: ${JSON.stringify(target)}`);
    const removed = await brandsApi.removeByName(options.name);
    assertEqual(removed, 1, `removeByName("${options.name}") did not delete exactly one row`);
    log(`removeByName("${options.name}") deleted it`);
    return;
  }

  const name = uniqueName('removeByName');
  try {
    await brandsApi.create(sample(name, uniqueOrigin('removeByName')));
    const removed = await brandsApi.removeByName(name);
    assertEqual(removed, 1, 'removeByName() did not report the deleted row');

    const found = await brandsApi.getByName(name);
    assert(found === null, 'removeByName() left the row behind');

    const removedAgain = await brandsApi.removeByName(`${name} missing`);
    assertEqual(removedAgain, 0, 'removeByName() must report 0 when nothing matches');
  } finally {
    await cleanup([name]);
  }
}

export async function testRemoveWhere(options: RunOptions = {}): Promise<void> {
  const filters = filtersFrom(options);

  if (Object.keys(filters).length > 0) {
    const matched = await brandsApi.count(filters);
    log(`removeWhere(${JSON.stringify(filters)}) matched ${matched} row(s)`);
    const removed = await brandsApi.removeWhere(filters);
    assertEqual(removed, matched, 'removeWhere() did not delete every matching row');
    log(`deleted ${removed} row(s)`);
    return;
  }

  const origin = uniqueOrigin('removeWhere');
  const names = [uniqueName('removeWhere'), uniqueName('removeWhere')];
  try {
    await brandsApi.createMany(names.map((name) => sample(name, origin)));
    assertEqual(await brandsApi.count({ origin }), 2, 'removeWhere() fixture was not inserted');

    const removed = await brandsApi.removeWhere({ origin });
    assertEqual(removed, 2, 'removeWhere() did not report both deleted rows');
    assertEqual(await brandsApi.count({ origin }), 0, 'removeWhere() left rows behind');
  } finally {
    await cleanup(names);
  }
}

export async function testCount(options: RunOptions = {}): Promise<void> {
  const filters = filtersFrom(options);

  if (Object.keys(filters).length > 0) {
    const total = await brandsApi.count(filters);
    log(`count(${JSON.stringify(filters)}) -> ${total}`);
    return;
  }

  const origin = uniqueOrigin('count');
  const firstName = uniqueName('count');
  const secondName = uniqueName('count');
  try {
    // Scoped to a unique marker so other rows (and concurrent runs) cannot skew it.
    const baseline = await brandsApi.count({ origin });
    assertEqual(baseline, 0, 'count() found rows for a brand-new origin marker');

    const totalBefore = await brandsApi.count();
    await brandsApi.create(sample(firstName, origin));
    assertEqual(await brandsApi.count({ origin }), 1, 'count({ origin }) did not find the new row');

    await brandsApi.create(sample(secondName, origin));
    assertEqual(await brandsApi.count({ origin }), 2, 'count({ origin }) did not find both rows');

    const totalAfter = await brandsApi.count();
    assert(
      totalAfter >= totalBefore + 2,
      `count() without filters did not grow: before ${totalBefore}, after ${totalAfter}`,
    );
    assert(
      totalAfter >= (await brandsApi.count({ origin })),
      'count() without filters is smaller than a filtered count',
    );
  } finally {
    await cleanup([firstName, secondName]);
  }
}

interface BrandTestCase {
  name: string;
  description: string;
  run: (options: RunOptions) => Promise<void>;
}

export const brandTestCases: readonly BrandTestCase[] = [
  { name: 'list', description: 'brandsApi.list()', run: testList },
  { name: 'getById', description: 'brandsApi.getById()', run: testGetById },
  { name: 'getByName', description: 'brandsApi.getByName()', run: testGetByName },
  { name: 'create', description: 'brandsApi.create()', run: testCreate },
  { name: 'createMany', description: 'brandsApi.createMany()', run: testCreateMany },
  { name: 'update', description: 'brandsApi.update()', run: testUpdate },
  { name: 'updateByName', description: 'brandsApi.updateByName()', run: testUpdateByName },
  { name: 'upsertMany', description: 'brandsApi.upsertMany()', run: testUpsertMany },
  { name: 'remove', description: 'brandsApi.remove()', run: testRemove },
  { name: 'removeByName', description: 'brandsApi.removeByName()', run: testRemoveByName },
  { name: 'removeWhere', description: 'brandsApi.removeWhere()', run: testRemoveWhere },
  { name: 'count', description: 'brandsApi.count()', run: testCount },
];

export function listTestNames(): string[] {
  return brandTestCases.map((testCase) => testCase.name);
}

/**
 * Runs one named test, or every test when no name is given.
 * Resolves to true when all selected tests passed.
 */
export async function run(only?: string, options: RunOptions = {}): Promise<boolean> {
  const selected = only
    ? brandTestCases.filter((testCase) => testCase.name === only)
    : brandTestCases;

  if (selected.length === 0) {
    console.error(`Unknown test "${only}". Available: ${listTestNames().join(', ')}`);
    return false;
  }

  let failures = 0;
  for (const testCase of selected) {
    const startedAt = Date.now();
    try {
      await testCase.run(options);
      console.log(`PASS  ${testCase.name}  (${Date.now() - startedAt}ms)  ${testCase.description}`);
    } catch (error) {
      failures += 1;
      console.error(`FAIL  ${testCase.name}  ${testCase.description}`);
      console.error(`      ${(error as Error).message}`);
    }
  }

  console.log(
    `\n${selected.length - failures}/${selected.length} passed` +
      (failures > 0 ? ` — ${failures} failed` : ''),
  );
  return failures === 0;
}

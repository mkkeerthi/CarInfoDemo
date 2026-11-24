import { createServer } from 'vite';

/**
 * Runs src/api/tests/brandTest.ts against the configured Supabase project.
 *
 * The API modules read `import.meta.env.VITE_*` (see src/lib/supabase.ts), so
 * they are loaded through Vite's SSR module loader instead of plain Node.
 *
 *   node scripts/run-brand-tests.mjs                    # every test, sequentially
 *   node scripts/run-brand-tests.mjs create             # just one test, by name
 *   node scripts/run-brand-tests.mjs --list             # list available test names
 *
 * One example per method:
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
 * Flags:
 *   --name <value>        brand name (getByName/update/removeByName, or one entry of a batch)
 *   --names <a,b,c>       comma separated names for createMany/upsertMany
 *   --origin <value>      origin; also the filter for list/removeWhere/count
 *   --new-origin <value>  replacement origin for update/updateByName
 *   --logo-text <value>   logo text (defaults to the first 2 letters of the name)
 *   --id <number>         row id for getById/update/remove
 *   --limit <number>      list() row cap
 *   --offset <number>     list() row offset
 *   --keep                leave created rows in the table (default: delete them after)
 */

const STRING_FLAGS = {
  '--name': 'name',
  '--origin': 'origin',
  '--new-origin': 'newOrigin',
  '--logo-text': 'logoText',
};

const NUMBER_FLAGS = {
  '--id': 'id',
  '--limit': 'limit',
  '--offset': 'offset',
};

const LIST_FLAGS = {
  '--names': 'names',
  '--name': 'name',
};

function parseNumber(flag, raw) {
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`${flag} needs a number, got "${raw}"`);
  }
  return value;
}

function parseArgs(argv) {
  const options = {};
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--keep') {
      options.keep = true;
      continue;
    }

    if (arg === '--list') {
      positional.push(arg);
      continue;
    }

    if (arg in STRING_FLAGS || arg in NUMBER_FLAGS || arg in LIST_FLAGS) {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new Error(`${arg} needs a value, e.g. ${arg} "Toyota"`);
      }
      index += 1;

      if (arg in NUMBER_FLAGS) {
        options[NUMBER_FLAGS[arg]] = parseNumber(arg, value);
      } else if (arg in LIST_FLAGS) {
        const names = value
          .split(',')
          .map((entry) => entry.trim())
          .filter((entry) => entry.length > 0);
        options[LIST_FLAGS[arg]] = arg === '--names' ? names : names[0];
      } else {
        options[STRING_FLAGS[arg]] = value;
      }
      continue;
    }

    if (arg.startsWith('--')) {
      const supported = [...Object.keys(STRING_FLAGS), ...Object.keys(NUMBER_FLAGS), '--names', '--keep'];
      throw new Error(`Unknown flag "${arg}". Supported: ${supported.join(', ')}`);
    }

    positional.push(arg);
  }

  return { only: positional[0], options };
}

const server = await createServer({
  configFile: false,
  root: process.cwd(),
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: 'custom',
  logLevel: 'error',
});

let passed = false;

try {
  const mod = await server.ssrLoadModule('/src/api/tests/brandTest.ts');
  const { only, options } = parseArgs(process.argv.slice(2));

  if (only === '--list') {
    console.log(mod.listTestNames().join('\n'));
    passed = true;
  } else {
    passed = await mod.run(only, options);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
} finally {
  await server.close();
}

process.exit(passed ? 0 : 1);

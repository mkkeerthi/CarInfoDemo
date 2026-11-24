import { fetchCatalogRows } from '../api/catalog';
import { buildCatalog } from './catalog';
import type { Catalog } from './catalog';

export async function loadCatalogFromSupabase(): Promise<Catalog> {
  return buildCatalog(await fetchCatalogRows());
}

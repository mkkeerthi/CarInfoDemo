import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { isSupabaseConfigured } from '../lib/supabase';
import type { Brand, Car, FeatureGroup } from '../types/car';
import { localCatalog } from './jsonSource';
import type { Catalog } from './catalog';
import { loadCatalogFromSupabase } from './supabaseRepository';

interface CatalogContextValue {
  brands: Brand[];
  cars: Car[];
  featureGroups: FeatureGroup[];
  getCarById: (id: string) => Car | undefined;
  getTopCars: (count?: number) => Car[];
  loading: boolean;
  error: string | null;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

const useSupabaseSource =
  import.meta.env.VITE_DATA_SOURCE !== 'json' && isSupabaseConfigured;

const emptyCatalog: Catalog = { brands: [], cars: [], featureGroups: [] };

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog>(() =>
    useSupabaseSource ? emptyCatalog : localCatalog,
  );
  const [loading, setLoading] = useState(useSupabaseSource);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!useSupabaseSource) {
      return;
    }

    let cancelled = false;

    loadCatalogFromSupabase()
      .then((next) => {
        if (!cancelled) {
          setCatalog(next);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<CatalogContextValue>(
    () => ({
      ...catalog,
      getCarById: (id) => catalog.cars.find((car) => String(car.id) === id),
      getTopCars: (count = 4) => catalog.cars.slice(0, count),
      loading,
      error,
    }),
    [catalog, loading, error],
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogContextValue {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}

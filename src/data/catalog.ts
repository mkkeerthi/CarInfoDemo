import type { Brand, Car, FeatureGroup } from '../types/car';
import type { CatalogRows } from '../types/database';

export interface Catalog {
  brands: Brand[];
  cars: Car[];
  featureGroups: FeatureGroup[];
}

export function buildCatalog(rows: CatalogRows): Catalog {
  const brandById = new Map(rows.brands.map((brand) => [brand.id, brand]));
  const modelById = new Map(rows.models.map((model) => [model.id, model]));
  const featureById = new Map(rows.features.map((feature) => [feature.id, feature]));

  const linksByVariant = new Map<number, CatalogRows['carVariantFeatures']>();
  for (const link of rows.carVariantFeatures) {
    const links = linksByVariant.get(link.variantId) ?? [];
    links.push(link);
    linksByVariant.set(link.variantId, links);
  }

  const brands: Brand[] = rows.brands.map(({ id, name, origin, logoText }) => ({
    id,
    name,
    origin,
    logoText,
  }));

  const cars: Car[] = rows.variants.map((variant) => {
    const model = modelById.get(variant.modelId);
    if (!model) {
      throw new Error(`Missing car model ${variant.modelId}`);
    }
    const brand = brandById.get(model.brandId);
    if (!brand) {
      throw new Error(`Missing brand ${model.brandId}`);
    }
    const features = (linksByVariant.get(variant.id) ?? [])
      .map((link) => featureById.get(link.featureId)?.label)
      .filter((label): label is string => Boolean(label));

    return {
      id: variant.id,
      make: brand.name,
      model: model.name,
      variant: variant.trimName,
      priceLakh: variant.priceLakh,
      fuelType: variant.fuelType,
      transmission: variant.transmission,
      bodyType: model.bodyType,
      seats: variant.seats,
      engineCC: variant.engineCc,
      powerBhp: variant.powerBhp,
      mileageKmpl: variant.mileageKmpl,
      safetyRating: model.safetyRating,
      features,
      colors: model.colors
        .split(',')
        .map((color) => color.trim())
        .filter(Boolean),
    };
  });

  const featureGroups: FeatureGroup[] = rows.featureGroups
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((group) => ({
      id: group.id,
      label: group.label,
      features: rows.features
        .filter((feature) => feature.groupId === group.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((feature) => ({ id: feature.id, label: feature.label })),
    }));

  return { brands, cars, featureGroups };
}

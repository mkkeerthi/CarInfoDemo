import { Link } from 'react-router-dom';
import Banner from '../components/layout/Banner';
import CarListView from '../components/ui/CarListView';
import Tooltip from '../components/ui/Tooltip';
import { useCatalog } from '../data';

export default function HomePage() {
  const { brands, getTopCars, loading, error } = useCatalog();
  const topCars = getTopCars(4);

  if (loading) {
    return <p id="catalog-loading" className="text-sm text-neutral-400">Loading cars…</p>;
  }
  if (error) {
    return <p id="catalog-error" className="text-sm text-red-400">Failed to load cars: {error}</p>;
  }

  return (
    <div className="space-y-10">
      <Banner
        title="Explore Cars Sold in India"
        subtitle="Makes, models, specifications and dummy pricing — loaded from the car catalog."
      />

      <section id="home-image-section" aria-label="Sample image">
        <h2 className="mb-4 text-xl font-semibold">Sample Image</h2>
        <img
          id="sample-image"
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80"
          alt="Sample sports car"
          className="h-64 w-full rounded-2xl border border-neutral-800 object-cover"
        />
      </section>

      <section id="home-brands" aria-label="Brands">
        <h2 className="mb-4 text-xl font-semibold">Popular Brands</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <Tooltip key={brand.id} id={`brand-tooltip-${brand.id}`} text={`${brand.name} — Origin: ${brand.origin}`}>
              <div
                id={`brand-card-${brand.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-6 transition-colors duration-200 ease-in-out hover:border-emerald-500/50"
              >
                <span className="text-lg font-bold text-emerald-400">{brand.logoText}</span>
                <span className="text-sm">{brand.name}</span>
              </div>
            </Tooltip>
          ))}
        </div>
      </section>

      <section id="home-top-cars" aria-label="Top cars list">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Top Cars</h2>
          <Link id="view-all-link" to="/cars" className="text-sm text-emerald-400 hover:text-emerald-300">
            View all &rarr;
          </Link>
        </div>
        <CarListView id="home-car-list" cars={topCars} />
      </section>
    </div>
  );
}

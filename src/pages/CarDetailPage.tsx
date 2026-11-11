import { useParams, Link } from 'react-router-dom';
import Collapser from '../components/ui/Collapser';
import Expander from '../components/ui/Expander';
import Tooltip from '../components/ui/Tooltip';
import TreeView from '../components/ui/TreeView';
import { useCatalog } from '../data';

export default function CarDetailPage() {
  const { getCarById, featureGroups, loading, error } = useCatalog();
  const { id } = useParams<{ id: string }>();
  const car = getCarById(id ?? '');

  if (loading) {
    return <p id="catalog-loading" className="text-sm text-neutral-400">Loading cars…</p>;
  }
  if (error) {
    return <p id="catalog-error" className="text-sm text-red-400">Failed to load cars: {error}</p>;
  }

  if (!car) {
    return (
      <div id="car-not-found" className="space-y-4">
        <h1 className="text-2xl font-bold">Car not found</h1>
        <Link id="back-to-list" to="/cars" className="text-emerald-400 hover:text-emerald-300">
          &larr; Back to cars list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <nav id="breadcrumb" aria-label="Breadcrumb" className="text-sm text-neutral-400">
        <Link to="/" className="hover:text-emerald-400">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/cars" className="hover:text-emerald-400">Cars</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-200">{car.make} {car.model}</span>
      </nav>

      <header id="car-detail-header">
        <h1 id="car-detail-title" className="text-3xl font-bold">
          {car.make} {car.model}
        </h1>
        <p id="car-detail-variant" className="text-neutral-400">{car.variant}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <section id="car-specs" aria-label="Specifications">
          <h2 className="mb-3 text-xl font-semibold">Specifications</h2>
          <dl id="spec-list" className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Price', `₹${car.priceLakh.toFixed(1)} Lakh`],
              ['Fuel Type', car.fuelType],
              ['Transmission', car.transmission],
              ['Body Type', car.bodyType],
              ['Seats', String(car.seats)],
              ['Engine', car.engineCC ? `${car.engineCC} cc` : 'Electric motor'],
              ['Power', `${car.powerBhp} bhp`],
              ['Mileage', car.fuelType === 'Electric' ? 'N/A' : `${car.mileageKmpl.toFixed(1)} kmpl`],
              ['Safety Rating', `${car.safetyRating} stars`],
            ].map(([label, value]) => (
              <div key={label} id={`spec-${label.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2">
                <dt className="text-xs text-neutral-400">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="car-features-tree" aria-label="Feature tree">
          <h2 className="mb-3 text-xl font-semibold">Feature Tree</h2>
          <TreeView id="feature-tree" groups={featureGroups} />
        </section>
      </div>

      <section id="car-expander-section" aria-label="Expandable details" className="space-y-4">
        <h2 className="text-xl font-semibold">More Details</h2>
        <Expander id="features-expander" title="Standard Features">
          <ul id="standard-features-list" className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {car.features.map((f) => (
              <li key={f} id={`feature-${f.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-400" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </Expander>
        <Expander id="colors-expander" title="Available Colors">
          <ul id="color-list" className="flex flex-wrap gap-3">
            {car.colors.map((c) => (
              <li key={c} id={`color-${c.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-full border border-neutral-700 px-3 py-1 text-sm">
                {c}
              </li>
            ))}
          </ul>
        </Expander>
        <Collapser id="note-collapser" title="Booking Note (collapsible)">
          <p id="booking-note" className="text-sm text-neutral-300">
            This is a dummy demo car entry. Prices and specifications are illustrative and loaded from the car catalog.
          </p>
        </Collapser>
      </section>

      <section id="car-tooltip-section">
        <Tooltip id="price-tooltip" text="On-road price may vary by city and dealer.">
          <span className="cursor-help text-emerald-400 underline decoration-dotted underline-offset-4">
            Hover to see price note
          </span>
        </Tooltip>
      </section>
    </div>
  );
}

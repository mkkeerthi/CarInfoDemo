import { useState } from 'react';
import CarTable from '../components/ui/CarTable';
import cars from '../data/cars.json';
import type { Car } from '../types/car';

const carData = cars as Car[];

const fuelTypes = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'] as const;
const bodyTypes = ['Hatchback', 'Sedan', 'SUV', 'MUV'] as const;

export default function CarsListPage() {
  const [search, setSearch] = useState('');
  const [fuel, setFuel] = useState('All');
  const [selectedBodies, setSelectedBodies] = useState<string[]>([]);

  const filtered = carData.filter((car) => {
    const matchesSearch =
      `${car.make} ${car.model} ${car.variant}`.toLowerCase().includes(search.toLowerCase());
    const matchesFuel = fuel === 'All' || car.fuelType === fuel;
    const matchesBody = selectedBodies.length === 0 || selectedBodies.includes(car.bodyType);
    return matchesSearch && matchesFuel && matchesBody;
  });

  const toggleBody = (body: string) =>
    setSelectedBodies((prev) =>
      prev.includes(body) ? prev.filter((b) => b !== body) : [...prev, body]
    );

  return (
    <div className="space-y-6">
      <h1 id="cars-page-title" className="text-2xl font-bold">Cars List</h1>

      <section id="cars-filters" aria-label="Car filters" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <div className="mb-4">
          <label htmlFor="car-search" className="mb-1 block text-sm font-medium">
            Search cars
          </label>
          <input
            id="car-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by make, model or variant..."
            className="w-full max-w-md rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm outline-none transition-colors duration-200 ease-in-out focus:border-emerald-500"
          />
        </div>

        <fieldset id="fuel-radio-group" className="mb-4">
          <legend className="mb-2 text-sm font-medium">Fuel type</legend>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                id="fuel-all"
                type="radio"
                name="fuel"
                value="All"
                checked={fuel === 'All'}
                onChange={() => setFuel('All')}
                className="accent-emerald-500"
              />
              All
            </label>
            {fuelTypes.map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm">
                <input
                  id={`fuel-${f.toLowerCase()}`}
                  type="radio"
                  name="fuel"
                  value={f}
                  checked={fuel === f}
                  onChange={() => setFuel(f)}
                  className="accent-emerald-500"
                />
                {f}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset id="body-checkbox-group">
          <legend className="mb-2 text-sm font-medium">Body type</legend>
          <div className="flex flex-wrap gap-4">
            {bodyTypes.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm">
                <input
                  id={`body-${b.toLowerCase()}`}
                  type="checkbox"
                  checked={selectedBodies.includes(b)}
                  onChange={() => toggleBody(b)}
                  className="accent-emerald-500"
                />
                {b}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section id="cars-table-section" aria-label="Car table">
        <p id="result-count" className="mb-2 text-sm text-neutral-400">
          {filtered.length} car(s) found
        </p>
        <CarTable id="cars-table" cars={filtered} />
      </section>
    </div>
  );
}

import { useState } from 'react';
import cars from '../data/cars.json';

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([cars[0].id, cars[1].id]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );

  const selectedCars = cars.filter((c) => selected.includes(c.id));

  return (
    <div className="space-y-6">
      <h1 id="compare-page-title" className="text-2xl font-bold">Compare Cars</h1>

      <section id="compare-picker" aria-label="Pick cars to compare" className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <h2 className="mb-3 text-lg font-semibold">Choose up to 3 cars</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cars.map((car) => (
            <label key={car.id} className="flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-2 text-sm">
              <input
                id={`compare-check-${car.id}`}
                type="checkbox"
                checked={selected.includes(car.id)}
                onChange={() => toggle(car.id)}
                className="accent-emerald-500"
              />
              {car.make} {car.model}
            </label>
          ))}
        </div>
      </section>

      <section id="compare-table-section" aria-label="Comparison table">
        <div className="overflow-auto rounded-lg border border-neutral-800">
          <table id="compare-table" className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-neutral-900 text-neutral-300">
              <tr>
                <th scope="col" className="px-4 py-3">Attribute</th>
                {selectedCars.map((car) => (
                  <th key={car.id} scope="col" className="px-4 py-3">
                    {car.make} {car.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Variant', (c: typeof cars[number]) => c.variant],
                ['Price (Lakh)', (c: typeof cars[number]) => c.priceLakh.toFixed(1)],
                ['Fuel', (c: typeof cars[number]) => c.fuelType],
                ['Transmission', (c: typeof cars[number]) => c.transmission],
                ['Body', (c: typeof cars[number]) => c.bodyType],
                ['Seats', (c: typeof cars[number]) => String(c.seats)],
                ['Power (bhp)', (c: typeof cars[number]) => String(c.powerBhp)],
                ['Mileage', (c: typeof cars[number]) => (c.fuelType === 'Electric' ? 'N/A' : `${c.mileageKmpl.toFixed(1)} kmpl`)],
                ['Safety', (c: typeof cars[number]) => `${c.safetyRating} stars`],
              ].map(([label, fn]) => (
                <tr key={label as string} className="border-t border-neutral-800">
                  <th scope="row" className="px-4 py-3 font-medium text-neutral-300">{label as string}</th>
                  {selectedCars.map((car) => (
                    <td key={car.id} className="px-4 py-3">{(fn as (c: typeof cars[number]) => string)(car)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

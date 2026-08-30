import { Link } from 'react-router-dom';
import type { Car } from '../../types/car';

interface CarListViewProps {
  id: string;
  cars: Car[];
}

export default function CarListView({ id, cars }: CarListViewProps) {
  return (
    <ul id={id} className="space-y-3">
      {cars.map((car) => (
        <li
          key={car.id}
          id={`list-item-${car.id}`}
          className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 transition-colors duration-200 ease-in-out hover:border-neutral-700"
        >
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-car-side text-emerald-400" aria-hidden="true" />
            <div>
              <p className="font-medium">
                {car.make} {car.model} <span className="text-neutral-400">({car.variant})</span>
              </p>
              <p className="text-xs text-neutral-400">
                {car.fuelType} &middot; {car.transmission} &middot; &#8377;{car.priceLakh.toFixed(1)} Lakh
              </p>
            </div>
          </div>
          <Link
            id={`list-detail-link-${car.id}`}
            to={`/cars/${car.id}`}
            className="text-sm text-emerald-400 transition-colors duration-200 ease-in-out hover:text-emerald-300"
          >
            View
          </Link>
        </li>
      ))}
    </ul>
  );
}

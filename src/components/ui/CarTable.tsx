import { Link } from 'react-router-dom';
import type { Car } from '../../types/car';

interface CarTableProps {
  id: string;
  cars: Car[];
}

export default function CarTable({ id, cars }: CarTableProps) {
  return (
    <div id={`${id}-scroll`} className="overflow-auto rounded-lg border border-neutral-800">
      <table id={id} className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-neutral-900 text-neutral-300">
          <tr>
            <th scope="col" className="px-4 py-3">Make</th>
            <th scope="col" className="px-4 py-3">Model</th>
            <th scope="col" className="px-4 py-3">Variant</th>
            <th scope="col" className="px-4 py-3">Price (Lakh)</th>
            <th scope="col" className="px-4 py-3">Fuel</th>
            <th scope="col" className="px-4 py-3">Transmission</th>
            <th scope="col" className="px-4 py-3">Body</th>
            <th scope="col" className="px-4 py-3">Mileage</th>
            <th scope="col" className="px-4 py-3">Safety</th>
            <th scope="col" className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} id={`car-row-${car.id}`} className="border-t border-neutral-800 transition-colors duration-200 ease-in-out hover:bg-neutral-900">
              <td className="px-4 py-3">{car.make}</td>
              <td className="px-4 py-3 font-medium">{car.model}</td>
              <td className="px-4 py-3">{car.variant}</td>
              <td className="px-4 py-3">{car.priceLakh.toFixed(1)}</td>
              <td className="px-4 py-3">{car.fuelType}</td>
              <td className="px-4 py-3">{car.transmission}</td>
              <td className="px-4 py-3">{car.bodyType}</td>
              <td className="px-4 py-3">{car.fuelType === 'Electric' ? 'N/A' : `${car.mileageKmpl.toFixed(1)} kmpl`}</td>
              <td className="px-4 py-3">
                <i className="fa-solid fa-star text-amber-400" aria-hidden="true" /> {car.safetyRating}
              </td>
              <td className="px-4 py-3">
                <Link
                  id={`car-detail-link-${car.id}`}
                  to={`/cars/${car.id}`}
                  className="text-emerald-400 transition-colors duration-200 ease-in-out hover:text-emerald-300"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

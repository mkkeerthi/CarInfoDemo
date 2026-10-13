import { useState } from 'react';
import ExamplePage from './kit/ExamplePage';

export default function HorizontalSliderPage() {
  const [value, setValue] = useState(0);

  return (
    <ExamplePage id="horizontal-slider" title="Horizontal Slider">
      <input
        id="horizontal-slider-range"
        type="range"
        min={0}
        max={10}
        step={0.5}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label="Horizontal slider"
        className="w-full max-w-md accent-emerald-500"
      />
      <p id="slider-value" className="text-sm text-neutral-300">
        Current value: <span className="font-semibold text-emerald-400">{value}</span>
      </p>
    </ExamplePage>
  );
}

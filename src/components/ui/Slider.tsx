import { useCallback, useRef } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  labels: [string, string];
}

export function Slider({ value, onChange, min, max, step, unit, labels }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const ratio = x / rect.width;
      const rawValue = min + ratio * (max - min);
      const stepped = Math.round(rawValue / step) * step;
      onChange(Math.min(max, Math.max(min, stepped)));
    },
    [min, max, step, onChange]
  );

  const displayValue = unit === 'h'
    ? `${Math.floor(value)}h${value % 1 === 0.5 ? '30' : '00'}`
    : `${value} ${unit}`;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-light text-white tabular-nums tracking-tight">
          {displayValue}
        </span>
        <span className="text-xs text-slate-500 font-medium">{labels[1]}</span>
      </div>

      <div
        ref={trackRef}
        className="relative h-12 flex items-center cursor-pointer group"
        onPointerDown={handlePointerDown}
      >
        <div className="absolute inset-x-0 h-2 bg-slate-800/60 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-amber-500/60 to-celadon-400/60 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div
          className="absolute w-6 h-6 bg-white rounded-full shadow-lg shadow-amber-500/20 border-2 border-amber-400/50 transition-transform duration-150 hover:scale-110 cursor-grab active:cursor-grabbing"
          style={{
            left: `calc(${percentage}% - 12px)`,
          }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-slate-500 font-medium">{labels[0]}</span>
      </div>
    </div>
  );
}

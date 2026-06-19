import { Slider } from '../ui/Slider';

interface SliderQuestionProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  labels: [string, string];
  narrative: string;
}

export function SliderQuestion({ value, onChange, min, max, step, unit, labels, narrative }: SliderQuestionProps) {
  return (
    <div className="flex flex-col min-h-[300px]">
      <div className="mb-10">
        <p className="text-white/50 text-sm leading-relaxed">
          {narrative}
        </p>
      </div>

      <div className="flex-1 flex items-center">
        <Slider
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          unit={unit}
          labels={labels}
        />
      </div>
    </div>
  );
}

import { useMemo } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = useMemo(() => {
    if (total === 0) return 0;
    return Math.round((current / total) * 100);
  }, [current, total]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">
          Étape {current}/{total}
        </span>
        <span className="text-xs font-medium text-slate-500">
          {percentage}%
        </span>
      </div>
      <div className="h-1.5 bg-slate-800/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500/70 to-celadon-400/70 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

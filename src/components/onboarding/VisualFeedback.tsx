import { useMemo } from 'react';
import { OnboardingQuestion } from '../../types';

interface VisualFeedbackProps {
  question: OnboardingQuestion;
  currentIndex: number;
}

const gardenElements = [
  { seeds: 1, flowers: 0, trees: 0 },
  { seeds: 2, flowers: 0, trees: 0 },
  { seeds: 3, flowers: 0, trees: 0 },
  { seeds: 3, flowers: 2, trees: 0 },
  { seeds: 4, flowers: 3, trees: 0 },
  { seeds: 4, flowers: 4, trees: 0 },
  { seeds: 5, flowers: 4, trees: 1 },
  { seeds: 5, flowers: 5, trees: 1 },
  { seeds: 6, flowers: 5, trees: 2 },
  { seeds: 6, flowers: 6, trees: 2 },
];

export function VisualFeedback({ currentIndex }: VisualFeedbackProps) {
  const elements = useMemo(
    () => gardenElements[Math.min(currentIndex, gardenElements.length - 1)],
    [currentIndex]
  );

  return (
    <div className="flex items-center justify-center gap-2 my-4 min-h-[40px]">
      {Array.from({ length: elements.seeds }).map((_, i) => (
        <span
          key={`seed-${i}`}
          className="text-lg animate-fade-in transition-all duration-500"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          🌱
        </span>
      ))}
      {Array.from({ length: elements.flowers }).map((_, i) => (
        <span
          key={`flower-${i}`}
          className="text-lg animate-fade-in transition-all duration-500"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          🌼
        </span>
      ))}
      {Array.from({ length: elements.trees }).map((_, i) => (
        <span
          key={`tree-${i}`}
          className="text-lg animate-fade-in transition-all duration-500"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          🌳
        </span>
      ))}
    </div>
  );
}

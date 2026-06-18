import { useState } from 'react';
import { OnboardingQuestion, ChoiceOption } from '../../types';

interface ChoiceQuestionProps {
  question: OnboardingQuestion;
  onSelect: (value: string) => void;
  currentValue?: string;
}

export function ChoiceQuestion({ question, onSelect, currentValue }: ChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(currentValue ?? null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setTimeout(() => onSelect(value), 300);
  };

  return (
    <div className="flex flex-col min-h-[300px]">
      <div className="mb-8">
        <p className="text-slate-400 text-sm leading-relaxed">
          {question.narrative}
        </p>
      </div>

      <div className="flex-1 grid gap-3">
        {(question.choices ?? []).map((choice: ChoiceOption) => {
          const isSelected = selected === choice.value;
          return (
            <button
              key={choice.value}
              onClick={() => handleSelect(choice.value)}
              className={`
                group flex items-center gap-4 p-4 rounded-xl border text-left
                transition-all duration-300
                ${isSelected
                  ? 'border-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                  : 'border-slate-700/30 bg-slate-850/40 hover:border-slate-600/40 hover:bg-slate-850/60'
                }
              `}
            >
              <span className="text-2xl flex-shrink-0">{choice.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isSelected ? 'text-amber-300' : 'text-slate-200 group-hover:text-white'}`}>
                  {choice.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {choice.description}
                </div>
              </div>
              {isSelected && (
                <span className="text-amber-400 text-lg flex-shrink-0">✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

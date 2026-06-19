import { useState } from 'react';
import { OnboardingQuestion, ChoiceOption } from '../../types';

interface ChoiceQuestionProps {
  question: OnboardingQuestion;
  onSelect: (value: string) => void;
  onMultiDone?: (values: string[]) => void;
  currentValue?: string;
}

export function ChoiceQuestion({ question, onSelect, onMultiDone, currentValue }: ChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(currentValue ?? null);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  const isMulti = question.id === 6;

  const handleSelect = (value: string) => {
    if (isMulti) {
      setMultiSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelected(value);
      setTimeout(() => onSelect(value), 300);
    }
  };

  const handleMultiDone = () => {
    if (multiSelected.length > 0 && onMultiDone) {
      onMultiDone(multiSelected);
    }
  };

  return (
    <div className="flex flex-col min-h-[300px]">
      <div className="mb-8">
        <p className="text-white/50 text-sm leading-relaxed">
          {question.narrative}
        </p>
      </div>

      <div className="flex-1 grid gap-3">
        {(question.choices ?? []).map((choice: ChoiceOption) => {
          const isSelected = isMulti
            ? multiSelected.includes(choice.value)
            : selected === choice.value;
          return (
            <button
              key={choice.value}
              onClick={() => handleSelect(choice.value)}
              className={`
                group flex items-center gap-4 p-4 rounded-xl border text-left
                transition-all duration-300
                ${isSelected
                  ? 'border-[#6247AA]/40 bg-[#6247AA]/10 shadow-lg shadow-[#6247AA]/5'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                }
              `}
            >
              <span className="text-2xl flex-shrink-0">{choice.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${isSelected ? 'text-[#e2cfea]' : 'text-white/70 group-hover:text-white'}`}>
                  {choice.label}
                </div>
                <div className="text-xs text-white/35 mt-0.5 line-clamp-1">
                  {choice.description}
                </div>
              </div>
              {isSelected && (
                <span className="text-[#a06cd5] text-lg flex-shrink-0">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {isMulti && (
        <button
          onClick={handleMultiDone}
          disabled={multiSelected.length === 0}
          className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            multiSelected.length > 0
              ? 'bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white shadow-lg shadow-[#6247AA]/20 hover:from-[#a06cd5] hover:to-[#e2cfea]'
              : 'bg-white/[0.04] text-white/20 cursor-not-allowed'
          }`}
        >
          Continuer ({multiSelected.length} sélectionné{multiSelected.length > 1 ? 's' : ''})
        </button>
      )}
    </div>
  );
}

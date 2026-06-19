import { useMemo, useState, useEffect } from 'react';
import { OnboardingQuestion } from '../../types';

interface NarrativeStepProps {
  question: OnboardingQuestion;
  onContinue?: () => void;
}

export function NarrativeStep({ question, onContinue }: NarrativeStepProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 400);
    return () => clearTimeout(timer);
  }, [question.id]);

  const lines = useMemo(
    () => (question.narrative ?? '').split('\n').filter(Boolean),
    [question.narrative]
  );

  return (
    <div className="flex flex-col items-center text-center min-h-[300px] justify-between">
      <div className="flex-1 flex flex-col justify-center">
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {question.id === 1 && (
            <div className="mb-8">
              <div className="text-6xl mb-6 animate-pulse-soft">🌙</div>
            </div>
          )}

          <h2 className="text-2xl font-semibold text-white mb-6 leading-snug">
            {question.title}
          </h2>

          <div className="space-y-4 max-w-md mx-auto">
            {lines.map((line, i) => (
              <p
                key={i}
                className="text-white/50 leading-relaxed text-sm"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {onContinue && (
        <button
          onClick={onContinue}
          className={`mt-8 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6247AA] to-[#8063d2] text-white font-semibold text-sm
            shadow-lg shadow-[#6247AA]/20 hover:from-[#7C5CBF] hover:to-[#9c86dc] transition-all duration-300
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
          {question.id === 10 ? 'Signer la charte' : 'Continuer'}
        </button>
      )}
    </div>
  );
}

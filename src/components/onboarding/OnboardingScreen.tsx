import { useCallback, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { onboardingQuestions, totalQuestions } from '../../data/onboarding';

import { VisualFeedback } from './VisualFeedback';
import { NarrativeStep } from './NarrativeStep';
import { ChoiceQuestion } from './ChoiceQuestion';
import { SliderQuestion } from './SliderQuestion';
import { ConfirmStep } from './ConfirmStep';
import { Starfield } from '../ui/Starfield';

export function OnboardingScreen() {
  const currentIndex = useGameStore((s) => s.currentQuestionIndex);
  const setAnswer = useGameStore((s) => s.setAnswer);
  const nextQuestion = useGameStore((s) => s.nextQuestion);
  const prevQuestion = useGameStore((s) => s.prevQuestion);
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);
  const answers = useGameStore((s) => s.answers);

  const question = onboardingQuestions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  const handlePrev = useCallback(() => {
    prevQuestion();
  }, [prevQuestion]);

  const handleChoice = useCallback(
    (value: string) => {
      if (question.id === 2) {
        setAnswer('guardian', value as any);
      } else if (question.id === 5) {
        setAnswer('preferredRitual', value);
      } else if (question.id === 6) {
        setAnswer('sleepAmbiance', value);
      } else if (question.id === 8) {
        setAnswer('mainGoal', value);
      } else if (question.id === 9) {
        setAnswer('preferredSound', value);
      }
      setTimeout(() => nextQuestion(), 350);
    },
    [question, nextQuestion, setAnswer]
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      if (question.id === 3) {
        setAnswer('eveningEnergy', value);
      } else if (question.id === 4) {
        setAnswer('idealBedtime', value);
      } else if (question.id === 7) {
        setAnswer('stressLevel', value);
      }
    },
    [question.id, setAnswer]
  );

  const handleSliderContinue = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  const handleConfirm = useCallback(() => {
    setAnswer('charterSigned', true);
    completeOnboarding();
  }, [setAnswer, completeOnboarding]);

  const getSliderValue = () => {
    if (question.id === 3) return answers.eveningEnergy ?? 5;
    if (question.id === 4) return answers.idealBedtime ?? 22.5;
    if (question.id === 7) return answers.stressLevel ?? 5;
    return 5;
  };

  const renderQuestion = () => {
    switch (question.kind) {
      case 'narrative':
        return (
          <NarrativeStep
            question={question}
            onContinue={isLast ? undefined : handleNext}
          />
        );
      case 'choice':
        return (
          <ChoiceQuestion
            question={question}
            onSelect={handleChoice}
          />
        );
      case 'slider':
        return (
          <div>
            <SliderQuestion
              value={getSliderValue()}
              onChange={handleSliderChange}
              min={question.sliderConfig!.min}
              max={question.sliderConfig!.max}
              step={question.sliderConfig!.step}
              unit={question.sliderConfig!.unit}
              labels={question.sliderConfig!.labels}
              narrative={question.narrative ?? ''}
            />
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSliderContinue}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6247AA] to-[#8063d2] text-white font-medium text-sm hover:from-[#7C5CBF] hover:to-[#9c86dc] transition-all duration-300"
              >
                Continuer
              </button>
            </div>
          </div>
        );
      case 'confirm':
        return (
          <ConfirmStep
            title={question.title}
            narrative={question.narrative ?? ''}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-midnight relative">
      <Starfield />
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 pt-8 pb-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#6247AA] to-[#8063d2] flex items-center justify-center">
              <span className="text-[16px]">🌙</span>
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">Sleepo</span>
          </div>
          {!isFirst && (
            <button
              onClick={handlePrev}
              className="text-[#8063d2] hover:text-[#b8a8e6] text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.03]"
            >
              ← Retour
            </button>
          )}
        </div>

        <div className="mb-6 flex items-center gap-2 justify-center">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-[6px] rounded-full transition-all duration-500 ${
                i <= currentIndex
                  ? 'w-[24px] bg-gradient-to-r from-[#6247AA] to-[#8063d2]'
                  : 'w-[6px] bg-white/[0.08]'
              }`}
            />
          ))}
        </div>

        {currentIndex > 0 && (
          <VisualFeedback question={question} currentIndex={currentIndex} />
        )}

        <div
          key={currentIndex}
          className="flex-1 animate-glass-fade"
        >
          {currentIndex > 0 && question.kind !== 'confirm' && (
            <h2 className="text-2xl font-semibold text-white mb-2 leading-snug">
              {question.title}
            </h2>
          )}
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
}

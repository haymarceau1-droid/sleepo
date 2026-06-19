import { useState, useCallback, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { onboardingQuestions, totalQuestions } from '../../data/onboarding';

import { WelcomePage } from './WelcomePage';
import { ChoiceQuestion } from './ChoiceQuestion';
import { SliderQuestion } from './SliderQuestion';
import { ConfirmStep } from './ConfirmStep';
import { Starfield } from '../ui/Starfield';

const rewardMilestones: { threshold: number; message: string }[] = [
  { threshold: 1, message: 'Graine obtenue ! 🌱' },
  { threshold: 3, message: 'Pousse éclose ! 🌿' },
  { threshold: 5, message: 'Fleur épanouie ! 🌸' },
  { threshold: 7, message: 'Arbre planté ! 🌳' },
  { threshold: 9, message: 'Jardin enchanté ! ✨' },
];

export function OnboardingScreen() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [rewardMessage, setRewardMessage] = useState<string | null>(null);
  const currentIndex = useGameStore((s) => s.currentQuestionIndex);
  const setAnswer = useGameStore((s) => s.setAnswer);
  const nextQuestion = useGameStore((s) => s.nextQuestion);
  const prevQuestion = useGameStore((s) => s.prevQuestion);
  const completeOnboarding = useGameStore((s) => s.completeOnboarding);
  const answers = useGameStore((s) => s.answers);

  const question = onboardingQuestions[currentIndex];

  const displayIndex = showWelcome ? -1 : currentIndex;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex, showWelcome]);

  useEffect(() => {
    const milestone = rewardMilestones.find((m) => m.threshold === currentIndex);
    if (milestone) {
      setRewardMessage(milestone.message);
      const timer = setTimeout(() => setRewardMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleWelcomeDone = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (displayIndex <= 0) {
      setShowWelcome(true);
      return;
    }
    prevQuestion();
  }, [displayIndex, prevQuestion]);

  const handleChoice = useCallback(
    (value: string) => {
      if (question.id === 1) {
        setAnswer('guardian', value as any);
      } else if (question.id === 2) {
        setAnswer('mainGoal', value);
      } else if (question.id === 4) {
        setAnswer('screenTime', value);
      } else if (question.id === 5) {
        setAnswer('noScreenTime', parseInt(value));
      } else if (question.id === 7) {
        setAnswer('roomEnvironment', value);
      } else if (question.id === 8) {
        setAnswer('idealWakeUp', value);
      } else if (question.id === 9) {
        setAnswer('socialMode', value);
      }
      setTimeout(() => nextQuestion(), 350);
    },
    [question, nextQuestion, setAnswer]
  );

  const handleMultiChoice = useCallback(
    (values: string[]) => {
      setAnswer('stimulants', values);
      setTimeout(() => nextQuestion(), 350);
    },
    [nextQuestion, setAnswer]
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      if (question.id === 3) {
        setAnswer('eveningEnergy', value);
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
    return 5;
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen flex flex-col bg-midnight relative">
        <Starfield />
        <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 pt-8 pb-12 relative z-10">
          <WelcomePage onStart={handleWelcomeDone} />
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (question.kind) {
      case 'choice':
        return (
          <ChoiceQuestion
            question={question}
            onSelect={handleChoice}
            onMultiDone={handleMultiChoice}
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
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6247AA] to-[#a06cd5] text-white font-medium text-sm hover:from-[#a06cd5] hover:to-[#e2cfea] transition-all duration-300"
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#6247AA] to-[#a06cd5] flex items-center justify-center">
              <span className="text-[16px]">🌙</span>
            </div>
            <span className="text-sm font-semibold text-white tracking-tight">Sleepo</span>
          </div>
          {displayIndex > 0 && (
            <button
              onClick={handlePrev}
              className="text-[#a06cd5] hover:text-[#e2cfea] text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.03]"
            >
              ← Retour
            </button>
          )}
        </div>

        {/* Star gauge progress */}
        <div className="mb-5 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-1 w-full max-w-[280px]">
            <span className="text-[10px]">🌙</span>
            <div className="flex-1 h-[5px] rounded-full bg-white/[0.06] overflow-hidden relative">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#6247AA] to-[#a06cd5] transition-all duration-500 ease-out"
                style={{ width: `${(displayIndex / (totalQuestions - 1)) * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 text-[10px] transition-all duration-500 ease-out"
                style={{ left: `${(displayIndex / (totalQuestions - 1)) * 100}%` }}
              >
                ⭐
              </div>
            </div>
            <span className="text-[10px]">⭐</span>
          </div>
          <span className="text-[9px] text-white/25 font-medium">
            Étape {displayIndex + 1}/{totalQuestions}
          </span>
        </div>

        {/* Reward message */}
        {rewardMessage && (
          <div className="mb-3 py-2 px-4 rounded-full bg-[#6247AA]/15 border border-[#6247AA]/20 text-center animate-glass-slide-up">
            <span className="text-[12px] text-[#e2cfea] font-medium">{rewardMessage}</span>
          </div>
        )}

        <div
          key={currentIndex}
          className="flex-1 animate-glass-fade"
        >
          {displayIndex >= 0 && question.kind !== 'confirm' && (
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

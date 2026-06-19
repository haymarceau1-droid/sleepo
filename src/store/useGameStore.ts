import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameState, UserAnswers, AppScreen } from '../types';

interface GameStore extends GameState {
  setAnswer: <K extends keyof UserAnswers>(key: K, value: UserAnswers[K]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  completeOnboarding: () => void;
  setScreen: (screen: AppScreen) => void;
  reset: () => void;
  setProfile: (profile: Partial<GameState['profile']>) => void;
}

const initialState: GameState = {
  onboardingComplete: false,
  currentScreen: 'onboarding',
  currentQuestionIndex: 0,
  answers: {
    guardian: null,
    mainGoal: '',
    eveningEnergy: 5,
    screenTime: '',
    noScreenTime: 30,
    stimulants: [],
    roomEnvironment: '',
    idealWakeUp: '07:30',
    socialMode: '',
    charterSigned: false,
  },
  profile: {
    pseudo: 'Petit Hibou',
    guardianLevel: 1,
    badges: [],
  },
  garden: {
    seedsPlanted: 0,
    treesGrown: 0,
    flowersBloomed: 0,
  },
  streak: {
    currentStreak: 4,
    longestStreak: 12,
    jokerAvailable: true,
    jokerUsedThisWeek: false,
  },
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...initialState,

      setAnswer: (key, value) =>
        set((state) => ({
          answers: { ...state.answers, [key]: value },
        })),

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      prevQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        })),

      goToQuestion: (index) =>
        set({ currentQuestionIndex: index }),

      completeOnboarding: () =>
        set({
          onboardingComplete: true,
          currentScreen: 'home',
          currentQuestionIndex: 0,
        }),

      setScreen: (screen) =>
        set({ currentScreen: screen }),

      reset: () => set({ ...initialState }),

      setProfile: (profile) =>
        set((state) => ({
          profile: { ...state.profile, ...profile },
        })),
    }),
    {
      name: 'sleepo-game-state',
    }
  )
);

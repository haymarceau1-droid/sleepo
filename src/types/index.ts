export type Guardian = 'loup' | 'hibou' | 'renard' | 'cerf' | 'ours';

export type QuestionKind = 'narrative' | 'choice' | 'slider' | 'confirm';

export interface ChoiceOption {
  value: string;
  label: string;
  emoji: string;
  description: string;
}

export interface OnboardingQuestion {
  id: number;
  kind: QuestionKind;
  title: string;
  narrative?: string;
  choices?: ChoiceOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    unit: string;
    labels: [string, string];
  };
}

export interface UserAnswers {
  guardian: Guardian | null;
  eveningEnergy: number;
  idealBedtime: number;
  preferredRitual: string;
  sleepAmbiance: string;
  stressLevel: number;
  mainGoal: string;
  preferredSound: string;
  charterSigned: boolean;
}

export type GardenState = {
  seedsPlanted: number;
  treesGrown: number;
  flowersBloomed: number;
};

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  jokerAvailable: boolean;
  jokerUsedThisWeek: boolean;
}

export type AppScreen = 'onboarding' | 'home' | 'morning' | 'evening' | 'sleepcircle';

export interface GameState {
  onboardingComplete: boolean;
  currentScreen: AppScreen;
  currentQuestionIndex: number;
  answers: Partial<UserAnswers>;
  garden: GardenState;
  streak: StreakData;
}

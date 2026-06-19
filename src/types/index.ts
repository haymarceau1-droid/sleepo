export type Guardian = 'hibou' | 'renard' | 'chat';

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
  mainGoal: string;
  eveningEnergy: number;
  screenTime: string;
  noScreenTime: number;
  stimulants: string[];
  roomEnvironment: string;
  idealWakeUp: string;
  socialMode: string;
  charterSigned: boolean;
}

export interface UserProfile {
  pseudo: string;
  guardianLevel: number;
  badges: string[];
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

export type AppScreen = 'onboarding' | 'home' | 'morning' | 'evening' | 'sleepcircle' | 'stats' | 'profil' | 'settings';

export interface GameState {
  onboardingComplete: boolean;
  currentScreen: AppScreen;
  currentQuestionIndex: number;
  answers: Partial<UserAnswers>;
  profile: UserProfile;
  garden: GardenState;
  streak: StreakData;
}

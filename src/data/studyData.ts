export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching' | 'sorting' | 'math';

export interface MathConfig {
  operations: string[]; // ['addition', 'fractions', 'equations', ...]
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
}

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  category?: string;
  imageUrl?: string;
}

export interface Topic {
  id: string;
  name: string;
  items: StudyItem[];
  allowedModes?: StudyMode[];
  randomizeDirection?: boolean;
  isMathTopic?: boolean;
  mathConfig?: MathConfig;
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
  iconName?: string;
  color?: string;
  isCustom?: boolean;
}

export const PREDEFINED_DATA: Record<string, Category> = {
  // ... (ponecháno beze změny pro stručnost, ale typy jsou nyní rozšířené)
  anglictina: {
    id: 'anglictina',
    title: 'Angličtina',
    iconName: 'Languages',
    color: 'bg-sky-600',
    topics: []
  },
  nemcina: {
    id: 'nemcina',
    title: 'Němčina',
    iconName: 'Languages',
    color: 'bg-amber-600',
    topics: []
  },
  zemepis: {
    id: 'zemepis',
    title: 'Zeměpis',
    iconName: 'Globe',
    color: 'bg-emerald-600',
    topics: []
  },
  matematika_gen: {
    id: 'matematika_gen',
    title: 'Matematika (Generátor)',
    iconName: 'Calculator',
    color: 'bg-rose-600',
    topics: [
      {
        id: 'math-basic-mix',
        name: 'Základní operace (Mix)',
        items: [],
        isMathTopic: true,
        allowedModes: ['math'],
        mathConfig: {
          operations: ['addition', 'subtraction', 'multiplication', 'division'],
          difficulty: 'medium',
          count: 10
        }
      },
      {
        id: 'math-fractions-eq',
        name: 'Zlomky a rovnice',
        items: [],
        isMathTopic: true,
        allowedModes: ['math'],
        mathConfig: {
          operations: ['fractions', 'equations'],
          difficulty: 'medium',
          count: 10
        }
      }
    ]
  }
};
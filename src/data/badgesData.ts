export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
}

export const ALL_BADGES: Badge[] = [
  {
    id: 'first_session',
    title: 'První krůček',
    description: 'Dokonči svou úplně první studijní relaci.',
    iconName: 'Footprints',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
  },
  {
    id: 'perfect_score',
    title: 'Perfekcionista',
    description: 'Dosáhni 100% úspěšnosti v jakémkoliv režimu.',
    iconName: 'Target',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
  },
  {
    id: 'creator',
    title: 'Tvůrce',
    description: 'Vytvoř si své vlastní studijní téma.',
    iconName: 'PenTool',
    color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
  },
  {
    id: 'night_owl',
    title: 'Noční sova',
    description: 'Studuj pozdě v noci (po 22:00).',
    iconName: 'Moon',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/30'
  },
  {
    id: 'early_bird',
    title: 'Ranní ptáče',
    description: 'Studuj brzy ráno (před 8:00).',
    iconName: 'Sun',
    color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/30'
  },
  {
    id: 'streak_7',
    title: 'Týdenní maraton',
    description: 'Udržuj si studijní sérii po dobu 7 dní.',
    iconName: 'Zap',
    color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/30'
  }
];
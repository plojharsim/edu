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
    description: 'Dokonči svou první studijní relaci.',
    iconName: 'Zap',
    color: 'bg-amber-500'
  },
  {
    id: 'perfect_score',
    title: 'Génius',
    description: 'Získej 100 % v jakémkoliv režimu.',
    iconName: 'Trophy',
    color: 'bg-emerald-500'
  },
  {
    id: 'streak_3',
    title: 'Pravidelný student',
    description: 'Udržuj sérii 3 dny v řadě.',
    iconName: 'Flame',
    color: 'bg-orange-600'
  },
  {
    id: 'creator',
    title: 'Tvůrce',
    description: 'Vytvoř své první vlastní téma.',
    iconName: 'Pencil',
    color: 'bg-indigo-500'
  },
  {
    id: 'marathoner',
    title: 'Maratonec',
    description: 'Dokonči 10 studijních relací.',
    iconName: 'Timer',
    color: 'bg-rose-500'
  }
];

export const getUnlockedBadges = (): string[] => {
  const saved = localStorage.getItem('unlocked_badges');
  return saved ? JSON.parse(saved) : [];
};

export const unlockBadge = (badgeId: string): boolean => {
  const unlocked = getUnlockedBadges();
  if (unlocked.includes(badgeId)) return false;
  
  const newUnlocked = [...unlocked, badgeId];
  localStorage.setItem('unlocked_badges', JSON.stringify(newUnlocked));
  return true;
};
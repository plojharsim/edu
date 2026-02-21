import { ALL_BADGES } from "@/data/badgesData";
import { showSuccess } from "./toast";

export const getEarnedBadges = (): string[] => {
  const saved = localStorage.getItem('user_badges');
  return saved ? JSON.parse(saved) : [];
};

export const awardBadge = (badgeId: string) => {
  const earned = getEarnedBadges();
  if (earned.includes(badgeId)) return;

  const badge = ALL_BADGES.find(b => b.id === badgeId);
  if (!badge) return;

  const newEarned = [...earned, badgeId];
  localStorage.setItem('user_badges', JSON.stringify(newEarned));
  
  showSuccess(`Získal jsi odznak: ${badge.title}! 🏆`);
};

/**
 * Kontrola odznaků po dokončení lekce
 */
export const checkStudyBadges = (score: number) => {
  // První lekce
  awardBadge('first_session');

  // Perfektní skóre
  if (score === 100) {
    awardBadge('perfect_score');
  }

  // Časové odznaky
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 4) {
    awardBadge('night_owl');
  } else if (hour >= 5 && hour < 8) {
    awardBadge('early_bird');
  }

  // Streak (kontrola z localStorage)
  const stats = JSON.parse(localStorage.getItem('study_stats') || '{}');
  if (stats.streak >= 7) {
    awardBadge('streak_7');
  }
};
"use client";

// Klíč pro localStorage
const PERFORMANCE_KEY = 'edu_items_performance';

interface ItemPerformance {
  [itemId: string]: {
    correct: number;
    incorrect: number;
    weight: number; // Vyšší váha = častější zobrazování
  }
}

export const learningAlgorithm = {
  getPerformanceData(): ItemPerformance {
    const data = localStorage.getItem(PERFORMANCE_KEY);
    return data ? JSON.parse(data) : {};
  },

  savePerformance(itemId: string, isCorrect: boolean) {
    const data = this.getPerformanceData();
    if (!data[itemId]) {
      data[itemId] = { correct: 0, incorrect: 0, weight: 1 };
    }

    if (isCorrect) {
      data[itemId].correct += 1;
      // Snižujeme váhu (položka je lehčí)
      data[itemId].weight = Math.max(0.1, data[itemId].weight * 0.8);
    } else {
      data[itemId].incorrect += 1;
      // Zvyšujeme váhu (položka je těžší)
      data[itemId].weight = Math.min(5, data[itemId].weight * 1.5);
    }

    localStorage.setItem(PERFORMANCE_KEY, JSON.stringify(data));
  },

  /**
   * Seřadí položky tak, aby ty s vyšší váhou (obtížnější) byly na začátku nebo častěji zastoupeny.
   */
  prioritizeItems<T extends { term: string; definition: string }>(items: T[]): T[] {
    const performance = this.getPerformanceData();
    
    return [...items].sort((a, b) => {
      const idA = `${a.term}_${a.definition}`;
      const idB = `${b.term}_${b.definition}`;
      const weightA = performance[idA]?.weight || 1;
      const weightB = performance[idB]?.weight || 1;
      
      // Chceme ty s nejvyšší váhou nahoře
      return weightB - weightA;
    });
  }
};
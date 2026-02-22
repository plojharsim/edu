"use client";

export interface ItemPerformance {
  [itemId: string]: {
    correct: number;
    incorrect: number;
    weight: number;
  }
}

export const learningAlgorithm = {
  /**
   * Vypočítá novou váhu pro položku na základě odpovědi.
   */
  calculateNewPerformance(currentData: ItemPerformance, itemId: string, isCorrect: boolean): ItemPerformance {
    const newData = { ...currentData };
    if (!newData[itemId]) {
      newData[itemId] = { correct: 0, incorrect: 0, weight: 1 };
    }

    if (isCorrect) {
      newData[itemId].correct += 1;
      newData[itemId].weight = Math.max(0.1, newData[itemId].weight * 0.8);
    } else {
      newData[itemId].incorrect += 1;
      newData[itemId].weight = Math.min(5, newData[itemId].weight * 1.5);
    }

    return newData;
  },

  /**
   * Seřadí položky podle jejich vah (náročnosti).
   */
  prioritizeItems<T extends { term: string; definition: string }>(items: T[], performance: ItemPerformance): T[] {
    return [...items].sort((a, b) => {
      const idA = `${a.term}_${a.definition}`;
      const idB = `${b.term}_${b.definition}`;
      const weightA = performance[idA]?.weight || 1;
      const weightB = performance[idB]?.weight || 1;
      return weightB - weightA;
    });
  }
};
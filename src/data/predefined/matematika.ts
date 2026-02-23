import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-rose-600',
  topics: [
    {
      id: 'math-generator',
      name: 'Generátor příkladů',
      isDynamic: true,
      items: [], // Bude vygenerováno dynamicky
      allowedModes: ['abcd', 'writing', 'flashcards'],
      randomizeDirection: false
    }
  ]
};
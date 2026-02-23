import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-amber-500',
  topics: [
    {
      id: 'math-generator',
      name: 'Generátor příkladů',
      allowedModes: ['abcd', 'writing'],
      items: [] // Položky se vygenerují dynamicky
    }
  ]
};
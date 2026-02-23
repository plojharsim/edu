import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-indigo-600',
  topics: [
    {
      id: 'math-generator',
      name: 'Dynamický generátor',
      allowedModes: ['abcd', 'writing'],
      items: [] // Položky se vygenerují dynamicky
    }
  ]
};
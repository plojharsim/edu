import { Category } from "../studyData";

export const zemepis: Category = {
  id: 'zemepis',
  title: 'Zeměpis',
  iconName: 'Globe',
  color: 'bg-emerald-600',
  topics: [
    {
      id: 'evropa-mesta',
      name: 'Hlavní města Evropy',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      randomizeDirection: true,
      items: [
        { term: 'Praha', definition: 'Česko', category: 'Střední Evropa', options: ['Brno', 'Bratislava', 'Vídeň'] },
        { term: 'Bratislava', definition: 'Slovensko', category: 'Střední Evropa', options: ['Košice', 'Praha', 'Budapešť'] },
        { term: 'Berlín', definition: 'Německo', category: 'Střední Evropa', options: ['Mnichov', 'Hamburk', 'Frankfurt'] },
        { term: 'Vídeň', definition: 'Rakousko', category: 'Střední Evropa', options: ['Linec', 'Salcburk', 'Štýrský Hradec'] },
        { term: 'Paříž', definition: 'Francie', category: 'Západní Evropa', options: ['Lyon', 'Marseille', 'Londýn'] },
        { term: 'Madrid', definition: 'Španělsko', category: 'Jižní Evropa', options: ['Barcelona', 'Valencie', 'Sevilla'] },
        { term: 'Řím', definition: 'Itálie', category: 'Jižní Evropa', options: ['Milán', 'Neapol', 'Benátky'] }
      ]
    }
  ]
};
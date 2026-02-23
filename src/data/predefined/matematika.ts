import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-rose-600',
  topics: [
    {
      id: 'math-word-problems',
      name: 'Slovní úlohy (Klasika)',
      allowedModes: ['abcd', 'writing'],
      items: [
        { 
          term: 'Petr má 15 jablek, Jana jich má o 7 více. Kolik jich mají dohromady?', 
          definition: '37', 
          options: ['22', '30', '40'],
          category: 'Sčítání'
        },
        { 
          term: 'Vlak jede rychlostí 80 km/h. Jakou vzdálenost ujede za 2,5 hodiny?', 
          definition: '200', 
          options: ['160', '240', '180'],
          category: 'Pohyb'
        },
        { 
          term: 'Tričko stálo 400 Kč, nyní je ve slevě 25 %. Kolik stojí po slevě?', 
          definition: '300', 
          options: ['350', '375', '100'],
          category: 'Procenta'
        },
        { 
          term: 'Bazén se naplní 3 kohoutky za 8 hodin. Za jak dlouho ho naplní 4 kohoutky?', 
          definition: '6', 
          options: ['10', '11', '5'],
          category: 'Nepřímá úměra'
        }
      ]
    },
    {
      id: 'math-dynamic',
      name: 'Dynamické procvičování',
      isDynamic: true,
      dynamicType: 'math',
      allowedModes: ['abcd', 'writing', 'matching'],
      items: [] // Generuje se dynamicky
    }
  ]
};
import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-rose-600',
  topics: [
    {
      id: 'math-word-problems',
      name: 'Slovní úlohy',
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
      id: 'math-geography',
      name: 'Zeměpisné výpočty',
      allowedModes: ['abcd', 'writing', 'matching'],
      items: [
        { 
          term: 'Mapa má měřítko 1 : 50 000. Kolik kilometrů v reálu představuje 4 cm na mapě?', 
          definition: '2', 
          options: ['20', '0.2', '5'],
          category: 'Měřítko'
        },
        { 
          term: 'V Praze (UTC+1) je 12:00. Kolik hodin je v Londýně (UTC+0)?', 
          definition: '11:00', 
          options: ['13:00', '12:00', '10:00'],
          category: 'Časová pásma'
        },
        { 
          term: 'Město má rozlohu 50 km² a 10 000 obyvatel. Jaká je hustota zalidnění (ob./km²)?', 
          definition: '200', 
          options: ['500', '50', '20'],
          category: 'Demografie'
        },
        { 
          term: 'Na mapě s měřítkem 1 : 1 000 000 je vzdálenost 7,5 cm. Kolik je to v kilometrech?', 
          definition: '75', 
          options: ['750', '7.5', '7500'],
          category: 'Měřítko'
        },
        { 
          term: 'Letadlo letí z New Yorku (UTC-5) v 10:00 místního času. Let trvá 8 hodin. Kolik je v cíli v Praze (UTC+1)?', 
          definition: '00:00', 
          options: ['18:00', '22:00', '02:00'],
          category: 'Časová pásma'
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
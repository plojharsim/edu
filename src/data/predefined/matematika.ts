import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-rose-600',
  topics: [
    {
      id: 'math-formulas',
      name: 'Důležité vzorce',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
      items: [
        { term: 'Obsah čtverce', definition: 'S = a · a', options: ['S = 4 · a', 'S = a + a', 'S = 2 · a'], category: 'Rovinné útvary' },
        { term: 'Obvod čtverce', definition: 'o = 4 · a', options: ['o = a · a', 'o = 2 · a', 'o = a + 4'], category: 'Rovinné útvary' },
        { term: 'Obsah obdélníku', definition: 'S = a · b', options: ['S = 2 · (a + b)', 'S = a + b', 'S = 2a + 2b'], category: 'Rovinné útvary' },
        { term: 'Obvod obdélníku', definition: 'o = 2 · (a + b)', options: ['o = a · b', 'o = a + b', 'o = 4 · a'], category: 'Rovinné útvary' },
        { term: 'Pythagorova věta', definition: 'c² = a² + b²', options: ['c = a + b', 'c² = a² - b²', 'a² = b² + c²'], category: 'Trojúhelníky' },
        { term: 'Obsah kruhu', definition: 'S = π · r²', options: ['S = 2 · π · r', 'S = π · d', 'S = 2r'], category: 'Kruh' },
        { term: 'Obvod kruhu (délka)', definition: 'o = 2 · π · r', options: ['o = π · r²', 'o = π · r', 'o = 2r'], category: 'Kruh' },
        { term: 'Objem krychle', definition: 'V = a · a · a', options: ['V = 6 · a²', 'V = 4 · a', 'V = a · a'], category: 'Tělesa' },
        { term: 'Povrch krychle', definition: 'S = 6 · a²', options: ['S = a³', 'S = 4 · a²', 'S = 6 · a'], category: 'Tělesa' },
        { term: 'Objem kvádru', definition: 'V = a · b · c', options: ['V = 2(ab+bc+ac)', 'V = a+b+c', 'V = abc/2'], category: 'Tělesa' }
      ]
    },
    {
      id: 'math-units',
      name: 'Jednotky a převody',
      allowedModes: ['flashcards', 'abcd', 'matching', 'sorting'],
      items: [
        { term: '1 km', definition: '1000 m', options: ['100 m', '10 m', '10000 m'], category: 'Délka' },
        { term: '1 m', definition: '100 cm', options: ['10 cm', '1000 mm', '0,1 km'], category: 'Délka' },
        { term: '1 dm', definition: '10 cm', options: ['100 mm', '1 m', '0,1 cm'], category: 'Délka' },
        { term: '1 kg', definition: '1000 g', options: ['100 g', '10 dkg', '0,1 t'], category: 'Hmotnost' },
        { term: '1 t', definition: '1000 kg', options: ['100 kg', '10000 kg', '10 q'], category: 'Hmotnost' },
        { term: '1 h', definition: '60 min', options: ['100 min', '3600 s', '30 min'], category: 'Čas' },
        { term: '1 min', definition: '60 s', options: ['100 s', '10 s', '0,1 h'], category: 'Čas' },
        { term: '1 l', definition: '10 dl', options: ['100 ml', '1 dm³', '100 cl'], category: 'Objem' },
        { term: '1 hl', definition: '100 l', options: ['10 l', '1000 l', '10 dl'], category: 'Objem' }
      ]
    },
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
        },
        { 
          term: 'Na mapě s měřítkem 1 : 50 000 je vzdálenost 4 cm. Jaká je skutečná vzdálenost v km?', 
          definition: '2', 
          options: ['20', '0,2', '5'],
          category: 'Měřítko'
        }
      ]
    },
    {
      id: 'math-dynamic',
      name: 'Dynamické procvičování',
      isDynamic: true,
      dynamicType: 'math',
      allowedModes: ['abcd', 'writing', 'matching'],
      items: [] 
    }
  ]
};
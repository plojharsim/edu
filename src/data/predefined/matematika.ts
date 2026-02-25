import { Category } from "../studyData";

export const matematika: Category = {
  id: 'matematika',
  title: 'Matematika',
  iconName: 'Calculator',
  color: 'bg-rose-600',
  topics: [
    {
      id: 'nasobilka-zaklady',
      name: 'Malá násobilka (2-5)',
      allowedModes: ['abcd', 'writing', 'matching'],
      items: [
        { term: '2 · 3', definition: '6', options: ['4', '5', '8'] },
        { term: '3 · 4', definition: '12', options: ['10', '9', '15'] },
        { term: '4 · 4', definition: '16', options: ['12', '20', '18'] },
        { term: '5 · 2', definition: '10', options: ['7', '15', '12'] },
        { term: '3 · 3', definition: '9', options: ['6', '12', '10'] },
        { term: '5 · 5', definition: '25', options: ['20', '30', '15'] },
        { term: '4 · 5', definition: '20', options: ['24', '16', '25'] },
        { term: '2 · 8', definition: '16', options: ['14', '18', '12'] }
      ]
    },
    {
      id: 'geometrie-tvary',
      name: 'Geometrické tvary',
      allowedModes: ['flashcards', 'abcd', 'matching', 'sorting'],
      items: [
        { term: 'Čtverec', definition: '4 stejné strany, pravé úhly', category: 'Rovinné tvary', options: ['Krychle', 'Obdélník', 'Kruh'] },
        { term: 'Obdélník', definition: 'Protější strany stejné, pravé úhly', category: 'Rovinné tvary', options: ['Čtverec', 'Válec', 'Jehlan'] },
        { term: 'Kruh', definition: 'Všechny body stejně daleko od středu', category: 'Rovinné tvary', options: ['Koule', 'Elipsa', 'Oblouk'] },
        { term: 'Trojúhelník', definition: '3 strany, součet úhlů 180°', category: 'Rovinné tvary', options: ['Čtyřúhelník', 'Kvádr', 'Kužel'] },
        { term: 'Krychle', definition: 'Těleso s 6 čtvercovými stěnami', category: 'Tělesa', options: ['Čtverec', 'Kvádr', 'Koule'] },
        { term: 'Koule', definition: 'Dokonale symetrické prostorové těleso', category: 'Tělesa', options: ['Kruh', 'Válec', 'Kužel'] },
        { term: 'Válec', definition: 'Dvě kruhové podstavy a plášť', category: 'Tělesa', options: ['Kvádr', 'Jehlan', 'Elipsa'] }
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
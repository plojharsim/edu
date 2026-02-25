import { Category } from "../studyData";

export const fyzika: Category = {
  id: 'physics',
  title: 'Fyzika',
  iconName: 'Atom',
  color: 'bg-indigo-600',
  topics: [
    {
      id: 'physics-wind-energy',
      name: 'Větrná energie',
      allowedModes: ['flashcards', 'abcd', 'writing'],
      randomizeDirection: false,
      targetGrades: ['9. třída ZŠ'],
      items: [
        {
          term: 'Co je vítr',
          definition: 'Pohyb vzduchu vzhledem k zemskému povrchu',
          options: [
            'Pohyb vody v krajině',
            'Proudění elektřiny',
            'Změna tlaku v kapalinách'
          ]
        },
        {
          term: 'Jak vzniká vítr',
          definition: 'Rozdílem tlaků mezi různě zahřátými oblastmi',
          options: [
            'Otáčením Země',
            'Působením magnetického pole',
            'Vlivem Měsíce'
          ]
        },
        {
          term: 'Využitelná rychlost větru',
          definition: 'Asi 15 až 95 km/h (cca do 26 m/s)',
          options: [
            '5 až 20 km/h',
            'nad 120 km/h',
            'nezáleží na rychlosti'
          ]
        },
        {
          term: 'Co se stane při rychlosti větru nad 26 m/s',
          definition: 'Elektrárna se musí zastavit kvůli poškození konstrukce',
          options: [
            'Zvýší se výkon',
            'Začne vyrábět více energie',
            'Nic se nestane'
          ]
        },
        {
          term: 'Princip větrné elektrárny',
          definition: 'Vítr otáčí turbínou, která roztáčí generátor',
          options: [
            'Vítr přímo vyrábí elektřinu',
            'Slunce ohřívá turbínu',
            'Elektřina se vyrábí z tepla'
          ]
        },
        {
          term: 'Na jakou energii se přeměňuje energie větru',
          definition: 'Na elektrickou energii',
          options: [
            'Na tepelnou energii',
            'Na jadernou energii',
            'Na chemickou energii'
          ]
        },
        {
          term: 'Kde jsou nejlepší podmínky pro větrné elektrárny',
          definition: 'Na pobřeží a ve vyšších nadmořských výškách',
          options: [
            'V nížinách',
            'V městech',
            'V lesích'
          ]
        },
        {
          term: 'Výhoda větrných elektráren',
          definition: 'Nezhoršují životní prostředí a nevypouští emise',
          options: [
            'Vysoký výkon',
            'Nízké pořizovací náklady',
            'Malé rozměry'
          ]
        },
        {
          term: 'Další výhoda větrných elektráren',
          definition: 'Bezpečný provoz a jednoduchý převod energie',
          options: [
            'Zabírají málo místa',
            'Vyrábí energii neustále',
            'Nezávisí na počasí'
          ]
        },
        {
          term: 'Nevýhoda větrných elektráren',
          definition: 'Závislost na větru',
          options: [
            'Znečištění ovzduší',
            'Nebezpečný provoz',
            'Radioaktivní odpad'
          ]
        },
        {
          term: 'Další nevýhoda větrných elektráren',
          definition: 'Vysoké pořizovací náklady a hluk',
          options: [
            'Krátká životnost',
            'Složitá obsluha',
            'Nutnost paliva'
          ]
        },
        {
          term: 'Životnost větrných elektráren',
          definition: 'Přibližně 20 let',
          options: [
            '5 let',
            '10 let',
            '50 let'
          ]
        },
        {
          term: 'Návratnost investice',
          definition: 'Přibližně 15 let',
          options: [
            '2 roky',
            '5 let',
            '30 let'
          ]
        }
      ]
    }
  ]
};
import { Category } from "../studyData";

export const prirodopis: Category = {
  id: 'prirodopis',
  title: 'Přírodopis',
  iconName: 'Leaf',
  color: 'bg-green-700',
  topics: [
    {
      id: 'lidske-telo-organy',
      name: 'Orgány lidského těla',
      allowedModes: ['flashcards', 'abcd', 'matching', 'sorting'],
      items: [
        { term: 'Srdce', definition: 'Pumpuje krev do celého těla', category: 'Oběhová soustava', options: ['Čistí krev', 'Produkuje inzulin', 'Zajišťuje dýchání'] },
        { term: 'Plíce', definition: 'Zajišťují výměnu plynů (kyslíku a CO2)', category: 'Dýchací soustava', options: ['Tráví potravu', 'Filtrují odpad', 'Řídí pohyby'] },
        { term: 'Ledviny', definition: 'Filtrují krev a tvoří moč', category: 'Vylučovací soustava', options: ['Vyrábějí žluč', 'Skladují cukr', 'Pumpují krev'] },
        { term: 'Játra', definition: 'Centrální laboratoř těla, detoxikace', category: 'Trávicí soustava', options: ['Výměna plynů', 'Tvorba moči', 'Řízení nervů'] },
        { term: 'Žaludek', definition: 'Mechanické a chemické zpracování potravy', category: 'Trávicí soustava', options: ['Vstřebávání živin', 'Dýchání', 'Tvorba hormonů'] },
        { term: 'Mozek', definition: 'Řídicí centrum nervové soustavy', category: 'Nervová soustava', options: ['Pumpování krve', 'Trávení tuků', 'Tvorba svalů'] },
        { term: 'Mícha', definition: 'Přenos signálů mezi mozkem a tělem', category: 'Nervová soustava', options: ['Skladování krve', 'Dýchání', 'Trávení'] }
      ]
    },
    {
      id: 'bunka-zaklady',
      name: 'Stavba buňky',
      allowedModes: ['flashcards', 'abcd', 'writing'],
      items: [
        { term: 'Jádro', definition: 'Obsahuje genetickou informaci (DNA)', options: ['Vyrábí energii', 'Chrání buňku', 'Skladuje vodu'] },
        { term: 'Mitochondrie', definition: 'Energetické centrum buňky (buněčné dýchání)', options: ['Fotosyntéza', 'Tvorba bílkovin', 'Odpadní koš'] },
        { term: 'Chloroplast', definition: 'Probíhá v něm fotosyntéza (jen u rostlin)', options: ['Jádro buňky', 'Buněčná stěna', 'Vakuola'] },
        { term: 'Cytoplazma', definition: 'Polotekutý obsah buňky', options: ['Obal buňky', 'Genetický kód', 'Motor buňky'] },
        { term: 'Ribozomy', definition: 'Místo syntézy bílkovin', options: ['Sklad tuků', 'Trávení potravy', 'Dýchání'] }
      ]
    }
  ]
};
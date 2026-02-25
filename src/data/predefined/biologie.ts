import { Category } from "../studyData";

export const biologie: Category = {
  id: 'biologie',
  title: 'Biologie',
  iconName: 'Dna',
  color: 'bg-green-600',
  topics: [
    {
      id: 'bunka-zaklady',
      name: 'Stavba buňky',
      targetGrades: ['7. třída ZŠ'],
      allowedModes: ['flashcards', 'abcd', 'sorting'],
      items: [
        { term: 'Jádro', definition: 'Řídící centrum buňky s DNA', category: 'Organely', options: ['Vakuola', 'Ribozom', 'Stěna'] },
        { term: 'Chloroplast', definition: 'Místo, kde probíhá fotosyntéza', category: 'Pouze rostlinná', options: ['Mitochondrie', 'Jádro', 'Cytoplazma'] },
        { term: 'Mitochondrie', definition: 'Energetické centrum (dýchání)', category: 'Organely', options: ['Chloroplast', 'Buněčná stěna', 'Vakuola'] },
        { term: 'Vakuola', definition: 'Zásobárna vody a látek', category: 'Organely', options: ['DNA', 'Jádro', 'Kůže'] },
        { term: 'Buněčná stěna', definition: 'Pevný obal rostlinné buňky', category: 'Pouze rostlinná', options: ['Membrána', 'Jádro', 'Sval'] }
      ]
    },
    {
      id: 'lidske-telo-soustavy',
      name: 'Soustavy lidského těla',
      targetGrades: ['8. třída ZŠ', 'Vysoká škola'],
      allowedModes: ['flashcards', 'abcd', 'matching', 'sorting'],
      items: [
        { term: 'Srdce', definition: 'Pohon oběhové soustavy', category: 'Oběhová soustava', options: ['Plíce', 'Ledviny', 'Játra'] },
        { term: 'Plíce', definition: 'Hlavní orgán dýchání', category: 'Dýchací soustava', options: ['Žaludek', 'Srdce', 'Možek'] },
        { term: 'Žaludek', definition: 'Trávení potravy', category: 'Trávicí soustava', options: ['Plíce', 'Ledviny', 'Močový měchýř'] },
        { term: 'Ledviny', definition: 'Filtrace krve a tvorba moči', category: 'Vylučovací soustava', options: ['Játra', 'Srdce', 'Slinivka'] },
        { term: 'Mozek', definition: 'Centrum nervové soustavy', category: 'Nervová soustava', options: ['Páteř', 'Sval', 'Krev'] }
      ]
    }
  ]
};
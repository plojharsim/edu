import { Category } from "../studyData";

export const ceskyJazyk: Category = {
  id: 'cesky-jazyk',
  title: 'Český jazyk',
  iconName: 'PenTool',
  color: 'bg-orange-600',
  topics: [
    {
      id: 'vyjmenovana-slova-b',
      name: 'Vyjmenovaná slova po B',
      targetGrades: ['3. třída ZŠ', '4. třída ZŠ', '5. třída ZŠ'],
      allowedModes: ['flashcards', 'abcd', 'writing'],
      items: [
        { term: 'B_t', definition: 'Být (existovat)', options: ['Bít (tlouci)', 'Byt (bydlení)', 'Být (s klackem)'] },
        { term: 'B_lina', definition: 'Bylina', options: ['Bilina', 'Bylina (rostlina)', 'Bilina (město)'] },
        { term: 'Př_bytek', definition: 'Přibytek', options: ['Pribytek', 'Příbytek', 'Přibytek (zbytek)'] },
        { term: 'Dob_tek', definition: 'Dobytek', options: ['Dobitek', 'Dobítek', 'Dobytek'] },
        { term: 'Ob_čej', definition: 'Obyčej', options: ['Običej', 'Obíčej', 'Obyčej'] }
      ]
    },
    {
      id: 'literarni-smery',
      name: 'Literární směry',
      targetGrades: ['1. ročník SŠ', '2. ročník SŠ', '3. ročník SŠ', '4. ročník SŠ'],
      allowedModes: ['flashcards', 'abcd', 'matching'],
      items: [
        { term: 'Romantismus', definition: 'Důraz na cit, jedince a přírodu', options: ['Realismus', 'Baroko', 'Klasicismus'] },
        { term: 'Realismus', definition: 'Pravdivé zobrazení skutečnosti', options: ['Romantismus', 'Surrealismus', 'Dekadence'] },
        { term: 'Humanismus', definition: 'Návrat k antice a člověku', options: ['Středověk', 'Baroko', 'Moderna'] },
        { term: 'Baroko', definition: 'Duchovnost, zdobnost a kontrast', options: ['Renesance', 'Osvícenství', 'Realismus'] },
        { term: 'Surrealismus', definition: 'Práce s podvědomím a sny', options: ['Futurismus', 'Realismus', 'Naturalismus'] }
      ]
    }
  ]
};
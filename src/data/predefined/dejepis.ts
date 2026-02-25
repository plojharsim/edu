import { Category } from "../studyData";

export const dejepis: Category = {
  id: 'dejepis',
  title: 'Dějepis',
  iconName: 'History',
  color: 'bg-amber-800',
  topics: [
    {
      id: 'staroveky-egypt',
      name: 'Starověký Egypt',
      targetGrades: ['6. třída ZŠ'],
      allowedModes: ['flashcards', 'abcd', 'matching'],
      items: [
        { term: 'Faraon', definition: 'Panovník Egypta považovaný za boha', options: ['Velekněz', 'Vezír', 'Písař'] },
        { term: 'Hieroglyfy', definition: 'Egyptské obrázkové písmo', options: ['Klínové písmo', 'Latinka', 'Azbuka'] },
        { term: 'Nil', definition: 'Řeka, u které vznikla civilizace', options: ['Eufrat', 'Tigris', 'Ganga'] },
        { term: 'Pyramidy', definition: 'Monumentální hrobky faraonů', options: ['Zikkuraty', 'Chrámy', 'Paláce'] },
        { term: 'Papyrus', definition: 'Psací materiál vyrobený z rákosu', options: ['Pergamen', 'Papír', 'Hliněná tabulka'] }
      ]
    },
    {
      id: 'druha-svetova-valka',
      name: '2. světová válka – Klíčová data',
      targetGrades: ['9. třída ZŠ'],
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
      items: [
        { term: '1. 9. 1939', definition: 'Napadení Polska (začátek války)', options: ['8. 5. 1945', '22. 6. 1941', '1. 9. 1940'] },
        { term: '22. 6. 1941', definition: 'Operace Barbarossa (útok na SSSR)', options: ['7. 12. 1941', '6. 6. 1944', '30. 9. 1938'] },
        { term: '7. 12. 1941', definition: 'Útok na Pearl Harbor', options: ['1. 9. 1939', '2. 9. 1945', '8. 5. 1945'] },
        { term: '6. 6. 1944', definition: 'Vylodění v Normandii (Den D)', options: ['8. 5. 1945', '30. 4. 1945', '17. 11. 1939'] },
        { term: '8. 5. 1945', definition: 'Konec války v Evropě', options: ['2. 9. 1945', '1. 9. 1939', '15. 3. 1939'] }
      ]
    }
  ]
};
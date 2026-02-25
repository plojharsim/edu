import { Category } from "../studyData";

export const chemie: Category = {
  id: 'chemie',
  title: 'Chemie',
  iconName: 'FlaskConical',
  color: 'bg-purple-600',
  topics: [
    {
      id: 'chemicke-prvky-zaklady',
      name: 'Základní chemické prvky',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      randomizeDirection: true,
      targetGrades: ['8. třída ZŠ', '9. třída ZŠ', '1. ročník SŠ', '2. ročník SŠ', '3. ročník SŠ', '4. ročník SŠ', 'Vysoká škola'],
      items: [
        { term: 'H', definition: 'Vodík', category: 'Nekovy', options: ['Helium', 'Hliník', 'Hořčík'] },
        { term: 'He', definition: 'Helium', category: 'Vzácné plyny', options: ['Vodík', 'Hafnium', 'Rtuť'] },
        { term: 'O', definition: 'Kyslík', category: 'Nekovy', options: ['Osmium', 'Olovo', 'Zlato'] },
        { term: 'C', definition: 'Uhlík', category: 'Nekovy', options: ['Vápník', 'Chlór', 'Měď'] },
        { term: 'N', definition: 'Dusík', category: 'Nekovy', options: ['Sodík', 'Neon', 'Nikl'] },
        { term: 'Fe', definition: 'Železo', category: 'Kovy', options: ['Fluor', 'Fosfor', 'Francium'] },
        { term: 'Au', definition: 'Zlato', category: 'Kovy', options: ['Stříbro', 'Měď', 'Hliník'] },
        { term: 'Ag', definition: 'Stříbro', category: 'Kovy', options: ['Zlato', 'Měď', 'Platina'] },
        { term: 'Cu', definition: 'Měď', category: 'Kovy', options: ['Zinek', 'Cín', 'Olovo'] },
        { term: 'Na', definition: 'Sodík', category: 'Kovy', options: ['Draslík', 'Hořčík', 'Vápník'] },
        { term: 'Cl', definition: 'Chlór', category: 'Nekovy', options: ['Uhlík', 'Vápník', 'Cín'] },
        { term: 'Ne', definition: 'Neon', category: 'Vzácné plyny', options: ['Argon', 'Krypton', 'Xenon'] },
        { term: 'Ar', definition: 'Argon', category: 'Vzácné plyny', options: ['Neon', 'Kyslík', 'Dusík'] },
        { term: 'Pb', definition: 'Olovo', category: 'Kovy', options: ['Platina', 'Paladium', 'Fosfor'] },
        { term: 'Al', definition: 'Hliník', category: 'Kovy', options: ['Antimon', 'Arsen', 'Americium'] }
      ]
    }
  ]
};
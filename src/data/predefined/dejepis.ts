import { Category } from "../studyData";

export const dejepis: Category = {
  id: 'dejepis',
  title: 'Dějepis',
  iconName: 'History',
  color: 'bg-orange-800',
  topics: [
    {
      id: 'ceske-dejiny-milniky',
      name: 'Klíčová data českých dějin',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
      items: [
        { term: '863', definition: 'Příchod Konstantina a Metoděje', options: ['Vznik ČSR', 'Bitva na Bílé hoře', 'Upálení Jana Husa'] },
        { term: '1212', definition: 'Zlatá bula sicilská', options: ['Založení univerzity', 'Bitva u Lipan', 'Vznik Rakouska-Uherska'] },
        { term: '1348', definition: 'Založení Karlovy univerzity', options: ['Bitva na Moravském poli', 'Nástup Habsburků', 'Husitské války'] },
        { term: '1415', definition: 'Upálení mistra Jana Husa', options: ['Bitva u Sudoměře', 'Zvolení Jiřího z Poděbrad', 'Defenestrace'] },
        { term: '1620', definition: 'Bitva na Bílé hoře', options: ['Třicetiletá válka končí', 'Zrušení nevolnictví', 'Prusko-rakouská válka'] },
        { term: '1918', definition: 'Vznik Československa', options: ['Konec 2. světové války', 'Mnichovská dohoda', 'Vstup do EU'] },
        { term: '1939', definition: 'Začátek německé okupace', options: ['Vznik ČSR', 'Pražské jaro', 'Sametová revoluce'] },
        { term: '1945', definition: 'Konec 2. světové války v Evropě', options: ['Vznik NATO', 'Únorový převrat', 'Rozpad SSSR'] },
        { term: '1968', definition: 'Invaze vojsk Varšavské smlouvy', options: ['Sametová revoluce', 'Vznik ČR', 'Konec monarchie'] },
        { term: '1989', definition: 'Sametová revoluce', options: ['Rozdělení ČSFR', 'Vstup do OSN', 'První lety do vesmíru'] }
      ]
    },
    {
      id: 'panovnici-premyslovci',
      name: 'Přemyslovští panovníci',
      allowedModes: ['flashcards', 'abcd', 'matching', 'sorting'],
      items: [
        { term: 'Bořivoj I.', definition: 'První historicky doložený kníže', category: 'Knížata', options: ['Svatý Václav', 'Boleslav I.', 'Vratislav II.'] },
        { term: 'Svatý Václav', definition: 'Patron české země, zavražděn bratrem', category: 'Knížata', options: ['Oldřich', 'Jaromír', 'Spytihněv I.'] },
        { term: 'Vratislav II.', definition: 'První český král (nedědičný)', category: 'Králové', options: ['Přemysl Otakar I.', 'Václav I.', 'Boleslav II.'] },
        { term: 'Přemysl Otakar I.', definition: 'Získal dědičný královský titul', category: 'Králové', options: ['Václav II.', 'Přemysl Otakar II.', 'Jan Lucemburský'] },
        { term: 'Přemysl Otakar II.', definition: 'Král železný a zlatý', category: 'Králové', options: ['Václav III.', 'Břetislav I.', 'Soběslav I.'] },
        { term: 'Václav III.', definition: 'Poslední Přemyslovec, zavražděn v Olomouci', category: 'Králové', options: ['Karel IV.', 'Zikmund', 'Jiří z Poděbrad'] }
      ]
    }
  ]
};
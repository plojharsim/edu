import { Category } from "../studyData";

export const nemcina: Category = {
  id: 'german',
  title: 'Němčina',
  iconName: 'Languages',
  color: 'bg-amber-600',
  topics: [
    {
      id: 'german-klett-3-2',
      name: 'Klett Maximal interaktiv 2 - Lekce 3.2',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
      randomizeDirection: true,
      targetGrades: ['9. třída ZŠ'],
      items: [
        { term: 'Bad', definition: 'koupelna', category: 'das', options: ['kuchyně', 'zahrada', 'ložnice'] },
        { term: 'euer / eure', definition: 'váš / vaše', category: '—', options: ['náš / naše', 'můj / moje', 'jejich'] },
        { term: 'fein', definition: 'fajn, bezva', category: '—', options: ['praktický', 'obrovský', 'útulný'] },
        { term: 'Garten', definition: 'zahrada', category: 'der', options: ['dům', 'koupelna', 'pokoj'] },
        { term: 'gemütlich', definition: 'útulný', category: '—', options: ['praktický', 'obrovský', 'nový'] },
        { term: 'Haus', definition: 'dům', category: 'das', options: ['byt', 'zahrada', 'pokoj'] },
        { term: 'hinten', definition: 'vzadu', category: '—', options: ['nahoře', 'dole', 'vpravo'] },
        { term: 'Küche', definition: 'kuchyně', category: 'die', options: ['ložnice', 'koupelna', 'zahrada'] },
        { term: 'oben', definition: 'nahoře', category: '—', options: ['dole', 'vzadu', 'vpravo'] },
        { term: 'praktisch', definition: 'praktický', category: '—', options: ['útulný', 'obrovský', 'fajn'] },
        { term: 'rechts', definition: 'vpravo', category: '—', options: ['vlevo', 'nahoře', 'dole'] },
        { term: 'riesig', definition: 'obrovský', category: '—', options: ['malý', 'praktický', 'útulný'] },
        { term: 'Schlafzimmer', definition: 'ložnice', category: 'das', options: ['kuchyně', 'koupelna', 'obývací pokoj'] },
        { term: 'unser / unsere', definition: 'náš / naše', category: '—', options: ['váš / vaše', 'můj / moje', 'její'] },
        { term: 'unten', definition: 'dole', category: '—', options: ['nahoře', 'vzadu', 'vpravo'] },
        { term: 'Wohnzimmer', definition: 'obývací pokoj', category: 'das', options: ['ložnice', 'kuchyně', 'koupelna'] },
        { term: 'Chips', definition: 'chipsy', category: 'die', options: ['čokoláda', 'zmrzlina', 'chléb'] },
        { term: 'Schokolade', definition: 'čokoláda', category: 'die', options: ['bonbon', 'zmrzlina', 'chipsy'] },
        { term: 'Eis', definition: 'zmrzlina', category: 'das', options: ['koláč', 'chipsy', 'čokoláda'] },
        { term: 'Kühlschrank', definition: 'lednice', category: 'der', options: ['sporák', 'skříň', 'stůl'] },
        { term: 'hungrig', definition: 'hladový', category: '—', options: ['žíznivý', 'sytý', 'unavený'] },
        { term: 'durstig', definition: 'žíznivý', category: '—', options: ['hladový', 'veselý', 'líný'] }
      ]
    }
  ]
};
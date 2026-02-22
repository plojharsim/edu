export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching' | 'sorting';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  category?: string;
}

export interface Topic {
  id: string;
  name: string;
  items: StudyItem[];
  allowedModes?: StudyMode[];
  randomizeDirection?: boolean;
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
  iconName?: string;
  color?: string;
  isCustom?: boolean;
}

export const PREDEFINED_DATA: Record<string, Category> = {
  anglictina: {
    id: 'anglictina',
    title: 'Angličtina',
    iconName: 'Languages',
    color: 'bg-sky-600',
    topics: [
      {
        id: 'gogetter-4-unit-5',
        name: 'GoGetter 4 – Unit 5',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
        items: [
          { term: 'vážná hudba', definition: 'classical', category: 'Žánry', options: ['folk', 'jazz', 'opera'] },
          { term: 'folk', definition: 'folk', category: 'Žánry', options: ['rock', 'pop', 'latin'] },
          { term: 'heavy metal', definition: 'heavy metal', category: 'Žánry', options: ['rock', 'punk', 'techno'] },
          { term: 'hip hop', definition: 'hip hop', category: 'Žánry', options: ['jazz', 'pop', 'rock'] },
          { term: 'jazz', definition: 'jazz', category: 'Žánry', options: ['blues', 'rock', 'folk'] },
          { term: 'violoncello', definition: 'cello', category: 'Nástroje', options: ['violin', 'piano', 'flute'] },
          { term: 'bicí bubny', definition: 'drums', category: 'Nástroje', options: ['drum kit', 'cymbals', 'percussion'] },
          { term: 'flétna', definition: 'flute', category: 'Nástroje', options: ['clarinet', 'violin', 'trumpet'] },
          { term: 'klavír', definition: 'piano', category: 'Nástroje', options: ['keyboard', 'organ', 'cello'] },
          { term: 'zločinec', definition: 'criminal', category: 'Krimi', options: ['thief', 'robber', 'suspect'] },
          { term: 'detektiv', definition: 'detective', category: 'Krimi', options: ['policeman', 'officer', 'agent'] },
          { term: 'vězení', definition: 'prison', category: 'Krimi', options: ['jail', 'court', 'police station'] }
        ]
      }
    ]
  },
  nemcina: {
    id: 'nemcina',
    title: 'Němčina',
    iconName: 'Languages',
    color: 'bg-amber-600',
    topics: [
      {
        id: 'klett-maximal-2-lekce-3-2',
        name: 'Klett Maximal interaktiv 2 - Lekce 3.2',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
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
  },
  zemepis: {
    id: 'zemepis',
    title: 'Zeměpis',
    iconName: 'Globe',
    color: 'bg-emerald-600',
    topics: [
      {
        id: 'evropa-mesta',
        name: 'Hlavní města Evropy',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
        items: [
          { term: 'Praha', definition: 'Česko', category: 'Střední Evropa', options: ['Brno', 'Bratislava', 'Vídeň'] },
          { term: 'Bratislava', definition: 'Slovensko', category: 'Střední Evropa', options: ['Košice', 'Praha', 'Budapešť'] },
          { term: 'Berlín', definition: 'Německo', category: 'Střední Evropa', options: ['Mnichov', 'Hamburk', 'Frankfurt'] },
          { term: 'Vídeň', definition: 'Rakousko', category: 'Střední Evropa', options: ['Linec', 'Salcburk', 'Štýrský Hradec'] },
          { term: 'Paříž', definition: 'Francie', category: 'Západní Evropa', options: ['Lyon', 'Marseille', 'Londýn'] },
          { term: 'Madrid', definition: 'Španělsko', category: 'Jižní Evropa', options: ['Barcelona', 'Valencie', 'Sevilla'] },
          { term: 'Řím', definition: 'Itálie', category: 'Jižní Evropa', options: ['Milán', 'Neapol', 'Benátky'] }
        ]
      }
    ]
  }
};
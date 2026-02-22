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
          { term: 'koupelna', definition: 'Bad', category: 'Lekce 3.2', options: ['kuchyně', 'zahrada', 'ložnice'] },
          { term: 'váš / vaše', definition: 'euer / eure', category: 'Lekce 3.2', options: ['náš / naše', 'můj / moje', 'jejich'] },
          { term: 'fajn, bezva', definition: 'fein', category: 'Lekce 3.2', options: ['praktický', 'obrovský', 'útulný'] },
          { term: 'zahrada', definition: 'Garten', category: 'Lekce 3.2', options: ['dům', 'koupelna', 'pokoj'] },
          { term: 'útulný', definition: 'gemütlich', category: 'Lekce 3.2', options: ['praktický', 'obrovský', 'nový'] },
          { term: 'dům', definition: 'Haus', category: 'Lekce 3.2', options: ['byt', 'zahrada', 'pokoj'] },
          { term: 'vzadu', definition: 'hinten', category: 'Lekce 3.2', options: ['nahoře', 'dole', 'vpravo'] },
          { term: 'kuchyně', definition: 'Küche', category: 'Lekce 3.2', options: ['ložnice', 'koupelna', 'zahrada'] },
          { term: 'nahoře', definition: 'oben', category: 'Lekce 3.2', options: ['dole', 'vzadu', 'vpravo'] },
          { term: 'praktický', definition: 'praktisch', category: 'Lekce 3.2', options: ['útulný', 'obrovský', 'fajn'] },
          { term: 'vpravo', definition: 'rechts', category: 'Lekce 3.2', options: ['vlevo', 'nahoře', 'dole'] },
          { term: 'obrovský', definition: 'riesig', category: 'Lekce 3.2', options: ['malý', 'praktický', 'útulný'] },
          { term: 'ložnice', definition: 'Schlafzimmer', category: 'Lekce 3.2', options: ['kuchyně', 'koupelna', 'obývací pokoj'] },
          { term: 'náš / naše', definition: 'unser / unsere', category: 'Lekce 3.2', options: ['váš / vaše', 'můj / moje', 'její'] },
          { term: 'dole', definition: 'unten', category: 'Lekce 3.2', options: ['nahoře', 'vzadu', 'vpravo'] },
          { term: 'obývací pokoj', definition: 'Wohnzimmer', category: 'Lekce 3.2', options: ['ložnice', 'kuchyně', 'koupelna'] },
          { term: 'chipsy', definition: 'Chips', category: 'Lekce 3.2', options: ['čokoláda', 'zmrzlina', 'chléb'] },
          { term: 'čokoláda', definition: 'Schokolade', category: 'Lekce 3.2', options: ['bonbon', 'zmrzlina', 'chipsy'] },
          { term: 'zmrzlina', definition: 'Eis', category: 'Lekce 3.2', options: ['koláč', 'chipsy', 'čokoláda'] },
          { term: 'lednice', definition: 'Kühlschrank', category: 'Lekce 3.2', options: ['sporák', 'skříň', 'stůl'] },
          { term: 'hladový', definition: 'hungrig', category: 'Lekce 3.2', options: ['žíznivý', 'sytý', 'unavený'] },
          { term: 'žíznivý', definition: 'durstig', category: 'Lekce 3.2', options: ['hladový', 'veselý', 'líný'] }
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
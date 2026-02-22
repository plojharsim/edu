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
          { term: 'koupelna', definition: 'Bad', category: 'das', options: ['Küche', 'Garten', 'Schlafzimmer'] },
          { term: 'váš / vaše', definition: 'euer / eure', category: '—', options: ['unser / unsere', 'mein / meine', 'ihr / ihre'] },
          { term: 'fajn, bezva', definition: 'fein', category: '—', options: ['praktisch', 'riesig', 'gemütlich'] },
          { term: 'zahrada', definition: 'Garten', category: 'der', options: ['Haus', 'Bad', 'Zimmer'] },
          { term: 'útulný', definition: 'gemütlich', category: '—', options: ['praktisch', 'riesig', 'neu'] },
          { term: 'dům', definition: 'Haus', category: 'das', options: ['Wohnung', 'Garten', 'Zimmer'] },
          { term: 'vzadu', definition: 'hinten', category: '—', options: ['oben', 'unten', 'rechts'] },
          { term: 'kuchyně', definition: 'Küche', category: 'die', options: ['Schlafzimmer', 'Bad', 'Garten'] },
          { term: 'nahoře', definition: 'oben', category: '—', options: ['unten', 'hinten', 'rechts'] },
          { term: 'praktický', definition: 'praktisch', category: '—', options: ['gemütlich', 'riesig', 'fein'] },
          { term: 'vpravo', definition: 'rechts', category: '—', options: ['links', 'oben', 'unten'] },
          { term: 'obrovský', definition: 'riesig', category: '—', options: ['klein', 'praktisch', 'gemütlich'] },
          { term: 'ložnice', definition: 'Schlafzimmer', category: 'das', options: ['Küche', 'Bad', 'Wohnzimmer'] },
          { term: 'náš / naše', definition: 'unser / unsere', category: '—', options: ['euer / eure', 'mein / meine', 'ihr / ihre'] },
          { term: 'dole', definition: 'unten', category: '—', options: ['oben', 'hinten', 'rechts'] },
          { term: 'obývací pokoj', definition: 'Wohnzimmer', category: 'das', options: ['Schlafzimmer', 'Küche', 'Bad'] },
          { term: 'chipsy', definition: 'Chips', category: 'die', options: ['Schokolade', 'Eis', 'Brot'] },
          { term: 'čokoláda', definition: 'Schokolade', category: 'die', options: ['Bonbon', 'Eis', 'Chips'] },
          { term: 'zmrzlina', definition: 'Eis', category: 'das', options: ['Kuchen', 'Chips', 'Schokolade'] },
          { term: 'lednice', definition: 'Kühlschrank', category: 'der', options: ['Herd', 'Schrank', 'Tisch'] },
          { term: 'hladový', definition: 'hungrig', category: '—', options: ['durstig', 'satt', 'müde'] },
          { term: 'žíznivý', definition: 'durstig', category: '—', options: ['hungrig', 'fröhlich', 'faul'] }
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
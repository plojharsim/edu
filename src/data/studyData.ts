export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching' | 'sorting';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  group?: string; // Kategorie pro režim rozřazování
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
          { term: 'vážná hudba', definition: 'classical', options: ['folk', 'jazz', 'opera'], group: 'Žánry' },
          { term: 'folk', definition: 'folk', options: ['rock', 'pop', 'latin'], group: 'Žánry' },
          { term: 'heavy metal', definition: 'heavy metal', options: ['rock', 'punk', 'techno'], group: 'Žánry' },
          { term: 'hip hop', definition: 'hip hop', options: ['jazz', 'pop', 'rock'], group: 'Žánry' },
          { term: 'jazz', definition: 'jazz', options: ['blues', 'rock', 'folk'], group: 'Žánry' },
          { term: 'violoncello', definition: 'cello', options: ['violin', 'piano', 'flute'], group: 'Nástroje' },
          { term: 'bicí bubny', definition: 'drums', options: ['drum kit', 'cymbals', 'percussion'], group: 'Nástroje' },
          { term: 'elektrická kytara', definition: 'electric guitar', options: ['acoustic guitar', 'bass guitar', 'violin'], group: 'Nástroje' },
          { term: 'flétna', definition: 'flute', options: ['clarinet', 'violin', 'trumpet'], group: 'Nástroje' },
          { term: 'koncertovat', definition: 'give a concert', options: ['play music', 'record music', 'perform live'], group: 'Činnosti' },
          { term: 'jít na turné', definition: 'go on tour', options: ['travel abroad', 'play locally', 'record an album'], group: 'Činnosti' },
          { term: 'nahrát album', definition: 'record an album', options: ['release a single', 'write lyrics', 'go on tour'], group: 'Činnosti' },
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
          { term: 'Praha', definition: 'Česko', options: ['Brno', 'Bratislava', 'Vídeň'], group: 'Střední Evropa' },
          { term: 'Bratislava', definition: 'Slovensko', options: ['Košice', 'Praha', 'Budapešť'], group: 'Střední Evropa' },
          { term: 'Varšava', definition: 'Polsko', options: ['Krakov', 'Vratislav', 'Gdaňsk'], group: 'Střední Evropa' },
          { term: 'Paříž', definition: 'Francie', options: ['Lyon', 'Marseille', 'Londýn'], group: 'Západní Evropa' },
          { term: 'Berlín', definition: 'Německo', options: ['Mnichov', 'Hamburk', 'Frankfurt'], group: 'Západní Evropa' },
          { term: 'Madrid', definition: 'Španělsko', options: ['Barcelona', 'Valencie', 'Sevilla'], group: 'Jižní Evropa' },
          { term: 'Řím', definition: 'Itálie', options: ['Milán', 'Neapol', 'Benátky'], group: 'Jižní Evropa' },
        ]
      }
    ]
  }
};

export const getStudyData = (): Record<string, Category> => {
  const saved = localStorage.getItem('user_topics');
  const userTopics: Topic[] = saved ? JSON.parse(saved) : [];
  
  const data = { ...PREDEFINED_DATA };
  
  if (userTopics.length > 0) {
    data['custom'] = {
      id: 'custom',
      title: 'Vlastní',
      iconName: 'BookText',
      color: 'bg-indigo-600',
      isCustom: true,
      topics: userTopics
    };
  }
  
  return data;
};

export const saveUserTopics = (topics: Topic[]) => {
  localStorage.setItem('user_topics', JSON.stringify(topics));
};
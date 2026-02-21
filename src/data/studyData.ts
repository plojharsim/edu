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
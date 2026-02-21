export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  isAbcdEnabled?: boolean;
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
  zemepis: {
    id: 'zemepis',
    title: 'Zeměpis',
    iconName: 'Globe',
    color: 'bg-emerald-600',
    topics: [
      {
        id: 'evropa-mesta',
        name: 'Hlavní města Evropy',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          {
            term: 'Česko',
            definition: 'Praha',
            options: ['Brno', 'Bratislava', 'Vídeň'],
            isAbcdEnabled: true
          },
          {
            term: 'Slovensko',
            definition: 'Bratislava',
            options: ['Košice', 'Praha', 'Budapešť'],
            isAbcdEnabled: true
          },
          {
            term: 'Francie',
            definition: 'Paříž',
            options: ['Lyon', 'Marseille', 'Londýn'],
            isAbcdEnabled: true
          },
          {
            term: 'Německo',
            definition: 'Berlín',
            options: ['Mnichov', 'Hamburk', 'Frankfurt'],
            isAbcdEnabled: true
          },
          {
            term: 'Itálie',
            definition: 'Řím',
            options: ['Milán', 'Neapol', 'Benátky'],
            isAbcdEnabled: true
          },
          {
            term: 'Španělsko',
            definition: 'Madrid',
            options: ['Barcelona', 'Valencie', 'Sevilla'],
            isAbcdEnabled: true
          },
          {
            term: 'Rakousko',
            definition: 'Vídeň',
            options: ['Linec', 'Salcburk', 'Štýrský Hradec'],
            isAbcdEnabled: true
          },
          {
            term: 'Polsko',
            definition: 'Varšava',
            options: ['Krakov', 'Vratislav', 'Gdaňsk'],
            isAbcdEnabled: true
          }
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
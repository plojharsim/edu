export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
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
            options: ['Brno', 'Bratislava', 'Vídeň']
          },
          {
            term: 'Slovensko',
            definition: 'Bratislava',
            options: ['Košice', 'Praha', 'Budapešť']
          },
          {
            term: 'Francie',
            definition: 'Paříž',
            options: ['Lyon', 'Marseille', 'Londýn']
          },
          {
            term: 'Německo',
            definition: 'Berlín',
            options: ['Mnichov', 'Hamburk', 'Frankfurt']
          },
          {
            term: 'Itálie',
            definition: 'Řím',
            options: ['Milán', 'Neapol', 'Benátky']
          },
          {
            term: 'Španělsko',
            definition: 'Madrid',
            options: ['Barcelona', 'Valencie', 'Sevilla']
          },
          {
            term: 'Rakousko',
            definition: 'Vídeň',
            options: ['Linec', 'Salcburk', 'Štýrský Hradec']
          },
          {
            term: 'Polsko',
            definition: 'Varšava',
            options: ['Krakov', 'Vratislav', 'Gdaňsk']
          }
        ]
      }
    ]
  },
  chemie: {
    id: 'chemie',
    title: 'Chemie',
    iconName: 'Beaker',
    color: 'bg-blue-600',
    topics: [
      {
        id: 'periodicka-soustava-zaklady',
        name: 'Periodická soustava (1-10)',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          { term: 'H', definition: 'Vodík', options: ['Helium', 'Lithium', 'Hafnium'] },
          { term: 'He', definition: 'Helium', options: ['Vodík', 'Neon', 'Hafnium'] },
          { term: 'Li', definition: 'Lithium', options: ['Berylium', 'Sodík', 'Draslík'] },
          { term: 'Be', definition: 'Berylium', options: ['Bor', 'Baryum', 'Brom'] },
          { term: 'B', definition: 'Bor', options: ['Berylium', 'Brom', 'Baryum'] },
          { term: 'C', definition: 'Uhlík', options: ['Dusík', 'Kyslík', 'Chlor'] },
          { term: 'N', definition: 'Dusík', options: ['Neon', 'Nikl', 'Uhlík'] },
          { term: 'O', definition: 'Kyslík', options: ['Vodík', 'Osmium', 'Draslík'] },
          { term: 'F', definition: 'Fluor', options: ['Fosfor', 'Francium', 'Železo'] },
          { term: 'Ne', definition: 'Neon', options: ['Dusík', 'Nikl', 'Sodík'] }
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
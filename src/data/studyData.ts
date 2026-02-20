export interface StudyItem {
  id: string;
  term: string;
  definition: string;
  options: string[];
  isAbcdEnabled?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  items: StudyItem[];
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
  isCustom?: boolean;
}

export const PREDEFINED_DATA: Record<string, Category> = {
  english: {
    id: "english",
    title: "Angličtina",
    topics: [
      {
        id: "animals",
        name: "Zvířata",
        items: [
          { id: "1", term: "Dog", definition: "Pes", options: ["Kočka", "Pes", "Kůň", "Vlk"], isAbcdEnabled: true },
          { id: "2", term: "Cat", definition: "Kočka", options: ["Pes", "Kočka", "Myš", "Pták"], isAbcdEnabled: true },
          { id: "3", term: "Horse", definition: "Kůň", options: ["Kráva", "Kůň", "Ovce", "Prase"], isAbcdEnabled: true },
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
      isCustom: true,
      topics: userTopics
    };
  }
  
  return data;
};

export const saveUserTopics = (topics: Topic[]) => {
  localStorage.setItem('user_topics', JSON.stringify(topics));
};
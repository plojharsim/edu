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

// Magické načtení všech souborů ze složky subjects
const modules = import.meta.glob("./subjects/*.ts", { eager: true });

export const PREDEFINED_DATA: Record<string, Category> = Object.entries(modules).reduce((acc, [path, module]) => {
  const category = (module as { default: Category }).default;
  if (category && category.id) {
    acc[category.id] = category;
  }
  return acc;
}, {} as Record<string, Category>);

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
import { english } from "./subjects/english";
import { biology } from "./subjects/biology";
import { history } from "./subjects/history";
import { music } from "./subjects/music";

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
  iconName: string; // Např. 'Microscope', 'Languages', 'FlaskConical'
  color: string;    // Např. 'bg-indigo-500'
  topics: Topic[];
  isCustom?: boolean;
}

export const PREDEFINED_DATA: Record<string, Category> = {
  english,
  biology,
  history,
  music
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
      color: 'bg-slate-500',
      isCustom: true,
      topics: userTopics
    };
  }
  
  return data;
};

export const saveUserTopics = (topics: Topic[]) => {
  localStorage.setItem('user_topics', JSON.stringify(topics));
};
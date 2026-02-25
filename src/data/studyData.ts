import { PREDEFINED_DATA as PREDEFINED_IMPORT } from "./predefined";

export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching' | 'sorting';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  category?: string;
  imageUrl?: string;
}

export interface Topic {
  id: string;
  name: string;
  items: StudyItem[];
  allowedModes?: StudyMode[];
  randomizeDirection?: boolean;
  isDynamic?: boolean;
  dynamicType?: 'math';
  isPublic?: boolean;
  authorName?: string;
  authorGrade?: string;
  targetGrades?: string[]; // Nové pole pro filtrování podle ročníku
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
  iconName?: string;
  color?: string;
  isCustom?: boolean;
}

export const PREDEFINED_DATA = PREDEFINED_IMPORT;
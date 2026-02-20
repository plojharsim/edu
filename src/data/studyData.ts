export interface StudyItem {
  id: string;
  term: string;
  definition: string;
  options: string[];
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
}

const DEFAULT_DATA: Record<string, Category> = {
  english: {
    id: "english",
    title: "Angličtina",
    topics: [
      {
        id: "animals",
        name: "Zvířata",
        items: [
          { id: "1", term: "Dog", definition: "Pes", options: ["Kočka", "Pes", "Kůň", "Vlk"] },
          { id: "2", term: "Cat", definition: "Kočka", options: ["Pes", "Kočka", "Myš", "Pták"] },
          { id: "3", term: "Horse", definition: "Kůň", options: ["Kráva", "Kůň", "Ovce", "Prase"] },
        ]
      }
    ]
  }
};

export const getStudyData = (): Record<string, Category> => {
  const saved = localStorage.getItem('study_data');
  if (saved) return JSON.parse(saved);
  return DEFAULT_DATA;
};

export const saveStudyData = (data: Record<string, Category>) => {
  localStorage.setItem('study_data', JSON.stringify(data));
};
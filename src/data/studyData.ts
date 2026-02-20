export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching';

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
  allowedModes?: StudyMode[];
  randomizeDirection?: boolean; // Nové nastavení pro náhodný směr
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
  english: {
    id: "english",
    title: "Angličtina",
    iconName: "Languages",
    color: "bg-indigo-500",
    topics: [
      {
        id: "animals",
        name: "Zvířata",
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          { id: "e1", term: "Dog", definition: "Pes", options: ["Kočka", "Pes", "Kůň", "Vlk"], isAbcdEnabled: true },
          { id: "e2", term: "Cat", definition: "Kočka", options: ["Pes", "Kočka", "Myš", "Pták"], isAbcdEnabled: true },
          { id: "e3", term: "Horse", definition: "Kůň", options: ["Kráva", "Kůň", "Ovce", "Prase"], isAbcdEnabled: true },
        ]
      }
    ]
  },
  biology: {
    id: "biology",
    title: "Biologie",
    iconName: "Microscope",
    color: "bg-emerald-500",
    topics: [
      {
        id: "cells",
        name: "Buňka",
        allowedModes: ['flashcards', 'abcd', 'writing'],
        randomizeDirection: false,
        items: [
          { id: "b1", term: "Mitochondrie", definition: "Energetické centrum buňky", options: ["Jádro", "Ribozom", "Vakuola"], isAbcdEnabled: true },
          { id: "b2", term: "Chloroplast", definition: "Místo fotosyntézy", options: ["Cytoplazma", "Buněčná stěna", "Lysozom"], isAbcdEnabled: true },
          { id: "b3", term: "DNA", definition: "Nositelka genetické informace", options: ["Bílkovina", "Cukr", "Tuk"], isAbcdEnabled: true },
        ]
      }
    ]
  },
  history: {
    id: "history",
    title: "Dějepis",
    iconName: "History",
    color: "bg-amber-500",
    topics: [
      {
        id: "middle-ages",
        name: "Středověk",
        allowedModes: ['flashcards', 'abcd', 'matching'],
        randomizeDirection: false,
        items: [
          { id: "h1", term: "1348", definition: "Založení Karlovy univerzity", options: ["Bitva na Bílé hoře", "Upálení Jana Husa", "Zlatá bula sicilská"], isAbcdEnabled: true },
          { id: "h2", term: "Karel IV.", definition: "Otec vlasti", options: ["Jan Žižka", "Jiří z Poděbrad", "Rudolf II."], isAbcdEnabled: true },
          { id: "h3", term: "1415", definition: "Upálení mistra Jana Husa", options: ["Objevení Ameriky", "Bitva u Lipan", "Vpád Tatarů"], isAbcdEnabled: true },
        ]
      }
    ]
  },
  music: {
    id: "music",
    title: "Hudební výchova",
    iconName: "Music",
    color: "bg-rose-500",
    topics: [
      {
        id: "composers",
        name: "Skladatelé",
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          { id: "m1", term: "B. Smetana", definition: "Má vlast", options: ["Rusalka", "Slovanské tance", "Osud"], isAbcdEnabled: true },
          { id: "m2", term: "A. Dvořák", definition: "Z Nového světa", options: ["Libuše", "Prodaná nevěsta", "Don Giovanni"], isAbcdEnabled: true },
          { id: "m3", term: "W. A. Mozart", definition: "Figarova svatba", options: ["Devátá symfonie", "Čtvero ročních dob", "Labutí jezero"], isAbcdEnabled: true },
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
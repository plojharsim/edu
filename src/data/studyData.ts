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
    topics: [
      {
        id: "cells",
        name: "Buňka",
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
    topics: [
      {
        id: "middle-ages",
        name: "Středověk",
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
    topics: [
      {
        id: "composers",
        name: "Skladatelé",
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
      isCustom: true,
      topics: userTopics
    };
  }
  
  return data;
};

export const saveUserTopics = (topics: Topic[]) => {
  localStorage.setItem('user_topics', JSON.stringify(topics));
};
export interface StudyItem {
  id: number;
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

export const CATEGORY_DATA: Record<string, Category> = {
  english: {
    id: "english",
    title: "Angličtina",
    topics: [
      {
        id: "animals",
        name: "Zvířata",
        items: [
          { id: 1, term: "Dog", definition: "Pes", options: ["Kočka", "Pes", "Kůň", "Vlk"] },
          { id: 2, term: "Cat", definition: "Kočka", options: ["Pes", "Kočka", "Myš", "Pták"] },
          { id: 3, term: "Horse", definition: "Kůň", options: ["Kráva", "Kůň", "Ovce", "Prase"] },
        ]
      },
      {
        id: "food",
        name: "Jídlo",
        items: [
          { id: 4, term: "Apple", definition: "Jablko", options: ["Pomeranč", "Banan", "Jablko", "Hruška"] },
          { id: 5, term: "Bread", definition: "Chléb", options: ["Máslo", "Chléb", "Mléko", "Sýr"] },
        ]
      }
    ]
  },
  biology: {
    id: "biology",
    title: "Biologie",
    topics: [
      {
        id: "cell",
        name: "Buňka",
        items: [
          { id: 1, term: "Mitochondrie", definition: "Energetické centrum buňky", options: ["Odpadní koš buňky", "Energetické centrum buňky", "Řídící centrum", "Výroba bílkovin"] },
          { id: 2, term: "Jádro", definition: "Řídící centrum buňky", options: ["Výroba energie", "Řídící centrum buňky", "Skladování vody", "Ochranný obal"] },
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
          { id: 1, term: "Založení Karlovy univerzity", definition: "1348", options: ["1212", "1348", "1415", "1620"] },
          { id: 2, term: "Upálení Jana Husa", definition: "1415", options: ["1348", "1415", "1526", "1618"] },
        ]
      }
    ]
  },
  music: {
    id: "music",
    title: "Hudební nauka",
    topics: [
      {
        id: "basics",
        name: "Základy",
        items: [
          { id: 1, term: "Houslový klíč", definition: "G klíč", options: ["F klíč", "C klíč", "G klíč", "A klíč"] },
          { id: 2, term: "Tempo Allegro", definition: "Rychle", options: ["Pomalu", "Mírně", "Rychle", "Velmi pomalu"] },
        ]
      }
    ]
  }
};
import { Category } from "../studyData";

export const english: Category = {
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
};
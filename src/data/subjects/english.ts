import { Category } from "../studyData";

export const english: Category = {
  id: "english",
  title: "Angličtina",
  iconName: "Languages",
  color: "bg-indigo-500",
  topics: [
    {
      id: "animals",
      name: "Zvířata",
      items: [
        { id: "e1", term: "Dog", definition: "Pes", options: ["Kočka", "Pes", "Kůň", "Vlk"], isAbcdEnabled: true },
        { id: "e2", term: "Cat", definition: "Kočka", options: ["Pes", "Kočka", "Myš", "Pták"], isAbcdEnabled: true },
      ]
    }
  ]
};
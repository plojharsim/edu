import { Category } from "../studyData";

export const history: Category = {
  id: "history",
  title: "Dějepis",
  iconName: "History",
  color: "bg-amber-500",
  topics: [
    {
      id: "middle-ages",
      name: "Středověk",
      items: [
        { id: "h1", term: "1348", definition: "Založení Karlovy univerzity", options: ["Bitva na Bílé hoře", "Upálení Jana Husa"], isAbcdEnabled: true },
      ]
    }
  ]
};
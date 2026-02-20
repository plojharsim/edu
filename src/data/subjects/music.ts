import { Category } from "../studyData";

export const music: Category = {
  id: "music",
  title: "Hudební výchova",
  iconName: "Music",
  color: "bg-rose-500",
  topics: [
    {
      id: "composers",
      name: "Skladatelé",
      items: [
        { id: "m1", term: "B. Smetana", definition: "Má vlast", options: ["Rusalka", "Slovanské tance"], isAbcdEnabled: true },
      ]
    }
  ]
};
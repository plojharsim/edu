import { Category } from "../studyData";

export const biology: Category = {
  id: "biology",
  title: "Biologie",
  iconName: "Microscope",
  color: "bg-emerald-500",
  topics: [
    {
      id: "cells",
      name: "Buňka",
      items: [
        { id: "b1", term: "Mitochondrie", definition: "Energetické centrum buňky", options: ["Jádro", "Ribozom", "Vakuola"], isAbcdEnabled: true },
      ]
    }
  ]
};
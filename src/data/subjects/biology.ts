import { Category } from "../studyData";

const biology: Category = {
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
};

export default biology;
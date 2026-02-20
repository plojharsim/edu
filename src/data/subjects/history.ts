import { Category } from "../studyData";

const history: Category = {
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
};

export default history;
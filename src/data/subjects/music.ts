import { Category } from "../studyData";

const music: Category = {
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
};

export default music;
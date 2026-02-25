import { Category } from "../studyData";

export const zemepis: Category = {
  id: 'zemepis',
  title: 'Zeměpis',
  iconName: 'Globe',
  color: 'bg-emerald-600',
  topics: [
    {
      id: 'kontinenty-oceany',
      name: 'Kontinenty a oceány',
      allowedModes: ['flashcards', 'abcd', 'matching', 'sorting'],
      items: [
        { term: 'Asie', definition: 'Největší a nejlidnatější světadíl', category: 'Světadíly', options: ['Afrika', 'Amerika', 'Evropa'] },
        { term: 'Afrika', definition: 'Druhý největší světadíl, protíná ho rovník', category: 'Světadíly', options: ['Austrálie', 'Asie', 'Antarktida'] },
        { term: 'Evropa', definition: 'Náš světadíl, poloostrov Eurasie', category: 'Světadíly', options: ['Amerika', 'Austrálie', 'Afrika'] },
        { term: 'Tichý oceán', definition: 'Největší a nejhlubší oceán světa', category: 'Oceány', options: ['Atlantský', 'Indický', 'Severní ledový'] },
        { term: 'Atlantský oceán', definition: 'Druhý největší, mezi Amerikou a Evropou', category: 'Oceány', options: ['Tichý', 'Jižní', 'Indický'] },
        { term: 'Indický oceán', definition: 'Třetí největší, v tropickém pásu', category: 'Oceány', options: ['Atlantský', 'Tichý', 'Severní ledový'] }
      ]
    },
    {
      id: 'cr-reky',
      name: 'Řeky České republiky',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
      items: [
        { term: 'Vltava', definition: 'Nejdelší řeka ČR', options: ['Labe', 'Morava', 'Odra'] },
        { term: 'Labe', definition: 'Pramení v Krkonoších, ústí v Německu', options: ['Vltava', 'Ohře', 'Sázava'] },
        { term: 'Morava', definition: 'Hlavní řeka Moravy, ústí do Dunaje', options: ['Dyje', 'Odra', 'Bečva'] },
        { term: 'Odra', definition: 'Odvádí vodu do Baltského moře', options: ['Labe', 'Vltava', 'Morava'] },
        { term: 'Sázava', definition: 'Řeka přezdívaná Zlatá řeka', options: ['Berounka', 'Ohře', 'Jizera'] }
      ]
    },
    {
      id: 'evropa-mesta',
      name: 'Hlavní města Evropy',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      randomizeDirection: true,
      items: [
        { term: 'Praha', definition: 'Česko', category: 'Střední Evropa', options: ['Brno', 'Bratislava', 'Vídeň'] },
        { term: 'Bratislava', definition: 'Slovensko', category: 'Střední Evropa', options: ['Košice', 'Praha', 'Budapešť'] },
        { term: 'Paříž', definition: 'Francie', category: 'Západní Evropa', options: ['Lyon', 'Marseille', 'Londýn'] },
        { term: 'Madrid', definition: 'Španělsko', category: 'Jižní Evropa', options: ['Barcelona', 'Valencie', 'Sevilla'] },
        { term: 'Řím', definition: 'Itálie', category: 'Jižní Evropa', options: ['Milán', 'Neapol', 'Benátky'] }
      ]
    }
  ]
};
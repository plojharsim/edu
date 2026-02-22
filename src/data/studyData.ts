export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching' | 'sorting';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  category?: string;
}

export interface Topic {
  id: string;
  name: string;
  items: StudyItem[];
  allowedModes?: StudyMode[];
  randomizeDirection?: boolean;
}

export interface Category {
  id: string;
  title: string;
  topics: Topic[];
  iconName?: string;
  color?: string;
  isCustom?: boolean;
}

export const PREDEFINED_DATA: Record<string, Category> = {
  anglictina: {
    id: 'anglictina',
    title: 'Angličtina',
    iconName: 'Languages',
    color: 'bg-sky-600',
    topics: [
      {
        id: 'gogetter-4-unit-5',
        name: 'GoGetter 4 – Unit 5',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
        items: [
          { term: 'vážná hudba', definition: 'classical', category: 'Žánry', options: ['folk', 'jazz', 'opera'] },
          { term: 'folk', definition: 'folk', category: 'Žánry', options: ['rock', 'pop', 'latin'] },
          { term: 'heavy metal', definition: 'heavy metal', category: 'Žánry', options: ['rock', 'punk', 'techno'] },
          { term: 'hip hop', definition: 'hip hop', category: 'Žánry', options: ['jazz', 'pop', 'rock'] },
          { term: 'jazz', definition: 'jazz', category: 'Žánry', options: ['blues', 'rock', 'folk'] },
          { term: 'violoncello', definition: 'cello', category: 'Nástroje', options: ['violin', 'piano', 'flute'] },
          { term: 'bicí bubny', definition: 'drums', category: 'Nástroje', options: ['drum kit', 'cymbals', 'percussion'] },
          { term: 'flétna', definition: 'flute', category: 'Nástroje', options: ['clarinet', 'violin', 'trumpet'] },
          { term: 'klavír', definition: 'piano', category: 'Nástroje', options: ['keyboard', 'organ', 'cello'] },
          { term: 'zločinec', definition: 'criminal', category: 'Krimi', options: ['thief', 'robber', 'suspect'] },
          { term: 'detektiv', definition: 'detective', category: 'Krimi', options: ['policeman', 'officer', 'agent'] },
          { term: 'vězení', definition: 'prison', category: 'Krimi', options: ['jail', 'court', 'police station'] }
        ]
      }
    ]
  },
  zemepis: {
    id: 'zemepis',
    title: 'Zeměpis',
    iconName: 'Globe',
    color: 'bg-emerald-600',
    topics: [
      {
        id: 'evropa-mesta',
        name: 'Hlavní města Evropy',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
        items: [
          { term: 'Praha', definition: 'Česko', category: 'Střední Evropa', options: ['Brno', 'Bratislava', 'Vídeň'] },
          { term: 'Bratislava', definition: 'Slovensko', category: 'Střední Evropa', options: ['Košice', 'Praha', 'Budapešť'] },
          { term: 'Berlín', definition: 'Německo', category: 'Střední Evropa', options: ['Mnichov', 'Hamburk', 'Frankfurt'] },
          { term: 'Vídeň', definition: 'Rakousko', category: 'Střední Evropa', options: ['Linec', 'Salcburk', 'Štýrský Hradec'] },
          { term: 'Paříž', definition: 'Francie', category: 'Západní Evropa', options: ['Lyon', 'Marseille', 'Londýn'] },
          { term: 'Madrid', definition: 'Španělsko', category: 'Jižní Evropa', options: ['Barcelona', 'Valencie', 'Sevilla'] },
          { term: 'Řím', definition: 'Itálie', category: 'Jižní Evropa', options: ['Milán', 'Neapol', 'Benátky'] }
        ]
      }
    ]
  },
  nemcina: {
    id: 'nemcina',
    title: 'Němčina',
    iconName: 'Languages',
    color: 'bg-sky-600',
    topics: [
      {
        id: 'klett-maximal-2-lekce-3-2',
        name: 'Klett Maximal interaktiv 2 - Lekce 3.2',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          { term: 'koupelna', definition: 'Bad', options: ['Küche', 'Zimmer', 'Garten'] },
          { term: 'váš/vaše', definition: 'euer/eure/euer', options: ['unser', 'mein', 'sein'] },
          { term: 'fajn, bezva', definition: 'fein', options: ['hässlich', 'dunkel', 'praktisch'] },
          { term: 'zahrada', definition: 'Garten', options: ['Haus', 'Bad', 'Zimmer'] },
          { term: 'útulný', definition: 'gemütlich', options: ['riesig', 'unpraktisch', 'chaotisch'] },
          { term: 'dům', definition: 'Haus', options: ['Wohnung', 'Garten', 'Zimmer'] },
          { term: 'vzadu', definition: 'hinten', options: ['oben', 'unten', 'links'] },
          { term: 'kuchyně', definition: 'Küche', options: ['Bad', 'Wohnzimmer', 'Schlafzimmer'] },
          { term: 'nahoře', definition: 'oben', options: ['unten', 'hinten', 'rechts'] },
          { term: 'praktický', definition: 'praktisch', options: ['unpraktisch', 'chaotisch', 'perfekt'] },
          { term: 'vpravo, na pravé straně', definition: 'rechts', options: ['links', 'oben', 'unten'] },
          { term: 'obrovský', definition: 'riesig', options: ['klein', 'gemütlich', 'sauber'] },
          { term: 'ložnice', definition: 'Schlafzimmer', options: ['Wohnzimmer', 'Bad', 'Küche'] },
          { term: 'náš/naše', definition: 'unser/unsere/unser', options: ['euer', 'mein', 'ihr'] },
          { term: 'dole', definition: 'unten', options: ['oben', 'rechts', 'links'] },
          { term: 'obývací pokoj', definition: 'Wohnzimmer', options: ['Schlafzimmer', 'Küche', 'Bad'] },
          { term: 'chipsy', definition: 'Chips', options: ['Saft', 'Spaghetti', 'Brötchen'] },
          { term: 'tmavý', definition: 'dunkel', options: ['hell', 'sauber', 'modern'] },
          { term: 'ošklivý', definition: 'hässlich', options: ['schön', 'modern', 'gemütlich'] },
          { term: 'světlý', definition: 'hell', options: ['dunkel', 'riesig', 'chaotisch'] },
          { term: 'vlevo, na levé straně', definition: 'links', options: ['rechts', 'oben', 'unten'] },
          { term: 'střed, polovina', definition: 'Mitte', options: ['Ecke', 'Zimmer', 'Bank'] },
          { term: 'uprostřed', definition: 'in der Mitte', options: ['in der Ecke', 'unter dem Tisch', 'neben dem Bett'] },
          { term: 'moderní', definition: 'modern', options: ['alt', 'hässlich', 'dunkel'] },
          { term: 'šťáva, mošt', definition: 'Saft', options: ['Chips', 'Ball', 'Film'] },
          { term: 'dívat se, vidět', definition: 'schauen', options: ['liegen', 'glauben', 'putzen'] },
          { term: 'nepraktický', definition: 'unpraktisch', options: ['praktisch', 'perfekt', 'sauber'] },
          { term: 'byt', definition: 'Wohnung', options: ['Haus', 'Zimmer', 'Garten'] },
          { term: 'pokoj, místnost', definition: 'Zimmer', options: ['Bad', 'Wohnung', 'Haus'] },
          { term: 'míč', definition: 'Ball', options: ['Tisch', 'Bett', 'Stuhl'] },
          { term: 'postel', definition: 'Bett', options: ['Schrank', 'Tisch', 'Sessel'] },
          { term: 'Kdo ustele postel?', definition: 'Wer macht das Bett?', options: ['Wer kocht heute?', 'Wo ist das Bett?', 'Was passiert?'] },
          { term: 'nádobí', definition: 'Geschirr', options: ['Mülleimer', 'Saft', 'Blume'] },
          { term: 'stejný', definition: 'gleich', options: ['egal', 'anders', 'neu'] },
          { term: 'blahopřání, gratulace', definition: 'Glückwunsch', options: ['Ahnung', 'Vorschlag', 'Urlaub'] },
          { term: 'Srdečné blahopřání!', definition: 'Herzlichen Glückwunsch!', options: ['Keine Ahnung!', 'Guten Morgen!', 'Alles klar!'] },
          { term: 'srdečný', definition: 'herzlich', options: ['chaotisch', 'dunkel', 'praktisch'] },
          { term: 'moci, umět', definition: 'können', options: ['müssen', 'liegen', 'schauen'] },
          { term: 'Můžeš dnes uvařit?', definition: 'Kannst du heute kochen?', options: ['Was passiert heute?', 'Wo ist die Küche?', 'Hast du Zeit?'] },
          { term: 'milý, příjemný', definition: 'lieb', options: ['hässlich', 'dunkel', 'chaotisch'] },
          { term: 'muset', definition: 'müssen', options: ['können', 'liegen', 'glauben'] },
          { term: 'Musí mýt nádobí.', definition: 'Er muss spülen.', options: ['Er kocht.', 'Er schaut fern.', 'Er liegt.'] },
          { term: 'dokonalý, perfektní', definition: 'perfekt', options: ['unpraktisch', 'hässlich', 'dunkel'] },
          { term: 'čistit', definition: 'putzen', options: ['saugen', 'liegen', 'schauen'] },
          { term: 'vysávat', definition: 'saugen', options: ['putzen', 'gießen', 'kaufen'] },
          { term: 'bezpečný, jistý', definition: 'sicher', options: ['egal', 'chaotisch', 'dunkel'] },
          { term: 'špagety', definition: 'Spaghetti', options: ['Chips', 'Saft', 'Brötchen'] },
          { term: 'mýt (nádobí)', definition: 'spülen', options: ['putzen', 'saugen', 'leeren'] },
          { term: 'hádat se, dohadovat se', definition: 'streiten', options: ['glauben', 'liegen', 'schauen'] },
          { term: 'bez dozoru', definition: 'sturmfrei', options: ['egal', 'sicher', 'modern'] },
          { term: 'Rodiče jsou dnes pryč, máme volný byt.', definition: 'Wir haben heute sturmfrei.', options: ['Sie sind im Urlaub.', 'Wir gehen ins Kino.', 'Ich habe keine Ahnung.'] },
          { term: 'lístek, cedulka', definition: 'Zettel', options: ['Blume', 'Bank', 'Brille'] },
          { term: 'květina', definition: 'Blume', options: ['Bank', 'Tasche', 'Brille'] },
          { term: 'houska', definition: 'Brötchen', options: ['Saft', 'Chips', 'Spaghetti'] },
          { term: 'rodinný rozvrh', definition: 'Familienplaner', options: ['Vorschlag', 'Urlaub', 'Ahnung'] },
          { term: 'zalévat', definition: 'gießen', options: ['saugen', 'putzen', 'kaufen'] },
          { term: 'koupit, kupovat', definition: 'kaufen', options: ['leeren', 'gießen', 'spülen'] },
          { term: 'vyprázdnit, vylít, vysypat', definition: 'leeren', options: ['putzen', 'saugen', 'kaufen'] },
          { term: 'Vysypává koš.', definition: 'Er leert den Mülleimer.', options: ['Er putzt.', 'Er saugt.', 'Er kocht.'] },
          { term: 'odpadkový koš', definition: 'Mülleimer', options: ['Geschirr', 'Zettel', 'Kommode'] },
          { term: 'návrh', definition: 'Vorschlag', options: ['Ahnung', 'Urlaub', 'Glückwunsch'] },
          { term: 'do (předložka + člen)', definition: 'ins', options: ['auf', 'unter', 'neben'] },
          { term: 'Jdeme do kina.', definition: 'Wir gehen ins Kino.', options: ['Wir sind im Urlaub.', 'Wir haben sturmfrei.', 'Wir bleiben zu Hause.'] },
          { term: 'ponětí', definition: 'Ahnung', options: ['Vorschlag', 'Urlaub', 'Plan'] },
          { term: 'Nemám ponětí.', definition: 'Ich habe keine Ahnung!', options: ['Ich weiß es.', 'Kein Problem.', 'Alles klar.'] }
        ]
      }
    ]
  }
};
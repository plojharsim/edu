export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching' | 'sorting';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
  category?: string;
  imageUrl?: string;
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

          // ===== ŽÁNRY =====
          { term: 'classical', definition: 'vážná hudba', category: 'Žánry', options: ['jazz', 'opera', 'folk'] },
          { term: 'folk', definition: 'folk', category: 'Žánry', options: ['rocková hudba', 'popová hudba', 'latinskoamerická hudba'] },
          { term: 'heavy metal', definition: 'heavy metal', category: 'Žánry', options: ['rocková hudba', 'punková hudba', 'techno hudba'] },
          { term: 'hip hop', definition: 'hip hop', category: 'Žánry', options: ['jazz', 'popová hudba', 'rocková hudba'] },
          { term: 'jazz', definition: 'jazz', category: 'Žánry', options: ['vážná hudba', 'folk', 'rocková hudba'] },
          { term: 'Latin', definition: 'latinskoamerická hudba', category: 'Žánry', options: ['popová hudba', 'rocková hudba', 'folk'] },
          { term: 'pop', definition: 'popová hudba', category: 'Žánry', options: ['rocková hudba', 'punková hudba', 'jazz'] },
          { term: 'punk', definition: 'punková hudba', category: 'Žánry', options: ['rocková hudba', 'techno hudba', 'popová hudba'] },
          { term: 'rock', definition: 'rocková hudba', category: 'Žánry', options: ['punková hudba', 'folk', 'popová hudba'] },
          { term: 'techno', definition: 'techno hudba', category: 'Žánry', options: ['punková hudba', 'rocková hudba', 'popová hudba'] },

          // ===== NÁSTROJE =====
          { term: 'cello', definition: 'violoncello', category: 'Nástroje', options: ['housle', 'klavír', 'flétna'] },
          { term: 'drums', definition: 'bicí bubny', category: 'Nástroje', options: ['bicí souprava', 'klavír', 'kytara'] },
          { term: 'electric guitar', definition: 'elektrická kytara', category: 'Nástroje', options: ['housle', 'klavír', 'saxofón'] },
          { term: 'flute', definition: 'flétna', category: 'Nástroje', options: ['klarinet', 'housle', 'trúbka'] },
          { term: 'keyboards', definition: 'klávesy', category: 'Nástroje', options: ['klavír', 'varhany', 'kytara'] },
          { term: 'piano', definition: 'klavír', category: 'Nástroje', options: ['klávesy', 'violoncello', 'housle'] },
          { term: 'saxophone', definition: 'saxofón', category: 'Nástroje', options: ['trúbka', 'klarinet', 'housle'] },
          { term: 'trumpet', definition: 'trúbka', category: 'Nástroje', options: ['saxofón', 'klarinet', 'housle'] },
          { term: 'violin', definition: 'housle', category: 'Nástroje', options: ['violoncello', 'klavír', 'flétna'] },

          // ===== HUDBA – ČINNOSTI =====
          { term: 'give a concert', definition: 'koncertovat', category: 'Hudba', options: ['jít na turné', 'nahrát album', 'cvičit na hudebním nástroji'] },
          { term: 'go on tour', definition: 'jít na turné', category: 'Hudba', options: ['koncertovat', 'přidat se ke kapele', 'nahrát album'] },
          { term: 'have an audition', definition: 'mít konkurz', category: 'Hudba', options: ['koncertovat', 'přidat se ke kapele', 'nahrát album'] },
          { term: 'join a band', definition: 'přidat se ke kapele', category: 'Hudba', options: ['koncertovat', 'jít na turné', 'mít konkurz'] },
          { term: 'practise an instrument', definition: 'cvičit na hudebním nástroji', category: 'Hudba', options: ['nahrát album', 'koncertovat', 'přidat se ke kapele'] },
          { term: 'record an album', definition: 'nahrát album', category: 'Hudba', options: ['koncertovat', 'jít na turné', 'mít konkurz'] },
          { term: 'sign an autograph', definition: 'dát autogram / podepsat se', category: 'Hudba', options: ['napsat píseň', 'koncertovat', 'jít na turné'] },
          { term: 'write / compose a song', definition: 'napsat / složit píseň', category: 'Hudba', options: ['nahrát album', 'koncertovat', 'cvičit na hudebním nástroji'] },

          // ===== OBECNÉ / FRÁZE =====
          { term: 'abroad', definition: 'v zahraničí', category: 'Obecné', options: ['doma', 'na dovolené', 've městě'] },
          { term: 'I suppose so.', definition: 'Myslím, že ano.', category: 'Fráze', options: ['Možná', 'Nevím', 'Asi ne'] },
          { term: "That’s a relief.", definition: 'To je úleva.', category: 'Fráze', options: ['To je hrůza', 'To je noční můra', 'To je skvělé'] },
          { term: 'What a nightmare!', definition: 'To je noční můra!', category: 'Fráze', options: ['To je úleva', 'To je vtipné', 'To je skvělé'] },
          { term: 'audience', definition: 'publikum', category: 'Hudba', options: ['divák', 'porotce', 'soutěžící'] },
          { term: 'definitely', definition: 'rozhodně', category: 'Obecné', options: ['možná', 'asi', 'nevím'] },
          { term: 'drum kit', definition: 'bicí souprava', category: 'Hudba', options: ['bicí bubny', 'klavír', 'kytara'] },
          { term: 'drummer', definition: 'bubeník', category: 'Hudba', options: ['kytarista', 'zpěvák', 'basák'] },
          { term: 'headache', definition: 'bolest hlavy', category: 'Zdraví', options: ['bolest břicha', 'únava', 'rýma'] },
          { term: 'I bet…', definition: 'Vsadím se…', category: 'Fráze', options: ['Možná', 'Určitě', 'Nevím'] },
          { term: 'I have an idea.', definition: 'Mám nápad.', category: 'Fráze', options: ['Nevím', 'Možná', 'To je hloupost'] },
          { term: 'nervous', definition: 'nervózní', category: 'Pocity', options: ['klidný', 'šťastný', 'smutný'] },
          { term: 'take part', definition: 'zúčastnit se', category: 'Obecné', options: ['vyhrát', 'odejít', 'sledovat'] },
          { term: 'winner', definition: 'vítěz', category: 'Obecné', options: ['poražený', 'soutěžící', 'divák'] },
          { term: 'You rock!', definition: 'Jde ti to!', category: 'Fráze', options: ['To je špatné', 'Zkus to znovu', 'To je nuda'] },

          // ===== KRIMI =====
          { term: 'criminal', definition: 'zločinec', category: 'Krimi', options: ['zloděj', 'svědek', 'detektiv'] },
          { term: 'detective', definition: 'detektiv', category: 'Krimi', options: ['policista', 'svědek', 'zločinec'] },
          { term: 'fingerprint', definition: 'otlačok prsta', category: 'Krimi', options: ['stopa', 'značka', 'důkaz'] },
          { term: 'footprint', definition: 'stopa', category: 'Krimi', options: ['otisk prstu', 'značka', 'důkaz'] },
          { term: 'robbery', definition: 'loupež', category: 'Krimi', options: ['krádež', 'zločin', 'útěk'] },
          { term: 'thief', definition: 'zloděj', category: 'Krimi', options: ['zločinec', 'svědek', 'detektiv'] },
          { term: 'thieves', definition: 'zloději', category: 'Krimi', options: ['zločinci', 'svědci', 'policisté'] },
          { term: 'witness', definition: 'svědek', category: 'Krimi', options: ['zloděj', 'zločinec', 'detektiv'] },
          { term: 'belong', definition: 'patřit', category: 'Krimi', options: ['ukrást', 'utéct', 'zanechat'] },
          { term: 'commit a crime', definition: 'spáchat trestný čin', category: 'Krimi', options: ['ukrást', 'utéct', 'patřit'] },
          { term: 'escape from', definition: 'utéct od', category: 'Krimi', options: ['zůstat', 'patřit', 'zanechat stopu'] },
          { term: 'leave a mark', definition: 'zanechat značku / stopu', category: 'Krimi', options: ['utéct', 'ukrást', 'patřit'] },
          { term: 'master', definition: 'zkušený, mistr', category: 'Krimi', options: ['začátečník', 'amatér', 'učeň'] },
          { term: 'prison', definition: 'vězení', category: 'Krimi', options: ['soud', 'cela', 'policie'] },
          { term: 'steal', definition: 'ukradnout', category: 'Krimi', options: ['vrátit', 'patřit', 'zanechat'] },

          // ===== ZBYTEK (KULTURA, TV, FESTIVALY…) =====
          { term: 'Cinderella', definition: 'popelka', category: 'Kultura', options: ['pohádka', 'princezna', 'příběh'] },
          { term: 'compose', definition: 'skládat', category: 'Hudba', options: ['hrát', 'zpívat', 'poslouchat'] },
          { term: 'on stage', definition: 'na pódiu', category: 'Hudba', options: ['v zákulisí', 'v publiku', 'doma'] },
          { term: 'opera', definition: 'opera', category: 'Hudba', options: ['koncert', 'muzikál', 'píseň'] },
          { term: 'perform', definition: 'hrát / vystupovat', category: 'Hudba', options: ['poslouchat', 'sledovat', 'učit se'] },
          { term: 'piece', definition: 'kus', category: 'Hudba', options: ['celek', 'část', 'melodie'] },
          { term: 'proud of', definition: 'hrdý na', category: 'Pocity', options: ['zklamaný', 'smutný', 'naštvaný'] },
          { term: 'skipping rope', definition: 'švihadlo', category: 'Sport', options: ['míč', 'kolo', 'síť'] },
          { term: 'tune', definition: 'melodie', category: 'Hudba', options: ['rytmus', 'text', 'hlas'] },

          { term: 'confidence', definition: 'sebedůvěra', category: 'Vlastnosti', options: ['strach', 'nejistota', 'stud'] },
          { term: 'determination', definition: 'odhodlání', category: 'Vlastnosti', options: ['lenost', 'váhání', 'strach'] },
          { term: 'good looks', definition: 'dobrý vzhled', category: 'Vlastnosti', options: ['styl', 'talent', 'inteligence'] },
          { term: 'hard work', definition: 'usilovná práce', category: 'Vlastnosti', options: ['lenost', 'štěstí', 'náhoda'] },
          { term: 'intelligence', definition: 'inteligence', category: 'Vlastnosti', options: ['síla', 'štěstí', 'vzhled'] },
          { term: 'style', definition: 'styl', category: 'Vlastnosti', options: ['vzhled', 'talent', 'inteligence'] },
          { term: 'talent', definition: 'talent', category: 'Vlastnosti', options: ['štěstí', 'práce', 'náhoda'] },

          { term: 'confident', definition: 'sebejistý', category: 'Vlastnosti', options: ['nejistý', 'nervózní', 'plachý'] },
          { term: 'determined', definition: 'odhodlaný', category: 'Vlastnosti', options: ['váhavý', 'líný', 'nejistý'] },
          { term: 'good-looking', definition: 'dobře vypadající', category: 'Vlastnosti', options: ['ošklivý', 'průměrný', 'unavený'] },
          { term: 'hard-working', definition: 'pracovitý', category: 'Vlastnosti', options: ['líný', 'unavený', 'neochotný'] },
          { term: 'intelligent', definition: 'inteligentní', category: 'Vlastnosti', options: ['hloupý', 'pomalý', 'zmatený'] },
          { term: 'stylish', definition: 'stylový', category: 'Vlastnosti', options: ['nemoderní', 'obyčejný', 'nudný'] },
          { term: 'talented', definition: 'talentovaný', category: 'Vlastnosti', options: ['netalentovaný', 'průměrný', 'slabý'] },

          { term: 'contestant', definition: 'soutěžící', category: 'TV show', options: ['porotce', 'divák', 'moderátor'] },
          { term: "Don’t miss tonight’s show!", definition: 'Nenech si dnes večer ujít show!', category: 'TV show', options: ['Podívej se zítra', 'Je to nuda', 'Už jsem to viděl'] },
          { term: 'judge', definition: 'porotce', category: 'TV show', options: ['soutěžící', 'divák', 'moderátor'] },
          { term: 'receive a recording contract', definition: 'získat nahrávací smlouvu', category: 'Hudba', options: ['nahrát album', 'vyhrát soutěž', 'koncertovat'] },
          { term: 'succeed', definition: 'uspět', category: 'Obecné', options: ['selhat', 'vzdát se', 'zkusit'] },
          { term: 'viewer', definition: 'divák', category: 'TV show', options: ['porotce', 'soutěžící', 'moderátor'] },
          { term: 'vote', definition: 'hlasovat', category: 'TV show', options: ['sledovat', 'hodnotit', 'vybrat'] },

          { term: 'coach', definition: 'trenér / kouč', category: 'Sport', options: ['hráč', 'rozhodčí', 'fanoušek'] },
          { term: 'find out', definition: 'zjistit', category: 'Obecné', options: ['zapomenout', 'tipnout si', 'ignorovat'] },
          { term: 'I would be grateful.', definition: 'Byl bych vděčný.', category: 'Fráze', options: ['Je mi to jedno', 'Nechci', 'Odmítám'] },
          { term: 'whitewater rafting', definition: 'rafting na divoké vodě', category: 'Sport', options: ['plavání', 'lyžování', 'turistika'] },

          { term: 'attend', definition: 'zúčastnit se (festivalu)', category: 'Kultura', options: ['odejít', 'sledovat', 'vynechat'] },
          { term: 'capital', definition: 'hlavní město', category: 'Místa', options: ['vesnice', 'město', 'region'] },
          { term: 'carnival', definition: 'karneval', category: 'Kultura', options: ['festival', 'průvod', 'oslava'] },
          { term: 'collection', definition: 'sbírka', category: 'Kultura', options: ['jednotlivost', 'kus', 'část'] },
          { term: 'fire eaters', definition: 'požírači ohně', category: 'Kultura', options: ['akrobati', 'kouzelníci', 'tanečníci'] },
          { term: 'firework show', definition: 'ohňostrojová show', category: 'Kultura', options: ['koncert', 'průvod', 'festival'] },
          { term: 'latest', definition: 'nejnovější', category: 'Obecné', options: ['starý', 'předchozí', 'zastaralý'] },
          { term: 'parade', definition: 'průvod / přehlídka', category: 'Kultura', options: ['festival', 'karneval', 'oslava'] }

        ]
      }
    ]
  },
  nemcina: {
    id: 'nemcina',
    title: 'Němčina',
    iconName: 'Languages',
    color: 'bg-amber-600',
    topics: [
      {
        id: 'klett-maximal-2-lekce-3-2',
        name: 'Klett Maximal interaktiv 2 - Lekce 3.2',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
        randomizeDirection: true,
        items: [
          { term: 'Bad', definition: 'koupelna', category: 'das', options: ['kuchyně', 'zahrada', 'ložnice'] },
          { term: 'euer / eure', definition: 'váš / vaše', category: '—', options: ['náš / naše', 'můj / moje', 'jejich'] },
          { term: 'fein', definition: 'fajn, bezva', category: '—', options: ['praktický', 'obrovský', 'útulný'] },
          { term: 'Garten', definition: 'zahrada', category: 'der', options: ['dům', 'koupelna', 'pokoj'] },
          { term: 'gemütlich', definition: 'útulný', category: '—', options: ['praktický', 'obrovský', 'nový'] },
          { term: 'Haus', definition: 'dům', category: 'das', options: ['byt', 'zahrada', 'pokoj'] },
          { term: 'hinten', definition: 'vzadu', category: '—', options: ['nahoře', 'dole', 'vpravo'] },
          { term: 'Küche', definition: 'kuchyně', category: 'die', options: ['ložnice', 'koupelna', 'zahrada'] },
          { term: 'oben', definition: 'nahoře', category: '—', options: ['dole', 'vzadu', 'vpravo'] },
          { term: 'praktisch', definition: 'praktický', category: '—', options: ['útulný', 'obrovský', 'fajn'] },
          { term: 'rechts', definition: 'vpravo', category: '—', options: ['vlevo', 'nahoře', 'dole'] },
          { term: 'riesig', definition: 'obrovský', category: '—', options: ['malý', 'praktický', 'útulný'] },
          { term: 'Schlafzimmer', definition: 'ložnice', category: 'das', options: ['kuchyně', 'koupelna', 'obývací pokoj'] },
          { term: 'unser / unsere', definition: 'náš / naše', category: '—', options: ['váš / vaše', 'můj / moje', 'její'] },
          { term: 'unten', definition: 'dole', category: '—', options: ['nahoře', 'vzadu', 'vpravo'] },
          { term: 'Wohnzimmer', definition: 'obývací pokoj', category: 'das', options: ['ložnice', 'kuchyně', 'koupelna'] },
          { term: 'Chips', definition: 'chipsy', category: 'die', options: ['čokoláda', 'zmrzlina', 'chléb'] },
          { term: 'Schokolade', definition: 'čokoláda', category: 'die', options: ['bonbon', 'zmrzlina', 'chipsy'] },
          { term: 'Eis', definition: 'zmrzlina', category: 'das', options: ['koláč', 'chipsy', 'čokoláda'] },
          { term: 'Kühlschrank', definition: 'lednice', category: 'der', options: ['sporák', 'skříň', 'stůl'] },
          { term: 'hungrig', definition: 'hladový', category: '—', options: ['žíznivý', 'sytý', 'unavený'] },
          { term: 'durstig', definition: 'žíznivý', category: '—', options: ['hladový', 'veselý', 'líný'] }
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
  }
};
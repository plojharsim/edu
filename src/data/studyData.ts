export type StudyMode = 'flashcards' | 'abcd' | 'writing' | 'matching';

export interface StudyItem {
  term: string;
  definition: string;
  options: string[];
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
  zemepis: {
    id: 'zemepis',
    title: 'Zeměpis',
    iconName: 'Globe',
    color: 'bg-emerald-600',
    topics: [
      {
        id: 'evropa-mesta',
        name: 'Hlavní města Evropy',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          {
            term: 'Česko',
            definition: 'Praha',
            options: ['Brno', 'Bratislava', 'Vídeň']
          },
          {
            term: 'Slovensko',
            definition: 'Bratislava',
            options: ['Košice', 'Praha', 'Budapešť']
          },
          {
            term: 'Francie',
            definition: 'Paříž',
            options: ['Lyon', 'Marseille', 'Londýn']
          },
          {
            term: 'Německo',
            definition: 'Berlín',
            options: ['Mnichov', 'Hamburk', 'Frankfurt']
          },
          {
            term: 'Itálie',
            definition: 'Řím',
            options: ['Milán', 'Neapol', 'Benátky']
          },
          {
            term: 'Španělsko',
            definition: 'Madrid',
            options: ['Barcelona', 'Valencie', 'Sevilla']
          },
          {
            term: 'Rakousko',
            definition: 'Vídeň',
            options: ['Linec', 'Salcburk', 'Štýrský Hradec']
          },
          {
            term: 'Polsko',
            definition: 'Varšava',
            options: ['Krakov', 'Vratislav', 'Gdaňsk']
          }
        ]
      }
    ]
  },
  
  anglictina: {
    id: 'anglictina',
    title: 'Angličtina',
    iconName: 'Languages',
    color: 'bg-sky-600',
    topics: [
      {
        id: 'gogetter-4-unit-5',
        name: 'GoGetter 4 – Unit 5',
        allowedModes: ['flashcards', 'abcd', 'writing', 'matching'],
        randomizeDirection: true,
        items: [
          { term: 'vážná hudba', definition: 'classical', options: ['folk', 'jazz', 'opera'] },
          { term: 'folk', definition: 'folk', options: ['rock', 'pop', 'latin'] },
          { term: 'heavy metal', definition: 'heavy metal', options: ['rock', 'punk', 'techno'] },
          { term: 'hip hop', definition: 'hip hop', options: ['jazz', 'pop', 'rock'] },
          { term: 'jazz', definition: 'jazz', options: ['blues', 'rock', 'folk'] },
          { term: 'latinskoamerická hudba', definition: 'latin', options: ['pop', 'folk', 'rock'] },
          { term: 'popová hudba', definition: 'pop', options: ['rock', 'latin', 'techno'] },
          { term: 'punková hudba', definition: 'punk', options: ['metal', 'rock', 'pop'] },
          { term: 'rocková hudba', definition: 'rock', options: ['punk', 'metal', 'pop'] },
          { term: 'techno hudba', definition: 'techno', options: ['electro', 'house', 'pop'] },

          { term: 'violoncello', definition: 'cello', options: ['violin', 'piano', 'flute'] },
          { term: 'bicí bubny', definition: 'drums', options: ['drum kit', 'cymbals', 'percussion'] },
          { term: 'elektrická kytara', definition: 'electric guitar', options: ['acoustic guitar', 'bass guitar', 'violin'] },
          { term: 'flétna', definition: 'flute', options: ['clarinet', 'violin', 'trumpet'] },
          { term: 'klávesy', definition: 'keyboards', options: ['piano', 'organ', 'synth'] },
          { term: 'klavír', definition: 'piano', options: ['keyboard', 'organ', 'cello'] },
          { term: 'saxofón', definition: 'saxophone', options: ['trumpet', 'clarinet', 'flute'] },
          { term: 'trúbka', definition: 'trumpet', options: ['trombone', 'saxophone', 'horn'] },
          { term: 'housle', definition: 'violin', options: ['cello', 'viola', 'double bass'] },

          { term: 'koncertovat', definition: 'give a concert', options: ['play music', 'record music', 'perform live'] },
          { term: 'jít na turné', definition: 'go on tour', options: ['travel abroad', 'play locally', 'record an album'] },
          { term: 'mít konkurz', definition: 'have an audition', options: ['take a test', 'join a band', 'perform on stage'] },
          { term: 'přidat se ke kapele', definition: 'join a band', options: ['start a band', 'leave a band', 'play solo'] },
          { term: 'cvičit na hudební nástroj', definition: 'practise an instrument', options: ['play music', 'learn a song', 'record music'] },
          { term: 'nahrát album', definition: 'record an album', options: ['release a single', 'write lyrics', 'go on tour'] },
          { term: 'dát autogram', definition: 'sign an autograph', options: ['write a letter', 'sign a contract', 'meet fans'] },
          { term: 'napsat / složit píseň', definition: 'write a song', options: ['sing a song', 'play a song', 'record a song'] },

          { term: 'v zahraničí', definition: 'abroad', options: ['overseas', 'at home', 'locally'] },

          { term: 'Myslím, že ano.', definition: 'I suppose so.', options: ['I hope so.', 'I think not.', 'I guess not.'] },
          { term: 'To je úleva.', definition: 'That’s a relief.', options: ['That’s great.', 'That’s terrible.', 'That’s strange.'] },
          { term: 'To je noční můra!', definition: 'What a nightmare!', options: ['What a dream!', 'What a surprise!', 'What a joke!'] },

          { term: 'publikum', definition: 'audience', options: ['crowd', 'fans', 'viewers'] },
          { term: 'rozhodně', definition: 'definitely', options: ['probably', 'maybe', 'possibly'] },
          { term: 'bicí souprava', definition: 'drum kit', options: ['drums', 'percussion', 'cymbals'] },
          { term: 'bubeník', definition: 'drummer', options: ['guitarist', 'singer', 'pianist'] },
          { term: 'bolest hlavy', definition: 'headache', options: ['stomachache', 'toothache', 'fever'] },
          { term: 'Vsadím se …', definition: 'I bet …', options: ['I think …', 'I hope …', 'I know …'] },
          { term: 'Mám nápad.', definition: 'I have an idea.', options: ['I have a plan.', 'I have a problem.', 'I have time.'] },
          { term: 'nervózní', definition: 'nervous', options: ['excited', 'calm', 'angry'] },
          { term: 'zúčastnit se', definition: 'take part', options: ['join', 'attend', 'enter'] },
          { term: 'vítěz', definition: 'winner', options: ['loser', 'contestant', 'judge'] },
          { term: 'Jde ti to!', definition: 'You rock!', options: ['Good luck!', 'Well done!', 'Nice try!'] },

          { term: 'zločinec', definition: 'criminal', options: ['thief', 'robber', 'suspect'] },
          { term: 'detektiv', definition: 'detective', options: ['policeman', 'officer', 'agent'] },
          { term: 'otlaček prsta', definition: 'fingerprint', options: ['footprint', 'mark', 'trace'] },
          { term: 'stopa', definition: 'footprint', options: ['fingerprint', 'path', 'track'] },
          { term: 'loupež', definition: 'robbery', options: ['theft', 'crime', 'burglary'] },
          { term: 'zloděj', definition: 'thief', options: ['criminal', 'robber', 'suspect'] },
          { term: 'svědek', definition: 'witness', options: ['victim', 'detective', 'criminal'] },
          { term: 'patřit', definition: 'belong', options: ['own', 'have', 'keep'] },
          { term: 'spáchat trestný čin', definition: 'commit a crime', options: ['solve a crime', 'report a crime', 'stop a crime'] },
          { term: 'utéct od', definition: 'escape from', options: ['run to', 'hide from', 'leave'] },
          { term: 'zanechat značku', definition: 'leave a mark', options: ['make a sign', 'draw a line', 'write a note'] },
          { term: 'vězení', definition: 'prison', options: ['jail', 'court', 'police station'] },
          { term: 'ukradnout', definition: 'steal', options: ['rob', 'take', 'borrow'] }
        ]
      }
    ]
  }
};

export const getStudyData = (): Record<string, Category> => {
  const saved = localStorage.getItem('user_topics');
  const userTopics: Topic[] = saved ? JSON.parse(saved) : [];
  
  const data = { ...PREDEFINED_DATA };
  
  if (userTopics.length > 0) {
    data['custom'] = {
      id: 'custom',
      title: 'Vlastní',
      iconName: 'BookText',
      color: 'bg-indigo-600',
      isCustom: true,
      topics: userTopics
    };
  }
  
  return data;
};

export const saveUserTopics = (topics: Topic[]) => {
  localStorage.setItem('user_topics', JSON.stringify(topics));
};
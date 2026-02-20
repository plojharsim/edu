"use client";

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudyHeader from '@/components/Learning/StudyHeader';
import Flashcard from '@/components/Learning/Flashcard';
import MultipleChoice from '@/components/Learning/MultipleChoice';
import TranslationInput from '@/components/Learning/TranslationInput';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckSquare, Keyboard, Layers, ChevronLeft, BookText } from 'lucide-react';

interface StudyItem {
  id: number;
  term: string;
  definition: string;
  options: string[];
}

interface Topic {
  id: string;
  name: string;
  items: StudyItem[];
}

const CATEGORY_DATA: Record<string, { title: string, topics: Topic[] }> = {
  english: {
    title: "Angličtina",
    topics: [
      {
        id: "animals",
        name: "Zvířata",
        items: [
          { id: 1, term: "Dog", definition: "Pes", options: ["Kočka", "Pes", "Kůň", "Vlk"] },
          { id: 2, term: "Cat", definition: "Kočka", options: ["Pes", "Kočka", "Myš", "Pták"] },
        ]
      },
      {
        id: "food",
        name: "Jídlo",
        items: [
          { id: 3, term: "Apple", definition: "Jablko", options: ["Pomeranč", "Banan", "Jablko", "Hruška"] },
          { id: 4, term: "Bread", definition: "Chléb", options: ["Máslo", "Chléb", "Mléko", "Sýr"] },
        ]
      }
    ]
  },
  biology: {
    title: "Biologie",
    topics: [
      {
        id: "cell",
        name: "Buňka",
        items: [
          { id: 1, term: "Mitochondrie", definition: "Energetické centrum buňky", options: ["Odpadní koš buňky", "Energetické centrum buňky", "Řídící centrum", "Výroba bílkovin"] },
          { id: 2, term: "Jádro", definition: "Řídící centrum buňky", options: ["Výroba energie", "Řídící centrum buňky", "Skladování vody", "Ochranný obal"] },
        ]
      },
      {
        id: "plants",
        name: "Rostliny",
        items: [
          { id: 3, term: "Fotosyntéza", definition: "Přeměna světla na energii", options: ["Dýchání rostlin", "Přeměna světla na energii", "Rozklad listů", "Příjem vody kořeny"] },
          { id: 4, term: "Chlorofyl", definition: "Zelené barvivo", options: ["Kořenový systém", "Zelené barvivo", "Květ", "Plod"] },
        ]
      }
    ]
  },
  history: {
    title: "Dějepis",
    topics: [
      {
        id: "middle-ages",
        name: "Středověk",
        items: [
          { id: 1, term: "Založení Karlovy univerzity", definition: "1348", options: ["1212", "1348", "1415", "1620"] },
          { id: 2, term: "Upálení Jana Husa", definition: "1415", options: ["1348", "1415", "1526", "1618"] },
        ]
      }
    ]
  },
  music: {
    title: "Hudební nauka",
    topics: [
      {
        id: "basics",
        name: "Základy",
        items: [
          { id: 1, term: "Houslový klíč", definition: "G klíč", options: ["F klíč", "C klíč", "G klíč", "A klíč"] },
          { id: 2, term: "Tempo Allegro", definition: "Rychle", options: ["Pomalu", "Mírně", "Rychle", "Velmi pomalu"] },
        ]
      }
    ]
  }
};

const StudySession = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState<'topic-selection' | 'mode-selection' | 'study'>('topic-selection');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [mode, setMode] = useState<'flashcards' | 'abcd' | 'writing' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const category = CATEGORY_DATA[categoryId || 'english'] || CATEGORY_DATA.english;

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('mode-selection');
  };

  const handleModeSelect = (selectedMode: 'flashcards' | 'abcd' | 'writing') => {
    setMode(selectedMode);
    setView('study');
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (selectedTopic && currentIndex < selectedTopic.items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("Relace dokončena!");
      navigate('/');
    }
  };

  // 1. Výběr tématu
  if (view === 'topic-selection') {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center transition-colors duration-300">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 rounded-2xl hover:bg-card dark:hover:bg-slate-800"
        >
          <ChevronLeft className="mr-2 w-5 h-5" /> Zpět na přehled
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">{category.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Vyber si téma, které chceš procvičit</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          {category.topics.map((topic) => (
            <Button 
              key={topic.id}
              variant="outline" 
              className="h-24 rounded-[2rem] border-2 border-white dark:border-slate-800 bg-card shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 flex items-center justify-start px-8 gap-4 transition-all"
              onClick={() => handleTopicSelect(topic)}
            >
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl">
                <BookText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-lg text-slate-800 dark:text-slate-100">{topic.name}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">{topic.items.length} položek</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  // 2. Výběr metody učení
  if (view === 'mode-selection') {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center transition-colors duration-300">
        <Button 
          variant="ghost" 
          onClick={() => setView('topic-selection')}
          className="absolute top-8 left-8 rounded-2xl hover:bg-card dark:hover:bg-slate-800"
        >
          <ChevronLeft className="mr-2 w-5 h-5" /> Změnit téma
        </Button>

        <div className="text-center mb-12">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2 block">{selectedTopic?.name}</span>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Jak se chceš učit?</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-indigo-100 dark:border-indigo-900/30 bg-card flex flex-col gap-2 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all"
            onClick={() => handleModeSelect('flashcards')}
          >
            <Layers className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-lg">Kartičky</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-900/30 bg-card flex flex-col gap-2 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all"
            onClick={() => handleModeSelect('abcd')}
          >
            <CheckSquare className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-lg">Výběr (ABCD)</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-amber-100 dark:border-amber-900/30 bg-card flex flex-col gap-2 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all"
            onClick={() => handleModeSelect('writing')}
          >
            <Keyboard className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <span className="font-bold text-lg">Psaní</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-rose-100 dark:border-rose-900/30 bg-card flex flex-col gap-2 hover:border-rose-500 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 opacity-50 cursor-not-allowed"
            disabled
          >
            <BookOpen className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            <span className="font-bold text-lg">Přiřazování</span>
          </Button>
        </div>
      </div>
    );
  }

  // 3. Samotné učení
  const currentItem = selectedTopic!.items[currentIndex];
  const progress = (currentIndex / selectedTopic!.items.length) * 100;

  return (
    <div className="min-h-screen bg-background py-12 flex flex-col items-center transition-colors duration-300">
      <StudyHeader progress={progress} title={`${category.title}: ${selectedTopic?.name}`} />
      
      <div className="flex-1 flex items-center justify-center w-full px-4">
        {mode === 'flashcards' && (
          <div className="flex flex-col items-center gap-12">
            <Flashcard front={currentItem.term} back={currentItem.definition} />
            <div className="flex gap-4">
              <Button onClick={handleNext} size="lg" className="rounded-2xl px-12 bg-indigo-600 hover:bg-indigo-700 h-14 text-lg font-bold">Další karta</Button>
            </div>
          </div>
        )}

        {mode === 'abcd' && (
          <MultipleChoice 
            question={currentItem.term} 
            options={currentItem.options} 
            correctAnswer={currentItem.definition}
            onAnswer={(correct) => correct && setTimeout(handleNext, 1000)}
          />
        )}

        {mode === 'writing' && (
          <TranslationInput 
            term={currentItem.term} 
            correctTranslation={currentItem.definition} 
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default StudySession;
"use client";

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StudyHeader from '@/components/Learning/StudyHeader';
import Flashcard from '@/components/Learning/Flashcard';
import MultipleChoice from '@/components/Learning/MultipleChoice';
import TranslationInput from '@/components/Learning/TranslationInput';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckSquare, Keyboard, Layers } from 'lucide-react';

const CATEGORY_DATA: Record<string, { title: string, items: any[] }> = {
  english: {
    title: "Angličtina",
    items: [
      { id: 1, term: "Apple", definition: "Jablko", options: ["Pomeranč", "Banan", "Jablko", "Hruška"] },
      { id: 2, term: "House", definition: "Dům", options: ["Auto", "Dům", "Město", "Strom"] },
    ]
  },
  biology: {
    title: "Biologie",
    items: [
      { id: 1, term: "Cell", definition: "Buňka", options: ["Tkáň", "Orgán", "Buňka", "Atom"] },
      { id: 2, term: "DNA", definition: "DNA", options: ["RNA", "DNA", "Protein", "Gen"] },
    ]
  },
  history: {
    title: "Dějepis",
    items: [
      { id: 1, term: "1914", definition: "Začátek 1. sv. války", options: ["Konec války", "Začátek 1. sv. války", "Bitva u Lipan", "Zánik Říma"] },
      { id: 2, term: "1945", definition: "Konec 2. sv. války", options: ["Konec 2. sv. války", "Bitva na Bílé Hoře", "Objevení Ameriky", "První let do vesmíru"] },
    ]
  },
  music: {
    title: "Hudební nauka",
    items: [
      { id: 1, term: "Piano", definition: "Klavír", options: ["Housle", "Kytara", "Klavír", "Bubny"] },
      { id: 2, term: "Forte", definition: "Nahlas", options: ["Potichu", "Pomalu", "Rychle", "Nahlas"] },
    ]
  }
};

const StudySession = () => {
  const { categoryId } = useParams();
  const [mode, setMode] = useState<'selection' | 'flashcards' | 'abcd' | 'writing'>('selection');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const category = CATEGORY_DATA[categoryId || 'english'] || CATEGORY_DATA.english;
  const currentItem = category.items[currentIndex];
  const progress = (currentIndex / category.items.length) * 100;

  const handleNext = () => {
    if (currentIndex < category.items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert("Relace dokončena!");
      window.location.href = "/";
    }
  };

  if (mode === 'selection') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-black text-slate-800 mb-2">{category.title}</h1>
        <p className="text-slate-500 mb-12 font-medium">Jak se chceš dnes učit?</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-indigo-100 flex flex-col gap-2 hover:border-indigo-500 hover:bg-indigo-50"
            onClick={() => setMode('flashcards')}
          >
            <Layers className="w-8 h-8 text-indigo-600" />
            <span className="font-bold text-lg">Kartičky</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-emerald-100 flex flex-col gap-2 hover:border-emerald-500 hover:bg-emerald-50"
            onClick={() => setMode('abcd')}
          >
            <CheckSquare className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-lg">Výběr (ABCD)</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-amber-100 flex flex-col gap-2 hover:border-amber-500 hover:bg-amber-50"
            onClick={() => setMode('writing')}
          >
            <Keyboard className="w-8 h-8 text-amber-600" />
            <span className="font-bold text-lg">Psaní</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-32 rounded-[2rem] border-2 border-rose-100 flex flex-col gap-2 hover:border-rose-500 hover:bg-rose-50"
            disabled
          >
            <BookOpen className="w-8 h-8 text-rose-600" />
            <span className="font-bold text-lg">Přiřazování (brzy)</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 flex flex-col items-center">
      <StudyHeader progress={progress} title={category.title} />
      
      <div className="flex-1 flex items-center justify-center w-full px-4">
        {mode === 'flashcards' && (
          <div className="flex flex-col items-center gap-12">
            <Flashcard front={currentItem.term} back={currentItem.definition} />
            <div className="flex gap-4">
              <Button onClick={handleNext} size="lg" className="rounded-2xl px-12 bg-indigo-600 hover:bg-indigo-700">Další karta</Button>
            </div>
          </div>
        )}

        {mode === 'abcd' && (
          <MultipleChoice 
            question={currentItem.term} 
            options={currentItem.options} 
            correctAnswer={currentItem.definition}
            onAnswer={(correct) => correct && handleNext()}
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
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import StudyHeader from '@/components/Learning/StudyHeader';
import Flashcard from '@/components/Learning/Flashcard';
import MultipleChoice from '@/components/Learning/MultipleChoice';
import TranslationInput from '@/components/Learning/TranslationInput';
import MatchingGame from '@/components/Learning/MatchingGame';
import StudyResults from '@/components/Learning/StudyResults';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckSquare, Keyboard, Layers, ChevronLeft, BookText, Check, X } from 'lucide-react';
import { getStudyData, Topic, StudyItem, StudyMode } from '@/data/studyData';

const StudySession = () => {
  const { categoryId, topicId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [view, setView] = useState<'topic-selection' | 'mode-selection' | 'study' | 'results'>('topic-selection');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [shuffledItems, setShuffledItems] = useState<StudyItem[]>([]);
  const [mode, setMode] = useState<StudyMode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [mistakes, setMistakes] = useState<StudyItem[]>([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [seconds, setSeconds] = useState(0);
  
  const studyData = getStudyData();
  const category = studyData[categoryId || ''] || Object.values(studyData)[0];

  useEffect(() => {
    let interval: any;
    if (view === 'study') {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (topicId && category) {
      const topic = category.topics.find(t => t.id === topicId);
      if (topic) {
        setSelectedTopic(topic);
        const forcedMode = searchParams.get('mode') as any;
        if (forcedMode && ['flashcards', 'abcd', 'writing', 'matching'].includes(forcedMode)) {
          handleModeSelect(forcedMode, topic);
        } else {
          setView('mode-selection');
        }
      }
    }
  }, [topicId, category, searchParams]);

  const currentItem = shuffledItems[currentIndex];

  const shuffledOptions = useMemo(() => {
    if (!currentItem) return [];
    const all = [currentItem.definition, ...currentItem.options.filter(o => o.trim() !== "")];
    return all.sort(() => Math.random() - 0.5);
  }, [currentItem]);

  if (!category) {
    return <div className="p-20 text-center">Načítání...</div>;
  }

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('mode-selection');
  };

  const handleModeSelect = (selectedMode: StudyMode, topicOverride?: Topic) => {
    const topic = topicOverride || selectedTopic;
    if (!topic) return;

    // Promíchání a případná randomizace směru
    const items = topic.items.map(item => {
      if (topic.randomizeDirection && Math.random() > 0.5) {
        return {
          ...item,
          term: item.definition,
          definition: item.term,
          options: topic.items
            .filter(i => i.id !== item.id)
            .map(i => i.term)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
        };
      }
      return item;
    }).sort(() => Math.random() - 0.5);
    
    setShuffledItems(items);
    setMode(selectedMode);
    setView('study');
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setMistakes([]);
    setIsCardFlipped(false);
    setSeconds(0);
  };

  const updateStats = (score: number) => {
    const savedStats = localStorage.getItem('study_stats');
    let stats = savedStats ? JSON.parse(savedStats) : { streak: 0, average: 0, sessions: 0, lastDate: null };
    
    const today = new Date().toDateString();
    if (stats.lastDate !== today) {
      stats.streak = (stats.lastDate === new Date(Date.now() - 86400000).toDateString()) ? stats.streak + 1 : 1;
      stats.lastDate = today;
    }

    stats.average = ((stats.average * stats.sessions) + score) / (stats.sessions + 1);
    stats.sessions += 1;
    
    localStorage.setItem('study_stats', JSON.stringify(stats));
  };

  const handleNext = (isCorrect: boolean = true) => {
    const item = shuffledItems[currentIndex];
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    } else {
      setIncorrectCount(prev => prev + 1);
      setMistakes(prev => [...prev, item]);
    }

    if (currentIndex < shuffledItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsCardFlipped(false);
    } else {
      const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
      const finalScore = (finalCorrect / shuffledItems.length) * 100;
      updateStats(finalScore);
      setView('results');
    }
  };

  const handleMatchingComplete = (incorrect: number) => {
    setIncorrectCount(incorrect);
    setCorrectCount(selectedTopic!.items.length - incorrect);
    setMistakes([]);
    updateStats(((selectedTopic!.items.length - incorrect) / selectedTopic!.items.length) * 100);
    setView('results');
  };

  const isModeAllowed = (m: StudyMode) => {
    if (!selectedTopic) return false;
    const allowed = selectedTopic.allowedModes || ['flashcards', 'abcd', 'writing', 'matching'];
    return allowed.includes(m);
  };

  if (view === 'topic-selection') {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center transition-colors duration-300">
        <Button variant="ghost" onClick={() => navigate('/')} className="absolute top-8 left-8 rounded-2xl hover:bg-card dark:hover:bg-slate-800">
          <ChevronLeft className="mr-2 w-5 h-5" /> Zpět na přehled
        </Button>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">{category.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Vyber si téma, které chceš procvičit</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {category.topics.map((topic) => (
            <Button 
              key={topic.id} 
              variant="outline" 
              className="h-24 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-1rem)] rounded-[2rem] border-2 border-white dark:border-slate-800 bg-card shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 flex items-center justify-start px-8 gap-4 transition-all" 
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

  if (view === 'mode-selection') {
    return (
      <div className="min-h-screen bg-background p-6 flex flex-col items-center justify-center transition-colors duration-300">
        <Button variant="ghost" onClick={() => setView('topic-selection')} className="absolute top-8 left-8 rounded-2xl hover:bg-card dark:hover:bg-slate-800">
          <ChevronLeft className="mr-2 w-5 h-5" /> Změnit téma
        </Button>
        <div className="text-center mb-12 px-4">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest text-xs mb-2 block">{selectedTopic?.name}</span>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Jak se chceš učit?</h1>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl px-2">
          {isModeAllowed('flashcards') && (
            <Button variant="outline" className="h-28 sm:h-32 w-full rounded-[2rem] border-2 border-indigo-100 dark:border-indigo-900/30 bg-card flex flex-col gap-2 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all" onClick={() => handleModeSelect('flashcards')}>
              <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-base sm:text-lg">Kartičky</span>
            </Button>
          )}
          {isModeAllowed('abcd') && (
            <Button 
              variant="outline" 
              className="h-28 sm:h-32 w-full rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-900/30 bg-card flex flex-col gap-2 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all" 
              onClick={() => handleModeSelect('abcd')}
            >
              <CheckSquare className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 dark:text-emerald-400" />
              <span className="font-bold text-base sm:text-lg">Výběr (ABCD)</span>
            </Button>
          )}
          {isModeAllowed('writing') && (
            <Button variant="outline" className="h-28 sm:h-32 w-full rounded-[2rem] border-2 border-amber-100 dark:border-amber-900/30 bg-card flex flex-col gap-2 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-all" onClick={() => handleModeSelect('writing')}>
              <Keyboard className="w-7 h-7 sm:w-8 sm:h-8 text-amber-600 dark:text-amber-400" />
              <span className="font-bold text-base sm:text-lg">Psaní</span>
            </Button>
          )}
          {isModeAllowed('matching') && (
            <Button variant="outline" className="h-28 sm:h-32 w-full rounded-[2rem] border-2 border-rose-100 dark:border-rose-900/30 bg-card flex flex-col gap-2 hover:border-rose-500 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all" onClick={() => handleModeSelect('matching')}>
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600 dark:text-rose-400" />
              <span className="font-bold text-base sm:text-lg">Přiřazování</span>
            </Button>
          )}
        </div>
        {(!isModeAllowed('flashcards') && !isModeAllowed('abcd') && !isModeAllowed('writing') && !isModeAllowed('matching')) && (
          <p className="text-slate-400 font-medium italic mt-8">Pro toto téma nejsou povoleny žádné režimy.</p>
        )}
      </div>
    );
  }

  if (view === 'results') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-300">
        <StudyResults 
          total={selectedTopic!.items.length}
          correct={correctCount}
          incorrect={incorrectCount}
          mistakes={mistakes}
          onRetry={() => setView('mode-selection')}
          onHome={() => navigate('/')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 flex flex-col items-center transition-colors duration-300">
      <StudyHeader 
        current={mode === 'matching' ? selectedTopic!.items.length : currentIndex + 1} 
        total={selectedTopic!.items.length} 
        title={`${category.title}: ${selectedTopic?.name}`} 
        time={seconds}
      />
      <div className="flex-1 flex items-center justify-center w-full px-4">
        {mode === 'flashcards' && currentItem && (
          <div className="flex flex-col items-center gap-8 w-full">
            <Flashcard 
              front={currentItem.term} 
              back={currentItem.definition} 
              isFlipped={isCardFlipped}
              onFlip={() => setIsCardFlipped(true)}
            />
            
            <div className={`flex gap-4 transition-all duration-500 ${isCardFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <Button 
                onClick={() => handleNext(false)} 
                variant="outline"
                className="h-16 px-8 rounded-2xl border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold gap-2 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <X className="w-5 h-5" /> Nevěděl jsem
              </Button>
              <Button 
                onClick={() => handleNext(true)} 
                className="h-16 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg shadow-emerald-200 dark:shadow-none"
              >
                <Check className="w-5 h-5" /> Věděl jsem
              </Button>
            </div>
          </div>
        )}
        {mode === 'abcd' && currentItem && (
          <MultipleChoice 
            question={currentItem.term} 
            options={shuffledOptions} 
            correctAnswer={currentItem.definition} 
            onAnswer={(correct) => handleNext(correct)} 
          />
        )}
        {mode === 'writing' && currentItem && (
          <TranslationInput term={currentItem.term} correctTranslation={currentItem.definition} onAnswer={(correct) => handleNext(correct)} />
        )}
        {mode === 'matching' && (
          <MatchingGame items={shuffledItems} onComplete={handleMatchingComplete} />
        )}
      </div>
    </div>
  );
};

export default StudySession;
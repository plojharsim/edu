"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import StudyHeader from '@/components/Learning/StudyHeader';
import Flashcard from '@/components/Learning/Flashcard';
import MultipleChoice from '@/components/Learning/MultipleChoice';
import TranslationInput from '@/components/Learning/TranslationInput';
import MatchingGame from '@/components/Learning/MatchingGame';
import SortingGame from '@/components/Learning/SortingGame';
import StudyResults from '@/components/Learning/StudyResults';
import MathConfigurator from '@/components/Learning/MathConfigurator';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckSquare, Keyboard, Layers, ChevronLeft, BookText, Check, X, LayoutPanelTop } from 'lucide-react';
import { PREDEFINED_DATA, Topic, StudyItem, StudyMode } from '@/data/studyData';
import { useAuth } from '@/components/AuthProvider';
import { dbService } from '@/services/dbService';
import { learningAlgorithm, ItemPerformance } from '@/utils/learningAlgorithm';
import { mathGenerator, MathOperation } from '@/utils/mathGenerator';
import LoadingScreen from '@/components/LoadingScreen';

const StudySession = () => {
  const { categoryId, topicId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [view, setView] = useState<'topic-selection' | 'mode-selection' | 'config' | 'study' | 'results'>('topic-selection');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [userGrade, setUserGrade] = useState('');
  
  const [sessionQueue, setSessionQueue] = useState<StudyItem[]>([]);
  const [masteredCount, setMasteredCount] = useState(0); 
  const [performanceData, setPerformanceData] = useState<ItemPerformance>({});
  
  const [mode, setMode] = useState<StudyMode | null>(null);
  // Tracking unique items that were answered incorrectly
  const [failedItemIds, setFailedItemIds] = useState<Set<string>>(new Set());
  
  const [mistakes, setMistakes] = useState<StudyItem[]>([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [studyData, setStudyData] = useState<Record<string, any>>({ ...PREDEFINED_DATA });
  const [loading, setLoading] = useState(true);

  const handleModeSelect = (selectedMode: StudyMode, topicOverride?: Topic) => {
    const topic = topicOverride || selectedTopic;
    if (!topic) return;

    if (topic.isDynamic && view !== 'config' && view !== 'study') {
      setView('config');
      setMode(selectedMode);
      return;
    }

    let items = learningAlgorithm.prioritizeItems(topic.items, performanceData);
    items = [...items].sort(() => Math.random() - 0.5);

    items = items.map(item => {
      const canRandomize = topic.randomizeDirection && selectedMode !== 'abcd' && selectedMode !== 'sorting' && Math.random() > 0.5;
      if (canRandomize) {
        return {
          ...item,
          term: item.definition,
          definition: item.term,
        };
      }
      return item;
    });
    
    setSessionQueue(items);
    setMasteredCount(0);
    setMode(selectedMode);
    setView('study');
    setFailedItemIds(new Set());
    setMistakes([]);
    setIsCardFlipped(false);
    setIsTransitioning(false);
    setSeconds(0);
  };

  const handleMathStart = (types: MathOperation[], count: number) => {
    if (!selectedTopic) return;
    const items = mathGenerator.generate(types, count);
    const updatedTopic = { ...selectedTopic, items };
    setSelectedTopic(updatedTopic);
    handleModeSelect(mode!, updatedTopic);
  };

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const profile = await dbService.getProfile(user.id);
        if (profile) setUserGrade(profile.grade);

        if (categoryId === 'public' && topicId) {
          const topic = await dbService.getTopicById(topicId);
          if (topic) {
            setSelectedTopic(topic);
            const forcedMode = searchParams.get('mode') as any;
            if (forcedMode && ['flashcards', 'abcd', 'writing', 'matching', 'sorting'].includes(forcedMode)) {
              handleModeSelect(forcedMode, topic);
            } else {
              setView('mode-selection');
            }
          }
        } else {
          const userTopics = await dbService.getUserTopics(user.id);
          const data = { ...PREDEFINED_DATA };
          if (userTopics.length > 0) {
            data.custom = {
              id: 'custom',
              title: 'Vlastní',
              topics: userTopics,
              isCustom: true
            };
          }
          setStudyData(data);
        }

        const stats = await dbService.getStats(user.id);
        if (stats?.performance_data) setPerformanceData(stats.performance_data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, categoryId, topicId]);

  useEffect(() => {
    let interval: any;
    if (view === 'study') {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [view]);

  useEffect(() => {
    if (topicId && categoryId !== 'public') {
      const category = studyData[categoryId || ''];
      if (category) {
        const topic = category.topics.find((t: any) => t.id === topicId);
        if (topic) {
          setSelectedTopic(topic);
          const forcedMode = searchParams.get('mode') as any;
          if (forcedMode && ['flashcards', 'abcd', 'writing', 'matching', 'sorting'].includes(forcedMode)) {
            handleModeSelect(forcedMode, topic);
          } else {
            setView('mode-selection');
          }
        }
      }
    }
  }, [topicId, categoryId, studyData]);

  const finalizeSession = async (score: number, finalPerformance: ItemPerformance) => {
    if (!user) return;
    await dbService.updateStats(user.id, score, finalPerformance);
  };

  const handleNext = (isCorrect: boolean = true) => {
    if (isTransitioning) return;
    
    const item = sessionQueue[0];
    const itemId = `${item.term}_${item.definition}`;
    
    const updatedPerformance = learningAlgorithm.calculateNewPerformance(performanceData, itemId, isCorrect);
    setPerformanceData(updatedPerformance);

    if (isCorrect) {
      setMasteredCount(prev => prev + 1);
      const nextQueue = sessionQueue.slice(1);
      
      if (nextQueue.length === 0) {
        const totalItems = selectedTopic!.items.length;
        const finalIncorrect = failedItemIds.size;
        const finalCorrect = totalItems - finalIncorrect;
        const finalScore = (finalCorrect / totalItems) * 100;
        
        finalizeSession(finalScore, updatedPerformance);
        setView('results');
      } else {
        if (mode === 'flashcards' && isCardFlipped) {
          setIsTransitioning(true);
          setIsCardFlipped(false);
          setTimeout(() => {
            setSessionQueue(nextQueue);
            setIsTransitioning(false);
          }, 400);
        } else {
          setSessionQueue(nextQueue);
          setIsCardFlipped(false);
        }
      }
    } else {
      // Mark this item as failed in this session
      setFailedItemIds(prev => new Set(prev).add(itemId));
      
      if (!mistakes.some(m => m.term === item.term)) {
        setMistakes(prev => [...prev, item]);
      }

      const nextQueue = [...sessionQueue.slice(1)];
      const insertAt = Math.min(nextQueue.length, 3); 
      nextQueue.splice(insertAt, 0, item);
      
      if (mode === 'flashcards' && isCardFlipped) {
        setIsTransitioning(true);
        setIsCardFlipped(false);
        setTimeout(() => {
          setSessionQueue(nextQueue);
          setIsTransitioning(false);
        }, 400);
      } else {
        setSessionQueue(nextQueue);
        setIsCardFlipped(false);
      }
    }
  };

  const handleCompletion = (incorrectCountFromGame: number) => {
    // For games like Matching/Sorting, they provide their own incorrect count logic
    // We treat each "incorrect index" as a failed item
    const totalItems = mode === 'sorting' 
      ? selectedTopic!.items.filter(i => i.category && i.category.trim() !== "").length 
      : selectedTopic!.items.length;
    
    const finalCorrect = totalItems - incorrectCountFromGame;
    const finalScore = (finalCorrect / totalItems) * 100;
    
    // For results view consistency, we manually set failedItemIds size based on game results
    // (This is an approximation for games that don't use handleNext)
    const mockFailedIds = new Set(Array.from({ length: incorrectCountFromGame }, (_, i) => `fail-${i}`));
    setFailedItemIds(mockFailedIds);
    
    finalizeSession(finalScore, performanceData);
    setView('results');
  };

  const currentItem = sessionQueue[0];

  const shuffledOptions = useMemo(() => {
    if (!currentItem) return [];
    const all = [currentItem.definition, ...currentItem.options.filter(o => o.trim() !== "")];
    return all.sort(() => Math.random() - 0.5);
  }, [currentItem]);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setView('mode-selection');
  };

  const isModeAllowed = (m: StudyMode) => {
    if (!selectedTopic) return false;
    if (m === 'sorting') return selectedTopic.items.some(item => item.category && item.category.trim() !== "");
    return (selectedTopic.allowedModes || ['flashcards', 'abcd', 'writing', 'matching']).includes(m);
  };

  if (loading) return <LoadingScreen message="Připravuji tvou lekci..." />;
  
  const category = categoryId === 'public' ? { title: 'Veřejná knihovna' } : studyData[categoryId || ''];
  if (!category && view !== 'results') return null;

  if (view === 'topic-selection') {
    const isAdult = userGrade === 'Dospělý';
    const topicsToFilter = category.topics || [];
    const filteredTopics = topicsToFilter.filter((topic: Topic) => {
      if (isAdult || category.isCustom || !topic.targetGrades) return true;
      return topic.targetGrades.includes(userGrade);
    });
    const sortedTopics = [...filteredTopics].sort((a, b) => (a.isDynamic ? -1 : 1));

    return (
      <div className="min-h-screen bg-background p-6 pt-safe flex flex-col items-center justify-center">
        <Button variant="ghost" onClick={() => navigate('/app')} className="absolute top-[calc(2rem+env(safe-area-inset-top,0px))] left-8 rounded-2xl h-12 w-12 bg-card shadow-sm border border-border">
          <ChevronLeft className="w-6 h-6 text-indigo-600" />
        </Button>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">{category.title}</h1>
          <p className="text-slate-500 font-medium">Vyber si téma</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {sortedTopics.map((topic: Topic) => (
            <Button key={topic.id} variant="outline" className="h-24 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-1rem)] rounded-[2rem] border-2 bg-card px-8 gap-4" onClick={() => handleTopicSelect(topic)}>
              <div className="p-3 bg-indigo-50 rounded-2xl"><BookText className="w-6 h-6 text-indigo-600" /></div>
              <div className="text-left min-w-0">
                <span className="block font-bold text-lg truncate">{topic.name}</span>
                <span className="text-xs text-slate-400 font-bold uppercase">{topic.isDynamic ? 'Dynamické' : `${topic.items.length} položek`}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'mode-selection') {
    return (
      <div className="min-h-screen bg-background p-6 pt-safe flex flex-col items-center justify-center">
        <Button variant="ghost" onClick={() => categoryId === 'public' ? navigate('/app/library') : setView('topic-selection')} className="absolute top-[calc(2rem+env(safe-area-inset-top,0px))] left-8 rounded-2xl h-12 w-12 bg-card shadow-sm border border-border">
          <ChevronLeft className="w-6 h-6 text-indigo-600" />
        </Button>
        <div className="text-center mb-12 px-4 max-w-2xl w-full">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">{selectedTopic?.name}</span>
          <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-2">Jak se chceš učit?</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full max-w-3xl px-2">
          {isModeAllowed('flashcards') && <Button variant="outline" className="h-28 sm:h-32 w-[calc(50%-0.5rem)] rounded-[2rem] border-2 bg-card flex flex-col gap-2" onClick={() => handleModeSelect('flashcards')}><Layers className="w-8 h-8 text-indigo-600" /><span className="font-bold">Kartičky</span></Button>}
          {isModeAllowed('abcd') && <Button variant="outline" className="h-28 sm:h-32 w-[calc(50%-0.5rem)] rounded-[2rem] border-2 bg-card flex flex-col gap-2" onClick={() => handleModeSelect('abcd')}><CheckSquare className="w-8 h-8 text-emerald-600" /><span className="font-bold">Výběr</span></Button>}
          {isModeAllowed('writing') && <Button variant="outline" className="h-28 sm:h-32 w-[calc(50%-0.5rem)] rounded-[2rem] border-2 bg-card flex flex-col gap-2" onClick={() => handleModeSelect('writing')}><Keyboard className="w-8 h-8 text-amber-600" /><span className="font-bold">Psaní</span></Button>}
          {isModeAllowed('matching') && <Button variant="outline" className="h-28 sm:h-32 w-[calc(50%-0.5rem)] rounded-[2rem] border-2 bg-card flex flex-col gap-2" onClick={() => handleModeSelect('matching')}><BookOpen className="w-8 h-8 text-rose-600" /><span className="font-bold">Dvojice</span></Button>}
          {isModeAllowed('sorting') && <Button variant="outline" className="h-28 sm:h-32 w-[calc(50%-0.5rem)] rounded-[2rem] border-2 bg-card flex flex-col gap-2" onClick={() => handleModeSelect('sorting')}><LayoutPanelTop className="w-8 h-8 text-purple-600" /><span className="font-bold">Rozřazování</span></Button>}
        </div>
      </div>
    );
  }

  if (view === 'config') return <div className="min-h-screen bg-background pt-safe flex flex-col items-center"><MathConfigurator onStart={handleMathStart} /></div>;

  if (view === 'results') {
    const totalItems = selectedTopic!.items.length;
    const finalIncorrect = failedItemIds.size;
    const finalCorrect = totalItems - finalIncorrect;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 pt-safe">
        <StudyResults 
          total={totalItems}
          correct={finalCorrect}
          incorrect={finalIncorrect}
          mistakes={mistakes}
          onRetry={() => setView('mode-selection')}
          onHome={() => navigate('/app')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-safe pb-12 flex flex-col items-center">
      <StudyHeader current={masteredCount} total={selectedTopic!.items.length} title={`${category?.title}: ${selectedTopic?.name}`} time={seconds} />
      <div className="flex-1 flex items-center justify-center w-full px-4">
        {mode === 'flashcards' && currentItem && (
          <div className="flex flex-col items-center gap-8 w-full">
            <Flashcard front={currentItem.term} back={currentItem.definition} imageUrl={currentItem.imageUrl} isFlipped={isCardFlipped} onFlip={() => !isTransitioning && setIsCardFlipped(true)} />
            <div className={`flex gap-4 transition-all duration-500 ${isCardFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <Button onClick={() => handleNext(false)} variant="outline" disabled={isTransitioning} className="h-16 px-8 rounded-2xl border-2 border-red-100 text-red-600 font-bold gap-2"><X className="w-5 h-5" /> Nevěděl jsem</Button>
              <Button onClick={() => handleNext(true)} disabled={isTransitioning} className="h-16 px-8 rounded-2xl bg-emerald-600 text-white font-bold gap-2"><Check className="w-5 h-5" /> Věděl jsem</Button>
            </div>
          </div>
        )}
        {mode === 'abcd' && currentItem && <MultipleChoice question={currentItem.term} imageUrl={currentItem.imageUrl} options={shuffledOptions} correctAnswer={currentItem.definition} onAnswer={(correct) => handleNext(correct)} />}
        {mode === 'writing' && currentItem && <TranslationInput term={currentItem.term} imageUrl={currentItem.imageUrl} correctTranslation={currentItem.definition} onAnswer={(correct) => handleNext(correct)} />}
        {mode === 'matching' && <MatchingGame items={selectedTopic!.items} onComplete={(inc) => handleCompletion(inc)} />}
        {mode === 'sorting' && <SortingGame items={selectedTopic!.items} onComplete={(inc) => handleCompletion(inc)} />}
      </div>
    </div>
  );
};

export default StudySession;
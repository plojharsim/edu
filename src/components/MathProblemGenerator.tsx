"use client";

import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calculator, Plus, Minus, X, Divide, 
  Percent, Hash, Braces, Loader2 
} from "lucide-react";
import { mathGenerators } from '@/lib/mathUtils';
import { StudyItem } from '@/data/studyData';
import { showSuccess } from '@/utils/toast';

interface MathProblemGeneratorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onItemsGenerated: (items: StudyItem[]) => void;
}

type MathType = 'basic' | 'fractions' | 'polynomials';

const MathProblemGenerator = ({ isOpen, onOpenChange, onItemsGenerated }: MathProblemGeneratorProps) => {
  const [type, setType] = useState<MathType>('basic');
  const [count, setCount] = useState(10);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(20);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      let items: StudyItem[] = [];
      if (type === 'basic') {
        items = mathGenerators.basic(count, min, max, ['+', '-', '*']);
      } else if (type === 'fractions') {
        items = mathGenerators.fractions(count, 1, 10);
      } else if (type === 'polynomials') {
        items = mathGenerators.polynomials(count, -5, 5);
      }

      onItemsGenerated(items);
      showSuccess(`Vygenerováno ${items.length} příkladů.`);
      onOpenChange(false);
      setLoading(false);
    }, 600);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2.5rem] bg-card border-border max-w-lg p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-emerald-600 rounded-3xl shadow-lg shadow-emerald-200 dark:shadow-none">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-black text-center text-foreground">Matematický generátor</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Vytvoř si okamžitě desítky příkladů pro procvičování.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 my-6">
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => setType('basic')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${type === 'basic' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' : 'border-border'}`}
            >
              <Plus className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase">Základy</span>
            </button>
            <button 
              onClick={() => setType('fractions')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${type === 'fractions' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' : 'border-border'}`}
            >
              <Hash className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase">Zlomky</span>
            </button>
            <button 
              onClick={() => setType('polynomials')}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${type === 'polynomials' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' : 'border-border'}`}
            >
              <Braces className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase">Mnohočleny</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Počet příkladů</Label>
              <Input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="h-12 rounded-xl border-2"
              />
            </div>
            {type === 'basic' && (
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Max. hodnota</Label>
                <Input 
                  type="number" 
                  value={max} 
                  onChange={(e) => setMax(parseInt(e.target.value) || 1)}
                  className="h-12 rounded-xl border-2"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator className="w-5 h-5" />}
            Vygenerovat příklady
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MathProblemGenerator;
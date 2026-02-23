"use client";

import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calculator, Play, Settings2 } from "lucide-react";
import { MathConfig } from "@/utils/mathGenerator";

interface MathSetupDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onStart: (config: MathConfig) => void;
}

const MathSetupDialog = ({ isOpen, onOpenChange, onStart }: MathSetupDialogProps) => {
  const [config, setConfig] = useState<MathConfig>({
    operations: ['addition', 'subtraction'],
    difficulty: 'easy',
    count: 10
  });

  const ops = [
    { id: 'addition', label: 'Sčítání' },
    { id: 'subtraction', label: 'Odčítání' },
    { id: 'multiplication', label: 'Násobení' },
    { id: 'division', label: 'Dělení' },
    { id: 'powers', label: 'Mocniny' },
    { id: 'roots', label: 'Odmocniny' },
    { id: 'fractions', label: 'Zlomky' },
    { id: 'rounding', label: 'Zaokrouhlování' },
    { id: 'equations', label: 'Rovnice' },
    { id: 'units', label: 'Jednotky' },
  ];

  const toggleOp = (id: string) => {
    setConfig(prev => ({
      ...prev,
      operations: prev.operations.includes(id) 
        ? prev.operations.filter(o => o !== id)
        : [...prev.operations, id]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[2.5rem] bg-card border-border max-w-2xl p-8">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-amber-500 rounded-3xl shadow-lg shadow-amber-200 dark:shadow-none">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-black text-center text-foreground">Nastavení generátoru</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Vyber si operace a obtížnost příkladů, které chceš procvičit.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-amber-500" /> Operace
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {ops.map(op => (
                <div key={op.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-xl border border-border">
                  <Checkbox 
                    id={op.id} 
                    checked={config.operations.includes(op.id)}
                    onCheckedChange={() => toggleOp(op.id)}
                  />
                  <Label htmlFor={op.id} className="cursor-pointer font-bold text-sm">{op.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-foreground">Obtížnost</h3>
              <div className="flex gap-2">
                {['easy', 'medium', 'hard'].map((d) => (
                  <Button
                    key={d}
                    variant={config.difficulty === d ? 'default' : 'outline'}
                    onClick={() => setConfig({ ...config, difficulty: d as any })}
                    className="flex-1 rounded-xl font-bold capitalize"
                  >
                    {d === 'easy' ? 'Lehká' : d === 'medium' ? 'Střední' : 'Těžká'}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-foreground">Počet příkladů: {config.count}</h3>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="5"
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            onClick={() => onStart(config)}
            disabled={config.operations.length === 0}
            className="w-full h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg gap-2 shadow-lg shadow-amber-100 dark:shadow-none"
          >
            <Play className="w-5 h-5" /> Vygenerovat a začít
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MathSetupDialog;
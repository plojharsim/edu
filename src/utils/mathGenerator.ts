"use client";

import { StudyItem } from "@/data/studyData";

export type MathConfig = {
  operations: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
};

export const mathGenerator = {
  generate(config: MathConfig): StudyItem[] {
    const items: StudyItem[] = [];
    const ops = config.operations.length > 0 ? config.operations : ['addition'];
    
    for (let i = 0; i < config.count; i++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      items.push(this.generateProblem(op, config.difficulty));
    }
    
    return items;
  },

  generateProblem(type: string, diff: 'easy' | 'medium' | 'hard'): StudyItem {
    const range = diff === 'easy' ? 20 : diff === 'medium' ? 100 : 500;
    
    switch (type) {
      case 'addition': {
        const a = Math.floor(Math.random() * range);
        const b = Math.floor(Math.random() * range);
        return { term: `${a} + ${b}`, definition: (a + b).toString(), options: this.genOptions(a + b, 5), category: 'Sčítání' };
      }
      case 'subtraction': {
        const a = Math.floor(Math.random() * range);
        const b = Math.floor(Math.random() * a);
        return { term: `${a} - ${b}`, definition: (a - b).toString(), options: this.genOptions(a - b, 5), category: 'Odčítání' };
      }
      case 'multiplication': {
        const r = diff === 'easy' ? 10 : 20;
        const a = Math.floor(Math.random() * r) + 1;
        const b = Math.floor(Math.random() * r) + 1;
        return { term: `${a} × ${b}`, definition: (a * b).toString(), options: this.genOptions(a * b, 10), category: 'Násobení' };
      }
      case 'division': {
        const r = diff === 'easy' ? 10 : 20;
        const b = Math.floor(Math.random() * r) + 1;
        const res = Math.floor(Math.random() * r) + 1;
        const a = res * b;
        return { term: `${a} : ${b}`, definition: res.toString(), options: this.genOptions(res, 2), category: 'Dělení' };
      }
      case 'powers': {
        const base = Math.floor(Math.random() * 12) + 1;
        const exp = diff === 'easy' ? 2 : Math.floor(Math.random() * 2) + 2;
        const res = Math.pow(base, exp);
        return { term: `${base}${this.toSuperscript(exp)}`, definition: res.toString(), options: this.genOptions(res, 20), category: 'Mocniny' };
      }
      case 'roots': {
        const res = Math.floor(Math.random() * 15) + 1;
        const a = res * res;
        return { term: `√${a}`, definition: res.toString(), options: this.genOptions(res, 2), category: 'Odmocniny' };
      }
      case 'fractions': {
        const d = Math.floor(Math.random() * 9) + 2;
        const n1 = Math.floor(Math.random() * d) + 1;
        const n2 = Math.floor(Math.random() * d) + 1;
        // Jednoduché sčítání se stejným jmenovatelem pro začátek
        return { term: `${n1}/${d} + ${n2}/${d}`, definition: `${n1 + n2}/${d}`, options: [`${n1}/${d}`, `${n2}/${d}`, `${Math.abs(n1-n2)}/${d}`], category: 'Zlomky' };
      }
      case 'rounding': {
        const num = (Math.random() * range).toFixed(2);
        const res = Math.round(parseFloat(num));
        return { term: `Zaokrouhli ${num} na celá čísla`, definition: res.toString(), options: this.genOptions(res, 1), category: 'Zaokrouhlování' };
      }
      case 'equations': {
        const x = Math.floor(Math.random() * 15) + 1;
        const a = Math.floor(Math.random() * 5) + 1;
        const b = Math.floor(Math.random() * 20);
        const res = a * x + b;
        return { term: `${a}x + ${b} = ${res}`, definition: x.toString(), options: this.genOptions(x, 2), category: 'Rovnice' };
      }
      case 'units': {
        const val = Math.floor(Math.random() * 100) + 1;
        return { term: `${val} m = ? cm`, definition: (val * 100).toString(), options: [(val * 10).toString(), (val * 1000).toString(), val.toString()], category: 'Převody jednotek' };
      }
      default:
        return { term: "2 + 2", definition: "4", options: ["3", "5", "6"], category: 'Základní' };
    }
  },

  toSuperscript(num: number): string {
    const superscripts: Record<string, string> = { '2': '²', '3': '³' };
    return superscripts[num.toString()] || `^${num}`;
  },

  genOptions(correct: number, variance: number): string[] {
    const set = new Set<string>();
    while (set.size < 3) {
      const v = Math.floor(Math.random() * variance * 2) - variance;
      const opt = correct + (v === 0 ? variance : v);
      if (opt !== correct && opt > 0) set.add(opt.toString());
    }
    return Array.from(set);
  }
};
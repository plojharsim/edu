import { StudyItem } from "@/data/studyData";

export type MathOp = 
  | 'addition' | 'subtraction' | 'multiplication' | 'division' 
  | 'powers' | 'roots' | 'brackets' | 'rounding' 
  | 'fractions_basic' | 'fractions_ops' | 'fractions_to_decimal'
  | 'ratios' | 'percentages' | 'equations' | 'units' 
  | 'mixed_numbers' | 'polynomials';

export interface MathConfig {
  operations: MathOp[];
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
}

export const mathGenerator = {
  generateItems(config: MathConfig): StudyItem[] {
    const items: StudyItem[] = [];
    const ops = config.operations.length > 0 ? config.operations : ['addition'];

    for (let i = 0; i < config.count; i++) {
      const op = ops[Math.floor(Math.random() * ops.length)];
      items.push(this.createProblem(op, config.difficulty));
    }

    return items;
  },

  createProblem(op: MathOp, difficulty: 'easy' | 'medium' | 'hard'): StudyItem {
    let term = "";
    let definition = "";
    let category = "Matematika";
    let options: string[] = [];

    const range = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 100 : 500;

    switch (op) {
      case 'addition': {
        const a = Math.floor(Math.random() * range);
        const b = Math.floor(Math.random() * range);
        term = `${a} + ${b}`;
        definition = (a + b).toString();
        category = "Sčítání";
        options = [ (a+b+1).toString(), (a+b-1).toString(), (a+b+10).toString() ];
        break;
      }
      case 'subtraction': {
        const a = Math.floor(Math.random() * range);
        const b = Math.floor(Math.random() * a);
        term = `${a} - ${b}`;
        definition = (a - b).toString();
        category = "Odčítání";
        options = [ (a-b+1).toString(), (a-b-1).toString(), (Math.abs(a-b-5)).toString() ];
        break;
      }
      case 'multiplication': {
        const r = difficulty === 'easy' ? 10 : 20;
        const a = Math.floor(Math.random() * r) + 1;
        const b = Math.floor(Math.random() * r) + 1;
        term = `${a} × ${b}`;
        definition = (a * b).toString();
        category = "Násobení";
        options = [ (a*b+a).toString(), (a*b-b).toString(), (a*b+2).toString() ];
        break;
      }
      case 'division': {
        const r = difficulty === 'easy' ? 10 : 20;
        const b = Math.floor(Math.random() * r) + 1;
        const res = Math.floor(Math.random() * r) + 1;
        const a = b * res;
        term = `${a} : ${b}`;
        definition = res.toString();
        category = "Dělení";
        options = [ (res+1).toString(), (res-1).toString(), (res*2).toString() ];
        break;
      }
      case 'powers': {
        const base = Math.floor(Math.random() * 12) + 1;
        term = `${base}²`;
        definition = (base * base).toString();
        category = "Mocniny";
        options = [ (base*base+base).toString(), (base*base-1).toString(), (base*base+10).toString() ];
        break;
      }
      case 'roots': {
        const res = Math.floor(Math.random() * 12) + 1;
        const a = res * res;
        term = `√${a}`;
        definition = res.toString();
        category = "Odmocniny";
        options = [ (res+1).toString(), (res-1).toString(), (res+2).toString() ];
        break;
      }
      case 'brackets': {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        const c = Math.floor(Math.random() * 5) + 1;
        term = `${c} × (${a} + ${b})`;
        definition = (c * (a + b)).toString();
        category = "Závorky";
        options = [ (c*a+b).toString(), (c*(a+b)+1).toString(), (c*(a+b)-c).toString() ];
        break;
      }
      case 'fractions_basic': {
        const den = Math.floor(Math.random() * 10) + 2;
        const num = Math.floor(Math.random() * (den - 1)) + 1;
        term = `Zkrať zlomek: ${num*2}/${den*2}`;
        definition = `${num}/${den}`;
        category = "Zlomky";
        options = [ `${num+1}/${den}`, `${num}/${den+1}`, `${num*2}/${den}` ];
        break;
      }
      case 'percentages': {
        const p = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
        const val = (Math.floor(Math.random() * 10) + 1) * 20;
        term = `${p}% z ${val}`;
        definition = ((p / 100) * val).toString();
        category = "Procenta";
        options = [ (val/2).toString(), (p).toString(), (val-p).toString() ];
        break;
      }
      case 'equations': {
        const x = Math.floor(Math.random() * 10) + 1;
        const a = Math.floor(Math.random() * 10) + 1;
        const b = x + a;
        term = `x + ${a} = ${b}`;
        definition = x.toString();
        category = "Rovnice";
        options = [ (x+1).toString(), (x-1).toString(), (b).toString() ];
        break;
      }
      case 'units': {
        const units = ['m', 'cm', 'mm'];
        const from = units[Math.floor(Math.random() * units.length)];
        let to = units[Math.floor(Math.random() * units.length)];
        while (from === to) to = units[Math.floor(Math.random() * units.length)];
        
        const val = Math.floor(Math.random() * 10) + 1;
        term = `Převod: ${val}${from} na ${to}`;
        
        // Jednoduchá logika převodu pro demo
        let factor = 1;
        if (from === 'm' && to === 'cm') factor = 100;
        if (from === 'm' && to === 'mm') factor = 1000;
        if (from === 'cm' && to === 'mm') factor = 10;
        if (from === 'cm' && to === 'm') factor = 0.01;
        if (from === 'mm' && to === 'cm') factor = 0.1;
        if (from === 'mm' && to === 'm') factor = 0.001;
        
        definition = (val * factor).toString();
        category = "Jednotky";
        options = [ (val*factor*10).toString(), (val*factor/10).toString(), (val).toString() ];
        break;
      }
      default: {
        term = "1 + 1";
        definition = "2";
        options = ["1", "3", "4"];
      }
    }

    return { term, definition, options, category };
  }
};
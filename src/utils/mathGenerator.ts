import { StudyItem } from "@/data/studyData";

export type MathOp = 
  | 'basic' | 'powers' | 'brackets' | 'rounding' 
  | 'fractions' | 'fract_to_dec' | 'ratios' | 'percentages' 
  | 'proportion' | 'equations' | 'units' | 'mixed_numbers' | 'polynomials';

export interface MathConfig {
  ops: MathOp[];
  count: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const generateMathProblems = (config: MathConfig): StudyItem[] => {
  const items: StudyItem[] = [];
  const { ops, count, difficulty } = config;

  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const getRange = () => {
    if (difficulty === 'easy') return [1, 20];
    if (difficulty === 'medium') return [10, 100];
    return [50, 500];
  };

  for (let i = 0; i < count; i++) {
    const op = ops[rand(0, ops.length - 1)];
    const [min, max] = getRange();

    let term = "";
    let definition = "";
    let category = "Matematika";
    let options: string[] = [];

    switch (op) {
      case 'basic': {
        const types = ['+', '-', '*', '/'];
        const type = types[rand(0, 3)];
        let a = rand(min, max);
        let b = rand(min, max);
        
        if (type === '/') {
          const res = rand(1, 10);
          b = rand(1, 12);
          a = b * res;
        }

        term = `${a} ${type === '*' ? '·' : type === '/' ? ':' : type} ${b} = ?`;
        const ans = type === '+' ? a + b : type === '-' ? a - b : type === '*' ? a * b : a / b;
        definition = ans.toString();
        options = [ans + rand(1, 5), ans - rand(1, 5), ans * 2].map(String);
        category = "Základní operace";
        break;
      }

      case 'powers': {
        const isRoot = Math.random() > 0.5;
        if (isRoot) {
          const base = rand(2, 12);
          term = `√${base * base} = ?`;
          definition = base.toString();
          options = [base + 1, base - 1, base + 2].map(String);
          category = "Odmocniny";
        } else {
          const base = rand(2, 15);
          term = `${base}² = ?`;
          definition = (base * base).toString();
          options = [(base * base) + 10, (base * base) - 10, (base + 1) * (base + 1)].map(String);
          category = "Mocniny";
        }
        break;
      }

      case 'fractions': {
        const a1 = rand(1, 10), a2 = rand(2, 10);
        const b1 = rand(1, 10), b2 = rand(2, 10);
        const types = ['+', '-', '·', ':'];
        const type = types[rand(0, 3)];
        
        term = `(${a1}/${a2}) ${type} (${b1}/${b2}) = ?`;
        category = "Zlomky";
        
        // Zjednodušený výpočet pro výsledek (vždy string zlomku)
        if (type === '·') definition = `${a1 * b1}/${a2 * b2}`;
        else if (type === ':') definition = `${a1 * b2}/${a2 * b1}`;
        else {
          const common = a2 * b2;
          const resNum = type === '+' ? (a1 * b2 + b1 * a2) : (a1 * b2 - b1 * a2);
          definition = `${resNum}/${common}`;
        }
        options = ["1/2", "3/4", "5/8"];
        break;
      }

      case 'equations': {
        const x = rand(-10, 20);
        const a = rand(2, 6);
        const b = rand(1, 20);
        const res = a * x + b;
        term = `${a}x + ${b} = ${res}`;
        definition = x.toString();
        options = [x + 1, x - 1, x + 2].map(String);
        category = "Rovnice";
        break;
      }

      case 'percentages': {
        const p = [10, 20, 25, 50, 75][rand(0, 4)];
        const val = rand(1, 20) * 20;
        term = `${p} % z ${val} = ?`;
        const ans = (p / 100) * val;
        definition = ans.toString();
        options = [ans + 5, ans - 5, ans * 1.5].map(String);
        category = "Procenta";
        break;
      }

      case 'units': {
        const units = [
          { from: 'km', to: 'm', mul: 1000 },
          { from: 'm', to: 'cm', mul: 100 },
          { from: 'kg', to: 'g', mul: 1000 },
          { from: 'l', to: 'ml', mul: 1000 }
        ];
        const unit = units[rand(0, units.length - 1)];
        const val = rand(1, 50);
        term = `${val} ${unit.from} = ? ${unit.to}`;
        definition = (val * unit.mul).toString();
        options = [(val * unit.mul) / 10, (val * unit.mul) * 10, val * unit.mul + 100].map(String);
        category = "Jednotky";
        break;
      }

      default: {
        term = "2 + 2 = ?";
        definition = "4";
        options = ["3", "5", "6"];
      }
    }

    items.push({ term, definition, options, category });
  }

  return items;
};
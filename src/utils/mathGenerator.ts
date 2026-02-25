import { StudyItem } from "@/data/studyData";

export type MathOperation = 
  | 'basic' | 'powers_roots' | 'brackets' | 'rounding' 
  | 'fractions' | 'decimal_conversion' | 'ratios' | 'percentages' 
  | 'proportions' | 'equations' | 'units' | 'mixed_numbers' | 'polynomials'
  | 'functions';

export const mathGenerator = {
  generate(types: MathOperation[], count: number = 15): StudyItem[] {
    const items: StudyItem[] = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      items.push(this.generateItem(type));
    }
    return items;
  },

  generateItem(type: MathOperation): StudyItem {
    switch (type) {
      case 'basic': return this.genBasic();
      case 'powers_roots': return this.genPowersRoots();
      case 'brackets': return this.genBrackets();
      case 'rounding': return this.genRounding();
      case 'fractions': return this.genFractions();
      case 'decimal_conversion': return this.genDecimalConversion();
      case 'ratios': return this.genRatios();
      case 'percentages': return this.genPercentages();
      case 'proportions': return this.genProportions();
      case 'equations': return this.genEquations();
      case 'units': return this.genUnits();
      case 'mixed_numbers': return this.genMixedNumbers();
      case 'polynomials': return this.genPolynomials();
      case 'functions': return this.genFunctions();
      default: return this.genBasic();
    }
  },

  // Pomocné funkce pro generování konkrétních typů
  rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; },

  genBasic(): StudyItem {
    const ops = ['+', '-', '*', '/'];
    const op = ops[this.rnd(0, 3)];
    let a, b, res;
    if (op === '+') { a = this.rnd(10, 100); b = this.rnd(10, 100); res = a + b; }
    else if (op === '-') { a = this.rnd(50, 150); b = this.rnd(10, 50); res = a - b; }
    else if (op === '*') { a = this.rnd(2, 15); b = this.rnd(2, 15); res = a * b; }
    else { b = this.rnd(2, 12); res = this.rnd(2, 12); a = b * res; }
    
    return {
      term: `${a} ${op === '*' ? '·' : op === '/' ? ':' : op} ${b} = ?`,
      definition: res.toString(),
      options: [ (res + this.rnd(1, 5)).toString(), (res - this.rnd(1, 5)).toString(), (res * 2).toString() ],
      category: 'Základní operace'
    };
  },

  genPowersRoots(): StudyItem {
    const isRoot = Math.random() > 0.5;
    if (isRoot) {
      const base = this.rnd(1, 15);
      const res = base * base;
      return {
        term: `√${res} = ?`,
        definition: base.toString(),
        options: [(base + 1).toString(), (base - 1).toString(), (base * 2).toString()],
        category: 'Mocniny a odmocniny'
      };
    } else {
      const base = this.rnd(1, 12);
      const res = base * base;
      return {
        term: `${base}² = ?`,
        definition: res.toString(),
        options: [(res + base).toString(), (res - base).toString(), (base * 2).toString()],
        category: 'Mocniny a odmocniny'
      };
    }
  },

  genFractions(): StudyItem {
    const a = this.rnd(1, 6), b = this.rnd(2, 8), c = this.rnd(1, 6), d = this.rnd(2, 8);
    const ops = ['+', '·'];
    const op = ops[this.rnd(0, 1)];
    let resTerm;
    if (op === '·') {
      resTerm = `${a * c}/${b * d}`;
    } else {
      resTerm = `${a * d + c * b}/${b * d}`;
    }
    return {
      term: `${a}/${b} ${op} ${c}/${d} = ?`,
      definition: resTerm,
      options: [`${a + c}/${b + d}`, `${a * 2}/${b}`, `${c}/${d * 2}`],
      category: 'Zlomky'
    };
  },

  genEquations(): StudyItem {
    const x = this.rnd(1, 20);
    const a = this.rnd(2, 5);
    const b = this.rnd(1, 20);
    const res = a * x + b;
    return {
      term: `${a}x + ${b} = ${res} (x = ?)`,
      definition: x.toString(),
      options: [(x + 2).toString(), (x - 2).toString(), (x * 2).toString()],
      category: 'Rovnice'
    };
  },

  genRounding(): StudyItem {
    const num = (Math.random() * 1000).toFixed(3);
    const places = [0, 1, 2][this.rnd(0, 2)];
    const res = Number(num).toFixed(places);
    const labels = ['jednotky', 'desetiny', 'setiny'];
    return {
      term: `Zaokrouhli ${num} na ${labels[places]}:`,
      definition: res,
      options: [(Number(res) + 0.1).toFixed(places), (Number(res) - 0.1).toFixed(places), num],
      category: 'Zaokrouhlování'
    };
  },

  genPercentages(): StudyItem {
    const percents = [10, 20, 25, 50, 75][this.rnd(0, 4)];
    const total = this.rnd(1, 20) * 50;
    const res = (total * percents) / 100;
    return {
      term: `${percents} % z ${total} = ?`,
      definition: res.toString(),
      options: [(res + 10).toString(), (res / 2).toString(), (total - res).toString()],
      category: 'Procenta'
    };
  },

  genUnits(): StudyItem {
    const units = [
      { from: 'm', to: 'cm', mul: 100 },
      { from: 'kg', to: 'g', mul: 1000 },
      { from: 'l', to: 'ml', mul: 1000 },
      { from: 'km', to: 'm', mul: 1000 }
    ];
    const unit = units[this.rnd(0, 3)];
    const val = this.rnd(1, 50);
    const res = val * unit.mul;
    return {
      term: `${val} ${unit.from} = ? ${unit.to}`,
      definition: res.toString(),
      options: [(res / 10).toString(), (res * 10).toString(), (val * 10).toString()],
      category: 'Převody jednotek'
    };
  },

  genPolynomials(): StudyItem {
    const a = this.rnd(1, 5);
    const b = this.rnd(1, 5);
    return {
      term: `Uprav: (x + ${a}) · (x + ${b}) = ?`,
      definition: `x² + ${a + b}x + ${a * b}`,
      options: [`x² + ${a * b}x + ${a + b}`, `x + ${a + b}`, `2x + ${a * b}`],
      category: 'Mnohočleny'
    };
  },

  genFunctions(): StudyItem {
    const a = this.rnd(1, 5);
    const b = this.rnd(-10, 10);
    const x = this.rnd(-5, 5);
    const res = a * x + b;
    return {
      term: `Je dána funkce f(x) = ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}. Vypočítej f(${x}):`,
      definition: res.toString(),
      options: [(res + 2).toString(), (res - a).toString(), (res + x).toString()],
      category: 'Funkce'
    };
  },

  genDecimalConversion(): StudyItem {
    const denoms = [2, 4, 5, 10, 20, 25, 50];
    const den = denoms[this.rnd(0, denoms.length - 1)];
    const num = this.rnd(1, den - 1);
    const res = (num / den).toString().replace('.', ',');
    return {
      term: `Převeď zlomek ${num}/${den} na desetinné číslo:`,
      definition: res,
      options: [(num / den + 0.1).toFixed(2).replace('.', ','), '0,5', '1,2'],
      category: 'Zlomky'
    };
  },

  genRatios(): StudyItem {
    const base = this.rnd(2, 10);
    const r1 = this.rnd(1, 5), r2 = this.rnd(1, 5);
    const total = base * (r1 + r2);
    return {
      term: `Rozděl ${total} v poměru ${r1}:${r2}. Jaká je první část?`,
      definition: (base * r1).toString(),
      options: [(base * r2).toString(), base.toString(), (total / 2).toString()],
      category: 'Poměry'
    };
  },

  genProportions(): StudyItem {
    const isDirect = Math.random() > 0.5;
    const a1 = this.rnd(2, 10), b1 = this.rnd(10, 100);
    const a2 = a1 * 2;
    const b2 = isDirect ? b1 * 2 : b1 / 2;
    return {
      term: `${a1} jablka stojí ${b1} Kč. Kolik stojí ${a2} jablek? (${isDirect ? 'přímá' : 'nepřímá'} úměra)`,
      definition: b2.toString(),
      options: [(b1 + a2).toString(), (b2 + 10).toString(), (b1).toString()],
      category: 'Úměrnost'
    };
  },

  genMixedNumbers(): StudyItem {
    const whole = this.rnd(1, 5);
    const num = this.rnd(1, 4), den = 5;
    const resNum = whole * den + num;
    return {
      term: `Převeď smíšené číslo ${whole} a ${num}/${den} na zlomek:`,
      definition: `${resNum}/${den}`,
      options: [`${resNum + 1}/${den}`, `${whole * num}/${den}`, `${resNum}/${whole}`],
      category: 'Smíšená čísla'
    };
  },

  genBrackets(): StudyItem {
    const a = this.rnd(2, 10), b = this.rnd(2, 10), c = this.rnd(2, 10);
    const res = a * (b + c);
    return {
      term: `${a} · (${b} + ${c}) = ?`,
      definition: res.toString(),
      options: [(a * b + c).toString(), (res + a).toString(), (a + b + c).toString()],
      category: 'Operace se závorkami'
    };
  }
};
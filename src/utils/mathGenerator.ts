import { StudyItem } from "@/data/studyData";

export const generateMathProblems = (operations: string[], difficulty: 'easy' | 'medium' | 'hard', count: number): StudyItem[] => {
  const problems: StudyItem[] = [];

  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  for (let i = 0; i < count; i++) {
    const op = operations[Math.floor(Math.random() * operations.length)];
    let term = "";
    let definition = "";
    let options: string[] = [];

    const range = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 100 : 500;

    switch (op) {
      case 'addition':
        const a1 = getRandomInt(1, range), b1 = getRandomInt(1, range);
        term = `${a1} + ${b1}`;
        definition = (a1 + b1).toString();
        break;
      
      case 'subtraction':
        const a2 = getRandomInt(range / 2, range), b2 = getRandomInt(1, a2);
        term = `${a2} - ${b2}`;
        definition = (a2 - b2).toString();
        break;

      case 'multiplication':
        const a3 = getRandomInt(2, difficulty === 'easy' ? 10 : 20), b3 = getRandomInt(2, 10);
        term = `${a3} × ${b3}`;
        definition = (a3 * b3).toString();
        break;

      case 'division':
        const b4 = getRandomInt(2, 10), res4 = getRandomInt(2, 10);
        const a4 = b4 * res4;
        term = `${a4} ÷ ${b4}`;
        definition = res4.toString();
        break;

      case 'fractions':
        // Sčítání zlomků se stejným jmenovatelem pro jednoduchost
        const den = getRandomInt(2, 10);
        const n1 = getRandomInt(1, 5), n2 = getRandomInt(1, 5);
        term = `${n1}/${den} + ${n2}/${den}`;
        const sumNum = n1 + n2;
        // Zjednodušení by bylo fajn, ale pro základ stačí string
        definition = `${sumNum}/${den}`;
        break;

      case 'equations':
        const x = getRandomInt(1, 10);
        const coeff = getRandomInt(2, 5);
        const constVal = getRandomInt(1, 20);
        const result = coeff * x + constVal;
        term = `${coeff}x + ${constVal} = ${result}`;
        definition = x.toString();
        break;

      case 'powers':
        const base = getRandomInt(2, 12);
        term = `${base}²`;
        definition = (base * base).toString();
        break;

      case 'units':
        const val = getRandomInt(1, 10);
        const units = ['km', 'm', 'cm'];
        const unitIdx = getRandomInt(0, 1);
        if (units[unitIdx] === 'km') {
          term = `${val} km = ? m`;
          definition = (val * 1000).toString();
        } else {
          term = `${val} m = ? cm`;
          definition = (val * 100).toString();
        }
        break;

      default:
        term = "1 + 1";
        definition = "2";
    }

    // Generování falešných možností pro ABCD režim (pokud by se použil)
    const defNum = parseFloat(definition);
    options = [
      (defNum + 1).toString(),
      (defNum - 1).toString(),
      (defNum * 2).toString()
    ];

    problems.push({ term, definition, options });
  }

  return problems;
};
"use client";

import { StudyItem } from "@/data/studyData";

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const simplifyFraction = (num: number, den: number): [number, number] => {
  const common = Math.abs(gcd(num, den));
  return [num / common, den / common];
};

export const mathGenerators = {
  basic: (count: number, min: number, max: number, ops: string[]): StudyItem[] => {
    const items: StudyItem[] = [];
    for (let i = 0; i < count; i++) {
      const a = getRandomInt(min, max);
      const b = getRandomInt(min, max);
      const op = ops[getRandomInt(0, ops.length - 1)];
      let result = 0;
      let term = `${a} ${op} ${b}`;

      if (op === '+') result = a + b;
      else if (op === '-') result = a - b;
      else if (op === '*') result = a * b;
      else if (op === '/') {
        // Zajištění celočíselného dělení
        const product = a * b;
        term = `${product} / ${a}`;
        result = b;
      }

      items.push({
        term,
        definition: result.toString(),
        options: [
          (result + getRandomInt(1, 5)).toString(),
          (result - getRandomInt(1, 5)).toString(),
          (result * 2).toString()
        ],
        category: "Aritmetika"
      });
    }
    return items;
  },

  fractions: (count: number, min: number, max: number): StudyItem[] => {
    const items: StudyItem[] = [];
    const ops = ['+', '-'];
    for (let i = 0; i < count; i++) {
      const n1 = getRandomInt(min, max);
      const d1 = getRandomInt(min, max);
      const n2 = getRandomInt(min, max);
      const d2 = getRandomInt(min, max);
      const op = ops[getRandomInt(0, ops.length - 1)];

      const commonDen = d1 * d2;
      let resNum = 0;
      if (op === '+') resNum = n1 * d2 + n2 * d1;
      else resNum = n1 * d2 - n2 * d1;

      const [sNum, sDen] = simplifyFraction(resNum, commonDen);
      const term = `${n1}/${d1} ${op} ${n2}/${d2}`;
      const definition = sDen === 1 ? sNum.toString() : `${sNum}/${sDen}`;

      items.push({
        term,
        definition,
        options: [`${sNum + 1}/${sDen}`, `${sNum}/${sDen + 1}`, `${getRandomInt(1, 10)}/2`],
        category: "Zlomky"
      });
    }
    return items;
  },

  polynomials: (count: number, min: number, max: number): StudyItem[] => {
    const items: StudyItem[] = [];
    for (let i = 0; i < count; i++) {
      const a = getRandomInt(1, 3); // koeficient u x
      const b = getRandomInt(min, max); // konstanta 1
      const c = getRandomInt(1, 2); // koeficient u x 2
      const d = getRandomInt(min, max); // konstanta 2

      // (ax + b)(cx + d) = (a*c)x^2 + (ad + bc)x + bd
      const x2 = a * c;
      const x1 = a * d + b * c;
      const x0 = b * d;

      const formatTerm = (c2: number, c1: number, c0: number) => {
        let str = `${c2 === 1 ? '' : c2}x²`;
        if (c1 !== 0) str += ` ${c1 > 0 ? '+' : '-'} ${Math.abs(c1)}x`;
        if (c0 !== 0) str += ` ${c0 > 0 ? '+' : '-'} ${Math.abs(c0)}`;
        return str;
      };

      const term = `(${a === 1 ? '' : a}x ${b >= 0 ? '+' : '-'} ${Math.abs(b)})(${c === 1 ? '' : c}x ${d >= 0 ? '+' : '-'} ${Math.abs(d)})`;
      const definition = formatTerm(x2, x1, x0);

      items.push({
        term,
        definition,
        options: [
          formatTerm(x2, x1 + 1, x0),
          formatTerm(x2, x1, x0 - 2),
          formatTerm(x2 + 1, x1, x0)
        ],
        category: "Mnohočleny"
      });
    }
    return items;
  }
};
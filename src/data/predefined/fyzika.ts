import { Category } from "../studyData";

export const fyzika: Category = {
  id: 'fyzika',
  title: 'Fyzika',
  iconName: 'Zap',
  color: 'bg-blue-700',
  topics: [
    {
      id: 'fyzikalni-veliciny',
      name: 'Veličiny a jednotky',
      targetGrades: ['6. třída ZŠ'],
      allowedModes: ['flashcards', 'abcd', 'matching'],
      items: [
        { term: 'Délka', definition: 'Metr (m)', options: ['Kilogram (kg)', 'Sekunda (s)', 'Kelvin (K)'] },
        { term: 'Hmotnost', definition: 'Kilogram (kg)', options: ['Metr (m)', 'Newton (N)', 'Pascal (Pa)'] },
        { term: 'Čas', definition: 'Sekunda (s)', options: ['Hodina (h)', 'Minuta (min)', 'Den (d)'] },
        { term: 'Teplota', definition: 'Kelvin (K) / Celsiův stupeň (°C)', options: ['Ampér (A)', 'Candela (cd)', 'Mol (mol)'] },
        { term: 'Objem', definition: 'Metr krychlový (m³)', options: ['Metr čtvereční (m²)', 'Litr (l)', 'Kilogram (kg)'] }
      ]
    },
    {
      id: 'elektricky-proud',
      name: 'Elektřina – Základy',
      targetGrades: ['8. třída ZŠ'],
      allowedModes: ['flashcards', 'abcd', 'writing'],
      items: [
        { term: 'Elektrický proud', definition: 'I', options: ['U', 'R', 'P'] },
        { term: 'Elektrické napětí', definition: 'U', options: ['I', 'R', 'Ω'] },
        { term: 'Elektrický odpor', definition: 'R', options: ['U', 'I', 'W'] },
        { term: 'Jednotka proudu', definition: 'Ampér (A)', options: ['Volt (V)', 'Ohm (Ω)', 'Watt (W)'] },
        { term: 'Jednotka napětí', definition: 'Volt (V)', options: ['Ampér (A)', 'Ohm (Ω)', 'Joul (J)'] }
      ]
    }
  ]
};
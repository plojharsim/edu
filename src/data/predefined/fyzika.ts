import { Category } from "../studyData";

export const fyzika: Category = {
  id: 'fyzika',
  title: 'Fyzika',
  iconName: 'Zap',
  color: 'bg-blue-700',
  topics: [
    {
      id: 'fyzikalni-veliciny-zakladni',
      name: 'Základní veličiny a jednotky SI',
      allowedModes: ['flashcards', 'abcd', 'writing', 'matching', 'sorting'],
      items: [
        { term: 'Délka', definition: 'metr (m)', category: 'Základní SI', options: ['sekunda', 'kilogram', 'ampér'] },
        { term: 'Čas', definition: 'sekunda (s)', category: 'Základní SI', options: ['metr', 'hodina', 'minuta'] },
        { term: 'Hmotnost', definition: 'kilogram (kg)', category: 'Základní SI', options: ['gram', 'tuna', 'newton'] },
        { term: 'Elektrický proud', definition: 'ampér (A)', category: 'Základní SI', options: ['volt', 'watt', 'ohm'] },
        { term: 'Termodynamická teplota', definition: 'kelvin (K)', category: 'Základní SI', options: ['stupeň Celsia', 'farenheit', 'joule'] },
        { term: 'Látkové množství', definition: 'mol', category: 'Základní SI', options: ['kilogram', 'litr', 'metr krychlový'] },
        { term: 'Svítivost', definition: 'kandela (cd)', category: 'Základní SI', options: ['lux', 'lumen', 'watt'] },
        { term: 'Rychlost', definition: 'm/s', category: 'Odvozené', options: ['m/s²', 'N', 'J'] },
        { term: 'Síla', definition: 'newton (N)', category: 'Odvozené', options: ['pascal', 'watt', 'joule'] },
        { term: 'Tlak', definition: 'pascal (Pa)', category: 'Odvozené', options: ['newton', 'joule', 'watt'] },
        { term: 'Práce / Energie', definition: 'joule (J)', category: 'Odvozené', options: ['watt', 'newton', 'pascal'] },
        { term: 'Výkon', definition: 'watt (W)', category: 'Odvozené', options: ['joule', 'volt', 'ampér'] }
      ]
    }
  ]
};
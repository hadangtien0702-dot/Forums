
import type { IULRateTable } from '../QuoteCalculator.types';
import { iulFemaleSntbcRatesPer100k } from './iulRatesData';

// Dynamically generate the rate table based on the per-100k rates.
// This allows us to easily support 125k, 150k, and other face amounts without massive hardcoded blocks.
const generateTable = () => {
  // Defined face amounts to support in the calculator
  const faceAmounts = [
    100000, 125000, 150000, 175000, 200000, 225000, 250000, 275000, 
    300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000, 
    500000, 525000, 550000, 575000, 600000, 625000, 650000, 675000, 
    700000, 725000, 750000, 775000, 1000000
  ];
  const table: any = {};
  
  for (const [ageStr, rate] of Object.entries(iulFemaleSntbcRatesPer100k)) {
     const age = Number(ageStr);
     table[age] = {};
     faceAmounts.forEach(face => {
         // Calculate premium: (Rate per 100k * Face Amount) / 100,000
         // This assumes linear scaling, which is standard for "per 100k" or "per 1000" rate tables.
         table[age][face] = parseFloat(((rate * face) / 100000).toFixed(2));
     });
  }
  return table;
};

export const iulFemaleNtbcRateTable: IULRateTable = {
  FEMALE: {
    NTBC: generateTable()
  }
};
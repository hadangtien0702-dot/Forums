
import { iulFemaleNtbcRateTable } from './iulFemaleNtbcData';
import { iulMaleNtbcRateTable } from './iulMaleNtbcData';
import { iulMaleTbcRateTable } from './iulMaleTbcData';
import { iulFemaleEx1RateTable } from './iulFemaleEx1Data';
import { iulMaleEx1RateTable } from './iulMaleEx1Data';
import type { IULRateTable } from '../QuoteCalculator.types';

// Helper function for deep merging, to handle future additions gracefully
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const mergeDeep = (target: any, source: any): any => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

let mergedData: IULRateTable = mergeDeep(iulFemaleNtbcRateTable, iulMaleNtbcRateTable);
mergedData = mergeDeep(mergedData, iulMaleTbcRateTable);
mergedData = mergeDeep(mergedData, iulFemaleEx1RateTable);
mergedData = mergeDeep(mergedData, iulMaleEx1RateTable);


export const iulRateTableData: IULRateTable = mergedData;




import type { Gender, HealthStatus, IULRateTable } from '../QuoteCalculator.types';

export interface SyncedIULRate {
  age: number;
  gender: Gender;
  healthStatus: HealthStatus;
  premium: number; // This is the base premium for $100,000 face amount
  pdfLink?: string;
  csvLink?: string;
}

const validGenders: Gender[] = ['MALE', 'FEMALE'];
const validHealthStatuses: HealthStatus[] = ['NTBC', 'TBC', 'EX1'];

/**
 * Parses a "flat list" CSV format.
 * Expected header: Age,Gender,HealthStatus,Premium,PDF_Link,CSV_Link
 */
const parseIULListCsv = (csvText: string): SyncedIULRate[] => {
  const lines = csvText.trim().replace(/\r\n/g, '\n').split('\n');
  if (lines.length < 2) {
    return [];
  }

  const rates: SyncedIULRate[] = [];
  // Start from line 1 to skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    try {
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map(v => v.trim().replace(/^"|"$/g, '').trim());

      if (values.length < 4) { // Only require the first 4 columns
        console.warn(`Skipping malformed CSV line ${i + 1}: ${line}`);
        continue;
      }

      const age = parseInt(values[0], 10);
      const gender = values[1].toUpperCase() as Gender;
      let healthStatusInput = values[2].toUpperCase();
      let healthStatus: HealthStatus;

      // Normalize health status
      if (healthStatusInput === 'SNTBC' || healthStatusInput === 'NTBC') {
          healthStatus = 'NTBC';
      } else if (healthStatusInput === 'STBC' || healthStatusInput === 'TBC') {
          healthStatus = 'TBC';
      } else if (healthStatusInput === 'ENTBC1' || healthStatusInput === 'EX1') {
          healthStatus = 'EX1';
      } else {
          throw new Error(`Invalid health status: ${healthStatusInput}`);
      }
      
      const premiumString = values[3].replace(',', '.');
      const premium = parseFloat(premiumString);
      const pdfLink = values[4] || undefined;
      const csvLink = values[5] || undefined;

      if (
        isNaN(age) || 
        isNaN(premium) || 
        !validGenders.includes(gender) || 
        !validHealthStatuses.includes(healthStatus)
      ) {
          throw new Error(`Invalid data type or value in row ${i + 1}.`);
      }
      
      rates.push({ age, gender, healthStatus, premium, pdfLink, csvLink });
    } catch (error) {
      console.warn(`Skipping invalid data in CSV line ${i + 1}: ${line}`, error);
    }
  }

  return rates;
};

const cleanCurrency = (input: string): number => {
    if (!input) return NaN;
    return parseFloat(input.trim().replace(/["$, ]/g, ''));
};

/**
 * Parses a "rate table" or "matrix" CSV format.
 */
const parseIULRateTableCsv = (csvText: string): IULRateTable | null => {
  const lines = csvText.trim().replace(/\r\n/g, '\n').split('\n');
  if (lines.length < 3) return null;

  const metaLine = lines[0].trim();
  const metaParts = metaLine.split(',')[1]?.trim().split('/') || [];
  if (metaParts.length < 3 || metaParts[0].trim().toUpperCase() !== 'IUL') {
      return null;
  }
  
  const genderStr = metaParts[1].trim().toUpperCase();
  const healthStrRaw = metaParts[2].trim().toUpperCase();
  
  const gender: Gender | undefined = validGenders.find(g => g === genderStr);

  let healthStatus: HealthStatus | undefined;
  if (healthStrRaw.includes('STANDARD NON TOBACCO') || healthStrRaw === 'NTBC') {
    healthStatus = 'NTBC';
  } else if (healthStrRaw.includes('TOBACCO') || healthStrRaw === 'TBC') {
    healthStatus = 'TBC';
  } else if (healthStrRaw === 'EX1') {
    healthStatus = 'EX1';
  }

  if (!gender || !healthStatus) {
      console.warn('Could not parse gender/health from CSV metadata:', metaLine);
      return null;
  }
  
  // Parse face amounts from header
  const headerCells = lines[1].split(',').slice(1);
  const faceAmounts = headerCells.map(cleanCurrency).filter(v => !isNaN(v));
  if(faceAmounts.length === 0) return null;

  const ageData: IULRateTable[Gender][HealthStatus] = {};

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trim()) continue;

    const values = line.split(',');
    const age = parseInt(values[0], 10);
    if (isNaN(age)) continue;

    ageData[age] = {};
    
    // Start from 1 to skip the age column
    for (let j = 0; j < faceAmounts.length; j++) {
        const premium = cleanCurrency(values[j + 1]);
        if (!isNaN(premium)) {
            ageData[age][faceAmounts[j]] = premium;
        }
    }
  }

  if (Object.keys(ageData).length === 0) return null;

  const table: IULRateTable = {
    [gender]: {
      [healthStatus]: ageData,
    },
  };

  return table;
};

/**
 * Main dispatcher function. Tries to parse as a rate table first, then falls back to a flat list.
 * @param csvText The raw CSV string content.
 * @returns An object indicating the parsed data type and the data itself, or null if parsing fails.
 */
export const parseIULCsv = (csvText: string): { type: 'list' | 'table', data: SyncedIULRate[] | IULRateTable } | null => {
    // Try parsing as rate table first, as it has a more specific format.
    const tableData = parseIULRateTableCsv(csvText);
    if (tableData) {
        return { type: 'table', data: tableData };
    }

    // Fallback to list format
    const listData = parseIULListCsv(csvText);
    if (listData && listData.length > 0) {
        return { type: 'list', data: listData };
    }
    
    return null;
}
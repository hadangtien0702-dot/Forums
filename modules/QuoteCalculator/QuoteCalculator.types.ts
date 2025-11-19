


export type Gender = 'MALE' | 'FEMALE';
export type HealthStatus = 'NTBC' | 'TBC' | 'EX1';
export type Program = 'TERM' | 'IUL';

export interface QuoteParams {
  age: number | null;
  gender: Gender;
  healthStatus: HealthStatus;
  faceAmount: number | null;
  program: Program;
}

export interface QuoteResult {
  term: number;
  premium: number;
}

export interface QuoteResultsData {
  params: QuoteParams;
  results: QuoteResult[];
  pdfUrl?: string;
  csvUrl?: string;
}

export interface IULRateTable {
  [gender: string]: {
    [healthStatus: string]: {
      [age: number]: {
        [faceAmount: number]: number; // premium
      };
    };
  };
}
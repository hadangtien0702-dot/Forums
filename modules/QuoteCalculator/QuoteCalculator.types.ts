

export type Gender = 'MALE' | 'FEMALE';
export type HealthStatus = 'SNTBC' | 'STBC' | 'ENTBC1';
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
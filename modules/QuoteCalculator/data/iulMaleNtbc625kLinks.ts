
import type { SyncedIULRate } from '../utils/csvParser';

export const iulMaleNtbc625kLinks: SyncedIULRate[] = Array.from({ length: 65 }, (_, i) => ({
  age: i + 1,
  gender: 'MALE' as const,
  healthStatus: 'NTBC' as const,
  faceAmount: 625000,
  pdfLink: '',
  csvLink: ''
}));

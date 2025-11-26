
import type { SyncedIULRate } from '../utils/csvParser';

export const iulMaleNtbc675kLinks: SyncedIULRate[] = Array.from({ length: 65 }, (_, i) => ({
  age: i + 1,
  gender: 'MALE' as const,
  healthStatus: 'NTBC' as const,
  faceAmount: 675000,
  pdfLink: '',
  csvLink: ''
}));

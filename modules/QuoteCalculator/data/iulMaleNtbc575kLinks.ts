
import type { SyncedIULRate } from '../utils/csvParser';

export const iulMaleNtbc575kLinks: SyncedIULRate[] = Array.from({ length: 65 }, (_, i) => ({
  age: i + 1,
  gender: 'MALE' as const,
  healthStatus: 'NTBC' as const,
  faceAmount: 575000,
  pdfLink: '', // TODO: Update with actual Google Drive PDF link
  csvLink: ''  // TODO: Update with actual Google Drive CSV link
}));

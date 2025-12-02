
import type { SyncedIULRate } from '../utils/csvParser';

// This file previously imported all static IUL data arrays directly.
// To optimize bundle size, data has been moved to `public/data/iul-data.json`
// and is fetched asynchronously in `useQuoteCalculator.ts`.
// This registry is kept empty to ensure old references don't break the build immediately,
// but it no longer bundles the massive data files.

export const hardcodedIulLinks: SyncedIULRate[] = [];

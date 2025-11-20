
import type { SyncedIULRate } from '../utils/csvParser';
import { iulFemaleNtbcLinks } from './iulFemaleNtbcLinks';
import { iulFemaleNtbc125kLinks } from './iulFemaleNtbc125kLinks';
import { iulFemaleNtbc150kLinks } from './iulFemaleNtbc150kLinks';
import { iulFemaleNtbc175kLinks } from './iulFemaleNtbc175kLinks';
import { iulFemaleNtbc200kLinks } from './iulFemaleNtbc200kLinks';
import { iulFemaleNtbc225kLinks } from './iulFemaleNtbc225kLinks';
import { iulFemaleNtbc250kLinks } from './iulFemaleNtbc250kLinks';
import { iulFemaleNtbc275kLinks } from './iulFemaleNtbc275kLinks';
import { iulFemaleNtbc300kLinks } from './iulFemaleNtbc300kLinks';
import { iulFemaleNtbc325kLinks } from './iulFemaleNtbc325kLinks';
import { iulFemaleNtbc350kLinks } from './iulFemaleNtbc350kLinks';
import { iulFemaleNtbc375kLinks } from './iulFemaleNtbc375kLinks';

// Central registry for all hardcoded IUL link datasets.
// To add new data link files, simply import them here and add them to the array.
export const hardcodedIulLinks: SyncedIULRate[] = [
    ...iulFemaleNtbcLinks,
    ...iulFemaleNtbc125kLinks,
    ...iulFemaleNtbc150kLinks,
    ...iulFemaleNtbc175kLinks,
    ...iulFemaleNtbc200kLinks,
    ...iulFemaleNtbc225kLinks,
    ...iulFemaleNtbc250kLinks,
    ...iulFemaleNtbc275kLinks,
    ...iulFemaleNtbc300kLinks,
    ...iulFemaleNtbc325kLinks,
    ...iulFemaleNtbc350kLinks,
    ...iulFemaleNtbc375kLinks,
];

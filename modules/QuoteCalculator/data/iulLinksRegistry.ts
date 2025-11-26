
import type { SyncedIULRate } from '../utils/csvParser';

// Female NTBC (Standard)
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
import { iulFemaleNtbc400kLinks } from './iulFemaleNtbc400kLinks';
import { iulFemaleNtbc425kLinks } from './iulFemaleNtbc425kLinks';
import { iulFemaleNtbc450kLinks } from './iulFemaleNtbc450kLinks';
import { iulFemaleNtbc475kLinks } from './iulFemaleNtbc475kLinks';
import { iulFemaleNtbc500kLinks } from './iulFemaleNtbc500kLinks';
import { iulFemaleNtbc525kLinks } from './iulFemaleNtbc525kLinks';
import { iulFemaleNtbc550kLinks } from './iulFemaleNtbc550kLinks';
import { iulFemaleNtbc575kLinks } from './iulFemaleNtbc575kLinks';
import { iulFemaleNtbc600kLinks } from './iulFemaleNtbc600kLinks';
import { iulFemaleNtbc625kLinks } from './iulFemaleNtbc625kLinks';
import { iulFemaleNtbc650kLinks } from './iulFemaleNtbc650kLinks';
import { iulFemaleNtbc675kLinks } from './iulFemaleNtbc675kLinks';
import { iulFemaleNtbc700kLinks } from './iulFemaleNtbc700kLinks';
import { iulFemaleNtbc725kLinks } from './iulFemaleNtbc725kLinks';
import { iulFemaleNtbc750kLinks } from './iulFemaleNtbc750kLinks';
import { iulFemaleNtbc775kLinks } from './iulFemaleNtbc775kLinks';
import { iulFemaleNtbc1mLinks } from './iulFemaleNtbc1mLinks';

// Male NTBC
import { iulMaleNtbc100kLinks } from './iulMaleNtbc100kLinks';
import { iulMaleNtbc125kLinks } from './iulMaleNtbc125kLinks';
import { iulMaleNtbc150kLinks } from './iulMaleNtbc150kLinks';
import { iulMaleNtbc175kLinks } from './iulMaleNtbc175kLinks';
import { iulMaleNtbc200kLinks } from './iulMaleNtbc200kLinks';
import { iulMaleNtbc225kLinks } from './iulMaleNtbc225kLinks';
import { iulMaleNtbc250kLinks } from './iulMaleNtbc250kLinks';
import { iulMaleNtbc275kLinks } from './iulMaleNtbc275kLinks';
import { iulMaleNtbc300kLinks } from './iulMaleNtbc300kLinks';
import { iulMaleNtbc325kLinks } from './iulMaleNtbc325kLinks';
import { iulMaleNtbc350kLinks } from './iulMaleNtbc350kLinks';
import { iulMaleNtbc375kLinks } from './iulMaleNtbc375kLinks';
import { iulMaleNtbc400kLinks } from './iulMaleNtbc400kLinks';
import { iulMaleNtbc425kLinks } from './iulMaleNtbc425kLinks';
import { iulMaleNtbc450kLinks } from './iulMaleNtbc450kLinks';
import { iulMaleNtbc475kLinks } from './iulMaleNtbc475kLinks';
import { iulMaleNtbc500kLinks } from './iulMaleNtbc500kLinks';
import { iulMaleNtbc525kLinks } from './iulMaleNtbc525kLinks';
import { iulMaleNtbc550kLinks } from './iulMaleNtbc550kLinks';
import { iulMaleNtbc575kLinks } from './iulMaleNtbc575kLinks';
import { iulMaleNtbc600kLinks } from './iulMaleNtbc600kLinks';
import { iulMaleNtbc625kLinks } from './iulMaleNtbc625kLinks';
import { iulMaleNtbc650kLinks } from './iulMaleNtbc650kLinks';
import { iulMaleNtbc675kLinks } from './iulMaleNtbc675kLinks';
import { iulMaleNtbc700kLinks } from './iulMaleNtbc700kLinks';
import { iulMaleNtbc725kLinks } from './iulMaleNtbc725kLinks';
import { iulMaleNtbc750kLinks } from './iulMaleNtbc750kLinks';
import { iulMaleNtbc775kLinks } from './iulMaleNtbc775kLinks';
import { iulMaleNtbc1mLinks } from './iulMaleNtbc1mLinks';


// Male TBC
import { iulMaleTbc500kLinks } from './iulMaleTbc500kLinks';

// Male EX1
import { iulMaleEx1500kLinks } from './iulMaleEx1500kLinks';
import { iulMaleEx1350kLinks } from './iulMaleEx1350kLinks';

// Other Data Sets
import { iulFemaleHighValueLinks } from './iulFemaleHighValueLinks';
import { iulFemaleEx1Links } from './iulFemaleEx1Links';

// Central registry for all hardcoded IUL link datasets.
export const hardcodedIulLinks: SyncedIULRate[] = [
    // Female NTBC (Standard)
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
    ...iulFemaleNtbc400kLinks,
    ...iulFemaleNtbc425kLinks,
    ...iulFemaleNtbc450kLinks,
    ...iulFemaleNtbc475kLinks,
    ...iulFemaleNtbc500kLinks,
    ...iulFemaleNtbc525kLinks,
    ...iulFemaleNtbc550kLinks,
    ...iulFemaleNtbc575kLinks,
    ...iulFemaleNtbc600kLinks,
    ...iulFemaleNtbc625kLinks,
    ...iulFemaleNtbc650kLinks,
    ...iulFemaleNtbc675kLinks,
    ...iulFemaleNtbc700kLinks,
    ...iulFemaleNtbc725kLinks,
    ...iulFemaleNtbc750kLinks,
    ...iulFemaleNtbc775kLinks,
    ...iulFemaleNtbc1mLinks,

    // Male NTBC
    ...iulMaleNtbc100kLinks,
    ...iulMaleNtbc125kLinks,
    ...iulMaleNtbc150kLinks,
    ...iulMaleNtbc175kLinks,
    ...iulMaleNtbc200kLinks,
    ...iulMaleNtbc225kLinks,
    ...iulMaleNtbc250kLinks,
    ...iulMaleNtbc275kLinks,
    ...iulMaleNtbc300kLinks,
    ...iulMaleNtbc325kLinks,
    ...iulMaleNtbc350kLinks,
    ...iulMaleNtbc375kLinks,
    ...iulMaleNtbc400kLinks,
    ...iulMaleNtbc425kLinks,
    ...iulMaleNtbc450kLinks,
    ...iulMaleNtbc475kLinks,
    ...iulMaleNtbc500kLinks,
    ...iulMaleNtbc525kLinks,
    ...iulMaleNtbc550kLinks,
    ...iulMaleNtbc575kLinks,
    ...iulMaleNtbc600kLinks,
    ...iulMaleNtbc625kLinks,
    ...iulMaleNtbc650kLinks,
    ...iulMaleNtbc675kLinks,
    ...iulMaleNtbc700kLinks,
    ...iulMaleNtbc725kLinks,
    ...iulMaleNtbc750kLinks,
    ...iulMaleNtbc775kLinks,
    ...iulMaleNtbc1mLinks,

    // Male TBC
    ...iulMaleTbc500kLinks,

    // Male EX1
    ...iulMaleEx1500kLinks,
    ...iulMaleEx1350kLinks,

    // Other Data Sets
    ...iulFemaleHighValueLinks,
    ...iulFemaleEx1Links,
];

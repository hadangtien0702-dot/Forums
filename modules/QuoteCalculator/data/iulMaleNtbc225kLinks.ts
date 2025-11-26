
import type { SyncedIULRate } from '../utils/csvParser';

export const iulMaleNtbc225kLinks: SyncedIULRate[] = [
  { age: 1, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/14POKHfyprl96p882-8qU96uQ6ptU0ABG/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1IjHklNnUdmQx2OCT4iRDYKwTHNqZOwSO/view?usp=drivesdk' },
  { age: 2, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1Xfzj5Hs7Gq1cD_JeS2kajkdLDMx-sbiJ/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/117sT2RYEBzFX5U6y-wr5EyYipo8cFco7/view?usp=drivesdk' },
  { age: 3, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1pdiI6GhAvs32oLC-X-YAlpv8TC6kPvtN/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/148KQA2iXsx0SWP2zw1SWI8bamyGgRLhn/view?usp=drivesdk' },
  { age: 4, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1QyEY6egmr6WWk0bv0nJ1jGIllmSQNnSR/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1yIbfmTXDxVWAqtpIXkC0Hd6qaRHov0-5/view?usp=drivesdk' },
  { age: 5, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1RcswWwy0pvmwh3ZPmZu1Dz-RdEXfgK_S/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1WuwEbr6kTGgWWvnVjvM3tjHED0jpKlDm/view?usp=drivesdk' },
  { age: 6, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/15v6GWCNo3zXKfiX9eKzmGMI0-wCYhZnC/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1f5_opoQ-aG-HxtPbnGWoy0L9_3ThSHeM/view?usp=drivesdk' },
  { age: 7, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1qqJ2rcpy-RFw6d3oEo720K2FUn2k0XMn/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1Ync9pHM7IGAlEu9isaExgYtS24BsexYL/view?usp=drivesdk' },
  { age: 8, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1FYmyWkk0QuA0FvTEjiJ5jQBEZBAMQh59/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1WDgUhya1G8kRw45jlrJKJEb6z7nWvMt_/view?usp=drivesdk' },
  { age: 9, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/12p6ira2vNCkKCj5D-_gFteRMgn2BaNbM/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/11UyRGNXsHs1br5gJ6R4xaonsvafFkCK0/view?usp=drivesdk' },
  { age: 10, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/1N0qx_RNOfOY24gRRNiAoBYMEeMIMYYyu/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1eR3yc2btjmMByOv0P7eb3yrz23z5x2s/view?usp=drivesdk' },
  { age: 11, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 225000, pdfLink: 'https://drive.google.com/file/d/11s6x-5nsWY5Gao54q_kJiQbBt_YML3zT/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1JmTHOTgAp9xswaKo8Q4iyzoFcUmf6y5n/view?usp=drivesdk' },
  // Placeholders for remaining ages to prevent errors. Please update with real links.
  ...Array.from({ length: 54 }, (_, i) => ({
    age: i + 12,
    gender: 'MALE' as const,
    healthStatus: 'NTBC' as const,
    faceAmount: 225000,
    pdfLink: '',
    csvLink: ''
  }))
];

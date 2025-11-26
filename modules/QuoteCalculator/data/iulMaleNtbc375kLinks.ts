
import type { SyncedIULRate } from '../utils/csvParser';

export const iulMaleNtbc375kLinks: SyncedIULRate[] = [
  { age: 1, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1pgl2Tf3LMQdJJpCfb0lIiPLDW0XtF57N/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1cc2PcPs_Uqg8OCTZymNArhW3QIceCFPc/view?usp=drivesdk' },
  { age: 2, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/16_O95S2A5ENEt9oFgpBI2GVghbRudusN/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1qpS6Fci8M1iPes3-dLgQBOTbkvnGEVai/view?usp=drivesdk' },
  { age: 3, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1BsjeeinDR9flJJ4_SJ75coAdPMUk17nd/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1qG_QZ4BIlKIn48AY0RQ3C-yC3sbRrVAb/view?usp=drivesdk' },
  { age: 4, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1QRFsoNNPOnJini2jVNb7AY0GhfQI0uaw/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1mtYxnDjmGvuDWvpFficxRPu6Ae3mCKii/view?usp=drivesdk' },
  { age: 5, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1LSTOvgrh2OqEOyPBYWQRQQECqVWVN9cN/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1e_uCuqIPhD5cNeSWmJ6Zb3gs5N_bMYX8/view?usp=drivesdk' },
  { age: 6, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/18wVDxplv96MZIiC2rln3UipYJS_7kjp5/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1nY03kNUm52kTK0mircuiueuCYKsuRcRm/view?usp=drivesdk' },
  { age: 7, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1QkkE9LaPUB2gq8QOixbnaNCnqFfqfvBA/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1hhW9oJxbpFO2VnVZsULbTxzAJrlqDSGz/view?usp=drivesdk' },
  { age: 8, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1T95qCc5XG0jtlssSPdF19Me5D5V_Nxul/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1143fO0mVhjvYqqKnjiWEGsq1mKb3itjN/view?usp=drivesdk' },
  { age: 9, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1NFwr_5lKyjxL02x4ebVI0kGSsIfNW2lI/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1EyDRCKniTY23fzrGteKdMin-_xzDDG_v/view?usp=drivesdk' },
  { age: 10, gender: 'MALE', healthStatus: 'NTBC', faceAmount: 375000, pdfLink: 'https://drive.google.com/file/d/1-_DMhaLBhFnxsWrBgfvJ9_m6b4rJRwU-/view?usp=drivesdk', csvLink: 'https://drive.google.com/file/d/1769RH3w4b1UiECB1CMQMFnUxr-Pdd119/view?usp=drivesdk' },
  // Placeholders for remaining ages to prevent errors. Please update with real links.
  ...Array.from({ length: 55 }, (_, i) => ({
    age: i + 11,
    gender: 'MALE' as const,
    healthStatus: 'NTBC' as const,
    faceAmount: 375000,
    pdfLink: '',
    csvLink: ''
  }))
];

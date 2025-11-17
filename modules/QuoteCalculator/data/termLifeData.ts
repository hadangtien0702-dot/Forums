import { femaleSntbcRates } from './femaleSntbcData';
import { maleStbcRates } from './maleStbcData';

export const faceAmounts = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 750000, 1000000];
const ages = Array.from({ length: 51 }, (_, i) => i + 20); // 20 to 70

// This is mock data and does not represent real insurance rates.
// A helper function to generate a predictable but varied dataset for categories without real data.
const generateRateMatrix = (age: number, faceAmount: number, genderFactor: number, healthFactor: number) => {
    const base = (Math.pow(age / 10, 1.2)) + (faceAmount / 22000) + genderFactor + healthFactor;
    return {
        10: parseFloat((base * 1.8).toFixed(2)),
        15: parseFloat((base * 2.2).toFixed(2)),
        20: parseFloat((base * 2.8).toFixed(2)),
        30: parseFloat((base * 3.9).toFixed(2)),
    };
};

type RateData = {
    [health: string]: {
        [gender: string]: {
            [age: number]: {
                [face: number]: {
                    [term: number]: number | undefined
                }
            }
        }
    }
};

const healthFactors = { 'SNTBC': 0, 'STBC': 15, 'ENTBC1': -2 };
const genderFactors = { 'MALE': 5, 'FEMALE': 0 };

// Function to generate mock data for a specific gender/health combo
const generateMockCategory = (gender: 'MALE' | 'FEMALE', health: 'SNTBC' | 'STBC' | 'ENTBC1') => {
    const data: any = {};
    for (const age of ages) {
        data[age] = {};
        for (const face of faceAmounts) {
            data[age][face] = generateRateMatrix(age, face, genderFactors[gender], healthFactors[health]);
        }
    }
    return data;
}

// Build the final rate structure, prioritizing real data over mock data.
const termLifeRates: RateData = {
    'SNTBC': {
        'FEMALE': femaleSntbcRates,
        'MALE': generateMockCategory('MALE', 'SNTBC') // Mock data for now
    },
    'STBC': {
        'MALE': maleStbcRates,
        'FEMALE': generateMockCategory('FEMALE', 'STBC') // Mock data for now
    },
    'ENTBC1': {
        'MALE': generateMockCategory('MALE', 'ENTBC1'), // Fallback to mock data
        'FEMALE': generateMockCategory('FEMALE', 'ENTBC1') // Fallback to mock data
    }
};

export { termLifeRates };
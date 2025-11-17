


import { useState, useCallback } from 'react';
import type { QuoteParams, QuoteResultsData, Gender, HealthStatus, Program } from '../QuoteCalculator.types';
import { termLifeRates } from '../data/termLifeData';
import { iulFemaleSntbcRatesPer100k } from '../data/iulRatesData';
import { iulLinksByAge } from '../data/iulLinksData';

export const useQuoteCalculator = () => {
    const [params, setParams] = useState<QuoteParams>({
        age: 35,
        gender: 'MALE',
        healthStatus: 'SNTBC',
        faceAmount: 250000,
        program: 'TERM',
    });
    const [results, setResults] = useState<QuoteResultsData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleParamChange = useCallback((field: keyof QuoteParams, value: any) => {
        setParams(prev => ({ ...prev, [field]: value }));
    }, []);

    const getQuote = useCallback(() => {
        setIsLoading(true);
        setError(null);
        setResults(null);

        // Simulate API call
        setTimeout(() => {
            try {
                if (!params.age || !params.faceAmount) {
                    throw new Error("Please fill in all fields.");
                }

                const quoteResultData: QuoteResultsData = {
                    params,
                    results: [],
                };

                if (params.program === 'TERM') {
                    const ratesForAge = termLifeRates[params.healthStatus]?.[params.gender]?.[params.age]?.[params.faceAmount];
                    
                    if (!ratesForAge) {
                        throw new Error("Chưa có dữ liệu cho các lựa chọn này.");
                    }

                    const filteredResults = Object.entries(ratesForAge)
                        .filter(([, premium]) => premium !== undefined && premium !== null)
                        .map(([term, premium]) => ({
                            term: Number(term),
                            premium: premium as number,
                        }));
                    
                    if(filteredResults.length === 0) {
                        throw new Error("Chưa có dữ liệu cho các lựa chọn này.");
                    }
                    quoteResultData.results = filteredResults;

                } else if (params.program === 'IUL') {
                    if (params.gender !== 'FEMALE' || params.healthStatus !== 'SNTBC') {
                        throw new Error("IUL quotes are currently only available for Female / Standard Non Tobacco.");
                    }
                    if (params.age < 1 || params.age > 65) {
                        throw new Error("For IUL, age must be between 1 and 65.");
                    }
    
                    const baseRate = iulFemaleSntbcRatesPer100k[params.age];
                    if (!baseRate) {
                         throw new Error("No IUL rate available for the selected age.");
                    }
    
                    const premium = baseRate * (params.faceAmount / 100000);
    
                    quoteResultData.results = [
                        { term: 0, premium: parseFloat(premium.toFixed(2)) }, // term: 0 is a flag for IUL
                    ];

                    const links = iulLinksByAge[params.age];
                    if (!links) {
                        throw new Error("IUL resource links not found for the selected age.");
                    }
                    quoteResultData.pdfUrl = links.pdfUrl;
                    quoteResultData.csvUrl = links.csvUrl;

                } else {
                     throw new Error("Selected program is not supported.");
                }
                
                setResults(quoteResultData);

            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        }, 1000); // Simulate network delay
    }, [params]);

    return {
        params,
        results,
        isLoading,
        error,
        handleParamChange,
        getQuote,
    };
};
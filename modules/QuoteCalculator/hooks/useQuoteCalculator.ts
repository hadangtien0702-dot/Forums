
import { useState, useCallback } from 'react';
import type { QuoteParams, QuoteResultsData, Gender, HealthStatus, Program } from '../QuoteCalculator.types';
import { termLifeRates } from '../data/termLifeData';

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

                if (params.age < 20 || params.age > 70) {
                    throw new Error("Age must be between 20 and 70.");
                }

                const ratesForAge = termLifeRates[params.healthStatus]?.[params.gender]?.[params.age]?.[params.faceAmount];
                
                if (!ratesForAge) {
                    throw new Error("No quote available for the selected criteria. Please check the inputs.");
                }

                const calculatedResults = Object.entries(ratesForAge).map(([term, premium]) => ({
                    term: Number(term),
                    premium: premium,
                }));
                
                setResults({
                    params,
                    results: calculatedResults,
                });

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
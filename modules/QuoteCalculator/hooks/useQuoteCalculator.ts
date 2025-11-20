import { useState, useCallback } from 'react';
import type { QuoteParams, QuoteResultsData, IULRateTable } from '../QuoteCalculator.types';
import type { SyncedIULRate } from '../utils/csvParser';
import { iulRateTableData as hardcodedIulRateTableData } from '../data/iulRateTableData';
import { hardcodedIulLinks } from '../data/iulLinksRegistry';
import { mergeDeep, calculateTermQuote, calculateIULQuote } from '../utils/quoteLogic';

export const useQuoteCalculator = () => {
    const [params, setParams] = useState<QuoteParams>({
        age: 35,
        gender: 'FEMALE',
        healthStatus: 'NTBC',
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

        // Simulate API call latency for UX
        setTimeout(() => {
            try {
                if (params.age === null || params.faceAmount === null || params.age <= 0 || params.faceAmount <= 0) {
                    throw new Error("Vui lòng nhập đầy đủ và hợp lệ các thông tin.");
                }

                let quoteResultData: QuoteResultsData;

                if (params.program === 'TERM') {
                    quoteResultData = calculateTermQuote(params);
                } else if (params.program === 'IUL') {
                    // 1. Prepare Rate Table: Merge hardcoded data with user-uploaded data (localStorage)
                    const rateTableDataString = localStorage.getItem('iulRateTableData');
                    const localRateTable: IULRateTable = rateTableDataString ? JSON.parse(rateTableDataString) : {};
                    const mergedRateTable = mergeDeep(hardcodedIulRateTableData, localRateTable);

                    // 2. Prepare Links: Combine hardcoded links with synced links from localStorage
                    let allLinks: SyncedIULRate[] = [...hardcodedIulLinks];
                    const syncedDataString = localStorage.getItem('syncedIULRates');
                    if (syncedDataString) {
                        const localStorageLinks: SyncedIULRate[] = JSON.parse(syncedDataString);
                        allLinks = [...allLinks, ...localStorageLinks];
                    }

                    quoteResultData = calculateIULQuote(params, mergedRateTable, allLinks);

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
        }, 500);
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


import { useState, useEffect, useCallback } from 'react';
import type { QuoteParams, QuoteResultsData, IULRateTable } from '../QuoteCalculator.types';
import type { SyncedIULRate } from '../utils/csvParser';
import { iulRateTableData as hardcodedIulRateTableData } from '../data/iulRateTableData';
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
    
    // State for remote IUL link data
    const [remoteLinks, setRemoteLinks] = useState<SyncedIULRate[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Fetch the large IUL data JSON on mount
    useEffect(() => {
        fetch('/data/iul-data.json')
            .then(res => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then(data => {
                setRemoteLinks(data);
                setIsDataLoaded(true);
            })
            .catch(err => {
                console.error("Failed to load static IUL data:", err);
                // We allow it to continue even if fetch fails; users can upload their own data
                setIsDataLoaded(true);
            });
    }, []);

    const handleParamChange = useCallback((field: keyof QuoteParams, value: any) => {
        setParams(prev => ({ ...prev, [field]: value }));
        // Clear results when params change to avoid showing stale data
        if (results) setResults(null); 
        if (error) setError(null);
    }, [results, error]);

    const getQuote = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setResults(null);

        // Using a promise to allow the UI to paint the loading state
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            // Validation Layer
            if (params.age === null || params.faceAmount === null) {
                throw new Error("Vui lòng nhập đầy đủ thông tin Tuổi và Mệnh giá.");
            }
            if (params.age <= 0 || params.age > 100) {
                throw new Error("Độ tuổi không hợp lệ.");
            }
            if (params.faceAmount <= 0) {
                 throw new Error("Mệnh giá phải lớn hơn 0.");
            }

            let quoteResultData: QuoteResultsData;

            if (params.program === 'TERM') {
                quoteResultData = calculateTermQuote(params);
            } else if (params.program === 'IUL') {
                // 1. Prepare Rate Table with error handling for JSON parsing
                let localRateTable: IULRateTable = {};
                try {
                    const rateTableDataString = localStorage.getItem('iulRateTableData');
                    if (rateTableDataString) {
                        localRateTable = JSON.parse(rateTableDataString);
                    }
                } catch (e) {
                    console.error("Failed to parse local rate table, using default.", e);
                }
                
                const mergedRateTable = mergeDeep(hardcodedIulRateTableData, localRateTable);

                // 2. Prepare Links: Combine remote fetched data with local storage overrides
                let allLinks: SyncedIULRate[] = [...remoteLinks];
                
                try {
                    const syncedDataString = localStorage.getItem('syncedIULRates');
                    if (syncedDataString) {
                        const localStorageLinks: SyncedIULRate[] = JSON.parse(syncedDataString);
                        if (Array.isArray(localStorageLinks)) {
                             allLinks = [...allLinks, ...localStorageLinks];
                        }
                    }
                } catch (e) {
                    console.error("Failed to parse local links, using default.", e);
                }

                quoteResultData = calculateIULQuote(params, mergedRateTable, allLinks);

            } else {
                 throw new Error("Chương trình bảo hiểm đã chọn không được hỗ trợ.");
            }
            
            setResults(quoteResultData);

        } catch (e) {
            console.error("Calculation Error:", e);
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [params, remoteLinks]);

    return {
        params,
        results,
        isLoading,
        error,
        handleParamChange,
        getQuote,
    };
};

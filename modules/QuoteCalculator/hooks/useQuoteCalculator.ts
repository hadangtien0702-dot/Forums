



import { useState, useCallback } from 'react';
import type { QuoteParams, QuoteResultsData, IULRateTable } from '../QuoteCalculator.types';
import { termLifeRates } from '../data/termLifeData';
import type { SyncedIULRate } from '../utils/csvParser';
import { iulRateTableData as hardcodedIulRateTableData } from '../data/iulRateTableData';

// Helper function for deep merging
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));
const mergeDeep = (target: any, source: any): any => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

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

        // Simulate API call
        setTimeout(() => {
            try {
                if (params.age === null || params.faceAmount === null || params.age <= 0 || params.faceAmount <= 0) {
                    throw new Error("Vui lòng nhập đầy đủ và hợp lệ các thông tin.");
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
                    // 1. Prepare data by merging hardcoded data with user-uploaded data (localStorage)
                    const rateTableDataString = localStorage.getItem('iulRateTableData');
                    const localRateTable: IULRateTable = rateTableDataString ? JSON.parse(rateTableDataString) : {};
                    const mergedRateTable = mergeDeep(hardcodedIulRateTableData, localRateTable);

                    // 2. Try to get premium from the merged rate table
                    const premiumFromTable = mergedRateTable[params.gender]?.[params.healthStatus]?.[params.age]?.[params.faceAmount];

                    if (premiumFromTable !== undefined && premiumFromTable !== null) {
                        quoteResultData.results = [{ term: 0, premium: premiumFromTable }];
                    } else {
                        // 3. Fallback to flat list data if table lookup fails
                        const syncedDataString = localStorage.getItem('syncedIULRates');
                        if (syncedDataString) {
                            const syncedRates: SyncedIULRate[] = JSON.parse(syncedDataString);
                            const matchedRate = syncedRates.find(rate => 
                                rate.age === params.age && 
                                rate.gender === params.gender &&
                                rate.healthStatus === params.healthStatus
                            );
                            if (matchedRate) {
                                const premium = matchedRate.premium * (params.faceAmount / 100000);
                                quoteResultData.results = [{ term: 0, premium: parseFloat(premium.toFixed(2)) }];
                                quoteResultData.pdfUrl = matchedRate.pdfLink;
                                quoteResultData.csvUrl = matchedRate.csvLink;
                            }
                        }
                    }
                    
                    // 4. Final check and error handling
                    if (quoteResultData.results.length === 0) {
                        // Check if we have data for the selection but the face amount is wrong
                        const availableDataForSelection = mergedRateTable[params.gender]?.[params.healthStatus]?.[params.age];
                        if (availableDataForSelection) {
                            const availableFaceAmounts = Object.keys(availableDataForSelection).map(Number).sort((a,b) => a - b);
                            if (availableFaceAmounts.length > 0) {
                                throw new Error(`Mệnh giá không hợp lệ. Các mệnh giá có sẵn cho tuổi ${params.age}: ${availableFaceAmounts.map(fa => fa.toLocaleString()).join(', ')}`);
                            }
                        }
                        // Generic error if no data source has the required info
                        throw new Error(`Không có dữ liệu IUL cho ${params.age} tuổi, giới tính ${params.gender}, sức khỏe ${params.healthStatus}. Vui lòng kiểm tra lại file dữ liệu của bạn hoặc các lựa chọn.`);
                    }

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
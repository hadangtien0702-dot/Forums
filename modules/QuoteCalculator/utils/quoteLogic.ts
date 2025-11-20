import type { QuoteParams, QuoteResultsData, IULRateTable } from '../QuoteCalculator.types';
import { termLifeRates } from '../data/termLifeData';
import type { SyncedIULRate } from './csvParser';

// Helper function for deep merging objects
const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));

export const mergeDeep = (target: any, source: any): any => {
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
};

export const calculateTermQuote = (params: QuoteParams): QuoteResultsData => {
    if (!params.age || !params.faceAmount) throw new Error("Vui lòng nhập đầy đủ và hợp lệ các thông tin.");

    const ratesForAge = termLifeRates[params.healthStatus]?.[params.gender]?.[params.age]?.[params.faceAmount];
    
    if (!ratesForAge) {
        throw new Error("Chưa có dữ liệu cho các lựa chọn này.");
    }

    const results = Object.entries(ratesForAge)
        .filter(([, premium]) => premium !== undefined && premium !== null)
        .map(([term, premium]) => ({
            term: Number(term),
            premium: premium as number,
        }));
    
    if(results.length === 0) {
        throw new Error("Chưa có dữ liệu cho các lựa chọn này.");
    }

    return { params, results };
};

export const calculateIULQuote = (
    params: QuoteParams, 
    mergedRateTable: IULRateTable, 
    allLinks: SyncedIULRate[]
): QuoteResultsData => {
    if (!params.age || !params.faceAmount) throw new Error("Vui lòng nhập đầy đủ và hợp lệ các thông tin.");

    const quoteResultData: QuoteResultsData = { params, results: [] };

    // 1. Try to get premium from the rate table
    const premiumFromTable = mergedRateTable[params.gender]?.[params.healthStatus]?.[params.age]?.[params.faceAmount];

    if (premiumFromTable !== undefined && premiumFromTable !== null) {
        quoteResultData.results = [{ term: 0, premium: premiumFromTable }];
    } 

    // 2. Look up in link data (both hardcoded and synced)
    if (allLinks.length > 0) {
        const demographicMatches = allLinks.filter(rate => 
            rate.age === params.age && 
            rate.gender === params.gender &&
            rate.healthStatus === params.healthStatus
        );

        if (demographicMatches.length > 0) {
            // Priority 1: Find specific match for this Face Amount
            let matchedRate = demographicMatches.find(rate => rate.faceAmount === params.faceAmount);
            
            // Priority 2: Find generic match (no face amount specified)
            if (!matchedRate) {
                matchedRate = demographicMatches.find(rate => !rate.faceAmount);
            }

            if (matchedRate) {
                // Fallback premium calculation if not found in table but exists in link data
                if (quoteResultData.results.length === 0 && matchedRate.premium && matchedRate.premium > 0) {
                    let premium = matchedRate.premium;
                    // If data provided is per unit or needs scaling (logic depends on data source nature)
                    // For now assuming generic link lists might have base premium or specific premium. 
                    // Simple fallback logic: if faces match use it, otherwise try scaling if base exists.
                     if (matchedRate.faceAmount && matchedRate.faceAmount !== params.faceAmount) {
                         premium = matchedRate.premium * (params.faceAmount / matchedRate.faceAmount);
                    }
                    quoteResultData.results = [{ term: 0, premium: parseFloat(premium.toFixed(2)) }];
                }
                
                // Attach links
                if (matchedRate.pdfLink) quoteResultData.pdfUrl = matchedRate.pdfLink;
                if (matchedRate.csvLink) quoteResultData.csvUrl = matchedRate.csvLink;
            }
        }
    }
    
    // 3. Final check and error handling
    if (quoteResultData.results.length === 0) {
        // Detailed error message if face amount invalid
        const availableDataForSelection = mergedRateTable[params.gender]?.[params.healthStatus]?.[params.age];
        if (availableDataForSelection) {
            const availableFaceAmounts = Object.keys(availableDataForSelection).map(Number).sort((a,b) => a - b);
            if (availableFaceAmounts.length > 0) {
                throw new Error(`Mệnh giá không hợp lệ. Các mệnh giá có sẵn cho tuổi ${params.age}: ${availableFaceAmounts.map(fa => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(fa)).join(', ')}`);
            }
        }
        throw new Error(`Không có dữ liệu IUL cho ${params.age} tuổi, giới tính ${params.gender}, sức khỏe ${params.healthStatus}.`);
    }

    return quoteResultData;
};

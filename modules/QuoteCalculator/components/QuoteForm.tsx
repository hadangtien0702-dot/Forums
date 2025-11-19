



import React, { useEffect, useMemo } from 'react';
import type { QuoteParams, Gender, HealthStatus, Program, IULRateTable } from '../QuoteCalculator.types';
import { faceAmounts as allTermFaceAmounts } from '../data/termLifeData';
import { iulRateTableData as hardcodedIulRateTableData } from '../data/iulRateTableData';
import Spinner from '../../../shared/ui/Spinner';
import SegmentedControl from './SegmentedControl';

interface QuoteFormProps {
  params: QuoteParams;
  isLoading: boolean;
  onParamChange: (field: keyof QuoteParams, value: any) => void;
  onSubmit: () => void;
}

// Helper function for deep merging, needed to combine hardcoded and user-uploaded data.
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

const QuoteForm: React.FC<QuoteFormProps> = ({ params, isLoading, onParamChange, onSubmit }) => {
    const isIUL = params.program === 'IUL';

    // Combine hardcoded data with user-uploaded data from localStorage
    const mergedIulRateTable = useMemo(() => {
        const rateTableDataString = localStorage.getItem('iulRateTableData');
        const localRateTable: IULRateTable = rateTableDataString ? JSON.parse(rateTableDataString) : {};
        return mergeDeep(hardcodedIulRateTableData, localRateTable);
    }, [params.program]); // Re-calculate only when program changes, as localStorage is external

    // Determine available face amounts for IUL based on merged data
    const iulAvailableFaceAmounts = useMemo(() => {
        if (!isIUL || !params.age) return null;
        const rateDataForSelection = mergedIulRateTable[params.gender]?.[params.healthStatus]?.[params.age];
        if (rateDataForSelection) {
            return Object.keys(rateDataForSelection).map(Number).sort((a, b) => a - b);
        }
        return null;
    }, [isIUL, params.age, params.gender, params.healthStatus, mergedIulRateTable]);

    // Define validation rules based on current selections
    let minAge = 20;
    let maxAge = 70;
    let currentTermFaceAmounts = allTermFaceAmounts;
    
    const isTermMaleTbc = params.program === 'TERM' && params.gender === 'MALE' && params.healthStatus === 'TBC';
    const isTermMaleEx1 = params.program === 'TERM' && params.gender === 'MALE' && params.healthStatus === 'EX1';
    const isTermFemaleEx1 = params.program === 'TERM' && params.gender === 'FEMALE' && params.healthStatus === 'EX1';

    if (isIUL) {
        minAge = 1;
        maxAge = 65;
    } else if (isTermMaleTbc) {
        minAge = 30;
        currentTermFaceAmounts = [100000, 300000, 500000];
    } else if (isTermMaleEx1 || isTermFemaleEx1) {
        minAge = 30;
        maxAge = 54;
        currentTermFaceAmounts = [100000, 300000, 500000];
    }

    // Effect to reset age/face amount if they become invalid after changing selections
    useEffect(() => {
        if (params.age !== null && (params.age < minAge || params.age > maxAge)) {
            onParamChange('age', null);
        }
        
        // When selections change, if the current face amount is no longer valid, reset it.
        const currentFaceAmount = params.faceAmount;
        if (currentFaceAmount !== null) {
            if (isIUL) {
                if (iulAvailableFaceAmounts && !iulAvailableFaceAmounts.includes(currentFaceAmount)) {
                    onParamChange('faceAmount', null);
                }
            } else { // TERM program
                if (!currentTermFaceAmounts.includes(currentFaceAmount)) {
                    onParamChange('faceAmount', null);
                }
            }
        }
    }, [params.program, params.gender, params.healthStatus, params.age, minAge, maxAge, onParamChange, isIUL, iulAvailableFaceAmounts, currentTermFaceAmounts]);

    const showIULDropdown = isIUL && iulAvailableFaceAmounts && iulAvailableFaceAmounts.length > 0;

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Program</label>
                <SegmentedControl<Program>
                    name="program"
                    value={params.program}
                    onChange={(val) => onParamChange('program', val)}
                    options={[
                        { label: 'Term-Life', value: 'TERM' },
                        { label: 'IUL', value: 'IUL' },
                    ]}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-2">Client's Age</label>
                    <input
                        type="number"
                        id="age"
                        value={params.age || ''}
                        onChange={(e) => onParamChange('age', e.target.value ? Number(e.target.value) : null)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={minAge}
                        max={maxAge}
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                    <SegmentedControl<Gender>
                        name="gender"
                        value={params.gender}
                        onChange={(val) => onParamChange('gender', val)}
                        options={[
                            { label: 'Male', value: 'MALE' },
                            { label: 'Female', value: 'FEMALE' },
                        ]}
                    />
                </div>
            </div>
            
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Health Status</label>
                <SegmentedControl<HealthStatus>
                    name="healthStatus"
                    value={params.healthStatus}
                    onChange={(val) => onParamChange('healthStatus', val)}
                    options={[
                        { label: 'NTBC', value: 'NTBC' },
                        { label: 'TBC', value: 'TBC' },
                        { label: 'EX1', value: 'EX1' },
                    ]}
                />
            </div>
            
            <div>
                <label htmlFor="faceAmount" className="block text-sm font-medium text-slate-700 mb-2">Face Amount</label>
                {isIUL ? (
                    showIULDropdown ? (
                        <select
                            id="faceAmount"
                            value={params.faceAmount || ''}
                            onChange={(e) => onParamChange('faceAmount', e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select an amount</option>
                            {iulAvailableFaceAmounts.map(amount => (
                                <option key={amount} value={amount}>
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)}
                                </option>
                            ))}
                        </select>
                    ) : (
                         <input
                            type="number"
                            id="faceAmount"
                            value={params.faceAmount || ''}
                            onChange={(e) => onParamChange('faceAmount', e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 250000"
                            step="10000"
                        />
                    )
                ) : (
                    <select
                        id="faceAmount"
                        value={params.faceAmount || ''}
                        onChange={(e) => onParamChange('faceAmount', e.target.value ? Number(e.target.value) : null)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select an amount</option>
                        {currentTermFaceAmounts.map(amount => (
                            <option key={amount} value={amount}>
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            
            <div>
                <button
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/40 active:scale-[0.98] active:translate-y-0 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                >
                    {isLoading ? <Spinner /> : 'Get Quote'}
                </button>
            </div>
        </div>
    );
};

export default QuoteForm;
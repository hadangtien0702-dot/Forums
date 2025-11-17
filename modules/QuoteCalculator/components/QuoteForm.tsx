

import React, { useEffect } from 'react';
import type { QuoteParams, Gender, HealthStatus, Program } from '../QuoteCalculator.types';
import { faceAmounts as allFaceAmounts } from '../data/termLifeData';
import Spinner from '../../../shared/ui/Spinner';
import SegmentedControl from './SegmentedControl';

interface QuoteFormProps {
  params: QuoteParams;
  isLoading: boolean;
  onParamChange: (field: keyof QuoteParams, value: any) => void;
  onSubmit: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ params, isLoading, onParamChange, onSubmit }) => {
    // Define validation rules based on current selections
    let minAge = 20;
    let maxAge = 70;
    let currentFaceAmounts = allFaceAmounts;

    const isTermMaleStbc = params.program === 'TERM' && params.gender === 'MALE' && params.healthStatus === 'STBC';
    const isTermMaleEntbc1 = params.program === 'TERM' && params.gender === 'MALE' && params.healthStatus === 'ENTBC1';
    const isTermFemaleEntbc1 = params.program === 'TERM' && params.gender === 'FEMALE' && params.healthStatus === 'ENTBC1';

    if (params.program === 'IUL') {
        minAge = 1;
        maxAge = 65;
    } else if (isTermMaleStbc) {
        minAge = 30;
        currentFaceAmounts = [100000, 300000, 500000];
    } else if (isTermMaleEntbc1 || isTermFemaleEntbc1) {
        minAge = 30;
        maxAge = 54;
        currentFaceAmounts = [100000, 300000, 500000];
    }

    // Effect to reset age/face amount if they become invalid after changing rules
    useEffect(() => {
        if (params.age !== null && (params.age < minAge || params.age > maxAge)) {
            onParamChange('age', null);
        }
        if (params.faceAmount !== null && !currentFaceAmounts.includes(params.faceAmount)) {
            onParamChange('faceAmount', null);
        }
    }, [params.program, params.gender, params.healthStatus]);


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
                        { label: 'SNTBC', value: 'SNTBC' },
                        { label: 'STBC', value: 'STBC' },
                        { label: 'ENTBC1', value: 'ENTBC1' },
                    ]}
                />
            </div>
            
            <div>
                <label htmlFor="faceAmount" className="block text-sm font-medium text-slate-700 mb-2">Face Amount</label>
                <select
                    id="faceAmount"
                    value={params.faceAmount || ''}
                    onChange={(e) => onParamChange('faceAmount', e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-base bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select an amount</option>
                    {currentFaceAmounts.map(amount => (
                        <option key={amount} value={amount}>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)}
                        </option>
                    ))}
                </select>
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
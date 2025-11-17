
import React from 'react';
import type { QuoteParams, Gender, HealthStatus, Program } from '../QuoteCalculator.types';
import { faceAmounts } from '../data/termLifeData';
import Spinner from '../../../shared/ui/Spinner';
import SegmentedControl from './SegmentedControl';

interface QuoteFormProps {
  params: QuoteParams;
  isLoading: boolean;
  onParamChange: (field: keyof QuoteParams, value: any) => void;
  onSubmit: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ params, isLoading, onParamChange, onSubmit }) => {
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
                        min="20"
                        max="70"
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
                    {faceAmounts.map(amount => (
                        <option key={amount} value={amount}>
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount)}
                        </option>
                    ))}
                </select>
            </div>
            
            <div>
                <button
                    onClick={onSubmit}
                    disabled={isLoading || params.program === 'IUL'}
                    className="w-full flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all hover:bg-blue-700 active:scale-[0.98] disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Spinner /> : 'Get Quote'}
                </button>
                 {params.program === 'IUL' && <p className="text-xs text-center mt-2 text-slate-500">IUL program calculator is coming soon.</p>}
            </div>
        </div>
    );
};

export default QuoteForm;
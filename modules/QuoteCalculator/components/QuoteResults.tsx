


import React from 'react';
import type { QuoteResultsData } from '../QuoteCalculator.types';

const formatCurrency = (amount: number | null) => {
    if (amount === null) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

interface QuoteResultsProps {
  data: QuoteResultsData;
}

const FileIcon: React.FC<{ type: 'PDF' | 'CSV' }> = ({ type }) => {
    if (type === 'PDF') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        );
    }
    // CSV Icon
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    );
};


const DownloadItem: React.FC<{ title: string; subtitle: string; href: string; type: 'PDF' | 'CSV' }> = ({ title, subtitle, href, type }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-3 bg-slate-100 rounded-lg hover:bg-slate-200/70 border border-slate-200 transition-colors group"
    >
      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-white rounded-md shadow-sm">
        <FileIcon type={type} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600">{title}</p>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
      <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </a>
  );

const QuoteResults: React.FC<QuoteResultsProps> = ({ data }) => {
    const { params, results, pdfUrl, csvUrl } = data;
    const isIUL = params.program === 'IUL';

    return (
        <div>
            <h2 className="text-xl font-bold text-slate-800">{isIUL ? 'Your IUL Quote' : 'Your Term-Life Quote'}</h2>
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                    <p className="font-medium text-slate-500">Age</p>
                    <p className="font-semibold text-slate-800">{params.age}</p>
                </div>
                 <div>
                    <p className="font-medium text-slate-500">Gender</p>
                    <p className="font-semibold text-slate-800">{params.gender}</p>
                </div>
                 <div>
                    <p className="font-medium text-slate-500">Health Status</p>
                    <p className="font-semibold text-slate-800">{params.healthStatus}</p>
                </div>
                 <div>
                    <p className="font-medium text-slate-500">Face Amount</p>
                    <p className="font-semibold text-slate-800">{formatCurrency(params.faceAmount).replace('.00', '')}</p>
                </div>
            </div>
            <div className="mt-4">
                <ul className="divide-y divide-slate-100">
                    {results.map(result => (
                        <li key={result.term} className="flex justify-between items-center py-4">
                            <span className="font-semibold text-slate-600">
                                {isIUL ? 'Illustrative Monthly Premium' : `${result.term}-Year Term`}
                            </span>
                            <span className="font-bold text-xl text-blue-600">{formatCurrency(result.premium)}<span className="text-sm font-medium text-slate-500">/mo</span></span>
                        </li>
                    ))}
                </ul>
            </div>
            {isIUL && pdfUrl && csvUrl && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-800 mb-3">Tài liệu tham khảo</h3>
                <div className="space-y-3">
                  <DownloadItem
                    title="Minh họa sản phẩm"
                    subtitle="Tài liệu PDF"
                    href={pdfUrl}
                    type="PDF"
                  />
                  <DownloadItem
                    title="Bảng chi tiết"
                    subtitle="Tệp CSV"
                    href={csvUrl}
                    type="CSV"
                  />
                </div>
              </div>
            )}
        </div>
    );
};

export default QuoteResults;
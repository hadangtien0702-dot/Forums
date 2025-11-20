import React, { useState, useCallback } from 'react';
import { parseIULCsv } from '../utils/csvParser';
import Spinner from '../../../shared/ui/Spinner';
import type { IULRateTable } from '../QuoteCalculator.types';
import { mergeDeep } from '../utils/quoteLogic';

interface DataSyncCardProps {
    onSyncSuccess: () => void;
    onSyncError: (message: string) => void;
}

const DataSyncCard: React.FC<DataSyncCardProps> = ({ onSyncSuccess, onSyncError }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setIsLoading(true);
        setFileName(file.name);
        onSyncError(''); // Clear previous errors

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csvText = e.target?.result as string;
                const parsedResult = parseIULCsv(csvText);

                if (!parsedResult) {
                    throw new Error('Không tìm thấy dữ liệu hợp lệ trong file CSV. Vui lòng kiểm tra định dạng file.');
                }
                
                if (parsedResult.type === 'table') {
                    const newTableData = parsedResult.data as IULRateTable;
                    const existingDataStr = localStorage.getItem('iulRateTableData');
                    let existingData = existingDataStr ? JSON.parse(existingDataStr) : {};
                    const mergedData = mergeDeep(existingData, newTableData);
                    localStorage.setItem('iulRateTableData', JSON.stringify(mergedData));

                } else { // type === 'list'
                    // For Link Mapping lists
                    // We merge with existing synced rates to avoid overwriting
                    const existingSyncedStr = localStorage.getItem('syncedIULRates');
                    let existingSynced = existingSyncedStr ? JSON.parse(existingSyncedStr) : [];
                    // Simple concat for now, logic could be improved to deduplicate
                    const newData = parsedResult.data as any[];
                    const mergedSynced = [...existingSynced, ...newData];
                    localStorage.setItem('syncedIULRates', JSON.stringify(mergedSynced));
                }

                onSyncSuccess();
            } catch (error) {
                let message = 'Đã có lỗi xảy ra trong quá trình xử lý file.';
                if (error instanceof Error) {
                    message = error.message;
                }
                console.error('File processing failed:', error);
                onSyncError(message);
                setFileName('');
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            onSyncError('Không thể đọc file đã chọn.');
            setIsLoading(false);
            setFileName('');
        };
        
        reader.readAsText(file);
        
        // Reset file input to allow re-uploading the same file
        event.target.value = '';

    }, [onSyncSuccess, onSyncError]);

    return (
        <div className="bg-white rounded-xl shadow-lg shadow-slate-200/80 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <h2 className="text-xl font-bold text-slate-800">Tải lên dữ liệu IUL hoặc Link Tài liệu</h2>
            </div>
            <div className="text-slate-600 mb-4 text-sm space-y-2">
                <p>Bạn có thể tải lên 2 loại file CSV:</p>
                <ul className="list-disc list-inside pl-2 text-slate-500">
                    <li><strong>Bảng Phí Bảo Hiểm:</strong> Dữ liệu dạng bảng để tính toán phí.</li>
                    <li><strong>Danh Sách Link:</strong> Để gán link PDF/CSV. Format: <code>Age, Gender, HealthStatus, FaceAmount (hoặc Premium), PDF_Link, CSV_Link</code></li>
                </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
                 <div className="flex-grow">
                    <label htmlFor="csv-upload" className="w-full flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-200 cursor-pointer">
                        {isLoading ? <Spinner /> : (
                           <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                {fileName || 'Chọn tệp CSV'}
                           </>
                        )}
                    </label>
                    <input type="file" id="csv-upload" accept=".csv" onChange={handleFileChange} className="hidden" disabled={isLoading} />
                 </div>
            </div>
        </div>
    );
};

export default DataSyncCard;

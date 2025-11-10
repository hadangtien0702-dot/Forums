// FIX: Import React to resolve 'Cannot find namespace React' error.
import React, { useState, useEffect, useCallback } from 'react';
import type { LogEntry, CalculationResult } from '../AgeCalculator.types';
import { calculateAgeLogic } from '../utils/ageCalculator';
import { MAX_LOG_ENTRIES } from '../AgeCalculator.constants';

export const useAgeCalculator = () => {
  const [dob, setDob] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    try {
      const storedLogs = localStorage.getItem('ageCalculatorLogs');
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (e) {
      console.error("Failed to parse logs from localStorage", e);
    }
  }, []);

  const saveLogs = (newLogs: LogEntry[]) => {
    setLogs(newLogs);
    localStorage.setItem('ageCalculatorLogs', JSON.stringify(newLogs));
  };

  const handleCalculate = useCallback(() => {
    setError(null);
    setResult(null);

    if (!dob) {
      setError("Please enter the client's date of birth.");
      return;
    }

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!dateRegex.test(dob)) {
      setError('Please use the correct MM/DD/YYYY format.');
      return;
    }

    const [month, day, year] = dob.split('/').map(Number);
    const testDate = new Date(year, month - 1, day);
    if (testDate.getFullYear() !== year || testDate.getMonth() !== month - 1 || testDate.getDate() !== day) {
      setError('The date of birth is invalid.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        const calculatedResult = calculateAgeLogic(dob);
        setResult(calculatedResult);

        const newLog: LogEntry = {
          timestamp: new Date().toISOString(),
          dob: dob,
          actualAge: calculatedResult.actualAge,
          insuranceAge: calculatedResult.insuranceAge,
          nextAgeDate: calculatedResult.nextAgeDate,
        };

        const updatedLogs = [newLog, ...logs].slice(0, MAX_LOG_ENTRIES);
        saveLogs(updatedLogs);

      } catch (e) {
        setError("An error occurred during calculation.");
      } finally {
        setIsLoading(false);
      }
    }, 800);
  }, [dob, logs]);

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';

    if (value.length > 2) {
      formatted = value.substring(0, 2) + '/';
      if (value.length > 4) {
        formatted += value.substring(2, 4) + '/' + value.substring(4, 8);
      } else {
        formatted += value.substring(2);
      }
    } else {
      formatted = value;
    }
    setDob(formatted);
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear the entire history?')) {
      saveLogs([]);
    }
  };

  return {
    dob,
    result,
    error,
    isLoading,
    logs,
    handleCalculate,
    handleDobChange,
    handleClearLogs,
  };
};

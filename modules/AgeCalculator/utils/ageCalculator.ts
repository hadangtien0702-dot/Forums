import type { CalculationResult } from '../AgeCalculator.types';

export const calculateAgeLogic = (dobStr: string): CalculationResult => {
  const [month, day, year] = dobStr.split('/').map(Number);
  const dob = new Date(year, month - 1, day);
  const today = new Date();

  // Calculate Actual Age
  let actualAge = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      actualAge--;
  }

  // Calculate Insurance Age
  let baseAge = today.getFullYear() - year;
  const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
  if (today < birthdayThisYear) {
    baseAge--;
  }

  let ageIncreaseThisYear = new Date(today.getFullYear(), month - 1 + 6, day);
  let insuranceAge = baseAge;
  if (today >= ageIncreaseThisYear) {
    insuranceAge = baseAge + 1;
  }

  let nextAgeIncreaseDate;
  if (today >= ageIncreaseThisYear) {
    nextAgeIncreaseDate = new Date(today.getFullYear() + 1, month - 1 + 6, day);
  } else {
    nextAgeIncreaseDate = ageIncreaseThisYear;
  }

  const daysRemaining = Math.ceil((nextAgeIncreaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(nextAgeIncreaseDate);

  return {
    actualAge,
    insuranceAge,
    nextAgeDate: formattedDate,
    daysRemaining,
  };
};
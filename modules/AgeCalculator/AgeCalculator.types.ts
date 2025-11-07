export interface LogEntry {
  timestamp: string;
  dob: string;
  actualAge: number;
  insuranceAge: number;
  nextAgeDate: string;
}

export interface CalculationResult {
  actualAge: number;
  insuranceAge: number;
  nextAgeDate: string;
  daysRemaining: number;
}
import { LoanType } from "./LoanType.model";

export interface LoanSetting {
  id?: string;
  loanTypeDto?: LoanType;
  name: string;
  interestRate: number;
  loanAmount: number;
  loanTermMonths: number;

}

export enum LoanCategory {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
  MORTGAGE = 'MORTGAGE',
  STUDENT = 'STUDENT'
}

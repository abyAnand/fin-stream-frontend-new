import { AccountDto } from "../account/AccountDto.model";
import { Bank } from "../transaction/BankTransactionHistory.model";


export interface LoanDto {
  id?: string;
  bankId: string;
  bank?: Bank;
  userId: string;
  loanName: string;
  loanSettingId: string;
  loanTypeId: string;
  loanCategory: LoanCategory;
  interestRate: number;
  loanAmount: number;
  loanTermMonths: number;
  collateral: Collateral;
  approvalStatus: ApprovalStatus;
  remainingTermMonths: number;
  selectedAccount: AccountDto;
  loanClosed: boolean;
  missedPayments?: number;
  approvedDate?: Date | null;
}

export enum LoanCategory {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
  MORTGAGE = 'MORTGAGE',
  STUDENT = 'STUDENT'
}

export enum Collateral {
  REAL_ESTATE = 'REAL_ESTATE',
  VEHICLE = 'VEHICLE',
  EQUIPMENT = 'EQUIPMENT',
  VALUABLES = 'VALUABLES',
  FINANCIAL_ASSETS = 'FINANCIAL_ASSETS',
  NONE = 'NONE'
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface AccountDto {
  id?: string;
  bankId: string;
  accountSettingId: string;
  accountNumber?: string;
  accountName?: string;
  accountType: AccountType;
  userId: string;
  balance: number;
  isDeleted?: boolean;
  secondaryUserId?: string;
  interestRate?: number;
  overdraftLimit?: number;
  cdTerm?: number;
  accountHolders?: string[];
  maxMonthlyTransactions?: number;
  linkedSavingsAccountId?: string;
  totalTransaction?: number;
  monthlyTransaction?: number;
  yearlyTransaction?: number;
}

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CHECKING = 'CHECKING',
  FD = 'FD',
  MONEY_MARKET = 'MONEY_MARKET',
  IRA = 'IRA',
  JOINT = 'JOINT',
  BUSINESS = 'BUSINESS',
  STUDENT = 'STUDENT',
  TRUST = 'TRUST',
  CUSTODIAL = 'CUSTODIAL'
}

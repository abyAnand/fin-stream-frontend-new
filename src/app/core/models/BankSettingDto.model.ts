export interface BankSettingDto {
  id?: string;
  bankId: string;
  accountType: AccountType;
  accountName: string;
  overdraftLimit?: number;
  cdTerm?: number;
  accountHoldersLimit?: number;
  maxMonthlyTransactions?: number;
  interestRate?: number;
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

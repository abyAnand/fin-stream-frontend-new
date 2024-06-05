import { Image } from "../../Image.model";

export interface AccountSettingDto {
  id?: string;
  bankId: string;
  image?: Image;
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

import { AccountDto } from "./AccountDto.model";

export interface BankAccountDto {
    id: string;
    bankId: string;
    accountSettingDto: AccountSettingDto;
    userDto: UserDto;
    balance: number;
    totalTransaction: number;
}

export interface AccountSettingDto {
    id: string;
    bankId: string;
    accountType: AccountType;
    accountName: string;
    overdraftLimit: number;
    cdTerm: number;
    accountHoldersLimit: number;
    maxMonthlyTransactions: number;
    interestRate: number;
}

export interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    employmentStatus: EmploymentStatus;
    monthlyIncome: number;
    totalAssets: number;
    totalLiabilities: number;
    accountList: AccountDto[];
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
    CUSTODIAL = 'CUSTODIAL',
}

export enum EmploymentStatus {
    EMPLOYED = 'EMPLOYED',
    UNEMPLOYED = 'UNEMPLOYED',
    SELF_EMPLOYED = 'SELF_EMPLOYED',
    STUDENT = 'STUDENT',
    RETIRED = 'RETIRED',
}

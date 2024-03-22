import { AccountDto } from "../account/AccountDto.model";
import { LoanDto } from "../loan/LoanDto.model";


export interface UserDto {
  id: string; // Assuming UUID is represented as a string
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus?: EmploymentStatus;
  monthlyIncome?: number;
  totalAssets?: number;
  totalLiabilities?: number;
  accountList?: AccountDto[];
  loanList?: LoanDto[];
  createdDate?: string;
}


export enum CollateralType {
  VEHICLE = "VEHICLE",
  SAVINGS_ACCOUNT = "SAVINGS_ACCOUNT"
}

export enum EmploymentStatus {
  EMPLOYED = "EMPLOYED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  UNEMPLOYED = "UNEMPLOYED",
  STUDENT = "STUDENT",
  RETIRED = "RETIRED",
  OTHER = "OTHER"
}

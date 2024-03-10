import { LoanType } from "src/app/core/models/loan/LoanType.model";

export interface LoanTypeStateInterface
{
  isLoading: boolean;
  loanTypeList: LoanType[];
  error: string | null;
}

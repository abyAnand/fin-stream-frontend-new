import { LoanCategory, LoanSetting } from "./LoanSetting.model";

export interface LoanType {
  id?: string;
  bankId: string;
  name: string;
  loanCategory: LoanCategory;
  loanSettingList?: LoanSetting[];
}

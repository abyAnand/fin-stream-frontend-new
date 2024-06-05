import { Image } from "../Image.model";
import { LoanCategory, LoanSetting } from "./LoanSetting.model";

export interface LoanType {
  id?: string;
  bankId: string;
  name: string;
  image?: Image;
  loanCategory: LoanCategory;
  loanSettingList?: LoanSetting[];
}

import { AccountSetting } from "./AccountSetting.model";

export interface SavingsAccountSetting extends AccountSetting {
  interestRate: number;
}

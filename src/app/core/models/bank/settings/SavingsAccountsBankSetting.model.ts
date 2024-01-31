import { AccountBankSetting } from "./AccountBankSetting.model";

export interface SavingsAccountsBankSetting extends AccountBankSetting {
  interestRate: number;
}

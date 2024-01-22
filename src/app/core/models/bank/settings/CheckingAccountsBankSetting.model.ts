import { AccountBankSetting } from "./AccountBankSetting.model";

export interface CheckingAccountsBankSetting extends AccountBankSetting {
  overdraftLimit: number;
}

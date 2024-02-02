import { AccountSetting } from "./AccountSetting.model";

export interface CheckingAccountSetting extends AccountSetting {
  overdraftLimit: number;
}

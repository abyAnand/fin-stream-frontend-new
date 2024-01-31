import { AccountBankSetting } from "./AccountBankSetting.model";

export interface JointAccountsBankSetting extends AccountBankSetting {
  accountHoldersLimit: number;
}

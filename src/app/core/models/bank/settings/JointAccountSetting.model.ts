import { AccountSetting } from "./AccountSetting.model";

export interface JointAccountSetting extends AccountSetting {
  accountHoldersLimit: number;
}

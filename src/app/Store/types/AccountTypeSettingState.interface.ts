import { AccountTypeSetting } from "src/app/core/models/account/AccountTypeSetting.model";

export interface AccountTypeSettingStateInterface
{
  isLoading: boolean;
  accountTypeSettingList: AccountTypeSetting[];
  error: string | null;
}
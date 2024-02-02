import { AccountSettingDto } from "src/app/core/models/bank/settings/AccountSettingDto.model";

export interface AccountSettingStateInterface
{
  isLoading: boolean;
  accountSettings: AccountSettingDto[];
  error: string | null;
}

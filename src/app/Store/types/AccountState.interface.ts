import { AccountDto } from "src/app/core/models/account/AccountDto.model";

export interface AccountStateInterface
{
  isLoading: boolean;
  accountList: AccountDto[];
  error: string | null;
}

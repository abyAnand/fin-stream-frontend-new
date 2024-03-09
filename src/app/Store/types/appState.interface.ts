import { AccountSettingStateInterface } from "./AccountSettingState.interface";
import { AccountStateInterface } from "./AccountState.interface";
import { SingleUserStateInterface } from "./SingleUserState.interface";
import { TransactionHistoryStateInterface } from "./TransactionHistoryState.interface";
import { UserStateInterface } from "./UserState.interface";

export interface AppStateInterface{
  users: UserStateInterface;
  accountSettings: AccountSettingStateInterface;
  user: SingleUserStateInterface;
  accountList: AccountStateInterface;
  transactionHistoryList: TransactionHistoryStateInterface;
}

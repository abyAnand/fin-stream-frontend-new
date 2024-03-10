import { AccountSettingStateInterface } from "./AccountSettingState.interface";
import { AccountStateInterface } from "./AccountState.interface";
import { BankStateInterface } from "./BankState.interface";
import { LoanTypeStateInterface } from "./LoanTypeState.interface";
import { SingleUserStateInterface } from "./SingleUserState.interface";
import { TransactionHistoryStateInterface } from "./TransactionHistoryState.interface";
import { UserStateInterface } from "./UserState.interface";

export interface AppStateInterface{
  users: UserStateInterface;
  accountSettings: AccountSettingStateInterface;
  user: SingleUserStateInterface;
  accountList: AccountStateInterface;
  transactionHistoryList: TransactionHistoryStateInterface;
  bankList: BankStateInterface;
  loanTypeList: LoanTypeStateInterface;
}

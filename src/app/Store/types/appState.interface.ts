import { AccountSettingStateInterface } from "./AccountSettingState.interface";
import { UserStateInterface } from "./UserState.interface";

export interface AppStateInterface{
  users: UserStateInterface;
  accountSettings: AccountSettingStateInterface;
}

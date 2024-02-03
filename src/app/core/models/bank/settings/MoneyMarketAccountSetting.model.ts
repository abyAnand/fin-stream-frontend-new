import { AccountSetting } from "./AccountSetting.model";

export interface MoneyMarketAccountSetting extends AccountSetting {
  maxMonthlyTransactions: number;
}

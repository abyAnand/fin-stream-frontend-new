import { AccountBankSetting } from "./AccountBankSetting.model";

export interface MoneyMarketAccountsBankSetting extends AccountBankSetting {
  maxMonthlyTransactions: number;
}

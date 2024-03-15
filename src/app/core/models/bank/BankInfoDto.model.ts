import { LoanSetting } from "../loan/LoanSetting.model";
import { AccountSettingDto } from "./settings/AccountSettingDto.model";

export interface BankInfoDto {
    id: string;
    name: string;
    shortName: string;
    email: string;
    verified: boolean;
    accountSettingDtoList: AccountSettingDto[];
    loanSettingDtoList: LoanSetting[];
}
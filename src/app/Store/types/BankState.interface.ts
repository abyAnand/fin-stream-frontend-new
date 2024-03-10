import { BankDto } from "src/app/core/models/bank/BankDto.model";

export interface BankStateInterface
{
  isLoading: boolean;
  bankList: BankDto[];
  error: string | null;
}

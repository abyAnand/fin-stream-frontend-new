import { Image } from "../Image.model";

export interface BankDto {
  id: string;
  name: string;
  shortName: string;
  image?: Image;
  address: string;
  email: string;
  phoneNumber: string;
  blocked?: boolean;
}


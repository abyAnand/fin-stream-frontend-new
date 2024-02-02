import { Role } from "./RegisterRequest.model";

export interface BankRequest {
  name: string;
  shortName: string;
  address: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: Role;
}


export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Bank = 'BANK'
}

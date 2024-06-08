export interface Bank {
  id: string;
  name: string;
  shortName: string;
  verified: boolean;
  blocked?: boolean;
  status: Status; // Assuming 'Status' is a string
  address: string;
  email: string;
  phoneNumber: string;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  CLOSED = 'CLOSED',
  MAINTENANCE = 'MAINTENANCE'
}

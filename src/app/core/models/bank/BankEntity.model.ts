enum Status {
  ACTIVE,
  INACTIVE,
  SUSPENDED,
  UNDER_REVIEW,
  PENDING_APPROVAL,
  CLOSED,
  MAINTENANCE
}

export interface BankEntity {
  id: string;
  name: string;
  shortName: string;
  verified: boolean;
  status: Status;
  address?: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdDate: string;
  updateDate: string;
  deleted: boolean;
  blocked?: boolean;
}

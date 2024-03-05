export interface NotificationDto {
  id: string;
  userId: string;
  event: Event;
  message: string;
  viewed: boolean;
}

export enum Event {
  LOAN = 'LOAN',
  TRANSACTION_SEND = 'TRANSACTION_SEND',
  TRANSACTION_RECEIVED = 'TRANSACTION_RECEIVED',
  DEPOSIT = 'DEPOSIT',
  ACCOUNT_CREATION = 'ACCOUNT_CREATION',
  USER_REGISTRATION = 'USER_REGISTRATION'
}

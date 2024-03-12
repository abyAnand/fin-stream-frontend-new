import { Component } from '@angular/core';
import { NotificationDto } from 'src/app/core/models/NotificationDto.model';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications: NotificationDto[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications(StorageService.getUserIdFromToken())
      .subscribe((notifications: NotificationDto[]) => {
        this.notifications = notifications;
        console.log(notifications);
      });
  }

  getAlertClass(notification: NotificationDto): string {
    return notification.viewed ? 'alert-info' : 'alert-success'; // Customize alert class based on whether the notification has been viewed
  }

  getIcon(event: string): string {
    switch (event) {
      case 'INFO':
        return 'info_outline';
      case 'SUCCESS':
        return 'check';
      case 'WARNING':
        return 'warning';
      case 'ERROR':
        return 'error_outline';
      case 'PRIMARY':
        return 'update';
      case 'LOAN':
        return 'attach_money';
      case 'TRANSACTION_SEND':
        return 'arrow_upward';
      case 'TRANSACTION_RECEIVED':
        return 'arrow_downward';
      case 'DEPOSIT':
        return 'account_balance_wallet';
      case 'ACCOUNT_CREATION':
        return 'person_add';
      case 'USER_REGISTRATION':
        return 'person_add';
      default:
        return '';
    }
  }

  getEventTitle(event: string): string {
    switch (event) {
      case 'INFO':
        return 'Info Alert';
      case 'SUCCESS':
        return 'Success Alert';
      case 'WARNING':
        return 'Warning Alert';
      case 'ERROR':
        return 'Error Alert';
      case 'PRIMARY':
        return 'Primary Alert';
      case 'LOAN':
        return 'Loan Notification';
      case 'TRANSACTION_SEND':
        return 'Transaction Sent';
      case 'TRANSACTION_RECEIVED':
        return 'Transaction Received';
      case 'DEPOSIT':
        return 'Deposit Notification';
      case 'ACCOUNT_CREATION':
        return 'Account Creation Notification';
      case 'USER_REGISTRATION':
        return 'User Registration Notification';
      default:
        return '';
    }
  }

  dismissNotification(notification: NotificationDto): void {

    const index = this.notifications.indexOf(notification);
    if (index !== -1) {
        this.notifications.splice(index, 1);
    }
  }

}

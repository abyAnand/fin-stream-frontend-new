import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { AccountSettingDto } from 'src/app/core/models/account/BankAccountDto.model';
import { LoanCategory } from 'src/app/core/models/loan/LoanDto.model';

@Component({
  selector: 'app-account-detail-modal',
  templateUrl: './account-detail-modal.component.html',
  styleUrls: ['./account-detail-modal.component.css']
})
export class AccountDetailModalComponent {
  @Input() data: any;
  isOpen: boolean;
  @Input() isAccountSetting: boolean;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getImage(shortName: string): string {
    switch(shortName) {
      case 'CHECKING':
        return '/assets/checking.jpeg';
      case 'SAVINGS':
        return '/assets/savings.jpeg';
      case 'IRA':
        return '/assets/ira.jpeg';
      case 'MONEY_MARKET':
        return '/assets/money_market.jpg';
      default:
        return '/assets/default.jpeg';
    }
  }

  getImageLoan(loanCategory: LoanCategory): string {
    switch (loanCategory) {
      case LoanCategory.PERSONAL:
        return '/assets/loan/personal_loan.jpeg';
      case LoanCategory.BUSINESS:
        return '/assets/loan/business_loan.jpeg';
      case LoanCategory.MORTGAGE:
        return '/assets/loan/mortgage_loan.jpeg';
      case LoanCategory.STUDENT:
        return '/assets/loan/student_loan.jpeg';
      default:
        return '/assets/loan/loan.jpeg';
    }
  }

  openModal(): void {
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
    this.onSubmit.emit();
  }
}

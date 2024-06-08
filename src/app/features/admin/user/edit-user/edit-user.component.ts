import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmploymentStatus, UserDto } from 'src/app/core/models/user/UserDto.model';
import { AccountDetailModalComponent } from '../../bank/single-bank/account-detail-modal/account-detail-modal.component';
import { LoanCategory, LoanDto } from 'src/app/core/models/loan/LoanDto.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  user: UserDto | null = null;
  editableUser: UserDto | null = null;
  isEditing = false;
  employmentStatusOptions = Object.values(EmploymentStatus);

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['userData']) {
        this.user = JSON.parse(params['userData']);
        this.editableUser = { ...this.user }; // Initialize editableUser with user data
      }
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.editableUser = { ...this.user };
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editableUser = { ...this.user };
  }

  submitChanges(): void {
    if (this.editableUser) {
      this.userService.updateUser(this.editableUser).subscribe(updatedUser => {
        this.user = updatedUser;
        this.isEditing = false;
      });
    }
  }

  openAccountModal(account: any): void {
    const modalRef = this.modalService.open(AccountDetailModalComponent, { keyboard: true, centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.isAccountSetting = true;
    modalRef.componentInstance.data = account;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  openLoanModal(loan: LoanDto): void {
    const modalRef = this.modalService.open(AccountDetailModalComponent, { keyboard: true, centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.isAccountSetting = false;
    modalRef.componentInstance.data = loan;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  getImage(accountType: string): string {
    switch (accountType) {
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

}

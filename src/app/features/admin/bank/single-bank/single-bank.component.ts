import { Component, OnInit } from '@angular/core';
import { BankInfoDto } from '../../../../core/models/bank/BankInfoDto.model';
import { ActivatedRoute } from '@angular/router';
import { LoanCategory } from 'src/app/core/models/loan/LoanDto.model';
import { AccountSettingDto } from 'src/app/core/models/account/BankAccountDto.model';
import { AccountDetailModalComponent } from './account-detail-modal/account-detail-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanSetting } from 'src/app/core/models/loan/LoanSetting.model';
import { BankService } from '../../../../core/services/bank/bank.service';

@Component({
  selector: 'app-single-bank',
  templateUrl: './single-bank.component.html',
  styleUrls: ['./single-bank.component.css']
})
export class SingleBankComponent implements OnInit{

  bank : BankInfoDto | null = null;
  editableBank: BankInfoDto | null = null;
  isEditing = false;


  constructor(
    private route : ActivatedRoute,
    private modalService: NgbModal,
    private bankService: BankService
  ){}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params =>{
      if(params['bankData']){
        this.bank = JSON.parse(params['bankData']);
      }
    });

    console.log(this.bank);

  }

  openAccountModal(accountSetting: any) {
    const modalRef = this.modalService.open(AccountDetailModalComponent, { keyboard: true ,centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.isAccountSetting = true;
    modalRef.componentInstance.data = accountSetting;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  // Function to open loan modal
  openLoanModal(loanSetting: LoanSetting) {
    const modalRef = this.modalService.open(AccountDetailModalComponent, { keyboard: true ,centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.isOpen = true;
    modalRef.componentInstance.isAccountSetting = false;
    modalRef.componentInstance.data = loanSetting;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

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

  enableEditing(): void {
    this.isEditing = true;
    this.editableBank = { ...this.bank };
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.editableBank = { ...this.bank };
  }

  submitChanges(): void {
    if (this.editableBank) {
      // this.bankService.updateBank(this.editableBank).subscribe(updatedUser => {
      //   this.bank = this.editableBank;
      //   this.isEditing = false;
      // });
    }
    this.bank = { ...this.editableBank };
    this.isEditing = false;
  }

  toggleVerification(): void {
    // Toggle verification status
    if (this.bank) {
      this.bank.verified = !this.bank.verified;
    }
  }


}

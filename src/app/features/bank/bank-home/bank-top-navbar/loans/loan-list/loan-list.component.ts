import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanSetting } from 'src/app/core/models/loan/LoanSetting.model';
import { LoanSettingService } from 'src/app/core/services/loanSetting/loan-setting.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { CreateLoanComponent } from '../create-loan/create-loan.component';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { Router } from '@angular/router';
import { UpdateLoanComponent } from '../update-loan/update-loan.component';
import { LoanCategory } from 'src/app/core/models/loan/LoanDto.model';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit{



  loanSettingList: LoanSetting[] = [];
  error: boolean = false;
  bankId! : any;
  currentLoanType: LoanType;

  constructor(
    private loanService: LoanSettingService,
    private notification: ToasterService,
    private modalService: NgbModal,
    private router: Router
  ){

  }

  ngOnInit(): void {

    this.currentLoanType = history.state.loanType;




    this.bankId = StorageService.getUserIdFromToken();
    this.fetchLoanSettingListByLoanTypeId(this.currentLoanType.id);
  }

  private fetchLoanSettingListByLoanTypeId(loanId: string): void {
    this.loanService.getLoanSettingListByTypeId(loanId).subscribe(
      (loanSettingList) => {
        this.loanSettingList = loanSettingList;

      },
      (error) => {
        this.notification.error(error, 'Error fetching Loan Settings:');
        this.error = true;
      }
    );
  }


  createLoanSetting(): void {
    const modalRef = this.modalService.open(CreateLoanComponent, { centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.loanType = this.currentLoanType;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  viewLoans(loanType: LoanSetting){
    this.router.navigate(['/bank/loan/create'],{state: {loanType: loanType}});
  }

  updateLoanSetting(loanSetting:LoanSetting){
    const modalRef = this.modalService.open(UpdateLoanComponent, { centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.currentLoan = loanSetting;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
      this.fetchLoanSettingListByLoanTypeId(this.currentLoanType.id);
    });

  }

  getImage(loanCategory: LoanCategory): string {
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

import { Component, OnInit } from '@angular/core';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { LoanTypeService } from '../../../../../../core/services/loanType/loan-type.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { CreateLoanTypeComponent } from '../create-loan-type/create-loan-type.component';
import { CreateLoanComponent } from '../create-loan/create-loan.component';

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styleUrls: ['./loan-type-list.component.css']
})
export class LoanTypeListComponent implements OnInit{

  loanTypeList: LoanType[] = [];
  error: boolean = false;
  bankId! : any;

  constructor(
    private loanTypeService: LoanTypeService,
    private notification: ToasterService,
    private modalService: NgbModal,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.bankId = StorageService.getUserIdFromToken();
    this.fetchLoanSettingListByBankId(this.bankId);
  }

  private fetchLoanSettingListByBankId(bankId: number): void {
    this.loanTypeService.getLoanTypeListByBankId(bankId).subscribe(
      (loanTypeList) => {
        this.loanTypeList = loanTypeList;

      },
      (error) => {
        this.notification.error(error, 'Error fetching Loan Settings:');
        this.error = true;
      }
    );
  }


  createLoanSetting(): void {
    const modalRef = this.modalService.open(CreateLoanTypeComponent, { centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  viewLoans(loanType: LoanType){
    this.router.navigate(['/loan/list'],{state: {loanType: loanType}});
  }
}

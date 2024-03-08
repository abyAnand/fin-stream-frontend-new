import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanDto } from 'src/app/core/models/loan/LoanDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { UserloanService } from 'src/app/core/services/userLoan/userloan.service';

@Component({
  selector: 'app-bank-loan-applications',
  templateUrl: './bank-loan-applications.component.html',
  styleUrls: ['./bank-loan-applications.component.css']
})
export class BankLoanApplicationsComponent implements OnInit{

  pendingLoanList: LoanDto[] = [];
  error: boolean;

  constructor(
    private loanService: UserloanService,
    private notification: ToasterService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.fetchPendingLoansByBankId(StorageService.getUserIdFromToken());
  }

  private fetchPendingLoansByBankId(bankId: string): void {
    this.loanService.getPendingLoansByBankId(bankId).subscribe(
      (loanList) => {
        this.pendingLoanList = loanList;
        console.log(loanList);


      },
      (error) => {
        this.notification.error(error, 'Error fetching Loan Settings:');
        this.error = true;
      }
    );
  }

  viewLoan(loan: LoanDto){
    this.router.navigate(['/bank/loan/view'], { state: { loan: loan } });
  }





}

import { Component, OnInit } from '@angular/core';
import { LoanDto } from 'src/app/core/models/loan/LoanDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserloanService } from 'src/app/core/services/userLoan/userloan.service';

@Component({
  selector: 'app-user-loans-rejected',
  templateUrl: './user-loans-rejected.component.html',
  styleUrls: ['./user-loans-rejected.component.css']
})
export class UserLoansRejectedComponent implements OnInit{

  error: boolean;
  loanList: LoanDto[] = [];

  ngOnInit(): void {
    this.getRejectedLoansByUserId(StorageService.getUserIdFromToken());
  }

  constructor(
    private loanService: UserloanService

  ){}

  getRejectedLoansByUserId(userId: string){
    this.loanService.getRejectedLoans(userId).subscribe(
      (pendingLoanList) => {
        this.loanList = pendingLoanList;
        console.log("Loan list",this.loanList);
      },
      (error) => {
        console.error('Error occurred while Acquiring Pending Loans:', error);
      }
    );
  }
}

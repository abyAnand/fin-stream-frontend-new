import { Component, OnInit } from '@angular/core';
import { LoanDto } from 'src/app/core/models/loan/LoanDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserloanService } from 'src/app/core/services/userLoan/userloan.service';

@Component({
  selector: 'app-user-loans-pending',
  templateUrl: './user-loans-pending.component.html',
  styleUrls: ['./user-loans-pending.component.css']
})
export class UserLoansPendingComponent implements OnInit{

  error: boolean;
  loanList: LoanDto[] = [];

  ngOnInit(): void {
    this.getAllPendingLoansByUserId(StorageService.getUserIdFromToken());
  }

  constructor(
    private loanService: UserloanService

  ){}

  getAllPendingLoansByUserId(userId: string){
    this.loanService.getPendingLoans(userId).subscribe(
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

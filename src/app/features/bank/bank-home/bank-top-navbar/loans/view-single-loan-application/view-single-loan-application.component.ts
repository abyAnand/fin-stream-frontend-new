import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanDto } from 'src/app/core/models/loan/LoanDto.model';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserloanService } from 'src/app/core/services/userLoan/userloan.service';

@Component({
  selector: 'app-view-single-loan-application',
  templateUrl: './view-single-loan-application.component.html',
  styleUrls: ['./view-single-loan-application.component.css']
})
export class ViewSingleLoanApplicationComponent implements OnInit{

  userLoan: LoanDto;
  error: boolean;
  user: UserDto;
  savedLoan: LoanDto;


  ngOnInit(): void {
    this.userLoan = history.state.loan;
    console.log(this.userLoan);

    this.fetchUserDetailsByUserId(this.userLoan.userId);

  }

  constructor(
    private userService: UserService,
    private notification: ToasterService,
    private loanService: UserloanService,
    private router: Router
  ){}

  fetchUserDetailsByUserId(userId: string){

    this.userService.getUserById(userId).subscribe(
      (fetchedUser) => {
        this.user = fetchedUser;
        console.log(fetchedUser);


      },
      (error) => {
        this.notification.error(error, 'Error fetching Loan Settings:');
        this.error = true;
      }
    );

  }

  approveLoan(loanId: string): void {
    this.loanService.approveLoan(loanId).subscribe(
      (loan) => {
        this.savedLoan = loan;
        console.log(this.savedLoan);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Loan Settings:');
        this.error = true;
      }
    );

    this.router.navigate(['/bank/loan/application']);
  }

  rejectLoan(loanId: string): void {
    this.loanService.approveLoan(loanId).subscribe(
      (loan) => {
        this.savedLoan = loan;
        console.log(this.savedLoan);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Loan Settings:');
        this.error = true;
      }
    );
  }

}

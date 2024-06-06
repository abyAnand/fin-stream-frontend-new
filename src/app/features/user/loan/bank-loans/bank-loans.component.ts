import { Component, OnInit } from '@angular/core';
import { LoanType } from '../../../../core/models/loan/LoanType.model';
import { LoanTypeService } from '../../../../core/services/loanType/loan-type.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { Router } from '@angular/router';
import { UserloanService } from 'src/app/core/services/userLoan/userloan.service';
import { ApprovalStatus, LoanCategory, LoanDto } from 'src/app/core/models/loan/LoanDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { getAllLoanTypesAction } from 'src/app/Store/LoanType/LoanType.action';
import { allLoanTypeLoadingSelector, allLoanTypesErrorSelector } from 'src/app/Store/LoanType/LoanType.selector';
import { allLoanTypesSelector } from '../../../../Store/LoanType/LoanType.selector';

@Component({
  selector: 'app-bank-loans',
  templateUrl: './bank-loans.component.html',
  styleUrls: ['./bank-loans.component.css']
})
export class BankLoansComponent implements OnInit {

  bankLoanList: LoanType[] = []
  bankLoanList$: Observable<LoanType[]>;
  isLoanListLoading$: Observable<boolean>;
  loanListError$: Observable<string>;

  userLoans: LoanDto[] = [];
  userLoans$: Observable<LoanDto[]>;
  error$: Observable<string>;
  isUserLoansLoading: Observable<boolean>;
  error: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(getAllLoanTypesAction());
    this.fetchBankLoansList()
    this.fetchUserLoansList(StorageService.getUserIdFromToken());
  }

  constructor(
    private loanTypeService: LoanTypeService,
    private notification: ToasterService,
    private userLoanService: UserloanService,
    private router: Router,
    private store: Store<AppStateInterface>
  ) { }

  private fetchBankLoansList(): void {

    this.isLoanListLoading$ = this.store.pipe(select(allLoanTypeLoadingSelector));
    this.loanListError$ = this.store.pipe(select(allLoanTypesErrorSelector));
    this.bankLoanList$ = this.store.pipe(select(allLoanTypesSelector));


    this.loanTypeService.getAllLoanTypes().subscribe(
      (loanList) => {
        this.bankLoanList = loanList;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
  }

  private fetchUserLoansList(userId: string): void {
    this.userLoanService.getAllUserLoans(userId).subscribe(
      (allUserLoans) => {
        this.userLoans = allUserLoans;
        console.log(allUserLoans);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
  }

  getStatus(loanId: string): string {
    const userLoan = this.userLoans.find(loan => loan.loanTypeId === loanId);
    if (userLoan) {
      switch (userLoan.approvalStatus) {
        case ApprovalStatus.PENDING:
          return 'Status pending';
        case ApprovalStatus.REJECTED:
          return 'Loan rejected';
        case ApprovalStatus.APPROVED:
          return 'Loan approved';
        default:
          return 'View Plans';
      }
    } else {
      return 'View Plans';
    }
  }

  getButtonColor(loanId: string): string {
    const userLoan = this.userLoans.find(loan => loan.loanTypeId === loanId);
    if (userLoan) {
      switch (userLoan.approvalStatus) {
        case ApprovalStatus.PENDING:
          return 'yellow';
        case ApprovalStatus.REJECTED:
          return 'red';
        case ApprovalStatus.APPROVED:
          return 'green';
        default:
          return 'blue';
      }
    } else {
      return 'blue';
    }
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

  getStatusColor(loanId: string): string {
    const loan = this.userLoans.find(loan => loan.loanTypeId === loanId);
    if (loan) {
      switch (loan.approvalStatus) {
        case ApprovalStatus.PENDING:
          return 'black';
        case ApprovalStatus.REJECTED:
          return 'white';
        case ApprovalStatus.APPROVED:
          return 'white';
        default:
          return 'white';
      }
    } else {
      return 'white';
    }
  }

  viewLoanPlans(currentLoan: LoanType): void {
    const isUserLoan = this.userLoans.some(loan => loan.loanTypeId === currentLoan.id);
    if (!isUserLoan) {
      this.router.navigate(['/loan/apply'], { state: { loan: currentLoan } });
    }
  }
}

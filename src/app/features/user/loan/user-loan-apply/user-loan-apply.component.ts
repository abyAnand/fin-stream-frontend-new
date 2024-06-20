import { Component, Input, OnInit } from '@angular/core';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { LoanSetting } from '../../../../core/models/loan/LoanSetting.model';
import { LoanDto, Collateral, ApprovalStatus, LoanCategory } from '../../../../core/models/loan/LoanDto.model';
import { CollateralType } from 'src/app/core/models/user/UserDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserloanService } from 'src/app/core/services/userLoan/userloan.service';
import { AccountService } from 'src/app/core/services/account/account.service';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-loan-apply',
  templateUrl: './user-loan-apply.component.html',
  styleUrls: ['./user-loan-apply.component.css']
})
export class UserLoanApplyComponent implements OnInit{

  loan: LoanType;
  loanSettingList: LoanSetting[] = [];
  monthlyPayments: number[] = [];
  userSavingsAccounts: AccountDto[] = [];
  selectedAccountId: string;

  ngOnInit(): void {
    this.loan = history.state.loan;
    this.loanSettingList = this.loan.loanSettingList;
    this.calculateMonthlyPayments();
    this.getUserSavingsAccountByBankId(StorageService.getUserIdFromToken(), this.loan.bankId);
    console.log(this.userSavingsAccounts);
  }

  constructor(
    private loanService: UserloanService,
    private accountService: AccountService,
    private router: Router
  ){

  }

  getUserSavingsAccountByBankId(userId: string, bankId: string){
    this.accountService.getUserSavingsAccountsByBankId(userId, bankId).subscribe(
      (userAccounts) => {
        this.userSavingsAccounts = userAccounts;
        console.log('User Savings Account Retrieved:', userAccounts);
      },
      (error) => {
        console.error('Error occurred while Fetching User Savings Account:', error);
      }
    );
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

  calculateMonthlyPayments(): void {
    this.monthlyPayments = this.loanSettingList.map(loanSetting => {
      return this.calculateMonthlyPayment(
        loanSetting.loanAmount,
        loanSetting.interestRate,
        loanSetting.loanTermMonths
      );
    });
  }

  calculateMonthlyPayment(loanAmount: number, interestRate: number, loanTermMonths: number): number {
    const monthlyInterestRate = interestRate / 12 / 100;
    const numerator = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1;
    return numerator / denominator;
  }

  loanApply(loanSetting: LoanSetting): void {
    if(!this.selectedAccountId){
      alert("Please select an account to apply the loan");
      return;
    }
    const selectedAccount = this.userSavingsAccounts.find(account => account.id === this.selectedAccountId);
    const newLoanAppliation: LoanDto = {
      userId: StorageService.getUserIdFromToken(),
      bankId: this.loan.bankId,
      loanName: this.loan.name,
      loanSettingId : loanSetting.id,
      loanTypeId: this.loan.id,
      loanCategory: this.loan.loanCategory,
      interestRate: loanSetting.interestRate,
      loanAmount: loanSetting.loanAmount,
      loanTermMonths: loanSetting.loanTermMonths,
      collateral: Collateral.NONE,
      approvalStatus: ApprovalStatus.PENDING,
      remainingTermMonths : loanSetting.loanTermMonths,
      selectedAccount: selectedAccount,
      loanClosed : false
    };

    this.loanService.applyLoan(newLoanAppliation).subscribe(
      (response) => {
        console.log('Loan Application Submitted successfully:', response);
        this.router.navigate(['bank']);
      },
      (error) => {
        console.error('Error occurred while Applying for loan:', error);
      }
    );
  }
}

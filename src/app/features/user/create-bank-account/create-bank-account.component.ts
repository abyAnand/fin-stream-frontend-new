import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BankSettingDto } from 'src/app/core/models/BankSettingDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.css']
})
export class CreateBankAccountComponent implements OnInit {

accountType: string;

account: BankSettingDto;

monthlyReturn: number = 0;
yearlyReturn: number = 0;

  savingsAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router
    ) {

    }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.accountType = params['accountType'];
    });

    this.account = StorageService.getAccount();
    console.log(this.account);


    this.initializeForm();

  }

  initializeForm(): void {
    this.savingsAccountForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      initialDeposit: ['', Validators.required],
      interestRate: ['', Validators.required],
      transactionAlerts: [false],
      lowBalanceAlerts: [false],
      overdraftProtection: [false]
    });

    this.savingsAccountForm.patchValue({
      interestRate: this.account.interestRate
    });

    this.savingsAccountForm.get('initialDeposit').valueChanges.subscribe(() => {
      console.log("changed");

      this.calculateReturns();
    });
  }

  calculateReturns(): void {
    const interestRate = this.savingsAccountForm.get('interestRate').value;
    const initialDeposit = this.savingsAccountForm.get('initialDeposit').value;

    this.monthlyReturn = this.calculateMonthlyReturn()
    this.yearlyReturn = this.calculateYearlyReturn()
  }

  createSavingsAccount(): void {
    console.log(this.savingsAccountForm.value);
  }

  calculateMonthlyReturn(): number {
    const principal = this.savingsAccountForm.get('initialDeposit').value;
    const rate = this.savingsAccountForm.get('interestRate').value / 100;
    const time = 1;

    return (principal * rate * time);
  }

  calculateYearlyReturn(): number {
    const principal = this.savingsAccountForm.get('initialDeposit').value;
    const rate = this.savingsAccountForm.get('interestRate').value / 100;
    const time = 12; 

    return (principal * rate * time);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSettingDto } from 'src/app/core/models/bank/settings/AccountSettingDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { AccountDto } from '../../../core/models/account/AccountDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

declare var Razorpay: any;

@Component({
  selector: 'app-create-bank-account',
  templateUrl: './create-bank-account.component.html',
  styleUrls: ['./create-bank-account.component.css']
})
export class CreateBankAccountComponent implements OnInit {



  accountType: string;

  account: AccountSettingDto;
  error: boolean = false;

  monthlyReturn: number = 0;
  yearlyReturn: number = 0;
  totalReturn: number = 0;

  savingsAccountForm: FormGroup;
  checkingAccountForm: FormGroup;
  fdAccountForm; FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private notification: ToasterService
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

  payNow(account: AccountDto): void {
    const RazorpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 30000,
      name: 'Aby',
      key: 'rzp_test_ti4COoTWxp1e7t',
      image: 'https://www.dreamstime.com/welded-metal-chain-various-rigging-works-as-cargo-support-insurance-structures-their-elements-short-link-image264081101',
      prefill: {
        name: 'Aby Anand',
        email: "abianand382@gmail.com",
        phone: '9544888497'
      },
      theme: {
        color: '#f37254'
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    };

    const successCallback = (paymentId: any) => {
      console.log(paymentId);
      this.createAccount(account);
    };

    const failureCallback = (e: any) => {
      console.log(e);
    };

    Razorpay.open(RazorpayOptions, successCallback, failureCallback);
  }

  createAccount(account: AccountDto): void {
    this.accountService.createAccount(account).subscribe(
      (banks) => {
        this.router.navigate(['/account/deposit']);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
  }

  initializeForm(): void {
    this.savingsAccountForm = this.formBuilder.group({
      initialDeposit: ['', Validators.required],
      interestRate: ['', Validators.required],
      // transactionAlerts: [false],
      // lowBalanceAlerts: [false],
      // overdraftProtection: [false]
    });

    this.checkingAccountForm = this.formBuilder.group({
      initialDeposit: ['', Validators.required],
      // overdraftLimit: ['', Validators.required],
      // linkedSavingsAccountId: ['', Validators.required],
    });

    this.fdAccountForm = this.formBuilder.group({
      initialDeposit: ['', Validators.required],
      interestRate: ['', Validators.required],
      cdTerm: ['', Validators.required],
    });

    this.savingsAccountForm.patchValue({
      interestRate: this.account.interestRate
    });

    this.checkingAccountForm.patchValue({
      overdraftLimit: this.account.overdraftLimit
    });

    this.fdAccountForm.patchValue({
      interestRate: this.account.interestRate,
      cdTerm: this.account.cdTerm

    });

    this.savingsAccountForm.get('initialDeposit').valueChanges.subscribe(() => {
      console.log("changed");

      this.calculateReturns();
    });

    this.fdAccountForm.get('initialDeposit').valueChanges.subscribe(() => {
      this.totalReturn =  this.calculateFdReturns();
    });
  }

  calculateReturns(): void {
    const interestRate = this.savingsAccountForm.get('interestRate').value;
    const initialDeposit = this.savingsAccountForm.get('initialDeposit').value;

    this.monthlyReturn = this.calculateMonthlyReturn()
    this.yearlyReturn = this.calculateYearlyReturn()
  }

  calculateFdReturns(): number {

    const initialDeposit = parseFloat(this.fdAccountForm.get('initialDeposit').value);
    const interestRate = parseFloat(this.fdAccountForm.get('interestRate').value) / 100; // Convert percentage to decimal
    const cdTermMonths = parseFloat(this.fdAccountForm.get('cdTerm').value);

    //monthly compount -> change bank settings to make it dynamic
    const n = 12;

    const t = cdTermMonths / 12;
    const futureValue = initialDeposit * Math.pow(1 + interestRate/n, n*t);

    return futureValue;
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

  createSavingsAccount(): void {
    const account: AccountDto = {
      bankId: this.account.bankId,
      accountSettingId: this.account.id,
      userId: StorageService.getUserIdFromToken(),
      balance: this.savingsAccountForm.get(['initialDeposit'])!.value,
      accountType: this.account.accountType,
      interestRate: this.account.interestRate
    };

    this.payNow(account);

  }

  createCheckingAccount() {

    const account: AccountDto = {
      bankId: this.account.bankId,
      accountSettingId: this.account.id,
      userId: StorageService.getUserIdFromToken(),
      balance: this.checkingAccountForm.get(['initialDeposit'])!.value,
      accountType: this.account.accountType,
      overdraftLimit: this.account.overdraftLimit
    };

    console.log(account);
    this.payNow(account);

  }

  createFdAccount() {

    const account: AccountDto = {
      // accountName: this.fdAccountForm.get(['accountName'])!.value,
      bankId: this.account.bankId,
      accountSettingId: this.account.id,
      userId: StorageService.getUserIdFromToken(),
      balance: this.fdAccountForm.get(['initialDeposit'])!.value,
      accountType: this.account.accountType,
      interestRate: this.account.interestRate,
      cdTerm: this.account.cdTerm
    };

    console.log(account);
    this.payNow(account);
  }

}

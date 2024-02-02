import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.css']
})
export class EditUserAccountComponent implements OnInit {

  selectedAccount: AccountDto | undefined;
  error: boolean = false;

  savingsAccountForm: FormGroup;
  checkingAccountForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private notification: ToasterService
  ) { }

  ngOnInit(): void {
    const accountString = this.route.snapshot.queryParamMap.get('account');
    if (accountString) {
      this.selectedAccount = JSON.parse(accountString) as AccountDto;
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.savingsAccountForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      initialDeposit: ['', Validators.required],
      interestRate: ['', Validators.required],
      // transactionAlerts: [false],
      // lowBalanceAlerts: [false],
      // overdraftProtection: [false]
    });

    this.checkingAccountForm = this.formBuilder.group({
      accountName: ['', Validators.required],
      initialDeposit: ['', Validators.required],
      overdraftLimit: ['', Validators.required],
      // linkedSavingsAccountId: ['', Validators.required],
    });

    this.savingsAccountForm.patchValue({
      accountName: this.selectedAccount.accountName,
      interestRate: this.selectedAccount.interestRate,
      initialDeposit: this.selectedAccount.balance
    });

    this.checkingAccountForm.patchValue({
      overdraftLimit: this.selectedAccount.overdraftLimit,
      accountName: this.selectedAccount.accountName,
      initialDeposit: this.selectedAccount.balance
    });



  };

  editSavingsAccount() {
    const account: AccountDto = {
      id: this.selectedAccount.id,
      accountName: this.savingsAccountForm.get(['accountName'])!.value,
      bankId: this.selectedAccount.bankId,
      accountSettingId: this.selectedAccount.id,
      userId: StorageService.getUserIdFromToken(),
      balance: this.savingsAccountForm.get(['initialDeposit'])!.value,
      accountType: this.selectedAccount.accountType,
      interestRate: this.selectedAccount.interestRate

    };

    console.log(account);

    this.accountService.updateAccount(account).subscribe(
      (banks) => {
        // this.account = banks;
        this.router.navigate(['user/dashboard/account']);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
  }

  editCheckingAccount() {
    const account: AccountDto = {
      id: this.selectedAccount.id,
      accountName: this.checkingAccountForm.get(['accountName'])!.value,
      bankId: this.selectedAccount.bankId,
      accountSettingId: this.selectedAccount.id,
      userId: StorageService.getUserIdFromToken(),
      balance: this.checkingAccountForm.get(['initialDeposit'])!.value,
      accountType: this.selectedAccount.accountType,
      overdraftLimit: this.selectedAccount.overdraftLimit
    };

    console.log(account);

    this.accountService.updateAccount(account).subscribe(
      (banks) => {
        // this.account = banks;
        this.router.navigate(['user/dashboard/account']);
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );

  }
}


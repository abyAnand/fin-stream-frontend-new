import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountType, AccountSettingDto } from '../../../../../../core/models/bank/settings/AccountSettingDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';

import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { AccountSettingService } from 'src/app/core/services/accountSetting/account-setting.service';

@Component({
  selector: 'app-create-account-setting',
  templateUrl: './create-account-setting.component.html',
  styleUrls: ['./create-account-setting.component.css']
})
export class CreateAccountSettingComponent implements OnInit{

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() shortName: string;

  error: boolean = false;
  accountSetting: AccountSettingDto;
  selectedFile?: File;

  constructor(
    private formBuilder: FormBuilder,
    private accountSettingService: AccountSettingService,
    private notification: ToasterService
  ){

  }
  ngOnInit(): void {


  }

  savingsAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    interestRate: ['', Validators.required]
  })

  checkingAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    overdraftLimit: ['', Validators.required]
  })

  fdAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    interestRate: ['', Validators.required],
    cdTerm: ['', Validators.required]
  })

  moneyMarketAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    maxMonthlyTransactions: ['', Validators.required],
  })

  jointAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    accountHoldersLimit: ['', Validators.required],
  })


  createSavingsAccount(): void {

    const accountSettingDto: AccountSettingDto = {
      bankId: StorageService.getUserIdFromToken(),
      accountType: AccountType.SAVINGS,
      accountName: this.savingsAccountForm.get(['accountName'])!.value,
      interestRate: this.savingsAccountForm.get(['interestRate'])!.value
    }
    console.log(accountSettingDto);
    this.accountSettingService.createAccountSetting(accountSettingDto).subscribe(
      (banks) => {
        this.accountSetting = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
    this.onSubmit.emit();
  }

  createCheckingAccount(){
    const accountSettingDto: AccountSettingDto = {
      bankId: StorageService.getUserIdFromToken(),
      accountType: AccountType.CHECKING,
      accountName: this.checkingAccountForm.get(['accountName'])!.value,
      overdraftLimit: this.checkingAccountForm.get(['overdraftLimit'])!.value
    }
    console.log(accountSettingDto);
    this.accountSettingService.createAccountSetting(accountSettingDto).subscribe(
      (banks) => {
        this.accountSetting = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
    this.onSubmit.emit();
  }

  createFdAccount(){

    const accountSettingDto: AccountSettingDto = {
      bankId: StorageService.getUserIdFromToken(),
      accountType: AccountType.FD,
      accountName: this.fdAccountForm.get(['accountName'])!.value,
      interestRate: this.fdAccountForm.get(['interestRate'])!.value,
      cdTerm: this.fdAccountForm.get(['cdTerm'])!.value
    }
    console.log(accountSettingDto);
    this.accountSettingService.createAccountSetting(accountSettingDto).subscribe(
      (banks) => {
        this.accountSetting = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
    this.onSubmit.emit();

  }

  createMoneyMarketAccount(){

    const accountSettingDto: AccountSettingDto = {
      bankId: StorageService.getUserIdFromToken(),
      accountType: AccountType.MONEY_MARKET,
      accountName: this.moneyMarketAccountForm.get(['accountName'])!.value,
      maxMonthlyTransactions: this.moneyMarketAccountForm.get(['maxMonthlyTransactions'])!.value,

    }
    console.log(accountSettingDto);
    this.accountSettingService.createAccountSetting(accountSettingDto).subscribe(
      (banks) => {
        this.accountSetting = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
    this.onSubmit.emit();

  }

  createJointAccount(){
    const accountSettingDto: AccountSettingDto = {
      bankId: StorageService.getUserIdFromToken(),
      accountType: AccountType.JOINT,
      accountName: this.jointAccountForm.get(['accountName'])!.value,
      accountHoldersLimit: this.jointAccountForm.get(['accountHoldersLimit'])!.value,

    }
    console.log(accountSettingDto);
    this.accountSettingService.createAccountSetting(accountSettingDto).subscribe(
      (banks) => {
        this.accountSetting = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
    this.onSubmit.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.savingsAccountForm.get(controlName);
    return control?.touched && control?.invalid;
  }

}

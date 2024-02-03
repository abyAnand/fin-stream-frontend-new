import { AccountSettingDto } from './../../../../../../core/models/bank/settings/AccountSettingDto.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { AccountSettingService } from 'src/app/core/services/accountSetting/account-setting.service';

@Component({
  selector: 'app-edit-account-setting',
  templateUrl: './edit-account-setting.component.html',
  styleUrls: ['./edit-account-setting.component.css']
})
export class EditAccountSettingComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() account: AccountSettingDto;

  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountSettingService: AccountSettingService,
    private notification: ToasterService
  ) { }

  ngOnInit(): void {

    console.log(this.account);
    this.populateForm();


  }

  savingsAccountForm = this.formBuilder.group({
    accountName: ['', Validators.required],
    interestRate: [0, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]]
  });

  checkingAccountForm = this.formBuilder.group({
    accountName: ['', Validators.required],
    overdraftLimit: [0, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]]
  });

  fdAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    interestRate: ['', Validators.required],
    cdTerm: [0, Validators.required]
  })

  moneyMarketAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    maxMonthlyTransactions: [0, Validators.required],
  })

  jointAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    accountHoldersLimit: [0, Validators.required],
  })

  populateForm(): void {
    this.savingsAccountForm.patchValue({
      accountName: this.account.accountName,
      interestRate: this.account.interestRate
    });

    this.checkingAccountForm.patchValue({
      accountName: this.account.accountName,
      overdraftLimit: this.account.overdraftLimit
    });
  }

  updateSavingsAccount(): void {
    const accountSettingDto: AccountSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.savingsAccountForm.get(['accountName'])!.value,
      interestRate: this.savingsAccountForm.get(['interestRate'])!.value
    }
    console.log(accountSettingDto);
    this.updateAccountSetting(accountSettingDto);
    this.onSubmit.emit();
  }

  updateCheckingAccount(): void {
    const accountSettingDto: AccountSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.checkingAccountForm.get(['accountName'])!.value,
      overdraftLimit: this.checkingAccountForm.get(['overdraftLimit'])!.value
    };
    console.log(accountSettingDto);
    this.updateAccountSetting(accountSettingDto);
    this.onSubmit.emit();
  }

  updateFDAccount(){

    const accountSettingDto: AccountSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.fdAccountForm.get(['accountName'])!.value,
      interestRate: this.savingsAccountForm.get(['interestRate'])!.value,
      cdTerm: this.fdAccountForm.get(['cdTerm'])!.value
    };
    console.log(accountSettingDto);
    this.updateAccountSetting(accountSettingDto);
    this.onSubmit.emit();

  }

  updateJointAccount(): void {
    const accountSettingDto: AccountSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.jointAccountForm.get(['accountName'])!.value,
      accountHoldersLimit: this.jointAccountForm.get(['accountHoldersLimit'])!.value
    };
    console.log(accountSettingDto);
    this.updateAccountSetting(accountSettingDto);
    this.onSubmit.emit();
  }

  updateMoneyMarketAccount(): void {
    const accountSettingDto: AccountSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.moneyMarketAccountForm.get(['accountName'])!.value,
      maxMonthlyTransactions: this.moneyMarketAccountForm.get(['maxMonthlyTransactions'])!.value
    };
    console.log(accountSettingDto);
    this.updateAccountSetting(accountSettingDto);
    this.onSubmit.emit();
  }

  updateAccountSetting(accountSettingDto: AccountSettingDto){
    this.accountSettingService.updateAccountSetting(accountSettingDto).subscribe(
      (banks) => {
        //will get the updated Dto
      },
      (error) => {
        this.notification.error(error, 'Error Updaing Account:');
        this.error = true;
      }
    );
  }



  isInvalid(controlName: string): boolean {
    const control = this.savingsAccountForm.get(controlName);
    return control?.touched && control?.invalid;
  }

}

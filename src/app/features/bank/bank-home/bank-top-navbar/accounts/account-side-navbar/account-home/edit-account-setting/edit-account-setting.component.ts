import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BankSettingDto } from 'src/app/core/models/BankSettingDto.model';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-edit-account-setting',
  templateUrl: './edit-account-setting.component.html',
  styleUrls: ['./edit-account-setting.component.css']
})
export class EditAccountSettingComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() account: BankSettingDto;

  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
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
    const bankSettingDto: BankSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.savingsAccountForm.get(['accountName'])!.value,
      interestRate: this.savingsAccountForm.get(['interestRate'])!.value
    }
    console.log(bankSettingDto);
    this.updateAccountSetting(bankSettingDto);
    this.onSubmit.emit();
  }

  updateCheckingAccount(): void {
    const bankSettingDto: BankSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.checkingAccountForm.get(['accountName'])!.value,
      overdraftLimit: this.checkingAccountForm.get(['overdraftLimit'])!.value
    };
    console.log(bankSettingDto);
    this.updateAccountSetting(bankSettingDto);
    this.onSubmit.emit();
  }

  updateFDAccount(){

    const bankSettingDto: BankSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.fdAccountForm.get(['accountName'])!.value,
      interestRate: this.savingsAccountForm.get(['interestRate'])!.value,
      cdTerm: this.fdAccountForm.get(['cdTerm'])!.value
    };
    console.log(bankSettingDto);
    this.updateAccountSetting(bankSettingDto);
    this.onSubmit.emit();

  }

  updateJointAccount(): void {
    const bankSettingDto: BankSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.jointAccountForm.get(['accountName'])!.value,
      accountHoldersLimit: this.jointAccountForm.get(['accountHoldersLimit'])!.value
    };
    console.log(bankSettingDto);
    this.updateAccountSetting(bankSettingDto);
    this.onSubmit.emit();
  }

  updateMoneyMarketAccount(): void {
    const bankSettingDto: BankSettingDto = {
      id: this.account.id,
      bankId: StorageService.getUserIdFromToken(),
      accountType: this.account.accountType,
      accountName: this.moneyMarketAccountForm.get(['accountName'])!.value,
      maxMonthlyTransactions: this.moneyMarketAccountForm.get(['maxMonthlyTransactions'])!.value
    };
    console.log(bankSettingDto);
    this.updateAccountSetting(bankSettingDto);
    this.onSubmit.emit();
  }

  updateAccountSetting(bankSettingDto: BankSettingDto){
    this.bankService.updateAccountSetting(bankSettingDto).subscribe(
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

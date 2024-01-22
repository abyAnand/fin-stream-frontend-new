import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountType, BankSettingDto } from '../../../../../../../../core/models/BankSettingDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-create-account-setting',
  templateUrl: './create-account-setting.component.html',
  styleUrls: ['./create-account-setting.component.css']
})
export class CreateAccountSettingComponent implements OnInit{

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() shortName: string;

  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ){

  }
  ngOnInit(): void {

    console.log(this.shortName);



  }

  savingsAccountForm = this.formBuilder.group({
    accountName: ['', [Validators.required]],
    interestRate: ['', Validators.required]
  })

  createSavingsAccount(): void {

    const bankSettingDto: BankSettingDto = {
      bankId: StorageService.getUserIdFromToken(),
      accountType: AccountType.SAVINGS,
      accountName: this.savingsAccountForm.get(['accountName'])!.value,
      interestRate: this.savingsAccountForm.get(['interestRate'])!.value
    }

    console.log(bankSettingDto);

    this.onSubmit.emit();
  }

  isInvalid(controlName: string): boolean {
    const control = this.savingsAccountForm.get(controlName);
    return control?.touched && control?.invalid;
  }

}

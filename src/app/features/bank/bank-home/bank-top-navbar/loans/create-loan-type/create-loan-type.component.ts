import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { LoanSettingService } from 'src/app/core/services/loanSetting/loan-setting.service';
import { LoanTypeService } from 'src/app/core/services/loanType/loan-type.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-create-loan-type',
  templateUrl: './create-loan-type.component.html',
  styleUrls: ['./create-loan-type.component.css']
})
export class CreateLoanTypeComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  loanForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loanTypeService: LoanTypeService
    ) { }


  ngOnInit(): void {

    this.loanForm = this.fb.group({
      name: ['', Validators.required],
      loanCategory: ['', Validators.required],
    });

  }

  createLoan() {
    if (this.loanForm.valid) {
      const newLoanSetting: LoanType = {
        bankId: StorageService.getUserIdFromToken(),
        name: this.loanForm.get(['name'])!.value,
        loanCategory: this.loanForm.get(['loanCategory'])!.value,
      };
      console.log(newLoanSetting);
      this.loanTypeService.createLoanType(newLoanSetting).subscribe(
        (response) => {
          console.log('Loan created successfully:', response);
          this.onSubmit.emit();
        },
        (error) => {
          console.error('Error occurred while creating loan:', error);

        }
      );
    }
  }

}

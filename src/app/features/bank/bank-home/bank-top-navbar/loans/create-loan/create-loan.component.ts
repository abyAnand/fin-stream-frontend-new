import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanSetting } from '../../../../../../core/models/loan/LoanSetting.model';
import { StorageService } from '../../../../../../core/services/storage/storage.service';
import { LoanSettingService } from 'src/app/core/services/loanSetting/loan-setting.service';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() loanType: LoanType;

  loanForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loanSettingService: LoanSettingService
    ) {


     }


  ngOnInit(): void {


    this.loanForm = this.fb.group({
      name: ['', Validators.required],
      interestRate: ['', Validators.required],
      loanAmount: ['', Validators.required],
      loanTermMonths: ['', Validators.required]
    });

  }

  createLoan() {
    if (this.loanForm.valid) {
      const newLoanSetting: LoanSetting = {
        name: this.loanForm.get(['name'])!.value,
        loanTypeDto: this.loanType,
        interestRate: this.loanForm.get(['interestRate'])!.value,
        loanAmount: this.loanForm.get(['loanAmount'])!.value,
        loanTermMonths: this.loanForm.get(['loanTermMonths'])!.value
      };
      this.loanSettingService.createLoanSetting(newLoanSetting).subscribe(
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanSetting } from 'src/app/core/models/loan/LoanSetting.model';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { LoanSettingService } from 'src/app/core/services/loanSetting/loan-setting.service';

@Component({
  selector: 'app-update-loan',
  templateUrl: './update-loan.component.html',
  styleUrls: ['./update-loan.component.css']
})
export class UpdateLoanComponent implements OnInit {

  @Input() currentLoan: LoanSetting;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  loanForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loanSettingService: LoanSettingService
  ) { }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      name: [this.currentLoan.name, Validators.required],
      interestRate: [this.currentLoan.interestRate, Validators.required],
      loanAmount: [this.currentLoan.loanAmount, Validators.required],
      loanTermMonths: [this.currentLoan.loanTermMonths, Validators.required]
    });
  }

  updateLoan() {
    if (this.loanForm.valid) {
      const updatedLoanSetting: LoanSetting = {
        ...this.currentLoan,
        name: this.loanForm.get('name').value,
        interestRate: this.loanForm.get('interestRate').value,
        loanAmount: this.loanForm.get('loanAmount').value,
        loanTermMonths: this.loanForm.get('loanTermMonths').value
      };


      this.loanSettingService.updateLoanSetting(updatedLoanSetting).subscribe(
        () => {
          console.log('Loan updated successfully');
          this.onSubmit.emit();
        },
        (error) => {
          console.error('Error occurred while updating loan:', error);
        }
      );
    }
  }

}

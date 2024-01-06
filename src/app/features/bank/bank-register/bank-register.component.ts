import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankRequest } from 'src/app/core/models/BankRequest.model';
import { Role } from 'src/app/core/models/RegisterRequest.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-bank-register',
  templateUrl: './bank-register.component.html',
  styleUrls: ['./bank-register.component.css']
})
export class BankRegisterComponent implements OnInit {

  bankSignupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bankService: BankService,
    private notification: ToasterService
  ) { }

  ngOnInit(): void {
    this.bankSignupForm = this.formBuilder.group({
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    }, { validator: this.passwordMatchValidator });
  }


  registerBank(): void {
    const bankRequest: BankRequest = {
      name: this.bankSignupForm.get(['name'])!.value,
      shortName: this.bankSignupForm.get(['shortName'])!.value,
      email: this.bankSignupForm.get(['email'])!.value,
      address: this.bankSignupForm.get(['address'])!.value,
      password: this.bankSignupForm.get(['password'])!.value,
      phoneNumber: this.bankSignupForm.get(['phoneNumber'])!.value,
      role: Role.Bank 
    };
      this.bankService.registerBank(bankRequest);

      // .subscribe(
      //   () => {
      //     // Show success message or redirect to another page
      //     this.notification.success('Bank registered successfully', "Success");
      //   },
      //   (error) => {
      //     // Handle error, show error message, etc.
      //     this.notification.error( error, 'failed');
      //   }
      // );
    }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }
}

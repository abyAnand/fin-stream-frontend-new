import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BankDto } from 'src/app/core/models/BankDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-bank-update',
  templateUrl: './bank-update.component.html',
  styleUrls: ['./bank-update.component.css']
})
export class BankUpdateComponent implements OnInit{

  userId! : any;
  bank: BankDto;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bankService: BankService,
    private notification: ToasterService,


    ){}

  ngOnInit(): void {
    this.userId = StorageService.getUserIdFromToken();
    this.getUserByUserId(this.userId);

  }

  getUserByUserId(userId: number): any{
    this.bankService.getUserById(userId).subscribe((res) =>{
      this.updateForm.patchValue(res);
    });

  }

  isEditMode: boolean = false;





  updateForm = this.formBuilder.group({
    name: ['', Validators.required],
    shortName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(5)]],
    address: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
  });





  toggleEditMode() {

    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      const bankDto: BankDto = {
        id: this.userId,
        name: this.updateForm.get(['name'])!.value,
        shortName: this.updateForm.get(['shortName'])!.value,
        email: this.updateForm.get(['email'])!.value,
        address: this.updateForm.get(['address'])!.value,
        phoneNumber: this.updateForm.get(['phoneNumber'])!.value
      }

      this.bankService.updateBank(bankDto).subscribe(
        () =>{
          this.notification.success("Bank updated Successfully", "Success");
        },
        (error)=>{
          this.notification.info("User updation failed", "Failed");
        }
      )



    }
  }

}

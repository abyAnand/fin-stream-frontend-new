import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { UserService } from 'src/app/core/services/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  userId! : any;
  user: UserDto;





  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private notification: ToasterService,


    ){}

  ngOnInit(): void {
    this.userId = StorageService.getUserIdFromToken();
    this.getUserByUserId(this.userId);

  }

  getUserByUserId(userId: number): any{
    this.userService.getUserById(userId).subscribe((res) =>{
      this.updateForm.patchValue(res);
    });

  }

  isEditMode: boolean = false;





  updateForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', Validators.required],
    employmentStatus: [''],
    monthlyIncome: [''],
    totalAssets: [''],
    totalLiabilities: [''],
    // collateralType: [''],
    // collateralDescription: [''],
    // collateralValue: [''],
    // vehicleNumber: [''],
    // collateralAccount: ['']
  }, { validator: this.passwordMatchValidator });



  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  toggleEditMode() {

    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      const userDto: UserDto = {
        id: this.userId,
        firstName: this.updateForm.get(['firstName'])!.value,
        lastName: this.updateForm.get(['lastName'])!.value,
        email: this.updateForm.get(['email'])!.value,
        employmentStatus: this.updateForm.get(['employmentStatus'])!.value,
        monthlyIncome: this.updateForm.get(['monthlyIncome'])!.value,
        totalAssets: this.updateForm.get(['totalAssets'])!.value,
        totalLiabilities: this.updateForm.get(['totalLiabilities'])!.value,
        // collateralType: this.updateForm.get(['collateralType'])!.value,
        // collateralDescription: this.updateForm.get(['collateralDescription'])!.value,
        // collateralValue: this.updateForm.get(['collateralValue'])!.value,
        // vehicleNumber: this.updateForm.get(['vehicleNumber'])!.value,
        // collateralAccount: this.updateForm.get(['collateralAccount'])!.value
      };
      console.log(userDto);
      

      this.userService.updateUser(userDto).subscribe(
        () =>{
          this.notification.success("User updated Successfully", "Updated");
        },
        (error)=>{
          this.notification.info("User updation failed", "Failed");
        }
      )



    }
  }



}

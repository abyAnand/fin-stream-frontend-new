import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from 'src/app/core/models/UserDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
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

    ){}

  ngOnInit(): void {
    this.userId = StorageService.getUserIdFromToken();
    this.getUserByUserId(this.userId);

  }

  getUserByUserId(userId: number): any{
    console.log(this.userId);
    this.userService.getUserById(userId).subscribe((res) =>{
      this.updateForm.patchValue(res);
    });

  }

  isEditMode: boolean = false;





  updateForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(5)]],
    confirmPassword: ['', Validators.required],
    // phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
      console.log("saved");

    }
  }



}

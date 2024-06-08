import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ImageUploadComponent } from 'src/app/features/bank/bank-home/bank-top-navbar/accounts/account-settings/image-upload/image-upload.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId!: any;
  user: UserDto;
  profilePic: string | ArrayBuffer | null = null;
  isEditMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private notification: ToasterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userId = StorageService.getUserIdFromToken();
    this.getUserByUserId(this.userId);
  }

  getUserByUserId(userId: number): any {
    this.userService.getUserById(userId).subscribe((res) => {
      this.user = res;
      this.updateForm.patchValue(res);
    });
  }

  updateForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', Validators.required],
    employmentStatus: [''],
    monthlyIncome: [''],
    totalAssets: [''],
    totalLiabilities: ['']
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
        totalLiabilities: this.updateForm.get(['totalLiabilities'])!.value
      };

      this.userService.updateUser(userDto).subscribe(
        () => {
          this.notification.success("User updated successfully!","Success");
          this.getUserByUserId(this.userId);
        },
        (error) => {
          this.notification.error("Failed to update user!", "Fail");
          console.error(error);
        }
      );
    }
  }

  openImageUploadModal() {
    const modalRef = this.modalService.open(ImageUploadComponent);
    modalRef.componentInstance.userId = this.userId;

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getUserByUserId(this.userId);
      }
    }).catch((error) => {
      console.error('Image upload modal closed with error:', error);
    });
  }
}

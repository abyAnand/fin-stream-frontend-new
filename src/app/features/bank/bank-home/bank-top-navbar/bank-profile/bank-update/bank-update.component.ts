import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BankDto } from 'src/app/core/models/bank/BankDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { ImageUploadComponent } from '../../accounts/account-settings/image-upload/image-upload.component';

@Component({
  selector: 'app-bank-update',
  templateUrl: './bank-update.component.html',
  styleUrls: ['./bank-update.component.css']
})
export class BankUpdateComponent implements OnInit{

  userId! : any;
  bank: BankDto;
  profilePic: string | ArrayBuffer | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bankService: BankService,
    private notification: ToasterService,
    private modalService: NgbModal,


    ){}

  ngOnInit(): void {
    this.userId = StorageService.getUserIdFromToken();
    this.getUserByUserId(this.userId);

  }

  getUserByUserId(userId: number): any{
    this.bankService.getUserById(userId).subscribe((res) =>{
      this.bank = res;
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
        phoneNumber: this.updateForm.get(['phoneNumber'])!.value,

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

  openImageUploadModal(): void {
    const imageModalRef = this.modalService.open(ImageUploadComponent, { centered: true });
    imageModalRef.componentInstance.imageSelected.subscribe((file: File) => {
      if (file) {

        this.uploadImage( file);
        imageModalRef.close();
      }
    });
  }

  uploadImage(file: File) {
    const formData: FormData = new FormData();
    formData.append('bankId', this.userId);
    formData.append('image', file);

    this.bankService.addImageToBank(formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully');
        this.notification.success("Uploaded Successfully", "Image");
      },
      (error) => {
        console.error('Error uploading image', error);
        this.notification.error("Uploading Failed", "Image");
      }
    );

  }

}

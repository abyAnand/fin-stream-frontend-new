import { Component, OnInit } from '@angular/core';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { LoanTypeService } from '../../../../../../core/services/loanType/loan-type.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { CreateLoanTypeComponent } from '../create-loan-type/create-loan-type.component';
import { CreateLoanComponent } from '../create-loan/create-loan.component';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { getAllLoanTypesAction, getAllLoanTypesByBankIdAction } from 'src/app/Store/LoanType/LoanType.action';
import { allLoanTypeLoadingSelector, allLoanTypesErrorSelector, allLoanTypesSelector, loanTypeSelector } from 'src/app/Store/LoanType/LoanType.selector';
import { LoanCategory } from 'src/app/core/models/loan/LoanDto.model';
import { ImageUploadComponent } from '../../accounts/account-settings/image-upload/image-upload.component';

@Component({
  selector: 'app-loan-type-list',
  templateUrl: './loan-type-list.component.html',
  styleUrls: ['./loan-type-list.component.css']
})
export class LoanTypeListComponent implements OnInit{


  loanTypeList$: Observable<LoanType[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  bankId! : any;

  constructor(
    private loanTypeService: LoanTypeService,
    private notification: ToasterService,
    private modalService: NgbModal,
    private router: Router,
    private store: Store<AppStateInterface>
  ){

  }

  ngOnInit(): void {
    this.bankId = StorageService.getUserIdFromToken();
    this.store.dispatch(getAllLoanTypesByBankIdAction({bankId: this.bankId}))
    this.fetchAll();

  }


  fetchAll(){
    this.isLoading$ = this.store.pipe(select(allLoanTypeLoadingSelector));
    this.error$ = this.store.pipe(select(allLoanTypesErrorSelector));
    this.loanTypeList$ = this.store.pipe(select(allLoanTypesSelector));
  }

  createLoanSetting(): void {
    const modalRef = this.modalService.open(CreateLoanTypeComponent, { keyboard: true ,centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.onSubmit.subscribe(() => {
      this.fetchAll();
      modalRef.close();
    });

  }

  viewLoans(loanType: LoanType){
    this.router.navigate(['/bank/loan/list'],{state: {loanType: loanType}});
  }

  getImage(loanCategory: LoanCategory): string {
    switch (loanCategory) {
      case LoanCategory.PERSONAL:
        return '/assets/loan/personal_loan.jpeg';
      case LoanCategory.BUSINESS:
        return '/assets/loan/business_loan.jpeg';
      case LoanCategory.MORTGAGE:
        return '/assets/loan/mortgage_loan.jpeg';
      case LoanCategory.STUDENT:
        return '/assets/loan/student_loan.jpeg';
      default:
        return '/assets/loan/loan.jpeg';
    }
  }

  setPhoto(loanType: LoanType): void {
    const imageModalRef = this.modalService.open(ImageUploadComponent, { centered: true });
    imageModalRef.componentInstance.imageSelected.subscribe((file: File) => {
      if (file) {
        console.log("loan type id: " + loanType.id);
        this.uploadImage(loanType.id, file);
        imageModalRef.close();
      }
    });
  }

  uploadImage(loanTypeId: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('loanTypeId', loanTypeId);
    formData.append('image', file);

    this.loanTypeService.addImageToLoanType(formData).subscribe(
      (res) => {
        this.notification.success("Image Added", "SUCCESS");
      },
      (err) => {
        this.notification.error("Image Not Added", "ERROR")
      }
    )
  }

}

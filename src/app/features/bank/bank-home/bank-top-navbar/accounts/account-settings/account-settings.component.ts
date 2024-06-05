import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountTypeListRequestDto } from 'src/app/core/models/account/AccountTypeListRequestDto.model';
import { AccountTypeSetting } from 'src/app/core/models/account/AccountTypeSetting.model';
import { AccountSettingDto } from 'src/app/core/models/bank/settings/AccountSettingDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { CreateAccountSettingComponent } from '../create-account-setting/create-account-setting.component';
import { EditAccountSettingComponent } from '../edit-account-setting/edit-account-setting.component';
import { AccountSettingService } from '../../../../../../core/services/accountSetting/account-setting.service';
import { isEmpty, Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { getAccountSettings } from 'src/app/Store/accountSetting/accountSetting.action';
import { accountSettingErrorSelector, accountSettingSuccessSelector, isLoadingAccountSettingSelector } from 'src/app/Store/accountSetting/accountSetting.selector';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit{

  bankId! : any;
  shortName: string;
  hasAccount: boolean = true;

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  accountSettingList$ : Observable<AccountSettingDto[]>;

  constructor(
    private accountSettingService: AccountSettingService,
    private notification: ToasterService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private store: Store<AppStateInterface>
  ){


  }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.shortName = params['shortName'];

    });

    this.bankId = StorageService.getUserIdFromToken();

    const accountTypeListRequestDto: AccountTypeListRequestDto = {
      bankId: this.bankId,
      accountType: this.shortName
    };
    this.store.dispatch(getAccountSettings({ accountTypeListRequestDto}));

    this.fetchAccountTypeSettingList()


  }

  private fetchAccountTypeSettingList(){

    this.isLoading$ = this.store.pipe(select(isLoadingAccountSettingSelector));
    this.error$ = this.store.pipe(select(accountSettingErrorSelector));
    this.accountSettingList$ = this.store.pipe(select(accountSettingSuccessSelector));

  }

  createAccount(): void {
    const modalRef = this.modalService.open(CreateAccountSettingComponent, { centered: true });
    modalRef.componentInstance.shortName = this.shortName;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  viewAccounts(account: AccountSettingDto): void {

    const modalRef = this.modalService.open(EditAccountSettingComponent, { centered: true });
    modalRef.componentInstance.shortName = this.shortName;
    modalRef.componentInstance.account = account; // Pass the selected accountType
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });
  }

  setPhoto(account: AccountSettingDto): void {
    const imageModalRef = this.modalService.open(ImageUploadComponent, { centered: true });
    imageModalRef.componentInstance.imageSelected.subscribe((file: File) => {
      if (file) {
        console.log("account id: " + account.id);
        this.uploadImage(account.id, file);
        imageModalRef.close();
      }
    });
  }

  uploadImage(accountSettingId: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('accountSettingId', accountSettingId);
    formData.append('image', file);

    this.accountSettingService.addImageToAccountSetting(formData).subscribe(
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

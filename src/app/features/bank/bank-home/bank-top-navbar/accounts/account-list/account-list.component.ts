import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAccountTypeSettingsAction, getAccountTypeSettingsSuccessAction } from 'src/app/Store/AccountTypeSetting/AccountTypeSetting.action';
import { accountTypeSettingSelectorFail } from 'src/app/Store/AccountTypeSetting/AccountTypeSetting.selector';
import { isLoadingAccountSettingSelector } from 'src/app/Store/accountSetting/accountSetting.selector';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { AccountTypeSetting } from 'src/app/core/models/account/AccountTypeSetting.model';
import { AccountSettingService } from 'src/app/core/services/accountSetting/account-setting.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { accountTypeSettingSelectorSuccess } from '../../../../../../Store/AccountTypeSetting/AccountTypeSetting.selector';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{

  accountTypeList: AccountTypeSetting[] = [];
  accountTypeList$ : Observable<AccountTypeSetting[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  error: boolean = false;
  bankId! : any;

  constructor(
    private accountSettingService: AccountSettingService,
    private notification: ToasterService,
    private store: Store<AppStateInterface>
  ){}

  ngOnInit(): void {

    this.bankId = StorageService.getUserIdFromToken();
    this.store.dispatch(getAccountTypeSettingsAction({bankId: this.bankId}));
    this.fetchAccountTypes();
  }


  fetchAccountTypes(){
    this.isLoading$ = this.store.pipe(select(isLoadingAccountSettingSelector));
    this.error$ = this.store.pipe(select(accountTypeSettingSelectorFail));
    this.accountTypeList$ = this.store.pipe(select(accountTypeSettingSelectorSuccess))
  }

}

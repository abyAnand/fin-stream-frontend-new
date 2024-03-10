import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../../Store/types/appState.interface';
import { getAllUserAccounts } from 'src/app/Store/Account/Account.action';
import { allUserAccountsSelector, userAccountsErrorSelector, userAccountsLoadingSelector } from 'src/app/Store/Account/Account.selector';

@Component({
  selector: 'app-show-user-accounts',
  templateUrl: './show-user-accounts.component.html',
  styleUrls: ['./show-user-accounts.component.css']
})
export class ShowUserAccountsComponent  implements OnInit{

  userAccounts: AccountDto[];
  userAccounts$: Observable<AccountDto[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private accountService: AccountService,
    private notification: ToasterService,
    private router: Router,
    private store: Store<AppStateInterface>
  ){}

  ngOnInit(): void {
    const userId = StorageService.getUserIdFromToken();
    this.store.dispatch(getAllUserAccounts({userId: userId}));
    this.fetchUserAccounts();
  }

  fetchUserAccounts(): void {
    this.isLoading$ = this.store.pipe(select(userAccountsLoadingSelector));
    this.userAccounts$ = this.store.pipe(select(allUserAccountsSelector));
    this.error$ = this.store.pipe(select(userAccountsErrorSelector));
  }

  viewAccount(account: AccountDto){
    this.router.navigate(['/user/dashboard/details'], { queryParams: { account: JSON.stringify(account) } });
  }


}

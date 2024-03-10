import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAllUserAccounts } from 'src/app/Store/Account/Account.action';
import { allUserAccountsSelector, userAccountsErrorSelector, userAccountsLoadingSelector } from 'src/app/Store/Account/Account.selector';
import { getTransactionHistory } from 'src/app/Store/TransactionHistory/TransactionHistory.action';
import { getTransactionHistoryLoadingSelector, getTransactionHistorySelector, getTransationHistoryErrorSelector } from 'src/app/Store/TransactionHistory/TransactionHistory.selector';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { TransactionHistory } from 'src/app/core/models/transaction/TransactionHistory.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  currentUserId: string;
  accountDtoList$: Observable<AccountDto[]>
  isAccountListLoading$: Observable<boolean>;
  accountError$: Observable<string | null>;

  transactionHistoryList$: Observable<TransactionHistory[]>;
  transactionHistoryError$: Observable<string | null>;
  isTransactionHistoryLoading$ : Observable<boolean>;

  ngOnInit(): void {
    this.currentUserId = StorageService.getUserIdFromToken();

    this.store.dispatch(getAllUserAccounts({userId: this.currentUserId}));
    this.isAccountListLoading$ = this.store.pipe(select(userAccountsLoadingSelector));
    this.accountError$ = this.store.pipe(select(userAccountsErrorSelector));
    this.accountDtoList$ = this.store.pipe(select(allUserAccountsSelector));
    this.getUserTransactionHistory();
    this.isTransactionHistoryLoading$ = this.store.pipe(select(getTransactionHistoryLoadingSelector));
    this.transactionHistoryError$ = this.store.pipe(select(getTransationHistoryErrorSelector));
    this.transactionHistoryList$ = this.store.pipe(select(getTransactionHistorySelector));
  }

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private store: Store<AppStateInterface>
  ) {


  }


  getUserTransactionHistory(){
    this.accountDtoList$.subscribe(accountDtos =>{
      accountDtos.forEach(account => {
        this.store.dispatch(getTransactionHistory({ accountId: account.id }));
      });
    });


  }

}

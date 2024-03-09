
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account/account.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { Chart, registerables } from 'chart.js/auto';
import { TransactionHistory } from 'src/app/core/models/transaction/TransactionHistory.model';
import { Store, select } from '@ngrx/store';
import { getSingleUser } from 'src/app/Store/SingleUser/singleUser.action';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { Observable, take } from 'rxjs';
import { SingleUserErrorSelector, SingleUserLoadingSelector, SingleUserSuccessSelector } from 'src/app/Store/SingleUser/SingleUser.selector';
import { getAllUserAccounts } from 'src/app/Store/Account/Account.action';
import { allUserAccountsSelector, userAccountsErrorSelector, userAccountsLoadingSelector } from 'src/app/Store/Account/Account.selector';
import { getTransactionHistory } from 'src/app/Store/TransactionHistory/TransactionHistory.action';
import { getTransactionHistoryLoadingSelector, getTransactionHistorySelector, getTransationHistoryErrorSelector } from 'src/app/Store/TransactionHistory/TransactionHistory.selector';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  transactionDataByMonth: Map<string, Map<string, number>> = new Map(); // Nested map for transaction data by account and month
  currentUserId: string;
  chart: Chart | undefined;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  user$ : Observable<UserDto>;
  accountDtoList$: Observable<AccountDto[]>
  isAccountListLoading$: Observable<boolean>;
  accountError$: Observable<string | null>;
  transactionHistoryList$: Observable<TransactionHistory[]>;
  transactionHistoryError$: Observable<string | null>;
  isTransactionHistoryLoading$ : Observable<boolean>;


  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private store: Store<AppStateInterface>
  ) {


  }

  ngOnInit(): void {
    this.currentUserId = StorageService.getUserIdFromToken();

    this.store.dispatch(getSingleUser({userId: this.currentUserId}));
    this.isLoading$ = this.store.pipe(select(SingleUserLoadingSelector));
    this.error$ = this.store.pipe(select(SingleUserErrorSelector));
    this.user$ = this.store.pipe(select(SingleUserSuccessSelector));

    this.store.dispatch(getAllUserAccounts({userId: this.currentUserId}));
    this.isAccountListLoading$ = this.store.pipe(select(userAccountsLoadingSelector));
    this.accountError$ = this.store.pipe(select(userAccountsErrorSelector));
    this.accountDtoList$ = this.store.pipe(select(allUserAccountsSelector));

    this.fetchTransactionDataByStateManagement();

    this.accountService.getUserAccounts(this.currentUserId).subscribe(res => {
      this.fetchTransactionDataByStateManagement();
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  fetchTransactionDataByStateManagement(): void {
    this.accountDtoList$.pipe(
      take(1)
    ).subscribe(accountDtos => {
      if (accountDtos.length > 0) {
        accountDtos.forEach(account => {
          this.transactionDataByMonth.set(account.id, new Map());
          this.store.dispatch(getTransactionHistory({ accountId: account.id }));
        });
      }
  
      // Subscribe to transactionHistoryList$ after accountDtoList$ emits a value
      this.transactionHistoryList$ = this.store.pipe(select(getTransactionHistorySelector));
      this.transactionHistoryList$.subscribe(transactions => {
        transactions.forEach(transaction => {
          const accountId = transaction.sender.userAccountId;
          const key = `${transaction.month}-${transaction.year}`;
  
          // Ensure the account exists in transactionDataByMonth map
          if (!this.transactionDataByMonth.has(accountId)) {
            this.transactionDataByMonth.set(accountId, new Map());
          }
  
          const accountTransactionMap = this.transactionDataByMonth.get(accountId);
          if (accountTransactionMap) {
            const amount = accountTransactionMap.get(key) || 0;
            accountTransactionMap.set(key, amount + transaction.amount);
          }
        });
  
        // Once all transaction data is fetched and updated, show chart
        if (accountDtos.every(acc => this.transactionDataByMonth.has(acc.id))) {
          this.showLineChartData();
        }
      });
  
      // Subscribe to loading and error states
      this.isTransactionHistoryLoading$ = this.store.pipe(select(getTransactionHistoryLoadingSelector));
      this.transactionHistoryError$ = this.store.pipe(select(getTransationHistoryErrorSelector));
    });
  }

  

  createChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Transaction Amount per Month'
          }
        }
      }
    });
  }

  showLineChartData(): void {
  // Clear previous data
  this.chart.data.datasets = [];
  this.chart.data.labels = [];

  // Extract months as labels
  const months = Array.from(this.transactionDataByMonth.values().next().value.keys());
  this.chart.data.labels = months;

  // Subscribe to the accountDtoList$ observable
  this.accountDtoList$.subscribe(accountDtos => {
    accountDtos.forEach(account => {
      const dataset: any = {
        label: account.accountName,
        data: [],
        borderWidth: 1
      };

      // Populate dataset with transaction amounts for each month
      months.forEach((month: string) => {
        const accountTransactionMap = this.transactionDataByMonth.get(account.id);
        const totalAmount = accountTransactionMap?.get(month) || 0;
        dataset.data.push(totalAmount);
      });

      this.chart.data.datasets.push(dataset);
    });

    // Update the chart
    if (this.chart) {
      this.chart.update();
    }
  });
}
}

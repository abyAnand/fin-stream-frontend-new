import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/core/services/account/account.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { Chart, registerables } from 'chart.js/auto';
import { TransactionHistory } from 'src/app/core/models/transaction/TransactionHistory.model';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {
  accountDtoList: AccountDto[] = [];
  transactionHistoryList: TransactionHistory[] = [];
  transactionDataByMonth: Map<string, Map<string, number>> = new Map(); // Nested map for transaction data by account and month
  currentUserId: string;
  chart: Chart | undefined;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.currentUserId = StorageService.getUserIdFromToken();
    this.accountService.getUserAccounts(this.currentUserId).subscribe(res => {
      this.accountDtoList = res;
      this.fetchTransactionData();
    });
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  fetchTransactionData(): void {
    // Initialize transactionDataByMonth map for each account
    this.accountDtoList.forEach(account => {
      this.transactionDataByMonth.set(account.id, new Map());
    });

    // Fetch transaction history for each account
    this.accountDtoList.forEach(account => {
      this.transactionService.getTransactionsByAccountId(account.id).subscribe(transactions => {
        // Add transactions to transactionHistoryList
        this.transactionHistoryList.push(...transactions);

        transactions.forEach(transaction => {
          const key = `${transaction.month}-${transaction.year}`; // Unique key for each month and year
          const accountTransactionMap = this.transactionDataByMonth.get(account.id);
          if (accountTransactionMap) {
            const amount = accountTransactionMap.get(key) || 0;
            accountTransactionMap.set(key, amount + transaction.amount);
          }
        });
        // Once all transaction data is fetched, show chart
        if (this.accountDtoList.every(acc => this.transactionDataByMonth.get(acc.id)?.size)) {
          this.showLineChartData();
        }
      });
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

    // Iterate over the accounts and create a dataset for each account
    this.accountDtoList.forEach(account => {
      const dataset: any = {
        label: account.accountName,
        data: [],
        borderWidth: 1
      };

      // Populate dataset with transaction amounts for each month
      months.forEach((month: string) => { // Explicitly define the type of month as string
        const accountTransactionMap = this.transactionDataByMonth.get(account.id);
        const totalAmount = accountTransactionMap?.get(month) || 0;
        dataset.data.push(totalAmount);
      });

      this.chart.data.datasets.push(dataset);
    });

    if (this.chart) {
      this.chart.update();
    }
  }
}

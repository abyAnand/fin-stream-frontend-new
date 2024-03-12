import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { BankTransactionHistory } from 'src/app/core/models/transaction/BankTransactionHistory.model';
import { TransactionDto } from 'src/app/core/models/transaction/TransactionDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-bank-dashboard',
  templateUrl: './bank-dashboard.component.html',
  styleUrls: ['./bank-dashboard.component.css']
})
export class BankDashboardComponent {

  chart: Chart | undefined;
  bankId: any;
  transactionHistoryList: BankTransactionHistory[] = [];
  transactionList: TransactionDto[] = [];


  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.bankId = StorageService.getUserIdFromToken();
    this.transactionService.getTransactionsByBankId(this.bankId).subscribe(transactions => {
      this.transactionList = transactions;
      console.log(transactions);

      const aggregatedData = this.aggregateTransactions(transactions);
      this.renderChart(aggregatedData);
    });
    this.getTransactionHistoryByBankId(this.bankId);
  }

  getTransactionHistoryByBankId(bankId: string){
    this.transactionService.getTransactionHistoryByBankId(bankId).subscribe(transactionList =>{
      this.transactionHistoryList = transactionList;
      console.log(this.transactionHistoryList);

    });
  }

  aggregateTransactions(transactions: TransactionDto[]): Map<string, number> {
    const aggregatedData = new Map<string, number>();

    // Initialize aggregatedData with zeros for all months
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    months.forEach(month => aggregatedData.set(month, 0));

    transactions.forEach(transaction => {
      const monthKey = transaction.month.toUpperCase();
      const totalAmount = aggregatedData.get(monthKey) || 0;
      aggregatedData.set(monthKey, totalAmount + transaction.amount);
    });
    return aggregatedData;
  }

  renderChart(aggregatedData: Map<string, number>): void {
    const labels = Array.from(aggregatedData.keys());
    const data = Array.from(aggregatedData.values());

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Transaction Amount',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust color as needed
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
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
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}

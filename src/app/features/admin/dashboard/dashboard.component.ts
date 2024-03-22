import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { BankEntity } from 'src/app/core/models/bank/BankEntity.model';
import { UserDto } from 'src/app/core/models/user/UserDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bankAccountsChart: Chart | undefined;
  userRegistrationsChart: Chart | undefined;
  users: UserDto[] = [];
  banks: BankEntity[] = [];

  constructor(
    private userService: UserService,
    private bankService: BankService
    ) { }

  ngOnInit(): void {
    this.bankService.getAllBankEntity().subscribe(bankAccounts => {
      this.banks = bankAccounts;
      const accountsByMonth = this.aggregateByMonth(bankAccounts);
      this.renderBankAccountsChart(accountsByMonth);
    });

    this.userService.getAllUsers().subscribe(userRegistrations => {
      this.users = userRegistrations;
      const usersByMonth = this.aggregateByMonth(userRegistrations);
      this.renderUserRegistrationsChart(usersByMonth);
    });
  }

  aggregateByMonth(entities: (BankEntity | UserDto)[]): Map<string, number> {
    const dataByMonth = new Map<string, number>();

    entities.forEach(entity => {
      const date = new Date(entity.createdDate);
      const monthName = date.toLocaleString('default', { month: 'long' });
      const count = dataByMonth.get(monthName) || 0;
      dataByMonth.set(monthName, count + 1);
    });

    return dataByMonth;
  }

  renderBankAccountsChart(accountsByMonth: Map<string, number>): void {
    const labels = Array.from(accountsByMonth.keys());
    const data = Array.from(accountsByMonth.values());

    const ctx = document.getElementById('bankAccountsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.bankAccountsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Bank Accounts Created',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          pointBorderColor: '#fff',
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(54, 162, 235, 1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Bank Accounts Created by Month'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Accounts'
            }
          }
        }
      }
    });
  }

  renderUserRegistrationsChart(usersByMonth: Map<string, number>): void {
    const labels = Array.from(usersByMonth.keys());
    const data = Array.from(usersByMonth.values());

    const ctx = document.getElementById('userRegistrationsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.userRegistrationsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'User Registrations',
          data: data,
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: 'rgba(255, 206, 86, 1)',
          pointBorderColor: '#fff',
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255, 206, 86, 1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'User Registrations by Month'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Users'
            }
          }
        }
      }
    });
  }

}

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

  bankAccountsChart: ChartOptions = {};
  userRegistrationsChart: ChartOptions = {};
  users: UserDto[] = [];
  banks: BankEntity[] = [];
  totalUsers: number = 0;
  totalBanks: number = 0;

  constructor(
    private userService: UserService,
    private bankService: BankService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.bankService.getAllBankEntity().subscribe(bankAccounts => {
      this.banks = bankAccounts;
      this.totalBanks = bankAccounts.length;
      const banksByMonth = this.aggregateByMonth(bankAccounts);
      this.renderBankAccountsChart(banksByMonth);
    });

    this.userService.getAllUsers().subscribe(userRegistrations => {
      this.users = userRegistrations;
      this.totalUsers = userRegistrations.length;
      const usersByMonth = this.aggregateByMonth(userRegistrations);
      this.renderUserRegistrationsChart(usersByMonth);
    });
  }

  aggregateByMonth(entities: (BankEntity | UserDto)[]): Map<string, number> {
    const dataByMonth = new Map<string, number>();

    entities.forEach(entity => {
      const date = new Date(entity.createdDate);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      const count = dataByMonth.get(monthYear) || 0;
      dataByMonth.set(monthYear, count + 1);
    });

    return dataByMonth;
  }

  renderBankAccountsChart(banksByMonth: Map<string, number>): void {
    const labels = Array.from(banksByMonth.keys());
    const data = Array.from(banksByMonth.values());

    this.bankAccountsChart = {
      series: [{
        name: 'Banks Created',
        data: data
      }],
      chart: {
        type: 'line'
      },
      plotOptions: {},
      xaxis: {
        categories: labels
      },
      yaxis: {
        title: {
          text: 'Number of Banks'
        }
      },
      colors: ['#369ef5'],
      stroke: {},
      grid: {},
      tooltip: {}
    };
  }

  renderUserRegistrationsChart(usersByMonth: Map<string, number>): void {
    const labels = Array.from(usersByMonth.keys());
    const data = Array.from(usersByMonth.values());

    this.userRegistrationsChart = {
      series: [{
        name: 'Users Registered',
        data: data
      }],
      chart: {
        type: 'line'
      },
      plotOptions: {},
      xaxis: {
        categories: labels
      },
      yaxis: {
        title: {
          text: 'Number of Users'
        }
      },
      colors: ['#3eb87e'],
      stroke: {},
      grid: {},
      tooltip: {}
    };
  }
}

interface ChartOptions {
  series?: any[];
  chart?: any;
  plotOptions?: any;
  xaxis?: any;
  yaxis?: any;
  colors?: string[];
  stroke?: any;
  grid?: any;
  tooltip?: any;
}

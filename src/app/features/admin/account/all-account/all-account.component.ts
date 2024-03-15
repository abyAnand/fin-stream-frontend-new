import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccountDto } from 'src/app/core/models/account/BankAccountDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';

@Component({
  selector: 'app-all-account',
  templateUrl: './all-account.component.html',
  styleUrls: ['./all-account.component.css']
})
export class AllAccountComponent implements OnInit {

  accounts: BankAccountDto[] = [];

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAllAccounts().subscribe(
      accounts => {
        this.accounts = accounts;
      }
    );

  }

  viewAccountDetails(account: BankAccountDto): void {
    this.router.navigate(['admin/account/single'], {queryParams: {accountData: JSON.stringify(account)}});
  }
}

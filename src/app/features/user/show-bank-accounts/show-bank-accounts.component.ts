import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankSettingDto } from 'src/app/core/models/BankSettingDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-show-bank-accounts',
  templateUrl: './show-bank-accounts.component.html',
  styleUrls: ['./show-bank-accounts.component.css']
})
export class ShowBankAccountsComponent implements OnInit{

  accountList: BankSettingDto[] = [];
  error: boolean = false;
  bankId: string = '';

  constructor(
    private bankService: BankService,
    private notification: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bankId = params['bankId'];
      this.fetchAccountList(this.bankId);
    });
  }

  private fetchAccountList(bankId: string): void {
    // Replace 'getAccountsByBankId' with your actual service method
    this.bankService.getAccountsByBankId(bankId).subscribe(
      (accounts) => {
        this.accountList = accounts;
      },
      (error) => {
        this.notification.error(error, 'Error fetching accounts:');
        this.error = true;
      }
    );
  }

  showAccountDetails(account: BankSettingDto): void {
    if (account) {
      StorageService.setAccount(account);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountSettingDto } from 'src/app/core/models/bank/settings/AccountSettingDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { AccountSettingService } from 'src/app/core/services/accountSetting/account-setting.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-show-bank-accounts',
  templateUrl: './show-bank-accounts.component.html',
  styleUrls: ['./show-bank-accounts.component.css']
})
export class ShowBankAccountsComponent implements OnInit{

  accountList: AccountSettingDto[] = [];
  error: boolean = false;
  bankId: string = '';

  constructor(
    private accountSettingService: AccountSettingService,
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
    this.accountSettingService.getAccountSettingsByBankId(bankId).subscribe(
      (accounts) => {
        this.accountList = accounts;
        console.log(this.accountList);
      },
      (error) => {
        this.notification.error(error, 'Error fetching accounts:');
        this.error = true;
      }
    );
  }

  showAccountDetails(account: AccountSettingDto): void {
    if (account) {
      StorageService.setAccount(account);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AccountTypeSetting } from 'src/app/core/models/AccountTypeSetting.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit{

  accountTypeList: AccountTypeSetting[] = [];
  error: boolean = false;
  bankId! : any;

  constructor(
    private bankService: BankService,
    private notification: ToasterService
  ){}

  ngOnInit(): void {

    this.bankId = StorageService.getUserIdFromToken();

    this.fetchAccountTypes(this.bankId);
  }

  private fetchAccountTypes(bankId: number): void {
    this.bankService.getAccountTypes(bankId).subscribe(
      (banks) => {
        this.accountTypeList = banks;
      },
      (error) => {
        this.notification.error(error, 'Error fetching Accounts:');
        this.error = true;
      }
    );
  }
}

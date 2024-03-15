import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankAccountDto } from '../../../../core/models/account/BankAccountDto.model';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { AccountService } from 'src/app/core/services/account/account.service';
import { TransactionHistory } from 'src/app/core/models/transaction/TransactionHistory.model';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-single-account',
  templateUrl: './single-account.component.html',
  styleUrls: ['./single-account.component.css']
})
export class SingleAccountComponent implements OnInit{

  account: BankAccountDto;
  accountDto: AccountDto;
  transactionHistoryList : TransactionHistory[] = [];


  constructor(
    private route : ActivatedRoute,
    private accountService: AccountService,
    private transactionService: TransactionService
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      if(params['accountData']){
        this.account = JSON.parse(params['accountData']);
      }
    });

    console.log(this.account.id);

    this.viewAccount();

  }

  viewAccount(){
    this.accountService.getUserAccountsByAccountId(this.account.id).subscribe(
      userAccount =>{
        this.accountDto = userAccount;
      }
    );

    this.transactionService.getTransactionsByAccountId(this.account.id).subscribe(
      transactions =>{
        this.transactionHistoryList = transactions;
      }
    );

  }



}

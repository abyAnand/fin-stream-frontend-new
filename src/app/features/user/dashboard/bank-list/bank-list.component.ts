import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/Store/types/appState.interface';
import { Bank } from 'src/app/core/models/bank/Bank.model';
import { BankDto } from 'src/app/core/models/bank/BankDto.model';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { ToasterService } from 'src/app/core/services/toaster/toaster.service';
import { Store, select } from '@ngrx/store';
import { getAllBanksAction } from 'src/app/Store/Bank/Bank.action';
import { allBankErrorSelector, allBankLoadingSelector, allBankSelector } from 'src/app/Store/Bank/Bank.selector';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit{

  bankList: BankDto[] = [];
  bankList$ : Observable<BankDto[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  error: boolean = false;

  constructor(
    private bankService: BankService,
    private notification: ToasterService,
    private router: Router,
    private store: Store<AppStateInterface>
  ){}

  ngOnInit(): void {

    this.store.dispatch(getAllBanksAction());
    this.bankList$ = this.store.pipe(select(allBankSelector));
    this.isLoading$ = this.store.pipe(select(allBankLoadingSelector));
    this.error$ = this.store.pipe(select(allBankErrorSelector));
  }



  showBankAccounts(bankId: string): void {

    this.router.navigate(['/user/dashboard/accounts/', bankId]);
  }

}

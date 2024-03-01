import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { DepositComponent } from '../transaction/deposit/deposit.component';
import { LoanType } from 'src/app/core/models/loan/LoanType.model';
import { TransferComponent } from '../transaction/transfer/transfer.component';
import { TransactionDto } from 'src/app/core/models/transaction/TransactionDto.model';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { TransactionHistory } from 'src/app/core/models/transaction/TransactionHistory.model';
import { StorageService } from '../../../core/services/storage/storage.service';

@Component({
  selector: 'app-show-user-account-details',
  templateUrl: './show-user-account-details.component.html',
  styleUrls: ['./show-user-account-details.component.css']
})
export class ShowUserAccountDetailsComponent implements OnInit {
  selectedAccount: AccountDto | undefined;
  transactions: TransactionHistory[] = [];
  currentUserId: string; // Declare currentUserId variable

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    const accountString = this.route.snapshot.queryParamMap.get('account');
    if (accountString) {
      this.selectedAccount = JSON.parse(accountString) as AccountDto;
    }
    this.currentUserId = StorageService.getUserIdFromToken();
    this.getAccountTransactionList();
    console.log(this.selectedAccount);
  }

  editAccount(account: AccountDto) {
    this.router.navigate(['/user/dashboard/edit'], { queryParams: { account: JSON.stringify(account) } });
  }

  getAccountTransactionList() {
    this.transactionService.getTransactionsByAccountId(this.selectedAccount.id).subscribe(
      (accountTransactions) => {
        this.transactions = accountTransactions.map(transaction => this.mapTransactionWithStatus(transaction));
        console.log('Transaction Completed:', this.transactions);
      },
      (error) => {
        console.error('Error occurred while Transferring Money:', error);
      }
    );
  }

  mapTransactionWithStatus(transaction: TransactionHistory): TransactionHistory {
    console.log(transaction.self)
    if (transaction.sender.userId === transaction.receiver.userId) {
      transaction.self = true; // If sender and receiver IDs are the same, set self to true
    } else if (transaction.sender.userId === this.currentUserId) {
      transaction.self = false; // If sender ID is the same as current user's ID, set self to false (sent)
    } else if(transaction.receiver.userId === null){
      transaction.self = false;
    }
    else {
      transaction.self = transaction.self; // Otherwise, set self to true (received)
    }

    return transaction;
  }

  deposit() {
    console.log(this.selectedAccount);
    const modalRef = this.modalService.open(DepositComponent, { centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.account = this.selectedAccount;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });

  }

  transfer() {
    const modalRef = this.modalService.open(TransferComponent, { centered: true, animation: true, size: 'lg' });
    modalRef.componentInstance.account = this.selectedAccount;
    modalRef.componentInstance.onSubmit.subscribe(() => {
      modalRef.close();
    });

  }
}

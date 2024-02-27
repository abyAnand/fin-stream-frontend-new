import { transition } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { TransactionDto, TransactionStatus } from 'src/app/core/models/transaction/TransactionDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit{

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() account: AccountDto;
  depositForm: FormGroup;

  savedTransactionDto: TransactionDto;

  constructor(
    private activeModal: NgbActiveModal,
    private fb:FormBuilder,
    private transactionService: TransactionService
  ){}

  ngOnInit(): void {
    this.createForm();
    console.log(this.account);

  }

  createForm() {
    this.depositForm = this.fb.group({
      depositAmount: [null, Validators.required]
    });
  }

  deposit(){
    const transactionDto: TransactionDto = {
      senderId: StorageService.getUserIdFromToken(),
      senderBankId: this.account.bankId,
      senderAccountId: this.account.id,
      amount: this.depositForm.get(['depositAmount'])!.value,
      receiverId: StorageService.getUserIdFromToken(),
      receiverAccountId: this.account.id,
      receiverBankId: this.account.bankId,
      status: TransactionStatus.PENDING
    };

    console.log(transactionDto);

    this.transactionService.createTransaction(transactionDto).subscribe(
      (transaction) => {
        this.savedTransactionDto = transaction;
        console.log('Transaction Completed:', transaction);
      },
      (error) => {
        console.error('Error occurred while Transferring Money:', error);
      }
    );

    this.onSubmit.emit();
  }

  cancel(){
    this.activeModal.dismiss('cancel');
  }
}

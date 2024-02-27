import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountDto } from 'src/app/core/models/account/AccountDto.model';
import { TransactionDto, TransactionStatus } from 'src/app/core/models/transaction/TransactionDto.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TransactionService } from 'src/app/core/services/transaction/transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() account: AccountDto;
  transferForm: FormGroup;

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
    this.transferForm = this.fb.group({
      depositAmount: [null, Validators.required],
      accountNumber: [null, Validators.required]
    });
  }

  transfer(){
    const transactionDto: TransactionDto = {
      senderId: StorageService.getUserIdFromToken(),
      senderBankId: this.account.bankId,
      senderAccountId: this.transferForm.get(['accountNumber'])!.value,
      amount: this.transferForm.get(['depositAmount'])!.value,
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

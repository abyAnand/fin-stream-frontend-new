import { AccountService } from 'src/app/core/services/account/account.service';
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
  accountVerified: boolean = false;
  showVerifyButton: boolean = true;

  savedTransactionDto: TransactionDto;

  constructor(
    private activeModal: NgbActiveModal,
    private fb:FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService
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
      senderAccountId: this.account.id,
      amount: this.transferForm.get(['depositAmount'])!.value,
      receiverId: StorageService.getUserIdFromToken(),
      receiverAccountId: '',
      receiverAccountName: this.transferForm.get(['accountNumber'])!.value,
      receiverBankId: this.account.bankId,
      status: TransactionStatus.PENDING
    };

    console.log(transactionDto);

    this.transactionService.createTransaction(transactionDto).subscribe(
      (transaction) => {
        this.savedTransactionDto = transaction;
      },
      (error) => {
      }
    );

    this.onSubmit.emit();
  }

  verifyAccount() {
    const accountNumber = this.transferForm.get(['accountNumber'])!.value;

    this.accountService.verifyAccount(accountNumber).subscribe(
      (response) => {
        this.accountVerified = response;
        this.showVerifyButton = false;
      },
      (error) => {
      }
    );
  }

  onAccountNumberChange() {

    this.accountVerified = false;
    this.showVerifyButton = true;
  }

  cancel(){
    this.activeModal.dismiss('cancel');
  }

}

import { Injectable } from '@angular/core';
import { BankRequest } from '../../models/BankRequest.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor() { }

  registerBank(bankData: BankRequest): any{
    console.log(bankData);

    console.log("Bam.... Registered");

  }
}

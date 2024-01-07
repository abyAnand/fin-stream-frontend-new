import { Injectable } from '@angular/core';
import { BankRequest } from '../../models/BankRequest.model';
import { Observable, catchError, map, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToasterService } from '../toaster/toaster.service';

const URL = 'http://localhost:8072/finStream/bank/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }



  registerBank(bankData: BankRequest): Observable<any> {
    return this.http.post(URL + '/register', bankData, { observe: 'response' })
      .pipe(
        tap((res: HttpResponse<any>) => {
          console.log(res.status);
          if (res.status === 201) { // Check if the status is 201 Created
            const bankDto = res.body;
            this.notification.success("Bank Created Successfully", "Success")
            console.log('Bank registered successfully:', bankDto);
          } else {
            console.error('Bank registration failed:', res);
            this.notification.info("Bank Registration Failed", "Fail");
          }
        }),
        catchError(error => {
          console.error('Bank registration failed:', error);
          this.notification.error(error,"Error Occured");
          throw error;
        })
      );
  }

  log(message: string) {
    console.log(message)
  }
}

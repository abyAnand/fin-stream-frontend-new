import { Injectable } from '@angular/core';
import { BankRequest } from '../../models/BankRequest.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToasterService } from '../toaster/toaster.service';
import { BankDto } from '../../models/BankDto.model';

const URL = 'http://localhost:8072/finStream/bank/bank';

const headers = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }


  getUserById(userId: number):Observable<any>{

    return this.http.get<BankDto>(`${URL}/${userId}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
    }

    updateBank( bankDto: BankDto): Observable<any>{

      const apiUrl = `${URL}`;
      return this.http.put(apiUrl, bankDto, {headers})
      .pipe(
        catchError(this.handleError)
      );
    }



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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { TransactionDto } from '../../models/transaction/TransactionDto.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TransactionHistory } from '../../models/transaction/TransactionHistory.model';

const URL = 'http://localhost:8072/finStream/transaction/transactions';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  createTransaction(transactionDto: TransactionDto): Observable<TransactionDto> {
    return this.http.post<TransactionDto>(URL, transactionDto, { headers: TransactionService.HEADERS})
    .pipe(
      tap(() => {
        this.notification.success('Transaction Created Successfully', 'Success');
      }),
      catchError(this.handleError)
    );
  }

  getTransactionsByAccountId(accountId: string):Observable<TransactionHistory[]>{
    return this.http.get<TransactionHistory[]>(`${URL}/account/${accountId}`, { headers: TransactionService.HEADERS })
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status == 0) {
      errorMessage = 'Transaction service is not available right now.';
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    this.notification.error(errorMessage, 'Error Occurred');
    return throwError(() => new Error(errorMessage));
  }
}

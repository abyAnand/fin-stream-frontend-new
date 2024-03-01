import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { AccountDto } from '../../models/account/AccountDto.model';
import { Observable, catchError, tap } from 'rxjs';

const URL = 'http://localhost:8072/finStream/account/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });



  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  createAccount(account: AccountDto):Observable<any>{
    return this.http.post(URL + 'accounts', account, { observe: 'response', headers: AccountService.HEADERS }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res.status);
        if (res.status === 201 || res.status === 200) {
          const accountDto = res.body;
          this.notification.success('Account Created Successfully', 'Success');
          console.log('Account registered successfully:', accountDto);
        } else {
          console.error('Account registration failed:', res);
          this.notification.info('Account Registration Failed', 'Fail');
        }
      }),
      catchError(error => {
        console.error('Account registration failed:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  updateAccount(account: AccountDto):Observable<any>{
    return this.http.put(URL + 'accounts', account, { observe: 'response', headers: AccountService.HEADERS }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res.status);
        if (res.status === 201 || res.status === 200) {
          const accountDto = res.body;
          this.notification.success('Account Updated Successfully', 'Success');

        } else {

          this.notification.info('Account Updation Failed', 'Fail');
        }
      }),
      catchError(error => {
        console.error('Account registration failed:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  verifyAccount(accountNumber: string): Observable<boolean> {
    const endpoint = `${URL}accounts/verify/${accountNumber}`;
    return this.http.get<boolean>(endpoint, { headers: AccountService.HEADERS }).pipe(
      tap((accounts: boolean) => {
        console.log('Account verified fetched successfully:', accounts);
      }),
      catchError(error => {
        console.error('Error verifying user accounts:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  getUserAccounts(userId: string): Observable<AccountDto[]> {
    const endpoint = `${URL}accounts/user/${userId}`;

    return this.http.get<AccountDto[]>(endpoint, { headers: AccountService.HEADERS }).pipe(
      tap((accounts: AccountDto[]) => {
        console.log('User accounts fetched successfully:', accounts);
      }),
      catchError(error => {
        console.error('Error fetching user accounts:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  getUserSavingsAccountsByBankId(userId: string, bankId: string): Observable<AccountDto[]> {
    const endpoint = `${URL}accounts/${bankId}/user/${userId}`;

    return this.http.get<AccountDto[]>(endpoint, { headers: AccountService.HEADERS }).pipe(
      tap((accounts: AccountDto[]) => {
      }),
      catchError(error => {
        console.error('Error fetching user accounts:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }
}

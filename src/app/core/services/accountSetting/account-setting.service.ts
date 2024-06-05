import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToasterService } from '../toaster/toaster.service';
import { AccountTypeListRequestDto } from '../../models/account/AccountTypeListRequestDto.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AccountSettingDto } from '../../models/bank/settings/AccountSettingDto.model';
import { AccountTypeSetting } from '../../models/account/AccountTypeSetting.model';

const URL = 'http://localhost:8072/finStream/bank/';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }

  getAccountSettingsListByBankIdAndAccountType(listRequestDto: AccountTypeListRequestDto): Observable<AccountSettingDto[]> {
    return this.http.get<AccountSettingDto[]>(`${URL}accounts/settings/list`, {
      headers: AccountSettingService.HEADERS,
      params: listRequestDto as any,
    }).pipe(
      catchError(this.handleError)
    );
  }

  addImageToAccountSetting(formData: FormData): Observable<AccountSettingDto> {
  
    return this.http.post<AccountSettingDto>(`${URL}accounts/settings/image`, formData).pipe(
      catchError(this.handleError)
    );
  }

  createAccountSetting(accountSettingDto: AccountSettingDto): Observable<any> {
    return this.http.post(URL + 'accounts/settings', accountSettingDto, { observe: 'response', headers: AccountSettingService.HEADERS }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res.status);
        if (res.status === 201 || res.status === 200) {
          const accountSetting = res.body;
          this.notification.success('Account Setting Created Successfully', 'Success');
          console.log('Account setting created successfully:', accountSetting);
        } else {
          console.error('Account setting creation failed:', res);
          this.notification.info('Account Setting Creation Failed', 'Fail');
        }
      }),
      catchError(error => {
        console.error('Account setting creation failed:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  updateAccountSetting(accountSettingDto: AccountSettingDto): Observable<any> {
    return this.http.put(URL + 'accounts/settings', accountSettingDto, { observe: 'response', headers: AccountSettingService.HEADERS }).pipe(
      tap((res: HttpResponse<any>) => {
        console.log(res.status);
        if (res.status === 201 || res.status === 200) {
          const accountSetting = res.body;
          this.notification.success('Account Setting Updated Successfully', 'Success');
          console.log('Account setting updated successfully:', accountSetting);
        } else {
          console.error('Account setting update failed:', res);
          this.notification.info('Account Setting Updation Failed', 'Fail');
        }
      }),
      catchError(error => {
        console.error('Account setting updation failed:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }

  //here
  getAccountTypes(bankId: number): Observable<AccountTypeSetting[]> {
    return this.http.get<AccountTypeSetting[]>(`${URL}accounts/settings/${bankId}`, { headers: AccountSettingService.HEADERS });
  }

  getAccountSettingsByBankId(bankId: string): Observable<any> {
    return this.http.get(`${URL}bank/${bankId}/accounts`, { headers: AccountSettingService.HEADERS }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status == 0) {
      errorMessage = 'Bank service is not available right now.';
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

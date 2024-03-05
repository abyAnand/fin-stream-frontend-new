import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';
import { Observable, catchError, tap } from 'rxjs';
import { NotificationDto } from '../../models/NotificationDto.model';

const URL = 'http://localhost:8072/finStream/notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private static readonly HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });



  constructor(
    private http: HttpClient,
    private notification: ToasterService
  ) { }


  getNotifications(userId: string): Observable<NotificationDto[]> {
    const endpoint = `${URL}notifications/${userId}`;

    return this.http.get<NotificationDto[]>(endpoint, { headers: NotificationService.HEADERS }).pipe(
      tap((accounts: NotificationDto[]) => {
        console.log('User Notifications fetched successfully:', accounts);
      }),
      catchError(error => {
        console.error('Error fetching user Notifications:', error);
        this.notification.error(error, 'Error Occurred');
        throw error;
      })
    );
  }
}

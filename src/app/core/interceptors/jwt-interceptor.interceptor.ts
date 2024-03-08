import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { ToasterService } from '../services/toaster/toaster.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private notification: ToasterService
  ) { }

  /**
   * Intercepts HTTP requests and adds a Bearer token to the headers if available.
   * Handles HTTP errors and attempts to refresh the token in case of an unauthorized error.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.getTokenFromLocalStorage();



    if (token) {
      // If a token is available, add it to the request headers
      request = this.addTokenToRequest(request, token);
    }

    // Continue handling the request with retry logic
    return this.handleRequestWithRetry(request, next);
  }

  /**
   * Retrieves the JWT token from local storage.
   */
  private getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Adds a Bearer token to the headers of an HTTP request.
   */
  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Handles the original HTTP request with retry logic in case of an error.
   */
  private handleRequestWithRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => this.handleHttpError(error, request, next))
    );
  }

  /**
   * Handles HTTP errors, specifically unauthorized errors (401),
   * by attempting to refresh the token and retrying the original request.
   * For 403 errors, logs a message.
   */
  private handleHttpError(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.isUnauthorizedError(error)) {
      // If the error is unauthorized (401), refresh the token and retry the request
      return this.refreshTokenAndRetry(request, next);
    } else if (this.isForbiddenError(error)) {

      this.handleForbiddenError();
    }

    // If the error is not unauthorized or forbidden, propagate the error
    return throwError(() => error);
  }

  /**
   * Checks if the given error is an unauthorized error (status code 401).
   */
  private isUnauthorizedError(error: any): boolean {
    return error instanceof HttpErrorResponse && error.status === 401;
  }

  /**
   * Checks if the given error is a forbidden error (status code 403).
   */
  private isForbiddenError(error: any): boolean {
    return error instanceof HttpErrorResponse && error.status === 403;
  }

  /**
   * Handles forbidden errors 403
   */
  private handleForbiddenError(): void {
    console.log('Access forbidden. User does not have permission to access the resource.');
    this.notification.error('Access Forbidden. User does not have permission to access the resource',"FORBIDDEN");
  }

  /**
   * Refreshes the JWT token by making a request to the token refresh endpoint.
   * Handles the successful refresh by updating local storage with the new token.
   * Retries the original request with the new token.
   */
  private refreshTokenAndRetry(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.http.post("YOUR_REFRESH_TOKEN_ENDPOINT", {}, { withCredentials: true }).pipe(
      switchMap((response: any) => {
        return this.handleRefreshTokenSuccess(response, request, next);
      }),
      catchError((error: any) => {
        // Handle token refresh error (e.g., redirect to login page)
        console.error('Token refresh failed', error);
        return throwError(error);
      })
    );
  }

  /**
   * Handles the successful refresh of the token.
   * Updates local storage with the new token and retries the original request.
   */
  private handleRefreshTokenSuccess(response: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.updateLocalStorageWithNewToken(response);

    // Retry the original request with the new token
    return next.handle(this.addTokenToRequest(request, this.getTokenFromLocalStorage()!));
  }

  /**
   * Updates local storage with the new token obtained after a successful refresh.
   */
  private updateLocalStorageWithNewToken(response: any): void {
    const { access_token, user, refresh_token } = response.body;
    this.storage.saveToken(access_token);
    this.storage.saveUser(user);
    this.storage.saveRefreshToken(refresh_token);
  }
}

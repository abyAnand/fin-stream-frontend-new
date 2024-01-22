import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const USER = 'user';
const TOKEN = 'token';
const REFRESH = 'refresh';
const DECODED = 'userId'


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  static decodedToken: any;

  constructor() { }

  public saveUser(user: any){
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, user);
  }

  public saveToken(token: any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
    StorageService.decodedToken = jwtDecode(token);
    localStorage.setItem(DECODED, StorageService.decodedToken.userId)

  }

  public saveRefreshToken(refresh: any){
    window.localStorage.removeItem(REFRESH);
    window.localStorage.setItem(REFRESH, refresh);
  }

  static setHasAccount(value: boolean) {
    window.localStorage.setItem('hasAccount', value.toString());
  }

  static getHasAccount(): boolean {
    const hasAccount = window.localStorage.getItem('hasAccount');
    return hasAccount !== null ? JSON.parse(hasAccount) : false;
  }

  static getToken(): string{
    return window.localStorage.getItem(TOKEN)! || '';
  }

  static getRefreshToken(): string{
    return window.localStorage.getItem(REFRESH)! || '';
  }

  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER)! || '');
  }

  static hasToken(): boolean{
    if(this.getToken() === null){
      return false;
    }
    return true;
  }

  static getUserIdFromToken(): string {

    if (this.hasToken()) {
      return localStorage.getItem(DECODED);
    } else {

      console.error('User ID not found in the decoded token.');
      return '';
    }
  }

  static getUserRole(): string {
    if (StorageService.decodedToken.roles == null || StorageService.decodedToken.roles.length === 0) {
      return '';
    }
    return StorageService.decodedToken.roles[0];
  }

  static isAdminLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return this.getToken() !== null && role === "ROLE_ADMIN";
  }

  static isUserLoggedIn(): boolean {
    const role: string = this.getUserRole();
    return this.getToken() !== null && role === "ROLE_USER";
  }

  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(REFRESH);
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(DECODED);
  }
}

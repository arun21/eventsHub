import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';
  private _checkUserUrl = 'http://localhost:3000/api/checkUser';

  constructor(private http: HttpClient, private router: Router, private notifyService: NotificationService) { }

  registerUser(user: any) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this._loginUrl, user);
  }

  checkUser(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get<any>(this._checkUserUrl, { params });
  }

  logOutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('code');
    this.notifyService.showSuccess('Logged-out Successfully', '');
    this.router.navigate(['/top-events']);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

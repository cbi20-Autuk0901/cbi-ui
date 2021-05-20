import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatastoreService } from '../data-store/data-store.service';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ds: DatastoreService,
    private utils: UtilsService
  ) {}

  getProfile = (email: string): Observable<any> => {
    const url = '/api/profile';
    const options = {
      headers: new HttpHeaders({
        userEmail: email,
      }),
    };
    return this.http.get(url, options);
  };

  updateProfile = (payload: object): Observable<any> => {
    const url = '/api/profile';
    return this.http.post(url, payload);
  };

  isLoggedin = (): any => {
    return this.utils.getStore('isLoggedin');
  };

  authenticateUser = (form: any): Observable<any> => {
    const url = '/api/login';

    const payload = {
      userEmail: form.email,
      userPassword: form.password,
    };
    return this.http.post(url, payload).pipe(
      map((response: any) => {
        return response;
      })
    );
  };

  registerUser = (payload: object): Observable<any> => {
    const url = '/api/register';
    return this.http.post(url, payload);
  };

  changePassword = (payload: object): Observable<any> => {
    const url = '/api/changePassword';
    return this.http.post(url, payload);
  };

  validateSession = (headers: object): Observable<any> => {
    let url: string = '/api/register';

    const options = {
      headers: new HttpHeaders({
        invitetoken: headers['token'],
      }),
    };
    return this.http.get(url, options);
  };

  logoutUser = (): void => {
    const ls = localStorage;
    ls.clear();
    this.router.navigate(['/login']);
  };
}

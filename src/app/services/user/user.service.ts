import { Injectable } from '@angular/core';
import { LoginForm } from '../../models/forms.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedin = (): any => {
    const user = localStorage.getItem('userSession');
    return !!user;
  };

  loginUser = (form: LoginForm): Observable<any> => {
    // const url = 'http://104.236.233.114:8883/login';

    const url = 'https://reqres.in/api/login';
    return this.http.post(url, form).pipe(
      map((response: any) => {
        localStorage.setItem('userSession', response.token);
        return response;
      })
    );
  };

  logoutUser = (): void => {
    const ls = localStorage;
    ls.clear();
    this.router.navigate(['/login']);
  };
}

import { Injectable } from '@angular/core';
import { LoginForm } from 'src/app/models/forms.model';
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
    const url = 'http://104.236.233.114:8883/cbi_login';

    // const url = 'https://reqres.in/api/login';

    const payload = {
      user_email_address: form.email,
      user_password: form.password,
    };
    return this.http.post(url, payload).pipe(
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

import { Injectable } from '@angular/core';
import { LoginForm } from 'src/app/models/forms.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatastoreService } from '../data-store/data-store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ds: DatastoreService
  ) {}

  isLoggedin = (): any => {
    return this.ds.getStore('isLoggedin');
  };

  authenticateUser = (form: LoginForm): Observable<any> => {
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

  logoutUser = (): void => {
    const ls = localStorage;
    ls.clear();
    this.router.navigate(['/login']);
  };
}

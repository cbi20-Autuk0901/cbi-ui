import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) {
  }

  authenticateUser(form: any): Observable<any> {
    const url = 'http://104.236.233.114:8883/logout/arg1_arg2';
    return this.http.get(url, form.value).pipe(map((response: any) => {
      return response.data;
    }));
  }
}

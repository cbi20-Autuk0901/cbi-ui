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
    const url = 'http://104.236.233.114:8883/login';
    return this.http.post(url, form.value).pipe(map((response: any) => {
      return response.data;
    }));
  }
}

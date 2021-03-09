import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Datastore } from '../../models/data-store.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  public currentPage: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  updateValue(key: string, value: any) {
    this.currentPage.next(value);
  }

  upload = (form): Observable<any> => {
    return this.http.post('http://143.110.213.22:8883/api/files', form);
  };

  formSave = (data: any): Observable<any> => {
    return this.http.post('http://143.110.213.22:8883/api/files', data);
  };
}

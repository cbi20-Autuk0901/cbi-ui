import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  store = {};

  constructor() {}

  setItem = (name: string, val: any) => {
    this.store[name] = val;
  };

  getItem = (name: string): Observable<any> => {
    return of(this.store[name]);
  };

  getStore = (): Observable<any> => {
    return of(this.store);
  };
}

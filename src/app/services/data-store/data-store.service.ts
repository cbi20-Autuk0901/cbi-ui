import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Datastore } from '../../models/data-store.model';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  public currentPage: Subject<string> = new Subject<string>();

  updateValue(key: string, value: any) {
    this.currentPage.next(value);
  }
}

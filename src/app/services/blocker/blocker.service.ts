import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlockerService {
  private blocker: Subject<boolean> = new Subject<boolean>();
  public _status: Subject<boolean> = this.blocker;
  constructor() {}

  get status(): Observable<any> {
    return this._status.asObservable();
  }

  on = () => this.blocker.next(true);
  off = () => this.blocker.next(false);
}

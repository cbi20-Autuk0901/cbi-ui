import { Component, OnInit } from '@angular/core';
import { Datastore } from 'src/app/models/data-store.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as DatastoreActions from 'src/app/actions/data-store.actions';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrls: ['./ngrx.component.scss'],
})
export class NgrxComponent implements OnInit {
  dataStore: Observable<Datastore[]>;

  constructor(private store: Store<AppState>) {
    this.dataStore = this.store.select('dataStore');
  }

  ngOnInit(): void {}

  addTutorial(name, data) {
    this.store.dispatch(
      new DatastoreActions.AddData({ name: name, data: data })
    );
  }
}

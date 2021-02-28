import { Action } from '@ngrx/store';
import { Datastore } from '../models/data-store.model';
import * as DatastoreActions from '../actions/data-store.actions';

// Section 1
const initialState: Datastore = {
  name: '',
  data: '',
};

// Section 2
export function reducer(
  state: Datastore[] = [initialState],
  action: DatastoreActions.Actions
) {
  // Section 3
  switch (action.type) {
    case DatastoreActions.ADD_DATA:
      return [...state, action.payload];
    default:
      return state;
  }
}

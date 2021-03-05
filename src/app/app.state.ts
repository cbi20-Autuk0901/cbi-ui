import { Datastore } from './models/data-store.model';
import { Login } from './models/login.model';

export interface AppState {
  readonly dataStore: Datastore[];
  readonly login: Login;
}

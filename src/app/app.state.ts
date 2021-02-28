import { Datastore } from './models/data-store.model';

export interface AppState {
  readonly dataStore: Datastore[];
}

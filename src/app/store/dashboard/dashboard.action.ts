import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard.model';

export const loadedNotifications = createAction(
  '[Dashboard] loadedNotifications',
  props<Dashboard>()
);
